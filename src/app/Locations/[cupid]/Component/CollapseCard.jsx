import View from '@/app/Resources/View'
import { Button, Collapse, Flex } from 'antd'
import Link from 'next/link'
import React from 'react'

function CollapseCard({shelfNo, cupboardId}) {
  return (
    <>
        <Collapse items={[{ key: '1', label: <Flex align='center' justify='space-between'><div>Shelf - {shelfNo}</div><Link href={`/Resources/AddResources?cupboardId=${cupboardId}&shelfNo=${shelfNo}`}><Button >Add a Book</Button></Link></Flex>, children:<><View location={cupboardId+"-"+shelfNo}/></>
      }]}
      />
      <br/>
    </>
  )
}

export default CollapseCard