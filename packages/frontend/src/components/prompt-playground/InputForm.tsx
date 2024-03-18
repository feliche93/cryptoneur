'use client'

import { Form } from '@shared/Form'
import { FC } from 'react'
import { z } from 'zod'
import { ApiKeyInput } from './ApiKeyInput'
import { MatrixSelect } from './MatrixSelect'

export const InputForm: FC = () => {
  const schema = z.object({
    // string matching the regex pattern
    // with error message if it doesn't match

    openAiApiKey: z.string().regex(/sk-[a-zA-Z0-9]{32}/, {
      message: 'Invalid API Key Format',
    }),
  })

  //   const watchMatrix = watch('matrix')
  //   // watch matrix includes value key of model
  //   const isModelSelected = watchMatrix.map((item: any) => item.value).includes('models')

  //   if (!isModelSelected) return null

  return (
    <>
      <Form schema={schema}>
        <div className="grid w-full grid-cols-6 gap-4">
          <div className="col-span-4">
            <div className="col-span-3">
              <ApiKeyInput />
              <MatrixSelect />
            </div>
          </div>
          <div className="col-span-2 mt-8 rounded-lg bg-base-100 shadow-lg">
            <div className="p-4">
              <h2 className="pb-4 text-lg">Model Comparison By</h2>

              {/* {watch('matrix')} */}
              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text">Open AI Models</span>
                </label>

                <label className="label cursor-pointer justify-start">
                  <input type="checkbox" className="checkbox-primary checkbox mr-2" />
                  <span className="label-text">Remember me</span>
                </label>
              </div>
            </div>
          </div>
        </div>
      </Form>
    </>
  )
}
