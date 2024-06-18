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
import ReturnModal from '../../Component/ReturnModal'







function AboutCard({reservationId}) {

  const [modalState, changeModalState] = useState(false);
  const [items,setItem]=useState([]);
  const [error,seterror]=useState(false);
  const [loading,setLoading]=useState(true);
  const[status,setStatus]=useState("")
  const [imagePath,setImagePath]=useState("")
  const user=React.useContext(UserContext).user;
  const [open, setOpen] = useState(false);
  const [resource, setResourse] = useState("");
  const[reservation,setReservation]=useState("");
  const openModal = () => {
    
    changeModalState(true);
  }
  const closeModal = () => {
    changeModalState(false);
  }  
  const showModal = () => {
    setOpen(true);
  };
  const closeModal1 = () => {
    setOpen(false);
  };


 

  const fetchData=async()=>{
    setLoading(true);
    try{
      const response = await axioinstance.post(`Reservation/About?resId=${reservationId}`);
      console.log(response.data);
      setStatus(response.data.status);
      setImagePath(response.data.imagePath);
      setReservation(response.data.resId);
      setResourse(response.data.isbn);
      const items = [
        {
          key: '1',
         // span:2,
          label: 'Reservation ID',
          children: response.data.resId,
        },
        {
          key: '7',
          label: 'Resource ID (ISBN)',
         // span: 2,
          children: <Link href={`/Resources/${response.data.isbn}`}>{response.data.isbn}</Link>,
        },
        {
          key: '5',
          label: 'Book Title',
         // span:2,
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
                <Button type='primary' danger={(status==="overdue")} shape='round'>{status.toUpperCase()}</Button>
                <div>
                  <DeleteModal reservation={reservationId}/>
                  <Button size='large' type='primary' style={{ margin: '0 10px 0 0' }} shape='circle' onClick={openModal} disabled={(status=="reserved")}><EditOutlined /></Button>
                  <Button size='large' type='primary' shape='circle' onClick={openModal} disabled={(status=="reserved")}><BellOutlined /></Button>
                </div>
              </Flex>}
              
              <Row gutter={[30, 30]} align="middle" justify="center">
              <Col md={8} sm={24} xs={24}>
              <center>
                  <Image
                    src={imagePath}
                    alt={`no image`}
                    width="180px"
                    height="240px"
                    style={{ borderRadius: '5px' }}
                  />
                  </center>
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
              {status!="reserved"&&<Flex justify='right'> <Button onClick={()=>showModal()} type='primary'>Return the Book</Button></Flex>}
            </Card>
            
        
            </Flex>

          )}
          <EditModal fetchData={fetchData} reservationId={reservationId} openModal={openModal} closeModal={closeModal} modalState={modalState} />
          <ReturnModal
              fetchData={fetchData}
              open={open}
              openFuntion={showModal}
              close={closeModal1}
              recordData={{ resource: resource, reservationNo: reservation,status:status }}
      />
        </Spin>
       
      )}
    </Flex>
  )
}

export default AboutCard
