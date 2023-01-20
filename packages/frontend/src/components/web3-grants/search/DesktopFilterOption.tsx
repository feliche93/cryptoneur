import { FC } from 'react'
import { FieldValues, UseFormRegister } from 'react-hook-form'

export interface DesktopFilterOptionProps {
  option: any
  optionIdx: number
  section: any
  register: UseFormRegister<FieldValues>
  key: string
}
export const DesktopFilterOption: FC<DesktopFilterOptionProps> = ({
  option,
  section,
  optionIdx,
  register,
  key,
}) => {
  // console.log({ option, optionIdx, section })

  return (
    <div key={key} className="flex items-center">
      <input
        {...register(`${section.id}`)}
        id={`${section.id}-${optionIdx}`}
        name={`${section.id}[]`}
        defaultValue={option.value}
        type="checkbox"
        className="h-4 w-4 rounded border-base-300 text-primary focus:ring-primary-focus"
      />
      <label htmlFor={`${section.id}-${optionIdx}`} className="ml-3 text-sm text-base-content/80">
        {option.label}
      </label>
    </div>
  )
}
