import pandas as pd
from pathlib import Path
import json

json_path = Path.cwd().parent / "modal" / "aave.json"

# read json as dict
with open(json_path, "r") as f:
    data = json.load(f)

columns = data.get("data").get("table").get("columns")
columns = [column.get("name") for column in columns]
rows = data.get("data").get("table").get("rows")

# read json as dict and convert to dataframe
df = pd.json_normalize(rows)

df["createdTime"].apply(lambda x: x[-1])
