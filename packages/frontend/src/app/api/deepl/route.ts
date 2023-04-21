import directus from '@lib/directus';
import { NextResponse } from 'next/server';
import { z } from "zod";

const apiKey = process.env.DEEPL_API_KEY;
const deepLUrl = 'https://api-free.deepl.com/v2/translate';
const directusApiKey = process.env.DIRECTUS_API_KEY;

const payloadSchema = z.object({
    event: z.string(),
    accountability: z.object({ user: z.string().uuid(), role: z.string().uuid() }),
    payload: z.object({
        languages_code: z.object({
            code: z.string().transform((code) => code.toUpperCase().slice(0, 2)),
        }),
        id: z.number(),
    }).passthrough().deepPartial(),
    // keys: z.array(z.number()),
    collection: z.string()
});

type Payload = z.infer<typeof payloadSchema>;

// Define the DeepL Translation Result schema
const translationResultSchema = z.object({
    translations: z.array(
        z.object({
            detected_source_language: z.string(),
            text: z.string(),
        })
    ),
});

type TranslationResult = z.infer<typeof translationResultSchema>;

const translate = async (
    text: string,
    sourceLang: string,
    targetLang: string
): Promise<string> => {

    const modifiedTargentLang = targetLang.slice(0, 2).toUpperCase();

    let body = `auth_key=${apiKey}&text=${encodeURIComponent(
        text
    )}&source_lang=${sourceLang}&target_lang=${modifiedTargentLang}`;

    if (modifiedTargentLang === 'DE') {
        body = `${body}&formality=less`
    }

    const response = await fetch(deepLUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body,
    });

    const jsonResponse = await response.json();
    // console.log(jsonResponse);

    const result = translationResultSchema.parse(jsonResponse);

    return result.translations[0].text;
};

const translateObject = async (
    obj: Record<string, string>,
    sourceLang: string,
    targetLang: string
): Promise<Record<string, string>> => {
    const translatedObj: Record<string, string> = {};

    for (const key in obj) {
        translatedObj[key] = await translate(obj[key], sourceLang, targetLang);
    }

    return translatedObj;
};

const getDirectusItemId = async (
    collection: string,
    targetLang: string
): Promise<number | null> => {
    const { data } = await directus.items(collection).readByQuery({
        fields: "id",
        filter: {
            languages_code: {
                _eq: targetLang
            }
        }
    })

    if (!data) {
        return null
    }

    if (data.length > 0) {
        return data[0].id
    }

    return null
}

const getExistingItemTranslation = async (
    collection: string,
    id: string | number
): Promise<Record<string, any>> => {
    const data = await directus.items(collection).readOne(id);

    if (!data) {
        throw new Error("No data found")
    }

    return data

}

export async function POST(request: Request) {

    const body = await request.json();
    // console.log(JSON.stringify({ body }));

    // Parse body
    const parsedBody = payloadSchema.parse(body)
    // console.log(JSON.stringify({ parsedBody }));


    const { payload, collection } = parsedBody;
    const { languages_code, id, ...keysToTranslate } = payload;

    const filteredKeysToTranslate = Object.entries(keysToTranslate).reduce<Record<string, any>>((acc, [key, value]) => {
        if (value !== null) {
            acc[key] = value;
        }
        return acc;
    }, {});


    if (
        languages_code === undefined ||

        languages_code.code !== 'EN') {
        console.log("Source language is not English");
        return NextResponse.json({ error: "Source language is not English" })
    }

    const sourceLang = languages_code.code;


    // SET API KEY FOR ADMIN ACCESS
    if (!directusApiKey) throw new Error("No Directus API key found")

    await directus.auth.static(directusApiKey)

    const targetLang = 'fr-FR'; // Replace with the desired target language code

    const targetId = await getDirectusItemId(parsedBody.collection, targetLang)

    if (targetId === null) {
        if (id === undefined) throw new Error("Target language not found, but id is defined")
        const existingTranslation = await getExistingItemTranslation(parsedBody.collection, id)
        const filteredExistingTranslation = Object.entries(existingTranslation).reduce<Record<string, any>>((acc, [key, value]) => {
            if (value !== null) {
                acc[key] = value;
            }
            return acc;
        }, {});

        const translatedKeys = await translateObject(filteredExistingTranslation, sourceLang, targetLang);
        const response = await directus.items("gas_fees_calculator_translations").createOne({
            ...translatedKeys,
            "id": undefined,
            "languages_code": {
                "code": targetLang
            }
        }
        )

        console.log(JSON.stringify({ response }));

        return NextResponse.json({ translatedKeys });
    }

    const existingTranslation = await getExistingItemTranslation(parsedBody.collection, targetId)

    const translatedKeys = await translateObject(filteredKeysToTranslate, sourceLang, targetLang);

    // Create an updated translation object with non-null values from translatedKeys
    const updatedTranslation = Object.entries(translatedKeys).reduce<Record<string, any>>((acc, [key, value]) => {
        if (value !== null && existingTranslation[key] === null) {
            acc[key] = value;
        }
        return acc;
    }, {});

    // console.log(JSON.stringify({ updatedTranslation }));

    const response = await directus.items(collection).updateOne(targetId, {
        ...updatedTranslation,
        "languages_code": {
            "code": targetLang
        }
    });

    console.log(JSON.stringify({ response }));

    return NextResponse.json(response);
}