'use client'

import { FC } from 'react'
import { Controller, useFormContext } from 'react-hook-form'
import Select from 'react-select'

export interface MatrixSelectProps {}

export const MatrixSelect: FC<MatrixSelectProps> = () => {
  const {
    register,
    control,
    formState: { errors, isSubmitting },
    handleSubmit,
    watch,
    setValue,
  } = useFormContext()

  const options = [
    { value: 'models', label: 'Models' },
    { value: 'temperature', label: 'Temperature' },
    { value: 'maximum_length', label: 'Maximum Length' },
  ]

  return (
    <div className="pt-4">
      <label className="label">
        <span className="label-text">Select up to 2 Comparison Factors</span>
      </label>
      <Controller
        name="matrix"
        control={control}
        render={({
          field: { onChange, onBlur, value, name, ref },
          fieldState: { invalid, isTouched, isDirty, error },
          formState,
        }) => (
          <Select
            onChange={onChange}
            onBlur={onBlur}
            name={name}
            id={name}
            hideSelectedOptions={true}
            isSearchable={false}
            value={value}
            ref={ref}
            placeholder="Select Matrix"
            closeMenuOnSelect={false}
            isOptionDisabled={() => value?.length >= 2}
            className="form-control rounded-lg"
            isMulti
            options={options}
          />
        )}
      />
    </div>
  )
}
