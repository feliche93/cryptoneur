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

import { type SQL } from 'drizzle-orm'

export interface SearchParams {
  [key: string]: string | string[] | undefined
}

export interface Option {
  label: string
  value: string
  icon?: React.ComponentType<{ className?: string }>
  withCount?: boolean
}

export interface DataTableFilterField<TData> {
  label: string
  value: keyof TData
  placeholder?: string
  options?: Option[]
}

export interface DataTableFilterOption<TData> {
  id: string
  label: string
  value: keyof TData
  options: Option[]
  filterValues?: string[]
  filterOperator?: string
  isMulti?: boolean
}

export type DrizzleWhere<T> = SQL<unknown> | ((aliases: T) => SQL<T> | undefined) | undefined
