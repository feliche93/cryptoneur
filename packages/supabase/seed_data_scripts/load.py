"""Load seed data into the database."""

import pandas as pd
from pathlib import Path
import os
from supabase import create_client, Client
from storage3 import create_client as storage_create_client
import dotenv
import json
import requests

dotenv.load_dotenv()

env: str = "prod"
dev_api_url: str = "http://localhost:54321"
dev_api_key: str = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImV4cCI6MTk4MzgxMjk5Nn0.EGIM96RAZx35lJzdJsyH-qQwv8Hdp7fsn3W0YpN81IU"
dev_api_bucket_url: str = "http://localhost:54321/storage/v1"

coinmarketcap_api_key: str = os.environ.get("COINMARKETCAP_API_KEY")
url: str = dev_api_url if env == "dev" else os.environ.get("SUPABASE_URL")
key: str = dev_api_key if env == "dev" else os.environ.get("SUPABASE_KEY")
supabase: Client = create_client(url, key)


bucket_url: str = supabase.storage_url

headers = {"apiKey": key, "Authorization": f"Bearer {key}"}
storage_client = storage_create_client(bucket_url, headers, is_async=False)

cwd = Path.cwd()

seed_data_path = cwd.parent / "seed_data"

# Load grant_use_cases
grant_use_cases = pd.read_csv(seed_data_path / "grant_use_cases.csv")
grant_use_cases = grant_use_cases[
    [
        "id",
        "name",
        "createdAt",
        "updatedAt",
    ]
]

grant_use_cases.rename(
    columns={
        "name": "use_case",
        "createdAt": "created_at",
        "updatedAt": "updated_at",
    },
    inplace=True,
)

supabase.table("use_cases").upsert(grant_use_cases.to_dict("records")).execute()

# Load grant_categories
grant_categories = pd.read_csv(seed_data_path / "grant_categories.csv")
grant_categories = grant_categories[
    [
        "id",
        "name",
        "createdAt",
        "updatedAt",
    ]
]
grant_categories.rename(
    columns={
        "name": "category",
        "createdAt": "created_at",
        "updatedAt": "updated_at",
    },
    inplace=True,
)

supabase.table("categories").upsert(grant_categories.to_dict("records")).execute()

# Load blockchains
blockchains = pd.read_csv(seed_data_path / "blockchains.csv")
blockchains = blockchains[
    [
        "id",
        "name",
        "createdAt",
        "updatedAt",
    ]
]
blockchains.rename(
    columns={
        "name": "blockchain",
        "createdAt": "created_at",
        "updatedAt": "updated_at",
    },
    inplace=True,
)

supabase.table("blockchains").upsert(blockchains.to_dict("records")).execute()


# load fiats
# get /v1/fiat/map from coinmarketcap
fiats = requests.get(
    "https://pro-api.coinmarketcap.com/v1/fiat/map",
    headers={"X-CMC_PRO_API_KEY": coinmarketcap_api_key},
    params={"limit": 5000},
).json()

fiats_data = fiats["data"]

supabase.table("fiats").upsert(fiats_data).execute()


# Load grants

data = json.loads(open(seed_data_path / "grants.json").read())
grants = pd.json_normalize(data)

buckets = list(storage_client.list_buckets())
bucket_name = "grant-logos"
bucket_names = [bucket.name for bucket in buckets]
if "grant-logos" not in bucket_names:
    storage_client.create_bucket(
        id=bucket_name,
        name=bucket_name,
        public=False,
    )


