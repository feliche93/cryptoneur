import pandas as pd
from pathlib import Path
import json


path = Path(__file__).parent.parent / "seed_data" / "grantr_app.json"

# read json file as dict
data = json.loads(path.read_text())

# load grantr app in json format
grantr_app = pd.json_normalize(data["documents"])

grantr_app.to_csv("grantr_app.csv", index=False)
