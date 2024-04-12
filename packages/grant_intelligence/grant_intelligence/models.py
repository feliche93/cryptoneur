from datetime import datetime
from typing import Optional
from common import generate_custom_nanoid
from slugify import slugify
from sqlmodel import Field, SQLModel


class Blockchain(SQLModel, table=True):  # type: ignore
    __tablename__ = "blockchains"  # type: ignore

    id: Optional[str] = Field(
        default_factory=lambda: generate_custom_nanoid("bc"), primary_key=True
    )
    old_id: int
    name: str
    slug: str = Field(default=None)
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)

    def __init__(self, **data):
        super().__init__(**data)
        if not self.slug:
            self.slug = slugify(self.name)


class FiatCurrency(SQLModel, table=True):  # type: ignore
    __tablename__ = "fiat_currencies"  # type: ignore

    id: Optional[str] = Field(
        default_factory=lambda: generate_custom_nanoid("fiat"), primary_key=True
    )
    old_id: int
    name: str
    symbol: str
    sign: str
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)


class Category(SQLModel, table=True):  # type: ignore
    __tablename__ = "categories"  # type: ignore

    id: Optional[str] = Field(
        default_factory=lambda: generate_custom_nanoid("cat"), primary_key=True
    )
    old_id: int
    name: str
    slug: str = Field(default=None)
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)

    def __init__(self, **data):
        super().__init__(**data)
        if not self.slug:
            self.slug = slugify(self.name)


class UseCase(SQLModel, table=True):  # type: ignore
    __tablename__ = "use_cases"  # type: ignore

    id: Optional[str] = Field(
        default_factory=lambda: generate_custom_nanoid("uc"), primary_key=True
    )
    old_id: int
    name: str
    slug: str = Field(default=None)
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)

    def __init__(self, **data):
        super().__init__(**data)
        if not self.slug:
            self.slug = slugify(self.name)


class Grant(SQLModel, table=True):  # type: ignore
    __tablename__ = "grants"  # type: ignore

    id: Optional[str] = Field(
        default_factory=lambda: generate_custom_nanoid("gr"), primary_key=True
    )
    old_id: int = Field(nullable=False, unique=True)
    name: str = Field(nullable=False)
    description: str = Field(nullable=False)
    active: bool = Field(default=True, nullable=False)
    url_application: str = Field(nullable=False)
    url_info: str = Field(nullable=False)
    content: Optional[str] = Field(default=None)
    slug: str = Field(nullable=False, unique=True)
    funding_amount_min: Optional[int] = Field(nullable=True)
    funding_amount_max: Optional[int] = Field(nullable=True)
    funding_amount_currency: Optional[str] = Field(nullable=False)
    github_url: Optional[str] = Field(default=None)
    twitter_url: Optional[str] = Field(default=None)
    discord_url: Optional[str] = Field(default=None)
    website_url: Optional[str] = Field(default=None)
    logo_url: Optional[str] = Field(default=None)
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)
