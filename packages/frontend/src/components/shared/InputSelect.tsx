import clsx from 'clsx'
import { FC } from 'react'
import { useFormContext } from 'react-hook-form'

export interface InputSelectProps {
  id: string
  primaryLabel: string
  type: string
  secondaryLabel?: string
  placeholder?: string
  options:
    | {
        label: string | undefined
        value: string | number | undefined
      }[]
    | any[]
    | undefined
  className?: string
  valueAsNumber?: boolean
  isLoading?: boolean
}
export const InputSelect: FC<InputSelectProps> = ({
  id,
  primaryLabel,
  secondaryLabel,
  placeholder,
  options,
  className,
  isLoading = false,
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
      {isLoading ? (
        <div className="h-12 w-full animate-pulse rounded-lg bg-base-300" />
      ) : (
        <select {...register(id)} className="select-bordered select w-full">
          {placeholder && (
            <option key={'all'} value={''}>
              {placeholder}
            </option>
          )}
          {options &&
            options.map((option, idx) => (
              <option key={idx} value={option.value}>
                {option.label}
              </option>
            ))}
        </select>
      )}
      {secondaryLabel && <label className="label">{secondaryLabel}</label>}
      {errors?.[id] && <label className="pt-2 text-sm text-error">{errors[id].message}</label>}
    </div>
  )
}
