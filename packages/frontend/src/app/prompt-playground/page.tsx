import { ApiKeyForm } from '@components/prompt-playground/ApiKeyForm'
import { ApiKeyInput } from '@components/prompt-playground/ApiKeyInput'
import { InputForm } from '@components/prompt-playground/InputForm'
import { MatrixSelect } from '@components/prompt-playground/MatrixSelect'
import { ToasterWrapper } from '@components/shared/ToasterWrapper'
import { Form } from '@shared/Form'
import { z } from 'zod'

const PromptPlayground = () => {
  return (
    <>
      <ToasterWrapper />
      <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
        {/* Title */}
        <div>
          <h1 className="text-2xl tracking-tight sm:text-3xl">
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text font-semibold  text-transparent">
              Enhanced
            </span>{' '}
            Open AI Playground
          </h1>
        </div>
        <InputForm />
      </div>
    </>
  )
}

export default PromptPlayground
