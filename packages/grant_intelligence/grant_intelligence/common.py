from pathlib import Path
from dotenv import load_dotenv
import os
import instructor
from openai import OpenAI
from sqlalchemy import Engine, create_engine  # type: ignore
from nanoid import generate

ENV_PATH = Path(__file__).parent.parent / ".env"


def load_env():
    load_dotenv(
        dotenv_path=ENV_PATH,
    )


def create_db_engine() -> Engine:
    """
    Creates and returns a SQLAlchemy engine instance using the database URL from environment variables.

    Returns:
        Any: A SQLAlchemy engine instance connected to the specified database.

    Raises:
        ValueError: If the SQLALCHEMY_DATABASE_URL is not set in the environment variables.
    """
    SUPABASE_CONNECTION_STRING = os.getenv("SUPABASE_CONNECTION_STRING")
    if not SUPABASE_CONNECTION_STRING:
        raise ValueError("No SUPABASE_CONNECTION_STRING set for database connection")

    engine = create_engine(SUPABASE_CONNECTION_STRING)

    return engine


def generate_custom_nanoid(prefix: str) -> str:
    """
    Generates a custom Nanoid string with a given prefix.

    Args:
        prefix (str): The prefix to use for the Nanoid string.

    Returns:
        str: A unique Nanoid string with the given prefix.
    """

    alphabet = "1234567890abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"
    size = 21
    return f"{prefix}_{generate(alphabet, size)}"


def get_instructor_client():
    return instructor.from_openai(OpenAI())
