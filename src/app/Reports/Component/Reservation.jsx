import React,{useEffect, useState} from 'react';
import { DatePicker, Space ,Button,Empty, Flex,Row,Col, Skeleton} from 'antd';
import axioinstance from '../../Instance/api_instance';
import Reportres from './Reservationreport';
import BarChart from './barchart';
import axios from 'axios';

const { RangePicker } = DatePicker;

function Reservation(){
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
            <Flex wrap='wrap'>
            <Row style={{ width: "100%"}} gutter={[5, 5]}>
        <Col sm={6}>
          <center>
            <RangePicker onChange={(e, s) => { setStartDate(s[0]); setEndDate(s[1]); }}  style={{margin: '30px 0 0 0'}}/><br /><br/><br/>
            <Button type="primary" onClick={genarate}>Generate</Button><br />
          </center>
        </Col>
        <Col sm={18}>
          <center>
            {showUsegen ? <Reportres style={{ marginTop: 0 }} data={data} /> : <Empty  style={{ margin: '30px 200px 100px 0'}}/>}
          </center>
        </Col>
      </Row>
        <Row style={{ width: "100%", margin: '15px 0' }} gutter={[5, 5]}>
        <Col sm={24} ><Skeleton active loading={chart1.length==0}><center><BarChart data={chart1} title="Last Week Reservation" /></center></Skeleton></Col>
                    </Row>


      </Flex>
         
    </div>
  )
  
}


export default Reservation;