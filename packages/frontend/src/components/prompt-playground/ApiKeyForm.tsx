'use client'

import { Form } from '@shared/Form'
import { FC } from 'react'
import { useFormContext } from 'react-hook-form'
import { z } from 'zod'
import { ApiKeyInput } from './ApiKeyInput'

export const ApiKeyForm: FC = () => {
  return <Form schema={schema} className=""></Form>
}
