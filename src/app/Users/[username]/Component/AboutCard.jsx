'use client'
import { Button, Col, Descriptions, Flex, Row } from 'antd'
import Card from 'antd/es/card/Card'
import Link from 'next/link';
import React, { useEffect, useState } from 'react'
import EditModal from './EditModal'
import { HomeOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
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
          children: response.data.email,
        },
        {
          key: '3',
          label: 'First Name',
          span: 2,
          children: response.data.fName,
        },
        {
          key: '4',
          label: 'Last Name',
          span: 2,
          children: response.data.lastName,
        },
        {
          key: '5',
          label: 'NIC',
          children: response.data.nic,
        },
        {
          key: '6',
          label: 'Address',
          children: response.data.address,
        },
        {
          key: '7',
          label: 'Phone Number',
          children: response.data.phone,
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

  return (
    <Flex style={{ width: '100%' }} justify='center'>
      <Card bordered style={{ borderWidth: 3, width: '80%' }}>
        <Flex justify='space-between'>
          <div>
            {userType !== "" && <Button type='primary' style={{ margin: "0 20px 20px 0" }} shape='round'>{userType}</Button>}
            {userStatus !== "" && <Button type='primary' danger={userStatus === "loan"} shape='round'>{userStatus}</Button>}
          </div>
          <Button type='primary' shape='circle' icon={<DeleteOutlined />}></Button>
        </Flex>
        <Row gutter={[30, 30]} align="middle" justify="center">
          {/* <Col md={6} sm={24} xs={24} >
          
            <Image 
            src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlcnxlbnwwfHwwfHx8MA%3D%3D"
            alt="Picture of the author"
            width="100%"
            style={{borderRadius:'50%'}}
          />
          </Col> */}
          <Col md={18} sm={24} xs={24}>
            <Descriptions
              title={<div>User Details<Link href=" " onClick={openModal}><span><EditOutlined /></span></Link></div>}
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
      </Card>
      <EditModal open1={openModal} close1={closeModal} open={modalState} />
    </Flex>
  )
}

export default AboutCard
