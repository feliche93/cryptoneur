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
}
export const InputText: FC<InputTextProps> = ({
  id,
  primaryLabel,
  secondaryLabel,
  placeholder,
  type,
  className,
}) => {
  const {
    register,
    formState: { errors },
  } = useFormContext() // retrieve all hook methods

  if (errors) {
    console.log({ errors })
  }

  return (
    <div className={clsx(className ? className : '', 'form-control')}>
      <label className="label">
        <span className="label-text">{primaryLabel}</span>
      </label>
      <input
        {...register(id)}
        type={type}
        placeholder={placeholder}
        className="input-bordered input w-full"
      />
      {secondaryLabel && <label className="label">{secondaryLabel}</label>}
      {errors[id]?.message && (
        <label className="pt-2 text-sm text-error">{errors[id].message}</label>
      )}
    </div>
  )
}
