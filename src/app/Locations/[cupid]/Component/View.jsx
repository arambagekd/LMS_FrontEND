'use client'
import React, { useEffect, useState } from 'react'
import ShelfList from '../Component/ShelfList'
import { Card, Col, Flex, Row } from 'antd'
import axioinstance from '@/app/Instance/api_instance';

function View({cupid}) {

    const [cupboards, setCupboards] = useState([]);

  async function getLocations() {
    try {
      const response = await axioinstance.post(
        `Location/GetAllLocation`,
        {
            cupboardName: cupid
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
    {cupboards.length>0 &&
    <Card title={<Flex justify='space-between'><div>Cupboard - {cupboards[0].cupboardId}</div><div> No of books: {cupboards[0].count}</div></Flex>}>
    <Row style={{width:"100%"}}   gutter={[15,15]} >
        <Col xs={24} sm={24}>
    <ShelfList cupboardName={cupid}/>
    </Col>
    </Row>
    </Card>}
    </>
  )
}

export default View