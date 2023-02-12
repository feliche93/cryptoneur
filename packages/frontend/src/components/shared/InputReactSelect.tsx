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
        value: string
        label: string
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
    formState: { errors },
  } = useFormContext() // retrieve all hook methods

  if (!options) return null
  const default_value = options[0] // you can replace with your default value

  return (
    <div className={clsx(className ? className : '', 'form-control')}>
      <label className="label">
        <span className="label-text rounded-lg">{primaryLabel}</span>
      </label>
      <Controller
        control={control}
        // defaultValue={options.map((c) => c.value)}
        name={id}
        render={({ field }) => (
          <Select
            // defaultValue={options[0]}
            {...field}
            isMulti={isMulti}
            isClearable
            isSearchable={false}
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
