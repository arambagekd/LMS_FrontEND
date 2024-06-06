import View from '@/app/Resources/View'
import { Collapse } from 'antd'
import React from 'react'

function CollapseCard({shelfNo, cupboardId}) {
  return (
    <>
        <Collapse
        items={[{ key: '1', label: `Shelf No - ${shelfNo}`, children:<><View location={cupboardId+"-"+shelfNo}/></>
      }]}
      />
      <br/>
    </>
  )
}

export default CollapseCard