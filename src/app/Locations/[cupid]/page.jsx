import React from 'react'
import View from './Component/View'

function page({params}) {
  return (
    <View cupid={params.cupid}/>
  )
}

export default page