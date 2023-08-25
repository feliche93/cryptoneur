import { ZodObject, z } from 'zod';
import { superValidate } from 'sveltekit-superforms/server';
import { fail } from '@sveltejs/kit';
import { scrapeWebsite } from '$server/scrape-website';
import { ChatOpenAI } from "langchain/chat_models/openai";
import { createExtractionChainFromZod } from "langchain/chains";
import { redirect } from "@sveltejs/kit";

const SField = z.object({
    name: z.string().nonempty(),
    description: z.string(),
    dataType: z.string().refine(value => ['text', 'number', 'date', 'boolean'].includes(value), {
        message: 'Invalid data type. Allowed values are: text, number, date, boolean',
    }),
});


const SFormData = z.object({
    url: z.string().url(),
    fields: z.array(SField),
});

export type TFormData = z.infer<typeof SFormData>;



interface TField {
    name: string;
    dataType: string;
    description: string;
}

function createZodSchema(fields: TField[]) {
    let schema: ZodObject<any> = z.object({});

    fields.forEach(field => {
        const name = field.name;

        switch (field.dataType) {
            case "text":
                schema = schema.extend({
                    [name]: z.string().nonempty().describe(field.description || ''),
                });
                break;
            case "number":
                schema = schema.extend({
                    [name]: z.number().describe(field.description || ''),
                });
                break;
            case "boolean":
                schema = schema.extend({
                    [name]: z.boolean().describe(field.description || ''),
                });
                break;
            case "date":
                schema = schema.extend({
                    [name]: z.date().describe(field.description || ''),
                });
                break;
            default:
                throw new Error(`Unsupported data type: ${field.dataType}`);
        }
    });

    return schema;
}



export const load = async ({ locals }) => {
    const form = await superValidate(SFormData);
    const { user } = await locals.auth.validateUser();
    if (!user) throw redirect(302, "/sign-in");

    return { form, user };
};

export const actions = {
    default: async ({ request }) => {
        const form = await superValidate(request, SFormData);

        if (!form.valid) {
            return fail(400, { form });
        }

        // Extract the url from the validated data
        const url = form.data.url;

        // Use the scrapeWebsite function to scrape the website
        const data = await scrapeWebsite({ url });

        console.log({ bodyText: data.bodyText });


        const chatModel = new ChatOpenAI({
            modelName: "gpt-3.5-turbo-0613",
            temperature: 0,
        });

        const schema = createZodSchema(form.data.fields);

        const chain = createExtractionChainFromZod(schema, chatModel);

        const result = await chain.run(data.bodyText);

        // console.log({ data });

        // If the status is 'SUCCESS', return the HTML content in a pre tag
        return {
            form,
            websiteData: data,
            result,
        };
    }
};
