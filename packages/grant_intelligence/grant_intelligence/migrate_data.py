import numpy as np
import pandas as pd
from models import Blockchain, Category, FiatCurrency, Grant, UseCase
from db import DATABASE_URL, SUPABASE_CONNECTION_STRING, get_db_session, get_db_engine
from sqlmodel import select

NEON_CONNECTION_STRING = DATABASE_URL
SUPABASE_CONNECTION_STRING = SUPABASE_CONNECTION_STRING

if not DATABASE_URL:
    raise ValueError("No DATABASE_URL set for database connection")

if not SUPABASE_CONNECTION_STRING:
    raise ValueError("No SUPABASE_CONNECTION_STRING set for database connection")


neon_session = get_db_session(connection_string=NEON_CONNECTION_STRING)
neon_engine = get_db_engine(connection_string=NEON_CONNECTION_STRING)
supabase_session = get_db_session(connection_string=SUPABASE_CONNECTION_STRING)
supabase_engine = get_db_engine(connection_string=SUPABASE_CONNECTION_STRING)


def migrate_blockchains():
    blockchains = pd.read_sql_query(
        "SELECT name, id AS old_id FROM blockchains", supabase_engine
    )

    records = [Blockchain(**row) for _, row in blockchains.iterrows()]

    for record in records:
        existing_record = neon_session.exec(
            select(Blockchain).where(Blockchain.name == record.name)
        ).first()

        if not existing_record:
            neon_session.add(record)

    neon_session.commit()


def migrate_fiat_currencies():
    fiat_currencies = pd.read_sql_query(
        "SELECT name, sign, symbol, id AS old_id FROM currencies", supabase_engine
    )

    records = [FiatCurrency(**row) for _, row in fiat_currencies.iterrows()]  # type: ignore

    for record in records:
        existing_record = neon_session.exec(
            select(FiatCurrency).where(FiatCurrency.old_id == record.old_id)
        ).first()

        if not existing_record:
            neon_session.add(record)

    neon_session.commit()


def migrate_categories():
    categories = pd.read_sql_query(
        "SELECT name, id AS old_id FROM categories", supabase_engine
    )

    records = [Category(**row) for _, row in categories.iterrows()]

    for record in records:
        existing_record = neon_session.exec(
            select(Category).where(Category.old_id == record.old_id)
        ).first()

        if not existing_record:
            neon_session.add(record)

    neon_session.commit()


def migrate_use_cases():
    use_cases = pd.read_sql_query(
        "SELECT name, id AS old_id FROM use_cases", supabase_engine
    )

    records = [UseCase(**row) for _, row in use_cases.iterrows()]

    for record in records:
        existing_record = neon_session.exec(
            select(UseCase).where(UseCase.old_id == record.old_id)
        ).first()

        if not existing_record:
            neon_session.add(record)

    neon_session.commit()


def migrate_grants():
    grants = pd.read_sql_query(
        """
        SELECT 
            name, 
            id AS old_id, 
            description,
            active,
            url_application,
            url_info,
            content,
            slug,
            funding_minimum AS funding_amount_min,
            funding_maximum AS funding_amount_max,
            funding_minimum_currency AS funding_amount_currency,
            github AS github_url,
            twitter AS twitter_url,
            discord AS discord_url,
            website AS website_url,
            logo AS logo_url,
            created_at,
            updated_at 
        FROM grants
        """,
        supabase_engine,
    )

    for _, row in grants.iterrows():
        pass
        fiat_currency = neon_session.exec(
            select(FiatCurrency).where(
                FiatCurrency.old_id == row.get("funding_amount_currency")
            )
        ).first()

        if np.isnan(row.get("funding_amount_min")):  # type: ignore
            row["funding_amount_min"] = None

        if np.isnan(row.get("funding_amount_max")):  # type: ignore
            row["funding_amount_max"] = None

        if np.isnan(row.get("funding_amount_currency")):  # type: ignore
            row["funding_amount_currency"] = None

        if fiat_currency:
            row["funding_amount_currency"] = fiat_currency.id

        else:
            row["funding_amount_currency"] = None

        grant = Grant(**row)  # type: ignore

        existing_record = neon_session.exec(
            select(Grant).where(Grant.slug == grant.slug)
        ).first()

        if not existing_record:
            neon_session.add(grant)

    neon_session.commit()


# migrate_blockchains()
# migrate_fiat_currencies()
# migrate_categories()
# migrate_use_cases()
migrate_grants()
