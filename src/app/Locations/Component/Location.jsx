import { Button, Card, Col, Flex, Row } from 'antd'
import Search from 'antd/es/input/Search'
import Link from 'next/link'
import React from 'react'
import LocationCard from './LocationCard'

function Location() {
  return (
    <>
    <Row style={{ margin: "0 0 20px 0" }} gutter={[10, 10]}>
        <Col xs={24} sm={18}>
        <Link href="/Locations/AddLocation"><Button >Add a Location</Button></Link>
        </Col>
        <Col xs={24} sm={6}>
        <Search
                            
                            placeholder="input location name"
                            allowClear
                        /></Col>
    </Row>

     <LocationCard/>
   
    </>
  )
}

export default Location