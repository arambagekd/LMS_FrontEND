'use client'
import React from 'react'
import { Card, Flex, Statistic} from 'antd'


function DashboardCard(props) {
  const titlestyle={
    fontSize:'1rem'
  }
  const iconStyle={
    flex:1,
    opacity:'1'
  }
  const valueStyle={
    fontWeight:'700',
    fontSize:'1.5rem',
    opacity:'0.9',
  }

  return (
    <div>
      <Card bordered={false} >
        <Flex wrap='wrap'>
        <Flex style={iconStyle } align='center' ><div  >{props.icon}</div></Flex>
        <Flex justify='right' style={{flex:2,textAlign:'right'}}>
        <Statistic 
          loading={props.loading}
          title={<div style={titlestyle}>{props.title} </div>}
          value={props.value}
          valueStyle={valueStyle}
         suffix={props.suffix}
         prefix={props.prefix}
         
        /></Flex>
        </Flex>
      </Card>
    </div>
  )
}

export default DashboardCard
