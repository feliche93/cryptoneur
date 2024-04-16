from typing import Optional
from pydantic import BaseModel, Field
from slugify import slugify


class CreateClerkOrganizationParams(BaseModel):
    """
    Extract grant organization
    """

    name: str = Field(
        ..., title="Name of the organization who created or is managing the grant"
    )
    created_by: str = Field(
        ..., title="User ID of the user who created the organization"
    )
    private_metadata: Optional[dict] = None
    public_metadata: Optional[dict] = None
    slug: Optional[str] = None
    max_allowed_memberships: Optional[int] = None

    def __init__(self, **data):
        super().__init__(**data)
        if not self.slug:
            self.slug = slugify(self.name)


class CreateClerkOrganizationResponse(BaseModel):
    """
    Clerk Organization
    """

    id: str
    name: str
    slug: str
    image_url: Optional[str] = None
    has_image: bool
    max_allowed_memberships: Optional[int] = None
    admin_delete_enabled: bool
    public_metadata: Optional[dict] = None
    private_metadata: Optional[dict] = None
    created_by: str
    created_at: int
    updated_at: int
    logo_url: Optional[str] = None
