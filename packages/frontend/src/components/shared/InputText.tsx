import { classNames } from '@utils/helpers'
import { FC } from 'react'
import { FieldValues, UseFormRegister } from 'react-hook-form'

export interface InputTextProps {
  id: string
  primaryLabel: string
  secondaryLabel?: string
  placeholder?: string
  type?: string
  register: UseFormRegister<FieldValues>
  errors: any
  className?: string
}
export const InputText: FC<InputTextProps> = ({
  id,
  primaryLabel,
  secondaryLabel,
  placeholder,
  type,
  register,
  errors,
  className,
}) => {
  return (
    <div className={classNames(className ? className : '', 'form-control')}>
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
      {errors?.[id] && <label className="pt-2 text-sm text-error">{errors[id].message}</label>}
    </div>
  )
}
