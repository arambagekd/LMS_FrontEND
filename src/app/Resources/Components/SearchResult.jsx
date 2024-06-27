'use client'
import { Button, Flex, Pagination, Row, Space, Table,Col, Spin, Empty} from 'antd'
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
    <Card title={<Flex justify='space-between' wrap='wrap'><div>List of Books</div><div>Found {props.data.length} search results</div></Flex>} >
    <Row style={{width:"100%"}}   gutter={[15,15]} justify="center">
   
{props.loading &&< Spin size='large' spinning={props.loading}><div style={{height:200}}></div></Spin>}
{!props.loading && props.data.length==0 &&<Empty/>}
    {props.data.slice((page-1)*12,(page-1)*12+ 12).map((item) => (
        <CardResource  key={item.isbn}  dataset={item} />
      ))}
  
    </Row>
    <br></br>
    <center><Pagination defaultCurrent={1} total={props.data.length} onChange={changingPage} pageSize={9}/></center>
    </Card>
  )
}

export default SearchResult
