import { NextResponse } from 'next/server';
import { z } from "zod"

export const schema = z.object({
    body: z.object({
        event: z.string(),
        accountability: z.object({ user: z.string(), role: z.string() }),
        payload: z.object({}).deepPartial(),
        keys: z.array(z.number()),
        collection: z.string()
    })
})

export async function POST(request: Request) {

    const body = await request.json();

    // const res = await fetch('https://data.mongodb-api.com/...', {
    //     method: 'POST',
    //     headers: {
    //         'Content-Type': 'application/json',
    //         'API-Key': process.env.DATA_API_KEY,
    //     },
    //     body: JSON.stringify({ time: new Date().toISOString() }),
    // });

    // const data = await res.json();

    // const { payload } = body

    console.log(JSON.stringify({ body }));



    return NextResponse.json(body);
}
