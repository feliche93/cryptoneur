from common import load_env
import os
import httpx

from models_clerk import (
    CreateClerkOrganizationParams,
    CreateClerkOrganizationResponse,
)
from models_db import User

load_env()


class Clerk:
    def __init__(self):
        CLERK_SECRET_KEY = os.getenv("CLERK_SECRET_KEY")

        if not CLERK_SECRET_KEY:
            raise ValueError("CLERK_SECRET_KEY is not set")

        self.headers = {
            "Authorization": f"Bearer {CLERK_SECRET_KEY}",
        }

        self.api_url = "https://api.clerk.com/v1"

    async def get_user_by_email(self, email_address: str) -> User:
        params = {"email_address": [email_address]}

        async with httpx.AsyncClient() as client:
            response = await client.get(
                f"{self.api_url}/users/", headers=self.headers, params=params
            )

            data = response.json()

            if len(data) == 0:
                raise ValueError(f"User with email {email_address} not found")

            user = data[0]

            return User(
                id=user["id"],
                first_name=user["first_name"],
                last_name=user["last_name"],
                image_url=user["image_url"],
                has_image=user["has_image"],
                primary_email_address=user["email_addresses"][0]["email_address"],
                primary_phone_number=None,
            )

    async def create_organization(
        self, params: CreateClerkOrganizationParams
    ) -> CreateClerkOrganizationResponse:
        async with httpx.AsyncClient() as client:
            existing_orgainzation = await client.get(
                f"{self.api_url}/organizations/",
                headers=self.headers,
                params={"query": params.slug},
            )

            existing_orgainzation = existing_orgainzation.json()

            existing_orgainzation = existing_orgainzation.get("data", [])

            if len(existing_orgainzation) > 0:
                print("Organization already exists")
                return CreateClerkOrganizationResponse(**existing_orgainzation[0])

            response = await client.post(
                f"{self.api_url}/organizations",
                headers=self.headers,
                json=params.model_dump(),
            )

            return CreateClerkOrganizationResponse(**response.json())


# async def main():
#     clerk = Clerk()

#     user = await clerk.get_user_by_email("felix.vemmer@gmail.com")

#     params = CreateClerkOrganizationParams(
#         name="Moonbeam Foundation Grants",
#         created_by="user_2f08VBgdLEg9eLIk3yfp5vkYKsW",
#         slug="moonbeam-foundation-grants",
#     )

#     created_organization = await clerk.create_organization(organization)


# if __name__ == "__main__":
#     asyncio.run(main())
