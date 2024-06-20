'use client'
import { Button, Card, Col, Row } from 'antd'
import Search from 'antd/es/input/Search'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import LocationCard from './LocationCard'
import axioinstance from '@/app/Instance/api_instance'
import { UserContext } from '@/app/Context/Context'

function Location() {
    const [cupboards, setCupboards] = useState([]);
    const [keyword, setKeyword] = useState(""); 
    const user = React.useContext(UserContext).user;
    const [loading, setLoading] = useState(true);
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
    setLoading(false);
  }

  useEffect(() => {getLocations()
    
  }, []);
  return (
    <>
   
    <Row justify="space-between" style={{ margin: "0 0 20px 0" }} gutter={[10, 10]}>
        
        <Col xs={24} sm={6}>
        {user.userType==="admin"&&
        <Link href="/Locations/AddLocation" ><Button  size="large" >Add a Location</Button></Link>}
        </Col>
        <Col xs={24} sm={6}>
        <Search
         size="large"
                            onChange={(e) => 
                                setKeyword(e.target.value)}
                            
                            placeholder="input location name"
                            allowClear
                            onSearch={()=>getLocations()}
                        /></Col>
    </Row>
    <Card title="List of Cupborads">
    <Row style={{width:"100%"}}   gutter={[15,15]} justify="center">
     <LocationCard loading={loading} cupboards={cupboards}/></Row>
    
     </Card>
   
    </>
  )
}

export default Location