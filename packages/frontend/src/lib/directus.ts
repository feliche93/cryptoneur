'server-only'

import { Directus } from '@directus/sdk'
import { notFound } from 'next/navigation'
import { cache } from 'react'
import { DirectusCollections } from './directus-collections'
import type { Metadata } from 'next'
import { getAssetUrl } from './utils'
import { z } from 'zod'

// SEO Schema
const DirectusFilesIdSchema = z.object({
    id: z.string(),
    width: z.number(),
    height: z.number(),
    title: z.string(),
})

const keywordsSchema = z.object({
    keyword: z.string(),
})

const TranslationSchema = z.object({
    title: z.string(),
    description: z.string(),
    keywords: z
        .array(keywordsSchema)
        .nullable()
        .transform((value) => value?.map((keyword) => keyword.keyword) || []),
})

const OpenGraphImageSchema = z.object({
    directus_files_id: DirectusFilesIdSchema,
})

const SeoSchema = z.object({
    id: z.number(),
    translations: z
        .array(TranslationSchema)
        .min(1)
        .transform((value) => value?.[0] || null),
    open_graph_images: z
        .array(OpenGraphImageSchema)
        .min(1)
        .transform((value) => value?.map((image) => image.directus_files_id) || []),
})

export type OpenGraphImage = z.infer<typeof OpenGraphImageSchema>

const directus = new Directus<DirectusCollections>(
    process.env.NEXT_PUBLIC_DIRECTUS_URL || 'http://localhost:8055',
)

// Preload function
// export const preload = (slug: string, lang: string) => {
//     void fetchPageData(slug, lang)
// }

type GetMetadataParams = {
    id: string | number
    lang: string
}

export const getMetaData = cache(async (params: GetMetadataParams) => {
    const { id, lang } = params

    const data = await directus.items('seo').readOne(id, {
        fields: [
            'id',
            'translations.title',
            'translations.description',
            'translations.keywords',
            'open_graph_images.directus_files_id.id',
            'open_graph_images.directus_files_id.width',
            'open_graph_images.directus_files_id.height',
            'open_graph_images.directus_files_id.title',
        ],
        deep: {
            translations: {
                _filter: {
                    languages_code: {
                        _starts_with: lang,
                    },
                },
            },
        },
    })

    const parsedData = SeoSchema.parse(data)

    const { title, description, keywords } = parsedData.translations

    const openGraphImages = parsedData.open_graph_images.map((image) => {
        return {
            url: getAssetUrl(image.id),
            width: image.width,
            height: image.height,
            alt: image.title,
        }
    })

    const twitter: Metadata['twitter'] = {
        card: 'summary_large_image',
        title,
        description,
        images: openGraphImages,
    }

    const openGraph: Metadata['openGraph'] = {
        title,
        description,
        images: openGraphImages,
        locale: lang,
    }

    const metadata: Metadata = {
        title,
        description,
        keywords: keywords.length ? keywords : undefined,
        openGraph,
        twitter,
    }

    return metadata
})


const ContentSchema = z.object({
    collection: z.string(),
    item: z.string(),
});

const PagesIdSchema = z.object({
    content: z.array(ContentSchema),
    seo: z.number(),
});

const PagesTranslationsSchema = z.array(
    z.object({
        id: z.number(),
        languages_code: z.string(),
        slug: z.string(),
        pages_id: PagesIdSchema,
    }),
).min(1);

type getPageDataParams = {
    slug: string
    lang: string
}

// Cache function for fetching page data
export const getPageData = cache(async (params: getPageDataParams) => {

    const { slug, lang } = params

    const { data } = await directus.items('pages_translations').readByQuery({
        fields: ['*', 'pages_id.content.collection', 'pages_id.content.item', 'pages_id.seo'],
        filter: {
            _and: [
                {
                    languages_code: {
                        _starts_with: lang,
                    },
                },
                {
                    slug: {
                        _eq: slug,
                    },
                },
            ],
        },
    })

    const pages = PagesTranslationsSchema.parse(data)

    const [page] = pages

    return page
})

export const generatePageStaticParams = async () => {
    const { data: allPages } = await directus.items('pages').readByQuery({
        fields: ['translations.languages_code', 'translations.slug', 'status'],
        filter: {
            status: {
                _eq: 'published',
            },
        },
    })

    if (!allPages?.length) {
        notFound()
    }

    const urls = [] as { slug: string; lang: string }[]

    allPages.forEach((page) => {
        if (page.translations) {
            page.translations.forEach((translation) => {
                if (typeof translation !== 'number') {
                    if (!translation.languages_code || !translation.slug) {
                        return
                    }
                    urls.push({
                        slug: translation.slug,
                        lang: translation.languages_code?.split('-')[0],
                    })
                }
            })
        }
    })

    return urls
}

export function isObject(value: any): value is Record<string, unknown> {
    return typeof value === 'object' && value !== null
}

export default directus
