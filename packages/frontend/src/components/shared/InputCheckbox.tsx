import { classNames } from '@utils/helpers'
import { FC } from 'react'
import { FieldValues, UseFormRegister } from 'react-hook-form'

export interface InputCheckboxProps {
  id: string
  primaryLabel: string
  secondaryLabel?: string
  placeholder?: string
  register: UseFormRegister<FieldValues>
  errors: any
  className?: string
}
export const InputCheckbox: FC<InputCheckboxProps> = ({
  id,
  primaryLabel,
  secondaryLabel,
  placeholder,
  register,
  errors,
  className,
}) => {
  return (
    <div className={classNames(className ? className : '', 'form-control')}>
      <label className="label cursor-pointer justify-start">
        <input {...register(id)} type="checkbox" className="checkbox" />
        <span className="label-text ml-2">{primaryLabel}</span>
      </label>
      {secondaryLabel && <label className="label">{secondaryLabel}</label>}
      {errors?.[id] && <label className="pt-2 text-sm text-error">{errors[id].message}</label>}
    </div>
  )
}
