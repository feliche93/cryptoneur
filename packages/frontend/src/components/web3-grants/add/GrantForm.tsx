'use client'

import { InputCheckbox } from '@components/shared/InputCheckbox'
import { InputNumber } from '@components/shared/InputNumber'
import { InputReactSelect } from '@components/shared/InputReactSelect'
import { InputSelect } from '@components/shared/InputSelect'
import { InputText } from '@components/shared/InputText'
import { InputTextArea } from '@components/shared/InputTextArea'
import { useSupabase } from '@components/supabase-provider'
import { Database } from '@lib/database.types'
import { Form } from '@shared/Form'
import { useRouter } from 'next/navigation'
import path from 'path'
import { FC, useState } from 'react'
import { FieldValues, SubmitHandler } from 'react-hook-form'
import { toast } from 'react-hot-toast'
import * as z from 'zod'

const grantSchema = z
  .object({
    name: z.string().trim(), //.min(2),
    description: z.string().trim(), // min(120),
    funding_minimum: z.number().optional(),
    funding_minimum_currency: z
      .object({
        label: z.string(),
        value: z.number(),
      })
      .optional()
      .nullable()
      .nullish(),
    // funding_maximum: z.number().optional(),
    // funding_maximum_currency: z
    //   .object({
    //     label: z.string(),
    //     value: z.string(),
    //   })
    //   .optional(),
    url_application: z.union([z.literal(''), z.string().trim().url()]), // z.string().url(),
    url_info: z.union([z.literal(''), z.string().trim().url()]), // z.string().url(),
    twitter: z.union([
      z.literal(''),
      z
        .string()
        .trim()
        .url()
        .regex(/^https:\/\/twitter\.com\/[a-zA-Z0-9_]+$/),
    ]),
    discord: z.union([
      z.literal(''),
      z
        .string()
        .trim()
        .url()
        .regex(/^https:\/\/discord\.com\/invite\/[a-zA-Z0-9]+$/),
    ]),
    website: z.union([z.literal(''), z.string().trim().url()]),
    telegram: z.union([
      z.literal(''),
      z
        .string()
        .trim()
        .url()
        .regex(/^https:\/\/t\.me\/[a-zA-Z0-9_]+$/),
    ]),
    github: z.union([
      z.literal(''),
      z
        .string()
        .trim()
        .url()
        .regex(/^https:\/\/github\.com\/[a-zA-Z0-9_-]+$/),
    ]),
    // grant_blockchains,
  })
  .refine(
    (input) => input.funding_minimum_currency !== undefined || input.funding_minimum === undefined,
    {
      message: 'A currency needs to be selected if funding minimum is set.',
      path: ['funding_minimum_currency'],
    },
  )

// .superRefine(({ funding_minimum, funding_minimum_currency }, ctx) => {
//   console.log(funding_minimum !== undefined)
//   console.log(funding_minimum_currency === undefined)
//   if (funding_minimum !== undefined && funding_minimum_currency !== undefined && isNaN(funding_minimum_currency)) {
//     ctx.addIssue({
//       code: z.ZodIssueCode.custom,
//       message: 'A currency needs to be selected if funding minimum is set.',
//       path: ['funding_minimum_currency'],
//     })
//   }
//   return true
// })

type ProfileSchema = z.infer<typeof grantSchema>

interface GrantFormProps {
  // any or null
  blockchains: Database['public']['Tables']['blockchains']['Row'][] | null
  categories: Database['public']['Tables']['categories']['Row'][] | null
  use_cases: Database['public']['Tables']['use_cases']['Row'][] | null
  grant_blokchains: Database['public']['Tables']['grant_blockchains']['Row'][] | null
  grant_categories: Database['public']['Tables']['grant_categories']['Row'][] | null
  grant_use_cases: Database['public']['Tables']['grant_use_cases']['Row'][] | null
  fiats: Database['public']['Tables']['fiats']['Row'][] | null
  title: string
  description: string
}

