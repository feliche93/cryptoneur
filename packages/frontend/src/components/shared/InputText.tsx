import clsx from 'clsx'
import { FC, HTMLInputTypeAttribute } from 'react'
import { useFormContext } from 'react-hook-form'

export interface InputTextProps {
  id: string
  primaryLabel: string
  secondaryLabel?: string
  placeholder?: string | undefined
  type?: HTMLInputTypeAttribute | undefined
  className?: string
  helpText?: string
}
export const InputText: FC<InputTextProps> = ({
  id,
  primaryLabel,
  secondaryLabel,
  placeholder,
  type,
  className,
  helpText,
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
        type={type}
        placeholder={placeholder}
        className="input-bordered input w-full"
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
