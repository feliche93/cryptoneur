from datetime import datetime
from typing import Optional

from sqlalchemy import JSON, Column
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
    organization_id: Optional[str] = Field(
        nullable=False, foreign_key="organizations.id"
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


class Organization(SQLModel, table=True):  # type: ignore
    __tablename__ = "organizations"  # type: ignore

    id: str = Field(primary_key=True)
    name: str = Field(nullable=False, max_length=256)
    slug: str = Field(nullable=False, max_length=256, unique=True)
    image_url: str = Field(nullable=False, max_length=256)
    has_image: bool = Field(default=False, nullable=False)
    created_by: Optional[str] = Field(nullable=False, foreign_key="users.id")
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)

    public_metadata: Optional[dict] = Field(default=None, sa_column=Column(JSON))
    private_metadata: Optional[dict] = Field(default=None, sa_column=Column(JSON))

    max_allowed_memberships: int = Field(default=0, nullable=False)
    admin_delete_enabled: bool = Field(default=False, nullable=False)
    members_count: Optional[int] = Field(default=None)


class User(SQLModel, table=True):  # type: ignore
    __tablename__ = "users"  # type: ignore

    id: str = Field(primary_key=True)
    username: Optional[str] = Field(default=None)
    first_name: Optional[str] = Field(default=None)
    last_name: Optional[str] = Field(default=None)
    image_url: str = Field(nullable=False)
    has_image: bool = Field(default=False, nullable=False)
    primary_email_address: Optional[str] = Field(default=None)
    primary_phone_number: Optional[str] = Field(default=None)
    public_metadata: Optional[dict] = Field(default=None, sa_column=Column(JSON))
    private_metadata: Optional[dict] = Field(default=None, sa_column=Column(JSON))
    unsafe_metadata: Optional[dict] = Field(default=None, sa_column=Column(JSON))
    last_sign_in_at: Optional[datetime] = Field(default=None)
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow, nullable=False)


class GrantBlockchain(SQLModel, table=True):  # type: ignore
    __tablename__ = "grant_blockchains"  # type: ignore

    id: Optional[str] = Field(
        default_factory=lambda: generate_custom_nanoid("gbc"), primary_key=True
    )
    grant_id: str = Field(nullable=False, foreign_key="grants.id")
    blockchain_id: str = Field(nullable=False, foreign_key="blockchains.id")
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)


class GrantCategory(SQLModel, table=True):  # type: ignore
    __tablename__ = "grant_categories"  # type: ignore

    id: Optional[str] = Field(
        default_factory=lambda: generate_custom_nanoid("gcat"), primary_key=True
    )
    grant_id: str = Field(nullable=False, foreign_key="grants.id")
    category_id: str = Field(nullable=False, foreign_key="categories.id")
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)
