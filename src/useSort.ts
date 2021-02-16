import { TSortValues, IUseSort, ICurrentSort } from './types//sort'
import { useDeepCompareEffect } from 'react-use'
import { useState, useEffect } from 'react'
import produce from 'immer'

const useSort = (fields: Array<string>, initSort: ICurrentSort): IUseSort => {
  const [current, setCurrent] = useState<ICurrentSort>(initSort)
  const [sorts, setSorts] = useState<TSortValues>()
  const { field: defaultField, direction: defaultDirection } = initSort

  useDeepCompareEffect(() => {
    const newSorts: TSortValues = {}

    fields.forEach(field => {
      newSorts[field] = {
        active: defaultField === field,
        direction: defaultDirection
      }
    })

    setSorts(newSorts)
  }, [fields])

  useEffect(() => {
    if (sorts) {
      let current

      Object.keys(sorts).forEach(field => {
        const { active, direction } = sorts[field]
        if (active) {
          current = { field, direction }
        }
      })

      if (current) setCurrent(current)
    }
  }, [sorts])

  const resetSortActive = (): void => {
    setSorts(prevState =>
      produce(prevState, draft => {
        if (draft && sorts) {
          Object.keys(sorts).forEach(field => {
            draft[field].active = false
            draft[field].direction = defaultDirection
          })
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
            draft[field].direction = defaultDirection
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
