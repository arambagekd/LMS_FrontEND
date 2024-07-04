// 'use client'
// import { Button, Col, Descriptions, Flex, Image, Row,Tooltip,ConfigProvider, message, Popconfirm} from 'antd'
// import { Collapse } from 'antd';
// const { Panel } = Collapse;
// import Card from 'antd/es/card/Card'
// import Link from 'next/link';
// import React, { useState,useEffect} from 'react'
// import EditModal from './EditModel'
// import { EditOutlined,DeleteOutlined ,LeftCircleOutlined} from '@ant-design/icons';
// import axioinstance from '../../../Instance/api_instance';
// import IssueModal from '../../../Reservations/Component/IssueModal';
// import { useRouter } from 'next/navigation';
// import { UserContext } from '@/app/Context/Context';
// import { showToastError, showToastSuccess } from '@/app/Component/NewToast';
// import ReviewForm from './ReviewForm';




// function AboutCard(props) {
//   const [open, setOpen] = useState(false);
//   const [issue, setIssue] = useState(false);
//   const [items,setItem]=useState([]);
//   const [error,seterror]=useState(false);
//   const [loading,setLoading]=useState(false);
//   const[status,setStatus]=useState("")
//   const [responseData,setresponseData]=useState([]);
//   const[collapse,setCollapse]=useState(true);
//   const router=useRouter();
//   const user=React.useContext(UserContext).user;


//   const showModal = () => {
  
//     setOpen(true);
//   };
//   const closeModal = () => {
//     setOpen(false);
//   };

//   const showIssue = () => {
  
//     setIssue(true);
//   };
//   const closeIssue = () => {
//     setIssue(false);
//   };

//   const fetchData=async()=>{
//     try{
//       const response = await axioinstance.post(`Resource/AbouteResource?isbn=${props.isbn}`);
//       const responseData = response.data;
//       setStatus(response.data.status);
//       const items = [
//         { key: '1', label: 'Resource ID (ISBN)', children: responseData.isbn},
//         { key: '2', label: 'Title', children: responseData.title},
//         { key: '3', label: 'Author', children: responseData.author},
//         { key: '4', label: 'Year', children:responseData.year},
//         { key: '5', label: 'Type', children: responseData.type},
//         { key: '6', label: 'Price', children: responseData.price},
//         { key: '7', label: 'No. Pages', children: responseData.pages},
//         { key: '8', label: 'Added on', children: responseData.addedon},
//       ];
//       setItem(items);
//       setresponseData(responseData);
//     }
//     catch(error){
//         seterror(true);
//     }
//   }
//   const request=async()=>{
//     setLoading(true);
//     try{
//         await axioinstance.post("Request/RequestResource",{
//         isbn:props.dataset.isbn
//       })
//       showToastSuccess(`SuccessFully Requested to ${props.dataset.isbn}`);
//     }catch(error){
//       showToastError(error,"Error in requesting the resource")
//       console.log(error.response);
//     }
//     setLoading(false);
//   }
  
//   const deleteResource=async()=>{
//     try{
//       const response=await axioinstance.get(`Resource/DeleteResource?isbn=${props.isbn}`)
//       showToastSuccess(`SuccessFully Deleted ${props.isbn}`);
//       router.push("/Resources")}
//       catch(error){
//        showToastError(error,"Error in deleting the resource")
//       }
//   }

//   useEffect(() => { fetchData(); }, []);

//   const ButtonWithTooltip = ({ defaultText, hoverText }) => {
//     const [text, setText] = useState(defaultText);
  
//     const handleMouseEnter = () => {
//       setText(hoverText);
//     };
  
//     const handleMouseLeave = () => {
//       setText(defaultText);
//     };  
//     return (
//         <Button
//           type="primary"
//           style={{ background: '#2D363F', margin: '0 10px 10px 0', borderRadius: '15px',width:'80px',fontSize:'12px',}}
//           onMouseEnter={handleMouseEnter}
//           onMouseLeave={handleMouseLeave}
//         >
//           {text}
//         </Button>
//     );
//   };

