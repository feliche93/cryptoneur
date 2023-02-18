'use client'

import { InputFile } from '@components/shared/InputFile'
import { InputNumber } from '@components/shared/InputNumber'
import { InputReactSelect } from '@components/shared/InputReactSelect'
import { InputText } from '@components/shared/InputText'
import { InputTextArea } from '@components/shared/InputTextArea'
import { useSupabase } from '@components/supabase-provider'
import { Database } from '@lib/database.types'
import { Form } from '@shared/Form'
import { usePathname, useRouter } from 'next/navigation'
import { FC, useState } from 'react'
import { SubmitHandler } from 'react-hook-form'
import { toast } from 'react-hot-toast'
import slugify from 'slugify'
import * as z from 'zod'

const IntegerPositiveOptional = z.number().int().positive().nullish()
const Option = z.object({
  label: z.string(),
  value: z.number(),
})

const Options = z.array(Option).min(1)

type Test = z.infer<typeof Option>

const grantSchema = z
  .object({
    name: z.string().trim().min(2),
    logo: z
      .custom<FileList>()
      // .refine((input) => typeof Array && input.length === 1, {
      //   message: 'Please select a file.',
      // })
      // .refine((input) => typeof Array && input[0].type.startsWith('image/'), {
      //   message: 'Please select an image.',
      // })
      .or(z.string().url()),
    description: z.string().trim().min(100),
    funding_minimum: IntegerPositiveOptional,
    funding_minimum_currency: Option.nullable(),
    funding_maximum: IntegerPositiveOptional,
    funding_maximum_currency: Option.nullable(),
    url_application: z.union([z.literal(''), z.string().trim().url()]), // z.string().url(),
    url_info: z.union([z.literal(''), z.string().trim().url()]), // z.string().url(),
    grant_blockchains: Options,
    grant_use_cases: Options,
    grant_categories: Options,
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

export type GrantSchema = z.infer<typeof grantSchema>

interface GrantFormProps {
  // any or null
  blockchains: Database['public']['Tables']['blockchains']['Row'][] | null
  categories: Database['public']['Tables']['categories']['Row'][] | null
  use_cases: Database['public']['Tables']['use_cases']['Row'][] | null
  fiats: Database['public']['Tables']['fiats']['Row'][] | null
  grant?: GrantSchema
  title: string
  description: string
}

export const GrantForm: FC<GrantFormProps> = ({
  blockchains,
  categories,
  use_cases,
  title,
  description,
  fiats,
  grant,
}) => {
  const pathname = usePathname()
  const router = useRouter()
  const { supabase } = useSupabase()

  const onSubmit: SubmitHandler<GrantSchema> = async (data) => {
    const { logo, funding_minimum_currency, funding_maximum_currency, ...restData } = data

    if (pathname?.endsWith('edit')) {
    } else {
      if (typeof data.logo === 'string') {
        toast.error('Could not find image to upload.')
        return
      }

      const { data: logoData, error: logoError } = await supabase.storage
        .from('grant-logos')
        .upload(data.logo[0].name, data.logo[0])

      if (logoError || !logoData) {
        console.log('Error uploading logo', logoError)
        toast.error(`Error uploading image. ${logoError?.message}.`)
        return
      }

      const {
        data: { publicUrl: logo },
      } = supabase.storage.from('grant-logos').getPublicUrl(data.logo[0].name)

      if (!logo) {
        toast.error('Could not find public URL from uploaded image.')
        return
      }

      const { data: grantData, error: grantError } = await supabase
        .from('grants')
        .upsert({
          ...restData,
          slug: slugify(data.name),
          active: true,
          content: '',
          logo,
        })
        .select('*')
        .maybeSingle()

      if (grantError || !grantData) {
        console.log('Error creating grant', grantError)
        toast.error(`Error creating grant. ${grantError?.message}.`)
        return
      }

      const grant_blockchains = data.grant_blockchains.map((item) => ({
        grant_id: grantData.id,
        blockchain_id: item.value,
      }))

      const grant_categories = data.grant_categories.map((item) => ({
        grant_id: grantData.id,
        category_id: item.value,
      }))

      const grant_use_cases = data.grant_use_cases.map((item) => ({
        grant_id: grantData.id,
        use_case_id: item.value,
      }))

      const { error: grantBlockchainsErrorDelete } = await supabase
        .from('grant_blockchains')
        .delete()
        .eq('grant_id', grantData.id)

      const { error: grantCategoriesErrorDelete } = await supabase
        .from('grant_categories')
        .delete()
        .eq('grant_id', grantData.id)

      const { error: grantUseCasesErrorDelete } = await supabase
        .from('grant_use_cases')
        .delete()
        .eq('grant_id', grantData.id)

      const { error: grantBlockchainsErrorInsert } = await supabase
        .from('grant_blockchains')
        .insert(grant_blockchains)
        .select('*')

      const { error: grantCategoriesErrorInsert } = await supabase
        .from('grant_categories')
        .insert(grant_categories)
        .select('*')

      const { error: grantUseCasesErrorInsert } = await supabase
        .from('grant_use_cases')
        .insert(grant_use_cases)
        .select('*')

      if (
        grantBlockchainsErrorDelete ||
        grantCategoriesErrorDelete ||
        grantUseCasesErrorDelete ||
        grantBlockchainsErrorInsert ||
        grantCategoriesErrorInsert ||
        grantUseCasesErrorInsert
      ) {
        console.log('Error creating grant relationships', grantError)
        toast.error(`Error creating grant relationships.`)
        return
      }

      toast.success(`Grant ${grantData.name} created.`)
      router.refresh()
      router.push(`/grants/${grantData.slug}`)
    }
  }

  return (
    <>
      <Form
        prefilledValues={grant}
        title={title}
        description={description}
        schema={grantSchema}
        onSubmit={onSubmit}
      >
        <InputText
          primaryLabel="Name *"
          placeholder="Aweseom Grant Name"
          id="name"
          type="text"
          className="col-span-6 sm:col-span-3"
          secondaryLabel="The official name of the grant."
        />
        <InputFile
          primaryLabel="Image"
          accept="image/*"
          id="logo"
          className="col-span-6 sm:col-span-3"
        />
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
      </Form>
    </>
  )
}
