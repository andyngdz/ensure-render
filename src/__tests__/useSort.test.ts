import { renderHook, act } from '@testing-library/react-hooks'
import { useSort } from '../useSort'

describe('useSort', () => {
  it('Should init correctly', () => {
    const {
      result: { current }
    } = renderHook(() =>
      useSort(['id', 'name'], {
        field: 'id',
        direction: 'DESC'
      })
    )

    expect(current).toMatchSnapshot()
  })

  it('Should return state correctly after calling onSort', async () => {
    const { result } = renderHook(() =>
      useSort(['id', 'name'], {
        field: 'id',
        direction: 'DESC'
      })
    )

    await act(async () => {
      result.current.onSort('name')
    })

    expect(result.current).toMatchSnapshot()
  })
})