export const GrantForm: FC<GrantFormProps> = ({
  blockchains,
  categories,
  use_cases,
  grant_blokchains,
  grant_categories,
  grant_use_cases,
  title,
  description,
  fiats,
}) => {
  const [isLoading, setIsLoading] = useState(false)

  const router = useRouter()
  const { supabase, session } = useSupabase()

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    if (!session) {
      // console.log('no session')
      return
    }
    // const { user } = session
    // console.log({ user })
    // console.log({ ...data, user_id: user?.id, country_id: parseInt(data?.country_id) })

    // const { data: profiles, error } = await supabase.from('profiles').upsert(
    //   {
    //     ...data,
    //     user_id: user?.id,
    //     country_id: parseInt(data?.country_id),
    //   },
    //   {
    //     onConflict: 'user_id',
    //   },
    // )

    // router.refresh()

    // if (error) {
    //   toast.error('Error saving your data')
    //   console.log({ error })
    //   return
    // }

    toast.success('Your data was successfully saved')

    router.refresh()

    console.log({ data })

    // supabase.from('profiles').update(data).match({ id: session?.user?.id })
  }

  // return <h1>Hello</h1>

  return (
    <>
      <Form title={title} description={description} schema={grantSchema} onSubmit={onSubmit}>
        <InputText
          primaryLabel="Name *"
          placeholder="Aweseom Grant Name"
          id="name"
          type="text"
          className="col-span-6 sm:col-span-3"
        />
        <InputTextArea
          primaryLabel="Description *"
          id="description"
          placeholder="Short grant Description not more than two sentences"
          className="col-span-6 sm:col-span-6"
        />
        <InputNumber
          primaryLabel="Funding Minimum"
          placeholder="100"
          id="funding_minimum"
          className="col-span-6 sm:col-span-3"
        />
        <InputReactSelect
          primaryLabel="Funding Minimum Currency"
          id="funding_minimum_currency"
          options={fiats?.map((fiat) => ({
            label: fiat.symbol,
            value: fiat.id,
          }))}
          className="col-span-1 sm:col-span-3"
        />
        {/* <InputNumber
          primaryLabel="Funding Maximum"
          placeholder="100"
          id="funding_maximum"
          className="col-span-6 sm:col-span-3"
        />
        <InputReactSelect
          primaryLabel="Funding Maximum Currency"
          id="funding_maximum_currency"
          options={fiats?.map((fiat) => ({
            label: fiat.symbol,
            value: fiat.id,
          }))}
          className="col-span-1 sm:col-span-3"
        /> */}
        <InputText
          primaryLabel="Link Grant Application *"
          // placeholder="10000"
          id="url_application"
          type="url"
          className="col-span-6 sm:col-span-3"
        />
        <InputText
          primaryLabel="Link Application Info *"
          // placeholder="10000"
          id="url_info"
          type="url"
          className="col-span-6 sm:col-span-3"
        />
        <InputText
          primaryLabel="Twitter"
          placeholder="https://twitter.com/username"
          id="twitter"
          type="url"
          className="col-span-6 sm:col-span-3"
        />
        <InputText
          primaryLabel="Discord"
          placeholder="https://discord.com/invite/invitationcode"
          id="discord"
          type="url"
          className="col-span-6 sm:col-span-3"
        />
        <InputText
          primaryLabel="Website"
          placeholder="https://www.example.com"
          id="website"
          type="url"
          className="col-span-6 sm:col-span-3"
        />
        <InputText
          primaryLabel="Telegram"
          placeholder="https://t.me/username"
          id="telegram"
          type="url"
          className="col-span-6 sm:col-span-3"
        />
        <InputText
          primaryLabel="Github"
          placeholder="https://github.com/username"
          id="github"
          type="url"
          className="col-span-6 sm:col-span-3"
        />
        {/* <InputReactSelect
          primaryLabel="Blockchain"
          id="grant_blockchains"
          options={blockchains?.map((blockchain) => ({
            label: blockchain.name,
            value: blockchain.id,
          }))}
          className="col-span-6 sm:col-span-3"
        /> */}
      </Form>
    </>
  )
}
