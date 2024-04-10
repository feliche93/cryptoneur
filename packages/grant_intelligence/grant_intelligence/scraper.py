"""
This module contains functions for web scraping,
including converting HTML content to BeautifulSoup objects and markdown,
and getting website content using playwright.
"""

from bs4 import BeautifulSoup
from html2text import HTML2Text
from playwright.async_api import async_playwright
from pydantic import BaseModel, Field
from typing import Optional


def convert_content_to_soup(content: str) -> BeautifulSoup:
    """Convert html content to soup

    Args:
        content (str): html content

    Returns:
        BeautifulSoup: soup
    """
    soup = BeautifulSoup(content, "html.parser")
    return soup


def convert_content_to_markdown(content: str) -> str:
    """
    Convert HTML content to markdown format.

    Args:
        content (str): The HTML content to be converted.

    Returns:
        str: The converted markdown content.
    """

    text_maker = HTML2Text()
    text_maker.ignore_links = False
    text_maker.ignore_images = True
    markdown = text_maker.handle(content)
    return markdown


class ScrapeWebsiteRequest(BaseModel):
    """
    A Pydantic model representing the request schema for scraping a website.
    """

    url: str = Field(description="The URL of the website to be scraped.")


class WebsiteContentOutputSchema(BaseModel):
    """
    A Pydantic model representing the output schema for website content.
    """

    bodyText: str = Field(description="The body text of the website.")
    pageTitle: str = Field(description="The title of the webpage.")
    metaTitle: Optional[str] = Field(None, description="The meta title of the webpage.")
    metaDescription: Optional[str] = Field(
        None, description="The meta description of the webpage."
    )
    metaImageUrl: Optional[str] = Field(
        None, description="The meta image URL of the webpage."
    )
    faviconImageUrl: Optional[str] = Field(
        None, description="The favicon image URL of the webpage."
    )
    url: str = Field(description="The URL of the webpage.")
    keyword: Optional[str] = Field(
        None, description="The keyword to be searched on the website."
    )


async def get_website_content(
    request: ScrapeWebsiteRequest,
) -> WebsiteContentOutputSchema:
    """Use this to get the text content of a website."""
    url = request.url
    async with async_playwright() as p:  # pylint: disable=invalid-name
        # can be used for local debugging in jupyter notebook
        # p = await async_playwright().start()
        # browser = await p.chromium.launch(headless=False)

        browser = await p.chromium.launch()
        page = await browser.new_page()

        print(f"Goto {url}")
        await page.goto(url=url, timeout=5000)
        # get page content
        content = await page.content()

        await browser.close()

        # parse with BeautifulSoup
        soup = convert_content_to_soup(content)

        # body_text
        body_text = convert_content_to_markdown(content=content)

        # page_title
        title_tag = soup.find("title")
        page_title = title_tag.text if title_tag else None

        # meta_title
        meta_title = soup.find("meta", property="og:title")
        meta_title = meta_title["content"] if meta_title else None  # type: ignore

        # meta_description
        meta_description = soup.find("meta", property="og:description")
        meta_description = meta_description["content"] if meta_description else None  # type: ignore

        # meta_image_url
        meta_image_url = soup.find("meta", property="og:image")
        meta_image_url = meta_image_url["content"] if meta_image_url else None  # type: ignore

        # favicon_image_url
        favicon_image_url = soup.find("link", rel="icon")
        favicon_image_url = (
            url + favicon_image_url["href"] if favicon_image_url else None  # type: ignore
        )

    print(f"Crawled {url}")

    return WebsiteContentOutputSchema(
        keyword=None,
        bodyText=body_text,
        pageTitle=page_title,  # type: ignore
        metaTitle=meta_title,  # type: ignore
        metaDescription=meta_description,  # type: ignore
        metaImageUrl=meta_image_url,  # type: ignore
        faviconImageUrl=favicon_image_url,  # type: ignore
        url=url,
    )
