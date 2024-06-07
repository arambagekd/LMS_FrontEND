'use client'
import { Button, Card, Col, Flex, Row } from 'antd'
import Search from 'antd/es/input/Search'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import LocationCard from './LocationCard'
import axioinstance from '@/app/Instance/api_instance'

function Location() {
    const [cupboards, setCupboards] = useState([]);
    const [keyword, setKeyword] = useState(""); 

  async function getLocations() {
    try {
      const response = await axioinstance.post(
        `Location/GetAllLocation`,
        {
            cupboardName: keyword
          }
         
      );
      console.log(response.data)
      setCupboards(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {getLocations()}, []);
  return (
    <>
    <Row style={{ margin: "0 0 20px 0" }} gutter={[10, 10]}>
        <Col xs={24} sm={18}>
        <Link href="/Locations/AddLocation"><Button >Add a Location</Button></Link>
        </Col>
        <Col xs={24} sm={6}>
        <Search
                            onChange={(e) => 
                                setKeyword(e.target.value)}
                            
                            placeholder="input location name"
                            allowClear
                            onSearch={()=>getLocations()}
                        /></Col>
    </Row>

     <LocationCard cupboards={cupboards}/>
   
    </>
  )
}

export default Location