'use client'
import { Button, Form, Input, } from 'antd'
import axios from 'axios';
import React, {  useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'; 
import { MailOutlined } from '@ant-design/icons';
import { showToastError, showToastSuccess } from '@/app/Component/NewToast';
import axioinstance from '@/app/Instance/api_instance';


function Loginform({spinning,setSpinning}) {
    const [form] = Form.useForm();
    const [loading,setLoading]=useState(false);
    const router = useRouter();

    useEffect(() => {
      setSpinning(false);
    }, [setSpinning]);
    
    const onFinish=async()=>{
      setLoading(true);
      setSpinning(true);
        try{
            const response =await axioinstance.post('User/forgetPassword',
              {emailaddress:form.getFieldValue('email')}
            );
            showToastSuccess("Password reset link sent successfully");
            router.push('/LogIN');
        }catch(error){
            setSpinning(false);
            setLoading(false);
            console.log(error);
            showToastError(error,"Failed to send password reset link");
        }
        }

      
          
  return (
    <div style={{margin:30}}>


      <Form 
      form={form}
    name="basic"
    
    style={{
      maxWidth: 600,
    }}
    initialValues={{
      remember: true,
    }}
     onFinish={onFinish}
    // onFinishFailed={onFinishFailed}
    autoComplete="off"
    
  >
    <Form.Item
      name="email"
      rules={[
        {
          required: true,
          message: 'Please input your email!',
          type:'email'
        },
      ]}
    >
      <Input prefix={<MailOutlined className="site-form-item-icon" />} placeholder="Email" />
    </Form.Item>

   

   <br></br>
    <Form.Item
      wrapperCol={{
        offset: 0,
        span: 24,
      }}
    >
      <Button block type="primary" htmlType="submit" loading={loading}>
        Send Password Reset Link
      </Button>
      
    </Form.Item>
  </Form>
    </div>
  )
    }
export default Loginform
