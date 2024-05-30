import React from 'react'
import SetToken from './Component/SetToken'
import { Suspense } from 'react'

function page() {
  return (
    <div><Suspense><SetToken/></Suspense></div>
  )
}

export default page