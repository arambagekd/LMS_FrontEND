'use client'
import React, { useEffect, useState } from 'react'
import { Button, Card, Col, Flex, Table ,Row} from 'antd'
import {
    ArrowDownOutlined, ArrowUpOutlined, ReadOutlined, UserOutlined,
    AuditOutlined, DoubleRightOutlined, CalendarOutlined
    , FieldTimeOutlined, UserAddOutlined, NotificationOutlined, InteractionOutlined,
    FileTextOutlined ,
    BookOutlined ,
    WarningOutlined ,
    InfoCircleOutlined
} from '@ant-design/icons';
import DashboardCard from './DashboardCard';
import OverdueTable from "../Component/OverdueTable"
import Chart from "../Component/Chart"
import RecentNoti from "../Component/RecentNoti"
import axioinstance from '../../Instance/api_instance';

const chart2 = [
    {
        day: '01-07',
        y: 15,
      },
      {
        day: '01-08',
        y: 15,
      },
      {
        day: '01-09',
        y: 25,
      },
      {
        day: '01-10',
        y: 2,
      },
      {
        day: '01-11',
        y: 12,
      },
      {
        day: '01-12',
        y: 42,
      }
  ]



function Dashboard() {

    const iconStyle=  {padding:16,borderRadius:32,fontSize:24,background:"rgb(150,119,255)",border:'0px solid rgb(0,21,41)',color:'rgb(0,21,41)'}
    const [statics,setStatics]=useState({});
    const[loading,setLoading]=useState(true);
    const[chart1,setChart1]=useState([]);

    const fetchData=async()=>{
      try{
        const response1 = await axioinstance.get("Dashboard/getAdminDashboradData");
        const response2 = await axioinstance.get("Dashboard/getLastWeekReservations");
        console.log(response1.data);
        setStatics(response1.data);
        setChart1(response2.data);
      }
      catch(err){ 
        console.log(err);
      }
    }


    useEffect(() => {
        fetchData();
    }, [])

    useEffect(() => {()=>setLoading(false);}, [statics])


    return (
    
      

       <div>
          
          <Row style={{ width: "100%" }}  gutter={[5, 5]}>
            <Col xs={24} sm={6}><DashboardCard title="Total" value={statics.total} icon={<ReadOutlined style={iconStyle} />} /></Col>
            <Col xs={24} sm={6}><DashboardCard title="Navels" value={statics.navels} icon={<UserOutlined style={iconStyle}/>} /></Col>
            <Col xs={24} sm={6}><DashboardCard title="Ebooks" value={statics.ebooks} icon={<FileTextOutlined style={iconStyle}/>} /></Col>
            <Col xs={24} sm={6}><DashboardCard title="Journals" value={statics.journals}icon={<BookOutlined style={iconStyle}/>} /></Col>
          
            <Col  xs={24} sm={6}><DashboardCard title="Users" value={statics.users} icon={<UserOutlined style={iconStyle}/>} /></Col>
            <Col xs={24} sm={6}><DashboardCard title="Reservations" value={statics.reservations} icon={<DoubleRightOutlined style={iconStyle}/>} /></Col>
            <Col xs={24} sm={6}><DashboardCard title="Requests" value={statics.requests} icon={<AuditOutlined style={iconStyle}/>} /></Col>
            <Col xs={24} sm={6}><DashboardCard title="Overdue" value={statics.overDue} icon={<WarningOutlined style={iconStyle}/>} /></Col>
          </Row>
          {/* <Row style={{ width: "100%" ,margin:'30px 0'}}  gutter={[5, 5]}>
            <Col xs={24} sm={12}><Chart topic="This week transitions" data={chart1}/></Col>
            <Col xs={24} sm={12}><Chart topic="Ebook Views" data={chart2}/></Col>
          </Row> */}
          <Row style={{ width: "100%" ,margin:'30px 0'}}  gutter={[5, 5]}>
            <Col xs={24} sm={10}><RecentNoti/></Col>
            <Col xs={24} sm={14}><OverdueTable /></Col>
          </Row>

         
           
          
        


        </div>
    
       
    )
}

export default Dashboard
