'use client'
import React from 'react'
import LoadingBar, { LoadingBarRef } from 'react-top-loading-bar'
const Loading = () => {
  const ref = React.useRef<LoadingBarRef | null>(null)
  React.useEffect(() => {
    if (!ref.current) return
    ref.current.continuousStart()
    return () => {
      ref.current && ref.current.complete()
    }
  }, [])
  return (
    <div>
      <LoadingBar color='#ffe3df' ref={ref} shadow={true} height={7} />
    </div>
  )
}

export default Loading
