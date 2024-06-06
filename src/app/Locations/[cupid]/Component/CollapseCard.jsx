import { Collapse } from 'antd'
import React from 'react'

function CollapseCard() {
  return (
    <div>
        <Collapse
        items={[{ key: '1', label: `Shelf No - ${5}`, children: <>
     
      </>
      }]}
      />
    </div>
  )
}

export default CollapseCard