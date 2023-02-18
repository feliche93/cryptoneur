import clsx from 'clsx'
import { FC } from 'react'
import { useFormContext } from 'react-hook-form'

export interface InputNumberProps {
  id: string
  primaryLabel: string
  secondaryLabel?: string
  placeholder?: string | undefined
  className?: string
}
export const InputNumber: FC<InputNumberProps> = ({
  id,
  primaryLabel,
  secondaryLabel,
  placeholder,
  className,
}) => {
  const {
    register,
    watch,
    formState: { errors },
  } = useFormContext() // retrieve all hook methods

  return (
    <div className={clsx(className ? className : '', 'form-control')}>
      <label className="label">
        <span className="label-text">{primaryLabel}</span>
      </label>
      <input
        {...register(id, {
          setValueAs: (value) => {
            console.log({ value })
            if (isNaN(value)) return null
            if (value === '') return null
            if (value === undefined) return null
            if (value === null) return null
            return parseInt(value)
          },
        })}
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
