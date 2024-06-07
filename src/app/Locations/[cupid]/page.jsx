import React from 'react'
import ShelfList from './Component/ShelfList'

function page({params}) {
  return (
    <div><h3>Cupboard - {params.cupid}</h3>
    <ShelfList cupboardName={params.cupid}/>
    </div>
  )
}

export default page