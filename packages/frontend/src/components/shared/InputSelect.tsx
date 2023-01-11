import { classNames } from '@utils/helpers'
import { type } from 'os'
import { FC } from 'react'
import { FieldValues, UseFormRegister } from 'react-hook-form'

export interface InputSelectProps {
  id: string
  primaryLabel: string
  type: string
  secondaryLabel?: string
  placeholder?: string
  options: { id: string; label: string }[]
  register: UseFormRegister<FieldValues>
  errors: any
  className?: string
}
export const InputSelect: FC<InputSelectProps> = ({
  id,
  primaryLabel,
  secondaryLabel,
  placeholder,
  options,
  register,
  errors,
  className,
}) => {
  return (
    <div className={classNames(className ? className : '', 'form-control')}>
      <label className="label">
        <span className="label-text">{primaryLabel}</span>
      </label>
      <select {...register(id)} className="select-bordered select w-full">
        {/* {placeholder && <option value="">{placeholder}</option>} */}
        {options.map((option, index) => (
          <option key={index} value={option.id}>
            {option.label}
          </option>
        ))}
      </select>
      {secondaryLabel && <label className="label">{secondaryLabel}</label>}
      {errors?.[id] && <label className="pt-2 text-sm text-error">{errors[id].message}</label>}
    </div>
  )
}