//   return (
//     <ConfigProvider
//      theme={{
//      token: {
//       //colorBorder: 'rgb(255,255,255)',
//       colorTextHeading:'rgba(0, 0, 0, 0.48)'
//      },
//     }}
//     >
//     <div>
//       <Flex justify="space-between" style={{marginBottom:'20px'}}>
//         <div>
//           <font style={{ fontSize: '17px',fontWeight:'500'}}>{responseData.title!=undefined && responseData.title +" by "+ responseData.author}</font>
//         </div>
//       </Flex>
//        <Row gutter={[30, 30]}>
//       <Col md={24} sm={24} xs={24}>
//       <Card bordered style={{width:'95 %'}}>
//       {error ? (
//         <div>Loading has failed....</div>
//       ) : (
//         <><Row gutter={[30, 30]} >
//                   <Col md={8}  sm={24} xs={24} >
//                     <center>
//                     <Image
//                       src={responseData.imagepath}
//                       alt={`no image`}
//                       width="180px"
//                       height="240px"
//                       style={{ borderRadius: '5px' }} />
//                       </center>
//                   </Col>
//                   <Col md={16} sm={24} xs={24}>
//                     <Descriptions title={ <div>

//                       <Flex  style={{ margin: '20px 0px 30px 0px',justifyContent:'space-between',fontSize:'10px'}}>

//                         <Flex wrap='wrap'>
//                         <ButtonWithTooltip defaultText="Total" hoverText={responseData.total} />
//                         <ButtonWithTooltip defaultText="Borrowed" hoverText={responseData.borrowed} />
//                         <ButtonWithTooltip defaultText="Remain" hoverText={responseData.remain} />
//                         <ButtonWithTooltip defaultText="Cupboard" hoverText={responseData.cupboardName} />
//                         <ButtonWithTooltip defaultText="Shelf" hoverText={responseData.shelfId} />
//                         </Flex>
                        
//                         {user.userType==="admin"&&
//                        <div style={{ height: '30px' }}>
//                           <Popconfirm
//                 title="Remove the book"
//                 description="Are you sure to Remove?"
//                 onConfirm={deleteResource}
//                 okText="Yes"
//                 cancelText="No"
                
//               >
//                           <Button type='primary'  danger style={{ margin: " 0 10px 10px 0" }} shape='circle' icon={<DeleteOutlined />}></Button>
//                           </Popconfirm>
//                           <Button type='primary' style={{ margin: " 0 10px 10px 0" }} shape='round' icon={<EditOutlined />} onClick={showModal}></Button>
//                           </div>
//                         }
                       
//                       </Flex>
//                     </div>} layout="horizontal" column={{
//                       xs: 1,
//                       sm: 2,
//                       md: 2,
//                       lg: 2,
//                       xl: 2,
//                       xxl: 2,
//                     }}

//                       items={items} 
//                       labelStyle={{ fontWeight: '600' }}/>

//                   </Col>

//                 </Row>
                
                
//                 <Flex  justify='right'>
//                 <Link href={`/Reservations/Reservationbybook/${responseData.isbn}`}><Button type='primary' size='medium' style={{margin:'0 20px 0 0'}}>See Reservations</Button></Link>
//                 {user.userType==="admin"?
//                 <Button disabled={responseData.remain<1} type='primary' size='medium' onClick={showIssue}>Isuue</Button>:
//                 <Popconfirm
//                 disabled={responseData.remain<1}
//                 title="Request a book"
//                 description="Are you sure to request?"
//                 onConfirm={request}
//                 okText="Yes"
//                 cancelText="No"
                
//               >
//                 <Button disabled={responseData.remain<1} loading={loading} type='primary' size='medium'>Request</Button>
//                 </Popconfirm>}
//                 </Flex>
//                 </>

                
                
