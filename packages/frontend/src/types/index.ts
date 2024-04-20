export interface TSearchParams {
  [key: string]: string | string[] | undefined
}

export type TOption = {
  label: string
  value: string
  icon?: React.ComponentType<{ className?: string }>
}

export interface TDataTableFilterOption<TData> {
  id?: string
  label: string
  value: keyof TData | string
  items: TOption[]
  isMulti?: boolean
}

export interface TDataTableSearchableColumn<TData> {
  id: keyof TData
  placeholder?: string
}

export interface TDataTableFilterableColumn<TData> {
  id: keyof TData
  title: string
  options: TOption[]
}
