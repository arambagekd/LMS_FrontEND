'use client'
import { Pagination, Row } from 'antd'
import React, { useEffect, useState } from 'react'
import CardResource from './myComponent/CardResource'
import Card from 'antd/es/card/Card';
import axios from 'axios';



function SearchResult() {

  const [books,setBooks]=useState([{id:1,Title:"Book1",Author:"Author1",Description:"Description1",Image:"https://images-na.ssl-images-amazon.com/images/I/51Zymoq7UnL._AC_SY400.jpg"},]);



  const[page,changepage]=useState(1);

  const changingPage =(pnumber,size)=>{
        changepage(pnumber);
  }

  const handleSearch = async () => {
    try {
      const response = await axios.get(`http://localhost:5164/api/Resource/GetAllResource`);
      const searchData = response.data;
      setBooks(searchData);
      console.log(searchData);
    } catch (error) { 
      console.error('Error searching data:', error);
    }
  };

  useEffect(()=>{handleSearch()},[]);
  
  return(
    <Card title="List of Books">
    <Row style={{width:"100%"}}   gutter={[15,20]} justify="center">
   
    {books.slice((page-1)*9,(page-1)*9+ 9).map((item) => (
        <CardResource key={item}  dataset={item} />
      ))}
  
    </Row>
    <br></br>
    <center><Pagination defaultCurrent={1} total={books.length} onChange={changingPage} pageSize={9} hideOnSinglePage/></center>
    </Card>
  )
}

export default SearchResult
