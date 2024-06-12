'use client'
import { Button, Col, Descriptions, Flex, Image, Row, Spin, Tag } from 'antd'
import Card from 'antd/es/card/Card'
import React, { useEffect, useState } from 'react'
import EditModal from './EditModal'
import {  EditOutlined,BellOutlined} from '@ant-design/icons';
import axioinstance from '../../../Instance/api_instance';
import DeleteModal from './DeleteModal';
import Link from 'next/link'
import { UserContext } from '@/app/Context/Context'







function AboutCard({reservationId}) {

  const [modalState, changeModalState] = useState(false);
  const [items,setItem]=useState([]);
  const [error,seterror]=useState(false);
  const [loading,setLoading]=useState(true);
  const[status,setStatus]=useState("")
  const [imagePath,setImagePath]=useState("")
  const user=React.useContext(UserContext).user;
  
  const openModal = () => {
    
    changeModalState(true);
  }
  const closeModal = () => {
    changeModalState(false);
  }
 

  const fetchData=async()=>{
    setLoading(true);
    try{
      const response = await axioinstance.post(`Reservation/About?resId=${reservationId}`);
      console.log(response.data);
      setStatus(response.data.status);
      setImagePath(response.data.imagePath)
      const items = [
        {
          key: '1',
          label: 'Reservation ID',
          children: response.data.resId,
        },
        {
          key: '7',
          label: 'Resource ID (ISBN)',
          span: 2,
          children: <Link href={`/Resources/${response.data.isbn}`}>{response.data.isbn}</Link>,
        },
        {
          key: '5',
          label: 'Book Title',
          children: response.data.bookTitle,
        },
      
      
        {
          key: '2',
          label: 'User Name',
          children: response.data.userName,
        },
        {
          key: '4',
          label: 'Issuer',
          children: response.data.issuer,
        },
      
        {
          key: '9',
          label: 'Borrow Date',
          children: response.data.dateIssue,
        },
        {
          key: '10',
          label: 'Due Date',
          children: response.data.dueDate,
        },
        {
          key: '11',
          label: 'Return Date',
          children: response.data.returnDate,
        },
        {
          key: '12',
          label: 'Penalty Status',
          children: 'None',
        },
      ];
      setItem(items);
      setLoading(false);
    }
    catch(error){
        console.log(error);
        seterror(true);
        setLoading(false);
    }
  }

  useEffect(() => { fetchData(); }, []);


  return (
    <Flex style={{ width: '100%',minHeight:"350px"}} justify='center' align='center'>
      {error ? (
        <div>Loading has failed....</div>
      ) : (
        
        <Spin spinning={loading} size='large'>
          {!loading && (
            <Flex style={{ width: '100%' }} justify='center' align='center'>
            <Card bordered style={{ width: '80%' }} >
              {user.userType==="admin" &&
              <Flex justify='space-between' style={{margin:"0 0 10px 0"}}>
                {(status==="overdue")?<Tag color="#f50" style={{ margin: " 0 20px 20px 0" }} shape='round'>OverDue</Tag>:<div style={{minWidth:'10px'}}></div>}
                <div>
                  <DeleteModal reservation={reservationId}/>
                  <Button size='large' type='primary' style={{ margin: '0 10px 0 0' }} shape='circle' onClick={openModal} disabled={(status=="reserved")}><EditOutlined /></Button>
                  <Button size='large' type='primary' shape='circle' onClick={openModal} disabled={(status=="reserved")}><BellOutlined /></Button>
                </div>
              </Flex>}
              <Row gutter={[30, 30]} align="middle" justify="center">
                <Col md={8} sm={24} xs={24}>
                  <Image
                    src={imagePath}
                    alt="Image loading is Failed"
                    width="100%"
                    style={{ borderRadius: '10%' }}
                  />
                </Col>
                <Col md={16} sm={24} xs={24}>
                  <Descriptions title={<div>Reservation Details of Reservation {reservationId} </div>} layout="horizontal" column={{
                    xs: 1,
                    sm: 2,
                    md: 2,
                    lg: 2,
                    xl: 2,
                    xxl: 2,
                  }}
                    items={items}
                  />
                </Col>
              </Row>
            </Card>
            </Flex>
          )}
          <EditModal fetchData={fetchData} reservationId={reservationId} openModal={openModal} closeModal={closeModal} modalState={modalState} />
          
        </Spin>
       
      )}
    </Flex>
  )
}

export default AboutCard
