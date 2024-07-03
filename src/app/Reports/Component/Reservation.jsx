import React,{useEffect, useState} from 'react';
import { DatePicker, Space ,Button,Empty, Flex,Row,Col, Skeleton} from 'antd';
import axioinstance from '../../Instance/api_instance';
import Reportres from './Reservationreport';
import BarChart from './barchart';
import axios from 'axios';

const { RangePicker } = DatePicker;

function page(){
  const [StartDate, setStartDate] = useState('');
  const [EndDate, setEndDate] = useState('');
  const [showUsegen, setShowUsegen] = useState(false);
  const [data, setData] = useState(null);
  const[chart1,setChart1]=useState([]);
  

  
  const genarate=async()=>{
    try{
      const response1 = await axioinstance.post("Report/reservationscount",{
        StartDate1:StartDate,
        EndDate1:EndDate
      });
      setShowUsegen(true); // Set the state to show Usegen component
      setData(response1.data);
      console.log(response1.data);
      //alert(response1.data);
      
      console.log(response2.data)
    }
    catch(err){ 
      console.log(err);
    }
    
  }
  const lastweek=async()=>{
    const response2 = await axioinstance.post("Dashboard/getLastWeekReservations");
    setChart1(response2.data);
  }


useEffect(() => {lastweek()}, []);


  return(
    <div>
      <center><BarChart data={chart1} /></center>
        <div>
          <br /><br /><br />
          <RangePicker onChange={(e,s)=>{setStartDate(s[0]);setEndDate(s[1])}}/><br/>
          <Button type="primary" style={{ marginLeft:100 , marginTop:50}} onClick={genarate} >Generate</Button> <br />
        </div>
        <Row>
        <Col sm={12} xs={24}>
        {showUsegen || <Empty style={{paddingLeft:300 ,paddingBottom:200 }}/>}
        {showUsegen && <Reportres style={{ marginTop: 0 }} data={data} />}
      </Col>
      
     
     
        </Row>
      
      {/* <button type='primary' onClick={genarate} style={{ marginLeft:100 , marginTop:50}}>Genarate</button> */}
      
      
      
    </div>
  )
  
}


export default page;