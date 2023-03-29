"server-only"

import { Directus } from "@directus/sdk";
import { notFound } from "next/navigation";
import { cache } from "react";
import { DirectusCollections } from "./directus-collections";

const directus = new Directus<DirectusCollections>(
    process.env.NEXT_PUBLIC_DIRECTUS_URL || "http://localhost:8055",
);

// Preload function
export const preload = (slug: string, lang: string) => {
    void fetchPageData(slug, lang);
};

// Cache function for fetching page data
export const fetchPageData = cache(async (slug: string, lang: string) => {
    const { data: pages } = await directus.items('pages_translations').readByQuery({
        fields: ['*'],
        filter: {
            _and: [
                {
                    slug: {
                        _starts_with: slug ? slug : 'home',
                    },
                },
                {
                    languages_code: {
                        _starts_with: lang,
                    },
                },
            ],
        },
    });

    if (!pages?.length) {
        notFound();
    }

    const [page] = pages;

    if (!page.pages_id) {
        notFound();
    }

    const pageData = await directus.items('pages').readOne(page.pages_id, {
        fields: ['id', 'content.collection', 'content.id', 'content.item'],
    });

    if (!pageData || pageData?.content === undefined) {
        notFound();
    }

    return pageData;
});

export default directus;