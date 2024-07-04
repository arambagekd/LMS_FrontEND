'use client'
import React, { useEffect, useState } from 'react';
import { Card, Row, Col, Button, Select, Tooltip, Flex, Pagination, Popconfirm, Spin, Empty, Space } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
const { Option } = Select;
import AddNotification from './AddNotifications';
import UpdateNotification from './UpdateNotification';
import axioinstance from '../../Instance/api_instance';
import { showToastError, showToastSuccess } from '@/app/Component/NewToast';
import Search from 'antd/es/input/Search';






function NotificationCard() {
    const [notifications, setItems] = useState([]);
    const [notifi, setNotifications] = useState(notifications);
    const [selectedType, setSelectedType] = useState('All');
    const [visibleAdd, setVisibleAdd] = useState(false);
    const [visibleUpdate, setVisibleUpdate] = useState(false);
    const [visibleRemind, setVisibleRemind] = useState(false);
    const [searchText, setSearchText] = useState('');
    const [selectedNotification, setSelectedNotification] = useState(null);
    const[page,changepage]=useState(1);
    const[size,changeSize]=useState(0);
    const[loading,setLoading]=useState(true);
    const[type,settype]=useState("all");
    const[keyword,setKeyword]=useState("");


    const changingPage =(pnumber,size)=>{
          changepage(pnumber);
    }
  


    // const showRemindModal = () => {
    //     setVisibleRemind(true);
    // };

    // const handleRemind = (values) => {
    //     const newNotification = {
    //         id: notifi.length + 1,
    //         date: new Date().toLocaleDateString(),
    //         ...values,
    //     };
    //     const updatedNotifications = [...notifi, newNotification];
    //     setNotifications(updatedNotifications);
    //     setVisibleRemind(false);
    // };
    const showAddModal = () => {
        setVisibleAdd(true);
    };

    // const showUpdateModal = (notification) => {
    //     setSelectedNotification(notification);
    //     setVisibleUpdate(true);
    // };

    const handleUpdate = (id, values) => {
        const updatedNotifications = notifi.map((notification) =>
            notification.id === id ? { ...notification, ...values } : notification
        );
        setNotifications(updatedNotifications);
        setVisibleUpdate(false);
    };

    const handleAdd = (values) => {
        const newNotification = {
            id: notifi.length + 1,
            date: new Date().toLocaleDateString(),
            ...values,
        };
        const updatedNotifications = [...notifi, newNotification];
        setNotifications(updatedNotifications);
        setVisibleAdd(false);
    };

    const handleCancel = () => {
        setVisibleAdd(false);
        setVisibleUpdate(false);
        setSelectedNotification(null);
    };

    const handleRemove = async(id) => {
        try{
        const response=await axioinstance.delete(`Notification/RemoveNotification?id=${id}`);
        showToastSuccess("Notification Removed Successfully");
        fetchData();
        }catch(e){
            showToastError(e,"Failed to remove notification");
        }
    };
    const handleSearch = (value) => {
        setSearchText(value);
        const filteredNotifications = notifications.filter(
            (notify) =>
                notify.to.toLowerCase().includes(value.toLowerCase()) ||
                notify.type.toLowerCase().includes(value.toLowerCase()) ||
                notify.description.toLowerCase().includes(value.toLowerCase())
        );
        setNotifications(filteredNotifications);
    };

    const handleTypeChange = (value) => {
        setSelectedType(value);
        if (value === 'All') {
            return setNotifications(notifications);
        } else {
            const filteredNotifications = value ? notifications.filter((notify) => notify.type === value) : notifications;
            setNotifications(filteredNotifications);
        }

    };




    async function fetchData() { // Function to fetch data from server
        //etLoading(true); // Set loading to true while fetching
        try {
            // Sending POST request to fetch data based on search parameters
            const response = await axioinstance.post('Notification/GetNotificatons',{
                keyword: keyword,
                type: type
            });
            const data = response.data.reverse(); // Extracting data from response
            changeSize(data.length);
            //setLoading(false); // Setting loading to false after data is fetched
            setItems(data); // Updating items state with fetched data
        } catch (error) {
            // setLoading(false); // Setting loading to false if there's an error
            console.error('Error fetching data:', error); // Logging error to console
        }
        setLoading(false);
    }
    useEffect(() => { fetchData(); }, []);

    return (

        <div>
            <Row gutter={16} style={{ marginBottom: '30px', }}>
                <Col sm={16} xs={24}>
                    <Button style={{ marginRight: '10px', width: '150px', backgroundColor: '#001628', color: '#ffff' }} onClick={showAddModal}>
                        New
                    </Button>
                    <AddNotification visible={visibleAdd} onCreate={handleAdd} onCancel={handleCancel} fetchData={fetchData}/>
                    {selectedNotification && (
                        <UpdateNotification visible={visibleUpdate} onUpdate={handleUpdate} onCancel={handleCancel} notification={selectedNotification} />
                    )}
                </Col>
                <Col sm={8} xs={24}>
                <Space.Compact>
                        <Select
                         size="large"
                            defaultValue="all"
                            style={{ width: 120 }}
                            onChange={(e)=>settype(e)}
                            options={[
                                { value: 'all', label: 'All' },
                                { value: 'user', label: 'Receiver' },
                                { value: 'title', label: 'title' },
                            ]}
                        />
                    <Search
         size="large"
                            onChange={(e) => 
                                setKeyword(e.target.value)}
                            
                            placeholder="input notification title"
                            allowClear
                            onSearch={()=>fetchData()}
                        />
                </Space.Compact>
                                </Col>
            </Row>
           {loading && < Spin size='large' spinning={loading}><div style={{height:200}}></div></Spin>}
                        <Flex  vertical align="center" >
                        
                            {!loading && notifications.length===0 && <Empty />}
            {notifications.slice((page-1)*9,(page-1)*9+ 9).map((notification) => (
                <Card
                    key={notification.id}
                    style={{
                        width: '80%',
                         margin: '15px 0',
                        // backgroundColor: '#f0f0f0',
                        // borderRadius: '5px',
                        boxShadow: '0 1px 4px 0 rgba(0,0,0,0.05)',
                    }}
                >

                    <Row gutter={20}>
                        <Col span={24}>
                            <div>
                                <h3>{notification.subject}</h3>
                            </div>
                        </Col>
                        <Col span={24}>
                            <div>
                                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <div>
                                        To: {notification.userName}
                                    </div>
                                    <div style={{ textAlign: 'right' }}>
                                        Date: {notification.date}
                                    </div>
                                </div>
                            </div>

                        </Col >
                        <Col span={24}>
                            
                        <div style={{ wordWrap: 'break-word' }}>
        <p>{notification.description}</p>
    </div>
                                  
                        </Col>
                        <Col span={24} >
                            <Flex justify="end">
                            
                            <Popconfirm
                                    title="Remove the Notification"
                                    description="Are you sure to remove this notification?"
                                    okText="Yes"
                                    cancelText="No"
                                    onConfirm={() => handleRemove(notification.id)}
                                >
                                    <Button
                                        danger
                                        type='primary'
                                        style={{
                                            boxShadow: '0 4px 8px 0 rgba(0,0,0,0.15)',
                                        }}
                                        
                                    >
                                        Remove
                                    </Button>
                                    </Popconfirm>
                                    </Flex>  
                           
                    </Col>
                    </Row>
                </Card>
            ))}
             <Pagination defaultCurrent={1} total={50} onChange={changingPage} pageSize={9} />
            </Flex>
        </div>
    );
}

export default NotificationCard;