//         )}
//         <Collapse ghost onChange={()=>{setCollapse(!collapse)}}>
//                     <Panel header={collapse?`Read more..`:`Read less..`}  key="1" style={{fontWeight: '600'}}>
//                      <div dangerouslySetInnerHTML={{__html:responseData.description}}></div>
//                     </Panel>
//                 </Collapse>
//         <ReviewForm/>
//       </Card> 
//       </Col>
//       </Row> 
//      <EditModal  fetchData={fetchData} open={open} openFuntion={showModal} close={closeModal} data={responseData}/> 
//      <IssueModal open={issue} openFuntion={setIssue} close={closeIssue} data={responseData.isbn} />
//       </div>
//       </ConfigProvider>
//   )
// }

// export default AboutCard
'use client'
import { Button, Col, Descriptions, Flex, Image, Row, Tooltip, ConfigProvider, message, Popconfirm, Tabs } from 'antd'
import { Collapse } from 'antd';
const { Panel } = Collapse;
import Card from 'antd/es/card/Card'
import Link from 'next/link';
import React, { useState, useEffect } from 'react'
import EditModal from './EditModel'
import { EditOutlined, DeleteOutlined, LeftCircleOutlined } from '@ant-design/icons';
import axioinstance from '../../../Instance/api_instance';
import IssueModal from '../../../Reservations/Component/IssueModal';
import { useRouter } from 'next/navigation';
import { UserContext } from '@/app/Context/Context';
import { showToastError, showToastSuccess } from '@/app/Component/NewToast';
import ReviewForm from './ReviewForm';

