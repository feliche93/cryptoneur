import os
from pathlib import Path
from dotenv import load_dotenv
from sqlmodel import Session, create_engine

ENV_PATH = Path(__file__).parent.parent / ".env"

load_dotenv(
    dotenv_path=ENV_PATH,
)

SUPABASE_CONNECTION_STRING = os.getenv("SUPABASE_CONNECTION_STRING")
DATABASE_URL = os.getenv("DATABASE_URL")


def get_db_engine(connection_string=DATABASE_URL):
    if not connection_string:
        raise ValueError("No DATABASE_URL set for database connection")

    engine = create_engine(connection_string)

    return engine


def get_db_session(connection_string=DATABASE_URL):
    if not connection_string:
        raise ValueError("No DATABASE_URL set for database connection")

    engine = get_db_engine(connection_string)

    session = Session(bind=engine)

    return session
