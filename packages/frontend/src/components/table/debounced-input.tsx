'use client'

import clsx from 'clsx'
import { useEffect, useState } from 'react'

export const DebouncedInput = ({
  value: initialValue,
  onChange,
  debounce = 500,
  className,
  primaryLabel,
  secondaryLabel,
  placeholder,
  ...props
}: {
  value: string | number
  onChange: (value: string | number) => void
  debounce?: number
  className?: string
  primaryLabel: string
  secondaryLabel?: string
  placeholder?: string
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'>) => {
  const [value, setValue] = useState(initialValue)

  useEffect(() => {
    setValue(initialValue)
  }, [initialValue])

  useEffect(() => {
    const timeout = setTimeout(() => {
      onChange(value)
    }, debounce)

    return () => clearTimeout(timeout)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value])

  return (
    <div className={clsx(className ? className : '', 'form-control')}>
      <label className="label">
        <span className="label-text capitalize">{primaryLabel}</span>
      </label>
      <input
        className="input-bordered input w-full"
        {...props}
        placeholder={placeholder}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      {secondaryLabel && <label className="label">{secondaryLabel}</label>}
    </div>
  )
}
