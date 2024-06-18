'use client'
import React, { useEffect, useState } from 'react'
import { Button, Card, Col, Flex, Table ,Row, Spin, Skeleton, Carousel} from 'antd'
import {
    ArrowDownOutlined, ArrowUpOutlined, ReadOutlined, UserOutlined,
    AuditOutlined, DoubleRightOutlined, CalendarOutlined
    , FieldTimeOutlined, UserAddOutlined, NotificationOutlined, InteractionOutlined,
    FileTextOutlined ,
    BookOutlined ,
    WarningOutlined ,
    InfoCircleOutlined,
    SmileOutlined,
    SmileFilled,
    SmileTwoTone,
    CloudServerOutlined,
    DoubleLeftOutlined,
    FallOutlined
} from '@ant-design/icons';
import DashboardCard from './DashboardCard';
import OverdueTable from "../Component/OverdueTable"
import Chart from "../Component/Chart"
import RecentNoti from "../Component/RecentNoti"
import axioinstance from '../../Instance/api_instance';
import { UserContext } from '@/app/Context/Context';

function Dashboard() {

    const iconStyle=  {padding:16,borderRadius:32,fontSize:24,background:"rgb(150,119,255)",border:'0px solid rgb(0,21,41)',color:'rgb(0,21,41)'}
    const [statics,setStatics]=useState({});
    const[chart1,setChart1]=useState([]);
    const[chart2,setChart2]=useState([]);
    const user =React.useContext(UserContext).user;
    const [announcement,setAnnouncement]=useState([]);

    const fetchData=async()=>{
      try{
        const response1 = await axioinstance.post("Dashboard/getDashboradData");
        const response2 = await axioinstance.post("Dashboard/getLastWeekReservations");
        const response3 = await axioinstance.post("Dashboard/getLastWeekUsers");
        setStatics(response1.data);
        setChart1(response2.data);
        setChart2(response3.data);
      }
      catch(err){ 
        console.log(err);
      }
    }
    
    const getannouncement=async()=>{
      try{
         const response = await axioinstance.post("Dashboard/getAnouncement");
         setAnnouncement(response.data);
         console.log(response.data);
      }
      catch(err){ 
        console.log(err);
      } 
    }

    useEffect(() => {
        fetchData();
        getannouncement();
    }, [user.userType])

   

    useEffect(() => {()=>getannouncement()}, [])

    return (
    
      

       <div>
          {user.userType ==="admin" &&
          <div>
          <Row style={{ width: "100%" }}  gutter={[5, 5]}>
         
          <Col xs={24} sm={6}><DashboardCard loading={statics.total==undefined} title="Total Books" value={statics.total} icon={<ReadOutlined style={iconStyle} />} /></Col>
            <Col xs={24} sm={6}><DashboardCard loading={statics.total==undefined} title="Total Users" value={statics.users} icon={<UserOutlined style={iconStyle}/>} /></Col>
            <Col xs={24} sm={6}><DashboardCard loading={statics.total==undefined} title="Total Locations" value={statics.locations} icon={<CloudServerOutlined style={iconStyle}/>} /></Col>
            <Col xs={24} sm={6}><DashboardCard loading={statics.total==undefined} title="Total Reservations" value={statics.reservations}icon={<InteractionOutlined style={iconStyle}/>} /></Col>
          
            <Col  xs={24} sm={6}><DashboardCard loading={statics.total==undefined} title="Issued Today" value={statics.issueToday} icon={<DoubleRightOutlined style={iconStyle}/>} /></Col>
            <Col xs={24} sm={6}><DashboardCard loading={statics.total==undefined} title="Returned Today" value={statics.returnToday} icon={<DoubleLeftOutlined style={iconStyle}/>} /></Col>
            <Col xs={24} sm={6}><DashboardCard loading={statics.total==undefined} title="Requests" value={statics.requests} icon={<AuditOutlined style={iconStyle}/>} /></Col>
            <Col xs={24} sm={6}><DashboardCard loading={statics.total==undefined} title="Overdue" value={statics.overDue} icon={<WarningOutlined style={iconStyle}/>} /></Col>  
          </Row>
       
          {typeof window !== "undefined" && (
                
                    <Row style={{ width: "100%", margin: '30px 0' }} gutter={[5, 5]}>
                        <Col xs={24} sm={12}><Skeleton active loading={chart1.length==0}><Chart topic="This week transitions" data={chart1} /></Skeleton></Col>
                        <Col xs={24} sm={12}><Skeleton active loading={chart2.length==0}><Chart topic="This week new users" data={chart2} /></Skeleton></Col>
                    </Row>)}
           {/* <Row style={{ width: "100%" ,margin:'30px 0'}}  gutter={[5, 5]}>
            <Col xs={24} sm={12}><Chart topic="This week transitions" data={chart1}/></Col>
            <Col xs={24} sm={12}><Chart topic="Ebook Views" data={chart2}/></Col>
          </Row>  */}
          <Row style={{ width: "100%" ,margin:'30px 0'}}  gutter={[5, 5]}>
           {/* <Col xs={24} sm={10}><RecentNoti/></Col> */}
            <Col xs={24} sm={24}><OverdueTable /></Col>
          </Row>
         
        </div> }
        {user.userType ==="patron" &&
        <div>
          <div style={{fontSize:20}}>👋 Hello...{user.fName+" "+user.lName}.....</div>
          <br/>
          <Card >
          <div style={{fontSize:20} }>
          📢 Announcement
          </div>
          <br></br>
          <Carousel arrows infinite={true} style={{height:"100px",textWrap:'wrap',fontSize:18,overflowX:"hidden"}}>
            {announcement.map((item,index)=><div key={index}>{item}</div>)}
          </Carousel>
          </Card>
          <br/>
          <Row style={{ width: "100%" }}  gutter={[5, 5]}>
          <Col xs={24} sm={6}><DashboardCard title="Status" value={statics.status!=undefined?statics.status.toUpperCase():0} icon={<WarningOutlined style={iconStyle}/>} /></Col>
           <Col  xs={24} sm={6}><DashboardCard title="My Reservations" value={statics.myReservations} icon={<DoubleRightOutlined style={iconStyle}/>} /></Col>
           <Col xs={24} sm={6}><DashboardCard title="My Requests" value={statics.requests} icon={<AuditOutlined style={iconStyle}/>} /></Col>
           <Col xs={24} sm={6}><DashboardCard title="Penalty" value={statics.penalty} icon={<FallOutlined style={iconStyle}/>} /></Col>  
          
         </Row>
         <br/>
         <OverdueTable />
        </div>}
        
        

         
           
          
        


        </div>
    
       
    )
}

export default Dashboard
