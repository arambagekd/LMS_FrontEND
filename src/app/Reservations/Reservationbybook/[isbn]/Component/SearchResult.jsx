'use client'
import ResultTable from '../Component/ResultTable'
import React, { useEffect, useState } from 'react'
import { UserDeleteOutlined, MoreOutlined } from '@ant-design/icons';
import { Button, ConfigProvider, Space, Spin, Tag, Tooltip } from 'antd';
import ReturnModal from '../../../Component/ReturnModal'
import Link from 'next/link';
import SeachReservations from './SeachReservations';
import axios from 'axios';
import Cookies from 'js-cookie';
import axioinstance from '../../../../Instance/api_instance';
import { UserContext } from '../../../../Context/Context';
import Chart from './Chart';





function SearchResult({isbn}) {


  const token = Cookies.get('jwt');
  const [recordData, setRecord] = useState([]);
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState("*"); // State for status
  const [items, setItems] = useState([]); // State for items (search results)
  const [loading, setLoading] = useState(true); // Loading state
  const user = React.useContext(UserContext).user;
  

  const showModal = (record) => {
    setRecord(record);
    setOpen(true);
  };
  const closeModal = () => {
    setOpen(false);
  };


  const columnsAdimn  = [
    {
      title: 'Reservation',
      dataIndex: 'reservationNo',
      key: 'reservationNo',
    },
    {
      title: 'Resource',
      dataIndex: 'resource',
      key: 'resource',
    },
    {
      title: 'User Id',
      dataIndex: 'userId',
      key: 'userId',
      render: (borrowerName,record) => (<Tooltip title={borrowerName}>{record.userId}</Tooltip>)
    },
    {
      title: 'Due Date',
      dataIndex: 'dueDate',
      key: 'dueDate',
    },

    {
      title: 'Action',
      dataIndex: '',
      key: 'x',
      render: (status,record) => (
        <Space size="large">
          <Link href={`/Reservations/${record.reservationNo}`}><Button type='primary' size='small' shape='round'>More</Button></Link>
        </Space>
      )
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status, record) => (status == "borrowed" ? <Button onClick={() => showModal(record)} type='primary' size='small' shape='round'>Borrowed</Button> : (status == "overdue" ? <Button onClick={() => showModal(record)} type='primary' danger size='small' shape='round'> Overdue</Button> : <Button type='primary' disabled size='small' shape='round'>Reserved</Button>)),
    },

  ];

  const columnsUser  = [
    {
      title: 'Reservation',
      dataIndex: 'reservationNo',
      key: 'reservationNo',
    },
    {
      title: 'Due Date',
      dataIndex: 'dueDate',
      key: 'dueDate',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
    },
    {
      title: 'Action',
      dataIndex: '',
      key: 'x',
      render: (status,record) => (
        <Space size="large">
          <Link href={`/Reservations/${record.reservationNo}`}><Button type='primary' size='small' shape='round'>More</Button></Link>
        </Space>
      )
    },
   

  ];


  async function fetchData() { // Function to fetch data from server
    setLoading(true); // Set loading to true while fetching
    try {
      // Sending POST request to fetch data based on search parameters
      const response = await axioinstance.post('Reservation/SearchReservation', 
      {
        keywords: isbn,
        type: 'resourceId',
      }
    );
      const data = response.data.reverse(); // Extracting data from response
      console.log(data);
      setLoading(false); // Setting loading to false after data is fetched
      setItems(data); // Updating items state with fetched data
    } catch (error) {
      setLoading(false); // Setting loading to false if there's an error
      console.log('Error fetching data:', error); // Logging error to console
    }
  }



  const search = () => {
    fetchData();
  } // Function to trigger search

  useEffect(() => { fetchData() }, [user.userType]); // Fetch data on component mount

  return (

    <div>
         
      <SeachReservations func1={setStatus} isbn={isbn}/>

      <ResultTable loading={loading} nodata={false} dataset={status === "*" ? items : items.filter(book => book.status === status)} columnset={user.userType=="admin"?columnsAdimn:columnsUser} pagination={{ pageSize: 20 }} />
        <ReturnModal fetchData={fetchData}  open={open} openFuntion={showModal} close={closeModal} recordData={recordData} />
        {typeof window !== "undefined" && (
                
                <Chart topic="This week transitions" data={[]} />
                    )}
    </div>
  )
}

export default SearchResult
