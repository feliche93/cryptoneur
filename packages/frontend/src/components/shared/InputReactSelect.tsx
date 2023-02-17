import { FC } from 'react'
import React from 'react'
import Select from 'react-select'
import clsx from 'clsx'
import { Controller, useFormContext } from 'react-hook-form'

export interface InputReactSelectProps {
  id: string
  className?: string
  primaryLabel: string
  secondaryLabel?: string
  isMulti?: boolean
  options:
    | {
        value: number | undefined
        label: string | null | undefined
      }[]
    | undefined
}
export const InputReactSelect: FC<InputReactSelectProps> = ({
  id,
  className,
  options,
  primaryLabel,
  secondaryLabel,
  isMulti = false,
}) => {
  const {
    register,
    control,
    watch,
    formState: { errors },
  } = useFormContext() // retrieve all hook methods

  // console.log({ ...errors })
  const watchValues = watch()
  // console.log({ ...watchValues })

  if (!options) return null
  const default_value = {
    label: 'Select',
    value: undefined,
  } // you can replace with your default value

  return (
    <div className={clsx(className ? className : '', 'form-control')}>
      <label className="label">
        <span className="label-text rounded-lg">{primaryLabel}</span>
      </label>
      <Controller
        control={control}
        name={id}
        render={({ field: { onChange, onBlur, value, name, ref } }) => (
          <Select
            // defaultValue={options[0]}
            onChange={onChange}
            onBlur={onBlur}
            value={value}
            name={name}
            ref={ref}
            isMulti={isMulti}
            isClearable
            isSearchable={true}
            className="react-dropdown"
            classNamePrefix="dropdown"
            options={options}
            styles={{
              control: (baseStyles, state) => ({
                ...baseStyles,
                minHeight: '3rem',
                borderRadius: '0.5rem',
                // boxShadow: state.isFocused ? '0 0 0 1px #2563EB' : 'none',
                // borderColor: state.isFocused ? 'grey' : 'red',
              }),
              input: (base) => ({
                ...base,
                'input:focus': {
                  boxShadow: 'none',
                },
              }),
            }}
          />
        )}
      />
      {secondaryLabel && <label className="label">{secondaryLabel}</label>}
      {errors[id]?.message && (
        <label className="pt-2 text-sm text-error">{errors[id].message}</label>
      )}
    </div>
  )
}
