import clsx from 'clsx'
import { FC } from 'react'
import { FieldValues, useFormContext, UseFormRegister } from 'react-hook-form'

export interface InputTextAreaProps {
  id: string
  primaryLabel: string
  secondaryLabel?: string
  placeholder?: string
  type?: 'text' | 'email' | 'password' | 'number'
  className?: string
}
export const InputTextArea: FC<InputTextAreaProps> = ({
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

  return (
    <div className={clsx(className ? className : '', 'form-control')}>
      <label className="label">
        <span className="label-text">{primaryLabel}</span>
      </label>
      <textarea
        {...register(id)}
        className="textarea-bordered textarea"
        placeholder={placeholder}
      ></textarea>
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
