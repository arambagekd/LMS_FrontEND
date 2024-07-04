import React,{useState,useEffect} from 'react';
import { DatePicker, Space ,Button,Empty, Flex,Row,Col, Skeleton} from 'antd';
import axioinstance from '../../Instance/api_instance';
import Usegen from './usegen';
import axios from 'axios';
import Chart from '../../Dashboard/Component/Chart'
import BarChart from './barchart';

const { RangePicker } = DatePicker;

function Resources(){
  const [StartDate, setStartDate] = useState('');
  const [EndDate, setEndDate] = useState('');
  const [showUsegen, setShowUsegen] = useState(false);
  const [data, setData] = useState([]);
  const[chart1,setChart1]=useState([]);
  const[chart2,setChart2]=useState([]);
  

  
  const genarate=async()=>{
    try{
      const response1 = await axioinstance.post("Report/resoursecount",{
        StartDate:StartDate,
        EndDate:EndDate
      });
      setShowUsegen(true); // Set the state to show Usegen component
      setData(response1.data);
      //alert(response1.data);
    }
    catch(err){ 
      console.log(err);
    }
    
  }

  const lastweek=async()=>{
    const response2 = await axioinstance.post("Dashboard/getLastWeekResourses");
    const response3 = await axioinstance.post("Report/GetAllLocation");
    setChart1(response2.data);
    setChart2(response3.data);
    console.log(response3.data)
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
            {showUsegen ? <Usegen style={{ marginTop: 0 }} data={data}/> : <Empty  style={{ margin: '30px 200px 100px 0'}}/>}
          </center>
        </Col>
      </Row>
        <Row style={{ width: "100%", margin: '15px 0' }} gutter={[5, 5]}>
        <Col sm={12} ><Skeleton active loading={chart1.length==0}><center><BarChart data={chart1} title="Last Week Resourses" /></center></Skeleton></Col>
        <Col sm={12} ><Skeleton active loading={chart2.length==0}><center><BarChart data={chart2} title="Resourses in Cupboard" /></center></Skeleton></Col>
                    </Row>


      </Flex>
      
      
      
      
    </div>
  )
  
}


export default Resources;