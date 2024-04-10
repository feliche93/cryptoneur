from typing import List, Optional
import instructor
from openai import BaseModel, OpenAI
from pydantic import Field
from pydantic_core import Url
from scraper import (
    ScrapeWebsiteRequest,
    convert_content_to_markdown,
    get_website_content,
)


response = await get_website_content(
    ScrapeWebsiteRequest(url="https://aavegrants.org/")
)

response.bodyText

markdown = convert_content_to_markdown(response.bodyText)


class Grant(BaseModel):
    """
    A Pydantic model representing a web3 grant.
    """

    # id: str = Field(
    #     description="Unique identifier for the grant.", examples=["123", "abc"]
    # )
    name: str = Field(
        ...,
        description="The name of the grant.",
        examples=["Blockchain Innovation Grant", "Crypto Development Fund"],
    )
    description: Optional[str] = Field(
        None,
        description="A brief description of the grant.",
        examples=[
            "This grant supports innovative projects in the blockchain space.",
            "Funding for early-stage crypto startups.",
        ],
    )
    active: bool = Field(
        description="Indicates whether the grant is currently active.",
        examples=[True, False],
    )
    url_application: Optional[Url] = Field(
        None,
        description="The URL to apply for the grant.",
        examples=["https://www.example.com/apply", "https://www.grants.org/submit"],
    )
    url_info: Optional[Url] = Field(
        None,
        description="The URL for more information about the grant.",
        examples=["https://www.example.com/info", "https://www.grants.org/about"],
    )
    content: Optional[str] = Field(
        None,
        description="Additional content or details about the grant.",
        examples=[
            "Eligibility criteria, application process, etc.",
            "Requirements, deadlines, and contact information.",
        ],
    )
    slug: str = Field(
        description="A slug for the grant, typically used in URLs.",
        examples=["blockchain-innovation-grant", "crypto-development-fund"],
    )
    funding_minimum: Optional[float] = Field(
        None,
        description="The minimum funding amount available.",
        examples=[1000.0, 5000.0],
    )
    funding_maximum: Optional[float] = Field(
        None,
        description="The maximum funding amount available.",
        examples=[50000.0, 100000.0],
    )
    funding_minimum_currency: Optional[str] = Field(
        None,
        description="The currency of the minimum funding amount.",
        examples=["USD", "EUR"],
    )
    funding_maximum_currency: Optional[str] = Field(
        None,
        description="The currency of the maximum funding amount.",
        examples=["USD", "EUR"],
    )
    github: Optional[str] = Field(
        None,
        description="The GitHub URL related to the grant.",
        examples=[
            "https://github.com/example/project",
            "https://github.com/innovate/crypto",
        ],
    )
    discord: Optional[str] = Field(
        None,
        description="The Discord server URL for community or support related to the grant.",
        examples=["https://discord.gg/example", "https://discord.gg/crypto"],
    )
    telegram: Optional[str] = Field(
        None,
        description="The Telegram group URL for updates or discussions related to the grant.",
        examples=["https://t.me/example", "https://t.me/crypto_updates"],
    )
    website: Optional[Url] = Field(
        None,
        description="The official website URL for the grant.",
        examples=["https://www.example.com", "https://www.blockchaininnovation.org"],
    )
    logo: Optional[str] = Field(
        None,
        description="The URL of the grant's logo image.",
        examples=[
            "https://www.example.com/logo.png",
            "https://www.blockchaininnovation.org/logo.png",
        ],
    )
    twitter: Optional[str] = Field(
        None,
        description="The Twitter handle or URL for the grant.",
        examples=["https://twitter.com/example", "https://twitter.com/crypto_innovate"],
    )


class Grants(BaseModel):
    """
    A Pydantic model representing a list of web3 grants.
    """

    grants: List[Grant] = Field(description="A list of web3 grants.")


client = instructor.patch(OpenAI())

grant: Grant = client.chat.completions.create(
    max_retries=2,
    model="gpt-4-0125-preview",
    messages=[
        {"role": "system", "content": "Extract the grant infos from this website:"},
        {"role": "user", "content": markdown},
    ],
    response_model=Grant,  # type: ignore
)

grant_list: Grants = client.chat.completions.create(
    max_retries=2,
    model="gpt-4-0125-preview",
    messages=[
        {"role": "system", "content": "List the web3 grants from the webpage."},
        {"role": "user", "content": markdown},
    ],
    response_model=Grants,  # type: ignore
)
