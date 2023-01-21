// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { Database } from '@lib/database.types'
import { createServerComponentSupabaseClient, createServerSupabaseClient } from '@supabase/auth-helpers-nextjs'
import { createBrowserClient } from '@utils/supabase-browser'
import { createServerClient } from '@utils/supabase-server'
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
    name: string
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {

    const supabaseServerClient = createServerSupabaseClient<Database>(

        {
            req,
            res,
        },
        {
            supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL,
            supabaseKey: process.env.SUPABASE_SERVICE_ROLE_KEY,
        }
    )

    const body = req.body

    const { eventId, createdAt, data } = body
    const { responseId, submissionId, formId, formName, fields } = data

    let fundingMinimumCurrencyId = fields.filter((field: any) => field.label === 'Funding Minimum Currency')[0].value
    let fundingMaximumCurrencyId = fields.filter((field: any) => field.label === 'Funding Maximum Currency')[0].value
    let grantBlockchainValues = fields.filter((field: any) => field.label === 'Grant Blockchains')[0].value
    let grantCategoryValues = fields.filter((field: any) => field.label === 'Grant Categories')[0].value
    let grantUseCases = fields.filter((field: any) => field.label === 'Grant Use Cases')[0].value

    const grant = {
        name: fields.filter((field: any) => field.label === 'Name')[0].value,
        logo: fields.filter((field: any) => field.type === 'FILE_UPLOAD')[0].value[0].url,
        description: fields.filter((field: any) => field.label === 'Description')[0].value,
        funding_minimum: fields.filter((field: any) => field.label === 'Funding Minimum')[0].value,
        funding_maximum: fields.filter((field: any) => field.label === 'Funding Maximum')[0].value,
        funding_minimum_currency: fields.filter((field: any) => field.label === 'Funding Minimum Currency')[0].options.filter((option: any) => option.id === fundingMinimumCurrencyId)[0].text,
        funding_maximum_currency: fields.filter((field: any) => field.label === 'Funding Maximum Currency')[0].options.filter((option: any) => option.id === fundingMaximumCurrencyId)[0].text,
        url_info: fields.filter((field: any) => field.label === 'Link Grant Info')[0].value,
        url_application: fields.filter((field: any) => field.label === 'Link Grant Application')[0].value,
        // blockchains: fields.filter((field: any) => field.label === 'Grant Blockchains')[0].options.filter((option: any) => grantBlockchainValues.includes(option.id)).map((option: any) => option.text),
        // categories: fields.filter((field: any) => field.label === 'Grant Categories')[0].options.filter((option: any) => grantCategoryValues.includes(option.id)).map((option: any) => option.text),
        // use_cases: fields.filter((field: any) => field.label === 'Grant Use Cases')[0].options.filter((option: any) => grantUseCases.includes(option.id)).map((option: any) => option.text),
        discord: fields.filter((field: any) => field.label === 'Discord')[0].value,
        twitter: fields.filter((field: any) => field.label === 'Twitter')[0].value,
        telegram: fields.filter((field: any) => field.label === 'Telegram')[0].value,
        github: fields.filter((field: any) => field.label === 'GitHub')[0].value,
    }


    if (!!grant?.logo) {

        // retrieve logo url as file body
        const logo = await fetch(grant.logo)
        const logoBlob = await logo.blob()
        const logoMimeType = logoBlob.type
        const logoName = `${grant?.name}.${logoMimeType.split('/')[1]}`

        // upload logo to supabase storage
        const { data: logoData, error: logoError } = await supabaseServerClient.storage.from('grant-logos').upload(logoName, logoBlob, {
            contentType: logoMimeType,
            upsert: true,
        })

        // get public url for logo
        const { data: { publicUrl } } = await supabaseServerClient.storage.from('grant-logos').getPublicUrl(logoName)

        grant.logo = publicUrl
    }

    if (!!grant?.funding_minimum && !!grant?.funding_maximum) {
        const { data: fiats, error: fiatsError } = await supabaseServerClient.from('fiats').select('*').in('symbol', [grant.funding_minimum_currency, grant.funding_maximum_currency])
        const fiatMinimum = fiats && fiats.filter((fiat: any) => fiat.symbol === grant.funding_minimum_currency)[0]
        const fiatMaximum = fiats && fiats.filter((fiat: any) => fiat.symbol === grant.funding_maximum_currency)[0]

        grant.funding_minimum_currency = fiatMinimum?.id
        grant.funding_maximum_currency = fiatMaximum?.id
    }

    const { data: grantResponse, error: grantResponseError } = await supabaseServerClient.from('grants').upsert({
        ...grant,
        active: true,
        content: ''
    })


    // console.log({ logoData, logoError, logoBlob, logoMimeType, logoName })

    console.log({ grantResponse, grantResponseError })
    console.log({ ...grant })

    // console.log({ ...body })
    res.status(200).json({ name: 'John Doe' })
}
