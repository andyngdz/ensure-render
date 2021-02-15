import React, { useState, useEffect } from 'react'

type TOnReder<T> = (data: T) => React.ReactElement

const Render = {
  ensure: <T,>(
    onRender: TOnReder<T>,
    data?: T,
    onLoading?: () => React.ReactElement
  ): React.ReactElement => {
    const [readyData, setReadyData] = useState(data)

    useEffect(() => {
      if (data) {
        setReadyData(data)
      }
    }, [data])

    if (readyData) {
      return onRender(readyData)
    } else {
      if (onLoading) {
        return onLoading()
      }

      return <></>
    }
  }
}

export { Render }
