'use client'

import { InputFile } from '@components/shared/InputFile'
import { InputNumber } from '@components/shared/InputNumber'
import { InputReactSelect } from '@components/shared/InputReactSelect'
import { InputText } from '@components/shared/InputText'
import { InputTextArea } from '@components/shared/InputTextArea'
import { useSupabase } from '@components/supabase-provider'
import { Database } from '@lib/database.types'
import { Form } from '@shared/Form'
import { useRouter } from 'next/navigation'
import { FC, useState } from 'react'
import { SubmitHandler } from 'react-hook-form'
import { toast } from 'react-hot-toast'
import * as z from 'zod'
import { AuthAlert } from '../AuthAlert'

const grantSchema = z
  .object({
    name: z.string().trim().min(2),
    image: z.instanceof(FileList).refine((v) => v.length > 0, {
      message: 'Please upload an image',
    }),
    description: z.string().trim().min(120),
    funding_minimum: z.number().optional(),
    funding_minimum_currency: z
      .object({
        label: z.string(),
        value: z.number(),
      })
      .optional()
      .nullable()
      .nullish(),
    funding_maximum: z.number().optional(),
    funding_maximum_currency: z
      .object({
        label: z.string(),
        value: z.number(),
      })
      .optional(),
    url_application: z.union([z.literal(''), z.string().trim().url()]), // z.string().url(),
    url_info: z.union([z.literal(''), z.string().trim().url()]), // z.string().url(),
    grant_blockchains: z.array(z.object({ label: z.string(), value: z.number() })).min(1),
    grant_use_cases: z.array(z.object({ label: z.string(), value: z.number() })).min(1),
    grant_categories: z.array(z.object({ label: z.string(), value: z.number() })).min(1),
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
  .refine(
    (input) => input.funding_maximum_currency !== undefined || input.funding_maximum === undefined,
    {
      message: 'A currency needs to be selected if funding maximum is set.',
      path: ['funding_maximum_currency'],
    },
  )

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

  const onSubmit: SubmitHandler<ProfileSchema> = async (data) => {
    if (!session) {
      // console.log('no session')
      return
    }

    console.log({ data })

    if (!!data.image && data.image.length === 0)
      return toast.error('Could not find image to upload.')

    const file = data.image[0]
    const fileName = file.name
    const fileOptions = {
      // upsert: true,
    }

    const { data: logoData, error: logoError } = await supabase.storage
      .from('grant-logos')
      .upload(fileName, file, fileOptions)

    if (logoError) {
      console.log('Error uploading logo', logoError)
      toast.error(`Error uploading image. ${logoError?.message}.`)
      return
    }

    console.log({ logoData })
    const {
      data: { publicUrl },
    } = await supabase.storage.from('grant-logos').getPublicUrl(fileName)

    const logo = publicUrl

    // const { data: grantData, error: grantError } = await supabase.from('grants').upsert({
    //   name: data.name,
    //   description: data.description,
    //   funding_minimum: data.funding_minimum,
    //   funding_minimum_currency: data.funding_minimum_currency?.value,
    //   funding_maximum: data.funding_maximum,
    //   funding_maximum_currency: data.funding_maximum_currency?.value,
    //   url_application: data.url_application,
    //   url_info: data.url_info,
    //   twitter: data.twitter,
    //   discord: data.discord,
    //   website: data.website,
    //   telegram: data.telegram,
    //   github: data.github,
    //   active: true,
    //   content: '',
    //   logo,
    // })

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

    // if (grantError) {
    //   toast.error('Error saving your data')
    //   console.log({ grantError })
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
          secondaryLabel="The official name of the grant."
        />
        <InputFile primaryLabel="Image *" id="image" className="col-span-6 sm:col-span-3" />
        <InputTextArea
          primaryLabel="Description *"
          id="description"
          placeholder="Short grant Description not more than two sentences"
          className="col-span-6 sm:col-span-6"
          secondaryLabel='A short description of the grant. This will be displayed on the grant card. If you want to add more information, you can do so in the "Grant Details" section.'
        />
        <InputNumber
          primaryLabel="Funding Minimum"
          placeholder="100"
          id="funding_minimum"
          className="col-span-6 sm:col-span-3"
          secondaryLabel="The minimum amount of funding the grant can receive. Leave blank if there is no minimum."
        />
        <InputReactSelect
          primaryLabel="Funding Minimum Currency"
          id="funding_minimum_currency"
          options={fiats?.map((fiat) => ({
            label: fiat.symbol,
            value: fiat.id,
          }))}
          className="col-span-6 sm:col-span-3"
        />
        <InputNumber
          primaryLabel="Funding Maximum"
          placeholder="100"
          id="funding_maximum"
          className="col-span-6 sm:col-span-3"
          secondaryLabel="The maximum amount of funding the grant can receive. Leave blank if there is no maximum."
        />
        <InputReactSelect
          primaryLabel="Funding Maximum Currency"
          id="funding_maximum_currency"
          options={fiats?.map((fiat) => ({
            label: fiat.symbol,
            value: fiat.id,
          }))}
          className="col-span-6 sm:col-span-3"
        />
        <InputText
          primaryLabel="Link Grant Application *"
          // placeholder="10000"
          id="url_application"
          type="url"
          className="col-span-6 sm:col-span-3"
          secondaryLabel="The link to the grant application. This can be a link to a Google Form, Typeform, or any other link that allows users to apply for the grant."
        />
        <InputText
          primaryLabel="Link Application Info *"
          // placeholder="10000"
          id="url_info"
          type="url"
          className="col-span-6 sm:col-span-3"
          secondaryLabel="The link to the grant application info. The link should point to dedicated info about the grant."
        />
        <InputReactSelect
          primaryLabel="Blockchains *"
          isMulti={true}
          id="grant_blockchains"
          options={blockchains?.map((blockchain) => ({
            label: blockchain.name,
            value: blockchain.id,
          }))}
          className="col-span-6 sm:col-span-3"
          secondaryLabel="The blockchains the grant is available on. If the grant is available on multiple blockchains, select all of them."
        />
        <InputReactSelect
          primaryLabel="Grant Use Cases *"
          isMulti={true}
          id="grant_use_cases"
          options={use_cases?.map((use_case) => ({
            label: use_case.name,
            value: use_case.id,
          }))}
          className="col-span-6 sm:col-span-3"
          secondaryLabel="The use cases the grant is available for. If the grant is available for multiple use cases, select all of them."
        />
        <InputReactSelect
          primaryLabel="Grant Categories *"
          isMulti={true}
          id="grant_categories"
          options={categories?.map((category) => ({
            label: category.name,
            value: category.id,
          }))}
          className="col-span-6 sm:col-span-3"
          secondaryLabel="The categories the grant is available for. If the grant is available for multiple categories, select all of them."
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
