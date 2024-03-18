import clsx from 'clsx'
import { FC } from 'react'
import { useFormContext } from 'react-hook-form'

export interface InputCheckboxProps {
  id: string
  primaryLabel: string
  secondaryLabel?: string
  className?: string
}
export const InputCheckbox: FC<InputCheckboxProps> = ({
  id,
  primaryLabel,
  secondaryLabel,
  className,
}) => {
  const {
    register,
    formState: { errors },
  } = useFormContext() // retrieve all hook methods

  return (
    <div className={clsx(className ? className : '', 'form-control')}>
      <label className="label cursor-pointer justify-start">
        <input {...register(id)} type="checkbox" className="checkbox" />
        <span className="label-text ml-2">{primaryLabel}</span>
      </label>
      {secondaryLabel && <label className="label">{secondaryLabel}</label>}
      {errors?.[id] && <label className="pt-2 text-sm text-error">{errors[id].message}</label>}
    </div>
  )
}