function AboutCard(props) {
  const [open, setOpen] = useState(false);
  const [issue, setIssue] = useState(false);
  const [items, setItem] = useState([]);
  const [error, seterror] = useState(false);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("")
  const [responseData, setresponseData] = useState([]);
  const [collapse, setCollapse] = useState(true);
  const router = useRouter();
  const user = React.useContext(UserContext).user;

  const showModal = () => {
    setOpen(true);
  };
  const closeModal = () => {
    setOpen(false);
  };

  const showIssue = () => {
    setIssue(true);
  };
  const closeIssue = () => {
    setIssue(false);
  };

  const fetchData = async () => {
    try {
      const response = await axioinstance.post(`Resource/AbouteResource?isbn=${props.isbn}`);
      const responseData = response.data;
      setStatus(response.data.status);
      const items = [
        { key: '1', label: 'Resource ID (ISBN)', children: responseData.isbn },
        { key: '2', label: 'Title', children: responseData.title },
        { key: '3', label: 'Author', children: responseData.author },
        { key: '4', label: 'Year', children: responseData.year },
        { key: '5', label: 'Type', children: responseData.type },
        { key: '6', label: 'Price', children: responseData.price },
        { key: '7', label: 'No. Pages', children: responseData.pages },
        { key: '8', label: 'Added on', children: responseData.addedon },
      ];
      setItem(items);
      setresponseData(responseData);
    } catch (error) {
      seterror(true);
    }
  }

  const request = async () => {
    setLoading(true);
    try {
      await axioinstance.post("Request/RequestResource", {
        isbn: props.dataset.isbn
      })
      showToastSuccess(`Successfully Requested to ${props.dataset.isbn}`);
    } catch (error) {
      showToastError(error, "Error in requesting the resource")
      console.log(error.response);
    }
    setLoading(false);
  }

  const deleteResource = async () => {
    try {
      const response = await axioinstance.get(`Resource/DeleteResource?isbn=${props.isbn}`)
      showToastSuccess(`Successfully Deleted ${props.isbn}`);
      router.push("/Resources")
    } catch (error) {
      showToastError(error, "Error in deleting the resource")
    }
  }

  useEffect(() => { fetchData(); }, []);

  const ButtonWithTooltip = ({ defaultText, hoverText }) => {
    const [text, setText] = useState(defaultText);

    const handleMouseEnter = () => {
      setText(hoverText);
    };

    const handleMouseLeave = () => {
      setText(defaultText);
    };
    return (
      <Button
        type="primary"
        style={{ background: '#2D363F', margin: '0 10px 10px 0', borderRadius: '15px', width: '80px', fontSize: '12px', }}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {text}
      </Button>
    );
  };

  return (
    <ConfigProvider
      theme={{
        token: {
          //colorBorder: 'rgb(255,255,255)',
          colorTextHeading: 'rgba(0, 0, 0, 0.48)'
        },
      }}
    >
      <div>
        <Flex justify="space-between" style={{ marginBottom: '20px' }}>
          <div>
            <font style={{ fontSize: '17px', fontWeight: '500' }}>{responseData.title != undefined && responseData.title + " by " + responseData.author}</font>
          </div>
        </Flex>
        <Row gutter={[30, 30]}>
          <Col md={24} sm={24} xs={24}>
            <Card bordered style={{ width: '95%' }}>
              {error ? (
                <div>Loading has failed....</div>
              ) : (
                <>
                  <Row gutter={[30, 30]}>
                    <Col md={8} sm={24} xs={24}>
                      <center>
                        <Image
                          src={responseData.imagepath}
                          alt={`no image`}
                          width="180px"
                          height="240px"
                          style={{ borderRadius: '5px' }} />
                      </center>
                    </Col>
                    <Col md={16} sm={24} xs={24}>
                      <Descriptions title={
                        <div>
                          <Flex style={{ margin: '20px 0px 30px 0px', justifyContent: 'space-between', fontSize: '10px' }}>
                            <Flex wrap='wrap'>
                              <ButtonWithTooltip defaultText="Total" hoverText={responseData.total} />
                              <ButtonWithTooltip defaultText="Borrowed" hoverText={responseData.borrowed} />
                              <ButtonWithTooltip defaultText="Remain" hoverText={responseData.remain} />
                              <ButtonWithTooltip defaultText="Cupboard" hoverText={responseData.cupboardName} />
                              <ButtonWithTooltip defaultText="Shelf" hoverText={responseData.shelfId} />
                            </Flex>
                            {user.userType === "admin" &&
                              <div style={{ height: '30px' }}>
                                <Popconfirm
                                  title="Remove the book"
                                  description="Are you sure to Remove?"
                                  onConfirm={deleteResource}
                                  okText="Yes"
                                  cancelText="No"
                                >
                                  <Button type='primary' danger style={{ margin: " 0 10px 10px 0" }} shape='circle' icon={<DeleteOutlined />}></Button>
                                </Popconfirm>
                                <Button type='primary' style={{ margin: " 0 10px 10px 0" }} shape='round' icon={<EditOutlined />} onClick={showModal}></Button>
                              </div>
                            }
                          </Flex>
                        </div>} layout="horizontal" column={{
                          xs: 1,
                          sm: 2,
                          md: 2,
                          lg: 2,
                          xl: 2,
                          xxl: 2,
                        }}
                        items={items}
                        labelStyle={{ fontWeight: '600' }}
                      />
                    </Col>
                  </Row>
                  <Flex justify='right'>
                    <Link href={`/Reservations/Reservationbybook/${responseData.isbn}`}><Button type='primary' size='medium' style={{ margin: '0 20px 0 0' }}>See Reservations</Button></Link>
                    {user.userType === "admin" ?
                      <Button disabled={responseData.remain < 1} type='primary' size='medium' onClick={showIssue}>Issue</Button> :
                      <Popconfirm
                        disabled={responseData.remain < 1}
                        title="Request a book"
                        description="Are you sure to request?"
                        onConfirm={request}
                        okText="Yes"
                        cancelText="No"
                      >
                        <Button disabled={responseData.remain < 1} loading={loading} type='primary' size='medium'>Request</Button>
                      </Popconfirm>}
                  </Flex>
                </>
              )}
              <Tabs defaultActiveKey="1">
                <Tabs.TabPane tab="Description" key="1">
                  <div dangerouslySetInnerHTML={{ __html: responseData.description }}></div>
                </Tabs.TabPane>
                <Tabs.TabPane tab="Reviews" key="2">
                  <ReviewForm isbn={props.isbn}/>
                </Tabs.TabPane>
              </Tabs>
            </Card>
          </Col>
        </Row>
        <EditModal fetchData={fetchData} open={open} openFuntion={showModal} close={closeModal} data={responseData} />
        <IssueModal open={issue} openFuntion={setIssue} close={closeIssue} data={responseData.isbn} />
      </div>
    </ConfigProvider>
  )
}

export default AboutCard
