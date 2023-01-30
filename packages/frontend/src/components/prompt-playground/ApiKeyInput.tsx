'use client'

import { FC } from 'react'
import { useFormContext } from 'react-hook-form'
import { Configuration, OpenAIApi } from 'openai'
import { toast } from 'react-hot-toast'
import clsx from 'clsx'

export interface ApiKeyInputProps {}
export const ApiKeyInput: FC<ApiKeyInputProps> = () => {
  const {
    register,
    formState: { errors, isSubmitting },
    handleSubmit,
    watch,
    setValue,
  } = useFormContext()

  async function validateApiKey() {
    console.log(watch('openAiApiKey'))
    const configuration = new Configuration({
      apiKey: watch('openAiApiKey'),
    })
    const openai = new OpenAIApi(configuration)
    try {
      const response = await openai.listModels()
      // if response ok then set value to true
      if (response.data) {
        toast.success('API Key Valid')
        setValue('apiKeyValid', true)
        console.log('API Key Valid')
        console.log(response.data)
      }
    } catch (error) {
      toast.error('API Key Invalid')
      setValue('apiKeyValid', false)
      console.log('API Key Invalid')
    }
  }

  return (
    <div className="form-control w-full">
      <label className="label">
        <span className="label-text">Open AI Api Key</span>
      </label>
      <div className="flex flex-row items-center justify-center space-x-2">
        <input
          {...register('openAiApiKey')}
          type="text"
          placeholder="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"
          className="input-bordered input w-full"
        />

        <button
          onClick={handleSubmit(async (data) => {
            // console.log(data)
            await validateApiKey()
          })}
          className={clsx('btn-primary btn', isSubmitting ? 'loading' : '')}
        >
          Validate
        </button>
      </div>
      <label className="label">
        {errors.openAiApiKey && (
          <span className="text-sm text-error">{errors.openAiApiKey.message}</span>
        )}
      </label>
      <label className="label">
        <span className="label-text-alt">
          The key will only be stored in the browser and persisted in a database.
        </span>
      </label>
    </div>
  )
}
