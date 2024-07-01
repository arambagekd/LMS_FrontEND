'use client'
import { Card, Space} from 'antd'
import React, { useEffect } from 'react'
import ResultTable from '../../Component/ResultTable'
import {BellOutlined  } from '@ant-design/icons';
import Link from 'next/link';
import axioinstance from '../../Instance/api_instance';
import { UserContext } from '@/app/Context/Context';

const columns = [
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
      title: 'User',
      dataIndex: 'borrowerName',
      key: 'borrowerName',
    },
      {
        title: 'Due Date',
        dataIndex: 'dueDate',
        key: 'dueDate',
      },
     
    {
      title: 'Remind',
      dataIndex: '',
      key: 'x',
      render: () => (
        <Space size="large">
        <Link href="/" ><BellOutlined  style={{color:'red'}}/></Link>
        </Space>
      )
    },
  
  ];



function OverdueTable() {
  const [reservation, setReservation] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const user = React.useContext(UserContext).user;

  const GetReservations = async () => {
    try{
      const response = await axioinstance.post('Dashboard/getOverDueList');
      setReservation(response.data);
    }catch{
      console.log("Can't fetch data");
    }
    setLoading(false);
  }

  useEffect(() => {GetReservations()},[])

  return (
    <Card>
    <div >
        {user.userType==="admin" && <h4>Overdue List</h4>}
        {user.userType==="patron" && <h4>My Reservations</h4>}
         <ResultTable  loading={loading} dataset={reservation} columnset={columns} pagination={false}/>
    </div>
    </Card>
  )

}

export default OverdueTable
