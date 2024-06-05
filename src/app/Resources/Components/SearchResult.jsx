'use client'
import { Button, Flex, Pagination, Row, Space, Table,Col} from 'antd'
import React, { useEffect, useState } from 'react'
import { UserDeleteOutlined ,MoreOutlined} from '@ant-design/icons';
import ResultTable from '../../Component/ResultTable';
import CardResource from './myComponent/CardResource'
import Link from 'next/link';
import Card from 'antd/es/card/Card';
import axios from 'axios';
import axioinstance from '@/app/Instance/api_instance';


function SearchResult(props) {




  const[page,changepage]=useState(1);

  const changingPage =(pnumber,size)=>{
        changepage(pnumber);
  }

 
  return(
    <Card title="List of Books">
    <Row style={{width:"100%"}}   gutter={[15,15]} justify="center">
   
    {props.data.slice((page-1)*9,(page-1)*9+ 9).map((item) => (
        <CardResource  key={item.isbn}  dataset={item} />
      ))}
  
    </Row>
    <br></br>
    <center><Pagination defaultCurrent={1} total={props.data.length} onChange={changingPage} pageSize={9}/></center>
    </Card>
  )
}

export default SearchResult
