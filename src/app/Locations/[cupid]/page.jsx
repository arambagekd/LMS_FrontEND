import React from 'react'
import ShelfList from './Component/ShelfList'

function page({params}) {
  return (
    <div>{params.cupid}
    <ShelfList cupboardName={params.cupid}/>
    </div>
  )
}

export default page