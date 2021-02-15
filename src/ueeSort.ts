import { TSortValues, IUseSort, ICurrentSort } from './types/sort'
import { useDeepCompareEffect } from 'react-use'
import { useState, useEffect } from 'react'
import produce from 'immer'

const useSort = (
  fields: Array<string>,
  initCurrent: ICurrentSort
): IUseSort => {
  const [current, setCurrent] = useState<ICurrentSort>(initCurrent)
  const [sorts, setSorts] = useState<TSortValues>()

  useDeepCompareEffect(() => {
    const newSorts: TSortValues = {}

    for (const field of fields) {
      newSorts[field] = {
        active: initCurrent.field == field,
        direction: 'ASC'
      }
    }

    setSorts(newSorts)
  }, [fields])

  useEffect(() => {
    let current

    for (const field in sorts) {
      const { active, direction } = sorts[field]

      if (active) {
        current = { field, direction }
      }
    }

    if (current) setCurrent(current)
  }, [sorts])

  const resetSortActive = (): void => {
    setSorts(prevState =>
      produce(prevState, draft => {
        if (draft) {
          for (const field in sorts) {
            draft[field].active = false
          }
        }
      })
    )
  }

  const onSort = (field: string) => {
    resetSortActive()

    setSorts(prevState =>
      produce(prevState, draft => {
        if (sorts && draft) {
          const { direction } = sorts[field]

          if (field !== current.field) {
            draft[field].direction = 'ASC'
          } else {
            draft[field].direction = direction === 'ASC' ? 'DESC' : 'ASC'
          }

          draft[field].active = true
        }
      })
    )
  }

  return { current, sorts, onSort }
}

export { useSort }
