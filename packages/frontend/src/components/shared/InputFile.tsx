import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@components/ui/Tooltip'
import { QuestionMarkCircleIcon, QueueListIcon } from '@heroicons/react/24/outline'
import clsx from 'clsx'
import { FC, HTMLInputTypeAttribute, InputHTMLAttributes } from 'react'
import { useFormContext } from 'react-hook-form'

export interface InputFileProps {
  id: string
  primaryLabel: string
  secondaryLabel?: string
  className?: string
  accept?: 'image/*' | 'video/*' | 'audio/*' | 'application/pdf'
}
export const InputFile: FC<InputFileProps> = ({
  id,
  primaryLabel,
  secondaryLabel,
  className,
  accept,
}) => {
  const {
    register,
    formState: { errors },
  } = useFormContext() // retrieve all hook methods

  // if (errors) {
  //   console.log({ errors })
  // }

  return (
    <div className={clsx(className ? className : '', 'form-control')}>
      <div className="flex flex-row items-center justify-between">
        <label className="label">
          <span className="label-text">{primaryLabel}</span>
        </label>
      </div>
      <input
        {...register(id)}
        type="file"
        accept={accept}
        className="file-input-bordered file-input"
      />
      {secondaryLabel && (
        <label className="label">
          <span className="label-text-alt">{secondaryLabel}</span>
        </label>
      )}
      {errors[id]?.message && (
        <label className="pt-2 text-sm text-error">{errors[id].message}</label>
      )}
    </div>
  )
}
