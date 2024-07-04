'use client'
import { Button, Flex, Space, Table,FloatButton, Avatar, Popconfirm } from 'antd'
import React, { useEffect, useState } from 'react'
import { UserDeleteOutlined ,MoreOutlined,PlusOutlined, UsbOutlined, UserOutlined} from '@ant-design/icons';
import ResultTable from '../../Component/ResultTable';
import Link from 'next/link';
import AddUserModal from './AddUserModal';
import SearchUsers from './SearchUsers';
import axioinstance from '../../Instance/api_instance';
import { UserContext } from '@/app/Context/Context';
import { permission } from 'process';
import { showToastError, showToastSuccess } from '@/app/Component/NewToast';



function SearchResult(props) {

  const [keyword, setKeyword] = useState(""); // State for keyword
  const [role, setRole] = useState("*"); // State for status
  const [type, setType] = useState("all"); 
  const [items, setItems] = useState([]); // State for items
  const [loading, setLoading] = useState(true); // Loading state
  const user=React.useContext(UserContext).user;

  const [open, setOpen] = useState(false);
  const showModal = () => {
  setOpen(true);
  };
  const closeModal=()=>{
  setOpen(false);
  };

  const setPermission = async(username)=>{
    try{
      await axioinstance.get(`User/SetPermission?username=${username}`);
      fetchData(type);
      showToastSuccess("Permission Updated");
    }catch(error){
      showToastError(error,"Failed to update permission");
    }
  }


  const columns = [
    {
        title: 'User Name',
        dataIndex: 'username',
        key: 'userId',
        render:(username, record)=>
          <><Avatar size={30} src={record.image} icon={<UserOutlined/>} style={{margin:"0 10px 0 0"}}/>{record.username}</>
      },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Email Address',
      dataIndex: 'email',
      key: 'email',
      render:(username, record)=>
      <a href={`mailto:${record.email}`}>{record.email}</a>
    },
    {
        title: 'Role',
        dataIndex: 'role',
        key: 'role',
        
      },
    {
      title: 'More',
      dataIndex: '',
      key: 'x',
      render: (username, record) => (
        <>
        <Space size="large" >
          <Link href={`/Users/${record.username}`} ><MoreOutlined/></Link>
        </Space>
         
        </>
      )
    },
    {
      title: 'Permission',
      dataIndex: '',
      key: 'x',
      render: (username, record) => (
        <>
        
          <Space size="large">
          <Popconfirm
                title={record.permission?"Remove Permission":"Give Permission"}
                description={record.permission?"Are you sure to Remove Permission?":"Are you sure to Give Permission?"}
                onConfirm={()=>setPermission(record.username)}
                okText="Yes"
                cancelText="No"
              >                
          <Button type='primary' disabled={record.role=="admin"}  danger={!record.permission} icon={<UserDeleteOutlined />}size='small'></Button>
          </Popconfirm>
        </Space>
        </>
      )
    },
  ];


  const fetchData = async(type)=>{
   
    try{
      const response = await axioinstance.post('User/SearchUser',{
        keyword:keyword,
        type:type
      });
      setLoading(false);
      setItems(response.data);
    }catch(error){
      setLoading(false);
    }
  }

  const search = () => {
    fetchData(type);
  } // Function to trigger search

  
useEffect(()=>{fetchData(type)},[]);
  return(
    <>
   
     <SearchUsers func1={setRole} func2={setType} func3={setKeyword} search={search}></SearchUsers>
    <ResultTable loading={loading}  dataset={role=== "*" ? items : items.filter(user => user.role.toLowerCase() === role.toLowerCase())} columnset={columns} pagination={{pageSize:20}}/>
    <AddUserModal open={open} openModal={showModal} closeModal={closeModal} fetchData={fetchData}/>
    <FloatButton  onClick={showModal} icon={<PlusOutlined/>} tooltip="Add a User" type='primary'/> 
    </>
  )
}

export default SearchResult
