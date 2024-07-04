'use client'
import { Button, Card, Flex, Popconfirm, Space} from 'antd'
import React, { useEffect } from 'react'
import ResultTable from '../../Component/ResultTable'
import {BellFilled, BellOutlined, NotificationOutlined  } from '@ant-design/icons';
import Link from 'next/link';
import axioinstance from '../../Instance/api_instance';
import { UserContext } from '@/app/Context/Context';
import { showToastError, showToastSuccess } from '@/app/Component/NewToast';

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

  const columnspatron = [
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
        title: 'Due Date',
        dataIndex: 'dueDate',
        key: 'dueDate',
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

  const RemindOverdue = async () => {
    try{
      const response = await axioinstance.get('Reservation/RemindOverdue');
      showToastSuccess( "Reminded Overdue successfully");
    }catch(error){
      console.log(error);
      showToastError(error, "Sorry! Can't remind overdue");
    }
    setLoading(false);
  
  }

  useEffect(() => {GetReservations()},[])

  return (
    <Card>
    <div >
        {user.userType==="admin" && <><Space style={{fontSize:20,fontWeight:600}}  >Overdue List</Space> 
        <Popconfirm
                title="Remind"
                description="Are you sure to remind overdue"	
                onConfirm={()=>RemindOverdue()}
                okText="Yes"
                cancelText="No"
              >    
        <Button type='link' size='large' icon={<BellFilled/>} danger></Button>
        </Popconfirm></>
        }
        {user.userType==="patron" && <h4>My Reservations</h4>}
         <ResultTable  loading={loading} dataset={reservation} columnset={user.userType==="admin"?columns:columnspatron} pagination={false}/>
    </div>
    </Card>
  )

}

export default OverdueTable
