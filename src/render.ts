import React from 'react'

type TOnReder<T> = (data: T) => React.ReactNode

const Render = {
  ensure: <T>(
    onRender: TOnReder<T>,
    data?: T,
    onLoading?: () => React.ReactNode
  ): React.ReactNode => {
    if (data) {
      return onRender(data)
    } else {
      if (onLoading) return onLoading()
    }
  }
}

export { Render }
