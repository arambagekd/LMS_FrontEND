'use client'
import React from 'react'
import { Breadcrumb } from 'antd';

function AdressBar(props) {
  return (
    <div >
      <Breadcrumb
      items={[{ title: "easyLibro" }, ...props.item]}
      style={{fontSize:16}}
  />
    </div>
  )
}

export default AdressBar
