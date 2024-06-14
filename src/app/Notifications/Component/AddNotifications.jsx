'use client'
import React, { useEffect, useState } from 'react';
import { Modal, Button, Form, Input, Select, DatePicker, message } from 'antd';
import { UserContext } from '../../Context/Context';
import axioinstance from '@/app/Instance/api_instance';
const { Option } = Select;

const AddNotification = ({ visible, onCreate, onCancel,fetchData }) => {
  const [form] = Form.useForm();
  const[respient,setrecepient]=useState("all")
  const [messageApi, contextHolder] = message.useMessage();
  const[loading,setLoading]=useState(false)

  const successModal = (e) => {
    messageApi.open({
      type: "success",
      content: e,
    });
  };

  const errorModal = (e) => {
    messageApi.open({
      type: "error",
      content: e,
    });
  };

   
  
    const user=React.useContext(UserContext).user;
    

    

    const sendMessage = async () => {
      setLoading(true);
      try{
        const response= await axioinstance.post("Notification/NewNotice",
        {userName :respient=="other"?form.getFieldValue('userId'):respient,
        subject : "New Announcement",
        description:form.getFieldValue('description') });
      fetchData();
      onCancel();
      successModal("Notification Added Successfully");
    }
    catch(error){
      errorModal("Notification Added Failed");
      fetchData();
    }
    setLoading(false);
    };

  
  return (
    <Modal
      visible={visible}
      title="Add New Notification"
      okText="Add"
      cancelText="Cancel"
      onCancel={onCancel}
      okButtonProps={{loading:loading}}
      onOk={() => {
        form
          .validateFields()
          .then((values) => {
            sendMessage();
            form.resetFields();
          })
          .catch((info) => {
            console.log('Validate Failed:', info);
          });
      }}
    >
      {contextHolder}
      <Form form={form} layout="vertical" name="form_in_modal">
        <Form.Item name="to" label="To" rules={[{ required: true, message: 'Please select the recipient!' }]}>
          <Select placeholder="Select Recipient" onSelect={(value)=>setrecepient(value)} >
            
            <Option value="all">All</Option>
            <Option value="admin">Admin</Option>
            <Option value="patron">Patrons</Option>
            <Option value="other">Others</Option>
            {/* Add more options based on your notification recipients */}
          </Select>
        </Form.Item>
        {
          (respient=="other")?
          <Form.Item name="userId" label="User Name" rules={[{ required: true, message: 'Please select username!' }]} >
          <Input placeholder="Enter User Name" />
        </Form.Item>
        :<div></div>
        }
        
        <Form.Item name="description" label="Description" rules={[{ required: true, message: 'Please enter the notification description!' }]}>
          <Input.TextArea rows={4} placeholder="Enter Description" />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddNotification;