for grant in data:

    # download logo temporarily into memory and upload to supabase storage
    logo = grant.get("logo")

    if not logo:
        continue

    logo_name = logo.get("name")
    logo_path = seed_data_path / "logos" / logo_name
    logo_url = logo.get("url")

    # get mime type from logo url
    r = requests.head(logo_url)
    logo["mime"] = r.headers.get("content-type")

    # download logo to logo path

    r = requests.get(logo_url, allow_redirects=True)
    open(logo_path, "wb").write(r.content)

    result = storage_client.from_(bucket_name).upload(
        path=f"{logo_name}",
        file=logo_path,
        # file_options={
        #     "Content-Type": logo.get("mime"),
        #     "upsert": "true",
        # },
    )

    file_key = result.json().get("Key").split("/")[-1]

    file_url = storage_client.from_(bucket_name).get_public_url(file_key)

    # delete logo from local storage
    os.remove(logo_path)

    # lookup fiat
    def lookup_fiat(fiat_symbol):
        result = supabase.table("fiats").select("id").eq("symbol", fiat_symbol).execute()
        if len(result.data) >= 1:
            return result.data[0].get("id")
        return None

    supabase_fiat = supabase.table("fiats").select("id").eq("symbol", grant.get("currency")).execute()

    # insert grant into database

    grant = {
        "id": grant.get("id"),
        "grant": grant.get("name"),
        "created_at": grant.get("createdAt"),
        "updated_at": grant.get("updatedAt"),
        "description": grant.get("description"),
        "active": grant.get("active"),
        "url_application": grant.get("linkApplication"),
        "url_info": grant.get("linkInfo"),
        "content": grant.get("content"),
        "slug": grant.get("slug"),
        "funding_minimum": int(grant.get("fundingMinimum").get("value")) if grant.get("fundingMinimum") else None,
        "funding_maximum": int(grant.get("fundingMaximum").get("value")) if grant.get("fundingMaximum") else None,
        "funding_minimum_currency": lookup_fiat(grant.get("fundingMinimum").get("currency").get("symbol"))
        if grant.get("fundingMinimum")
        else None,
        "funding_maximum_currency": lookup_fiat(grant.get("fundingMaximum").get("currency").get("symbol"))
        if grant.get("fundingMaximum")
        else None,
        "twitter": grant.get("twitter"),
        "github": grant.get("github"),
        "discord": grant.get("discord"),
        "telegram": grant.get("telegram"),
        "website": grant.get("website"),
        "logo": file_url,
    }

    supabase.table("grants").upsert(grant).execute()

# load grants blockchains
blockchains = pd.read_csv(seed_data_path / "blockchains.csv")

blockchains = blockchains[["id", "grants"]]

blockchains["grants"] = blockchains["grants"].apply(lambda x: x.strip("][").split(","))
blockchains["grants"] = blockchains["grants"].apply(lambda x: x if x != [""] else None)
blockchains = blockchains.explode("grants")

# drop na in grants column
blockchains = blockchains.dropna(subset=["grants"])

blockchains.rename(columns={"id": "blockchain_id", "grants": "grant_id"}, inplace=True)

supabase.table("grant_blockchains").upsert(blockchains.to_dict("records")).execute()

# load grant categories
grant_categories = pd.read_csv(seed_data_path / "grant_categories.csv")

grant_categories = grant_categories[["id", "grants"]]
grant_categories["grants"] = grant_categories["grants"].apply(lambda x: x.strip("][").split(","))
grant_categories["grants"] = grant_categories["grants"].apply(lambda x: x if x != [""] else None)
grant_categories = grant_categories.explode("grants")

# drop na in grants column
grant_categories = grant_categories.dropna(subset=["grants"])

grant_categories.rename(columns={"id": "category_id", "grants": "grant_id"}, inplace=True)

supabase.table("grant_categories").upsert(grant_categories.to_dict("records")).execute()


# load grant use cases
grant_use_cases = pd.read_csv(seed_data_path / "grant_use_cases.csv")

grant_use_cases = grant_use_cases[["id", "grants"]]
grant_use_cases["grants"] = grant_use_cases["grants"].apply(lambda x: x.strip("][").split(","))
grant_use_cases["grants"] = grant_use_cases["grants"].apply(lambda x: x if x != [""] else None)
grant_use_cases = grant_use_cases.explode("grants")

# drop na in grants column
grant_use_cases = grant_use_cases.dropna(subset=["grants"])

grant_use_cases.rename(columns={"id": "use_case_id", "grants": "grant_id"}, inplace=True)

supabase.table("grant_use_cases").upsert(grant_use_cases.to_dict("records")).execute()
