from playwright.async_api import async_playwright
import asyncio
from typing import List, Optional
import itertools
import requests

import pandas as pd
from pydantic import BaseModel, Field, validator
from kor import extract_from_documents, from_pydantic, create_extraction_chain
from kor.documents.html import MarkdownifyHTMLProcessor
from langchain.chat_models import ChatOpenAI
from langchain.schema import Document
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain.callbacks import get_openai_callback


async def a_download_html(url: str, extra_sleep: int) -> str:
    """Download an HTML from a URL.

    In some pathological cases, an extra sleep period may be needed.
    """

    async with async_playwright() as p:
        # p =
        browser = await p.chromium.launch(headless=True)
        page = await browser.new_page()
        await page.goto(url, wait_until="load")
        if extra_sleep:
            await asyncio.sleep(extra_sleep)
        html_content = await page.locator('xpath=//div[@id="notion-app"]').inner_html()
    return html_content


async def run():
    test_url = "https://poolgrants.org/166344b329804210908b0057c381f289?v=82322e9175b7426b88eae648598e3941"

    html = await a_download_html(test_url, 0)


# Using gpt-3.5-turbo which is pretty cheap, but has worse quality
llm = ChatOpenAI(temperature=0)

doc = Document(page_content=html)

md = MarkdownifyHTMLProcessor().process(doc)
split_docs = RecursiveCharacterTextSplitter().split_documents([md])
print(split_docs[-1].page_content)


class GrantApplication(BaseModel):
    name: str = Field(
        description="The name of the funded grant project",
    )
    description: str = Field(
        description="Description about what the grant or the application is about.",
    )
    # year: Optional[str] = Field(
    #     description="Year when the movie / tv show was released",
    # )
    # latest_episode: Optional[str] = Field(
    #     description="Date when the latest episode was released",
    # )
    # link: Optional[str] = Field(description="Link to the movie / tv show.")

    # rating -- not included because rating on rottentomatoes is in the html elements
    # you could try extracting it by using the raw HTML (rather than markdown)
    # or you could try doing something similar on imdb

    # @validator("name")
    # def name_must_not_be_empty(cls, v):
    #     if not v:
    #         raise ValueError("Name must not be empty")
    #     return v


schema, extraction_validator = from_pydantic(
    GrantApplication,
    description="Extract information about grant applications their name, and description.",
    examples=[
        (
            "[Rain Dogs Latest Episode: Apr 03](/tv/rain_dogs)",
            {"name": "Rain Dogs", "latest_episode": "Apr 03", "link": "/tv/rain_dogs"},
        )
    ],
    many=True,
)

chain = create_extraction_chain(
    llm,
    schema,
    encoder_or_encoder_class="csv",
    validator=extraction_validator,
    input_formatter="triple_quotes",
)

with get_openai_callback() as cb:
    document_extraction_results = await extract_from_documents(
        chain, split_docs, max_concurrency=1, use_uid=False, return_exceptions=True
    )
    print(f"Total Tokens: {cb.total_tokens}")
    print(f"Prompt Tokens: {cb.prompt_tokens}")
    print(f"Completion Tokens: {cb.completion_tokens}")
    print(f"Successful Requests: {cb.successful_requests}")
    print(f"Total Cost (USD): ${cb.total_cost}")
