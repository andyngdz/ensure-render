import React from 'react'

type TOnReder<T> = (data: T) => React.ReactElement

const Render = {
  ensure: <T,>(
    onRender: TOnReder<T>,
    data?: T,
    onLoading?: () => React.ReactElement
  ): React.ReactElement => {
    if (data) {
      return onRender(data)
    } else {
      if (onLoading) {
        return onLoading()
      }

      return <></>
    }
  }
}

export { Render }
