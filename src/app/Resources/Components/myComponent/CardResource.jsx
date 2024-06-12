'use client'
import React, { useState } from 'react';
import { Card, Space, Col, Row, Image, Flex, Button, ConfigProvider, message, Popconfirm } from 'antd';
import Link from 'next/link';
import IssueModal from '../../../Reservations/Component/IssueModal';
import AboutCard from '../../[isbn]/Components/AboutCard';
import { UserContext } from '@/app/Context/Context';
import axioinstance from '@/app/Instance/api_instance';




function CardResource(props) {
  const [open, setOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const user = React.useContext(UserContext).user;
  const[loading,setLoading]=useState(false);
  const [messageApi, contextHolder] = message.useMessage();

  const showModal = () => {
    setOpen(true);
  };
  const closeModal = () => {
    setOpen(false);
  };
  
  const getCardStyle = () => {
    return {
        transition: 'all 0.3s ease',
        boxShadow: isHovered ? '0 4px 8px 0 rgba(0, 0, 0, 0.40)' : '0 4px 8px 0   rgba(0, 0, 0, 0.15)', // Apply shadow on hover
        backgroundColor: isHovered ? '#f5f5f5' :  'white', // Change background color on hover
    };
};

const successModal = () => {
  messageApi.open({
    type: "success",
    content: `SuccessFully Requested to ${props.dataset.isbn}`,
  });
};

const errorModal = (e) => {
  messageApi.open({
    type: "error",
    content: e,
  });
};

const request=async()=>{
  setLoading(true);
  try{
      await axioinstance.post("Request/RequestResource",{
      isbn:props.dataset.isbn
    })
    successModal();
  }catch(error){
    errorModal(error.response.data);
    console.log(error.response);
  }
  setLoading(false);
}


 

  return (

    <Col >
    {contextHolder}
      <ConfigProvider
        theme={{
        token: {
        colorBorderSecondary:"rgba(0 ,33, 64,0.2)",
        borderRadiusLG:0
      },}}>
 
      <Card  styles={{body: { padding: '0' }}}
             style={getCardStyle()} // Apply styles based on hover state
             onMouseEnter={() => setIsHovered(true)} // Set hover state to true on mouse enter
             onMouseLeave={() => setIsHovered(false)}  
      >
        <Row style={{ width: "100%" }} justify="center" >
          <Col >
            <Image 
              src={props.dataset.url}
              alt={`Image of ${props.dataset.title}`}
              width="140px"
              height="210px"
            />
          </Col>
          <Col style={{ lineHeight: '32px',padding:' 15px 15px 15px 15px' }} >
           <div style={{lineHeight:2}}><b>{props.dataset.title.length < 12 ? props.dataset.title: props.dataset.title.substring(0, 12) + "...."}</b> <br/>    
            {props.dataset.isbn.length < 14 ? props.dataset.isbn: props.dataset.isbn.substring(0, 14) + "..."}<br/> 
            {props.dataset.author.length < 14 ? props.dataset.author: props.dataset.author.substring(0, 14) + "..."}<br/> 
            No of Books: {props.dataset.remain}
            </div>

            <Flex style={{ fontWeight: 600, }} justify='space-between'>
                <Link href={`/Resources/${props.dataset.isbn}`}>More..</Link>  
            </Flex>
            {user.userType === 'admin' ?
            <Button disabled={props.dataset.remain<1}  type='primary' size="small" block onClick={showModal} >Issue</Button>:
            <Popconfirm
            disabled={props.dataset.remain<1}
            title="Request a book"
            description="Are you sure to request?"
            onConfirm={request}
            okText="Yes"
            cancelText="No"
            
          >
            <Button type='primary' loading={loading} disabled={props.dataset.remain<1} size="small" block >Request</Button>
            </Popconfirm>
            }
            
          </Col>

        </Row>
      </Card>
      
      </ConfigProvider>

      <IssueModal open={open} openFuntion={showModal} close={closeModal} data={props.dataset.isbn} />
    </Col>



  )
}


export default CardResource