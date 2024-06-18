'use client'
import { Avatar, Button, Col, Descriptions, Flex, Image, Row } from 'antd'
import Card from 'antd/es/card/Card'
import Link from 'next/link';
import React, { useEffect, useState } from 'react'
import EditModal from './EditModal'
import { HomeOutlined, EditOutlined, DeleteOutlined, UserOutlined } from '@ant-design/icons';
import axioinstance from '@/app/Instance/api_instance';


function AboutCard({ username }) {
  const [modalState, changeModalState] = useState(false);
  const [userType, setUserType] = useState('');
  const [userStatus, setUserStatus] = useState('');
  const [items, setItem] = useState([
    {
      key: '1',
      span: 2,
      label: 'Username',
      children: "",
    },
    {
      key: '2',
      span: 2,
      label: 'Email',
      children: ""
    },
    {
      key: '3',
      label: 'First Name',
      span: 2,
      children: "",
    },
    {
      key: '4',
      label: 'Last Name',
      span: 2,
      children: "",
    },
    {
      key: '5',
      span: 2,
      label: 'NIC',
      children: "",
    },
    {
      key: '6',
      span: 2,
      label: 'Address',
      children: "",
    },
    {
      key: '7',
      label: 'Phone Number',
      children: "",
    },
  ]);

  useEffect(() => {
    getuserdata();
  }, [username]);

  const getuserdata = async () => {
    try {
      const response = await axioinstance.post('User/AboutUser', { username: username });
      setItem([
        {
          key: '1',
          label: 'Username',
          children: response.data.userName,
        },
        {
          key: '2',
          label: 'Email',
          children: <a href={`mailto:${response.data.email}`}>{response.data.email}</a>,
        },
        {
          key: '3',
          label: 'First Name',
         // span: 2,
          children: response.data.fName,
        },
        {
          key: '4',
          label: 'Last Name',
          //span: 2,
          children: response.data.lName,
        },
        {
          key: '5',
          label: 'NIC',
          children: response.data.nic,
        },
        {
          key: '6',
          label: 'Date of Birth',
          children: response.data.dob,
        },
        {
          key: '7',
          label: 'Address',
          children: response.data.address,
        },
        {
          key: '8',
          label: 'Phone Number',
          children: response.data.phone,
        },
        {
          key: '8',
          label: 'No. of Reservations',
          children: response.data.reservationcount,
        },
      ]);
      setUserType(response.data.actualType);
      setUserStatus(response.data.status);
    } catch (error) {
      console.error(error);
    }
  }

  const openModal = () => {
    changeModalState(true);
  }
  const closeModal = () => {
    changeModalState(false);
  }

  useEffect(() => {getuserdata()},[])
  return (
    <Flex style={{ width: '100%' }} justify='center'>
      <Card bordered style={{ borderWidth: 3, width: '80%' }}>
        <Flex justify='space-between' wrap='wrap'>
          <div>
            {userType !== "" && <Button type='primary' style={{ margin: "0 20px 20px 0" }} shape='round'>{userType.toUpperCase()}</Button>}
            {userStatus !== "" && <Button type='primary' danger={userStatus.toLowerCase() === "loan"} shape='round'>{userStatus.toUpperCase()}</Button>}
          </div>
          {/* <Button type='primary' shape='circle' icon={<DeleteOutlined />}></Button> */}
        </Flex>
        <Row gutter={[30, 30]} align="middle" justify="center">
          <Col md={6} sm={24} xs={24} >
          <center>
          <Avatar size={128} icon={<UserOutlined />} />
          </center>
          </Col>
          <Col md={18} sm={24} xs={24}>
            <Descriptions
              title={<div>User Details<Link href=" " onClick={openModal}><span><DeleteOutlined /></span></Link></div>}
              layout="horizontal"
              column={{
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
        <Flex justify='right'> <Link href={`/Reservations/ReservationofUsers/${username}`}><Button type='primary'>See Reservations</Button></Link></Flex>
       
      </Card>
      <EditModal open1={openModal} close1={closeModal} open={modalState} />
    </Flex>
  )
}

export default AboutCard
