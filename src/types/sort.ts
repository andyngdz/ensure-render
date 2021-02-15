import { ISortBase } from './sort-base'

export type TDirection = 'ASC' | 'DESC'

export type TSort = ISortBase<TDirection>

export interface ICurrentSort {
  field: string

  direction: TDirection
}

export interface IUseSort {
  current: ICurrentSort

  sorts?: TSortValues

  onSort: (field: string) => void
}

export type TSortValues = Record<string, TSort>
