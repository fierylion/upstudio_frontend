import React, { Suspense } from 'react'
import { NavBar } from '@/components'
const page = () => {
  return (
    <>
      <header>
        <NavBar />
        <div>page</div>
      </header>
      <Suspense fallback={<div>Loading...</div>}>
        <main>fgsfgsfgsgfsg</main>
      </Suspense>
    </>
  )
}

export default page