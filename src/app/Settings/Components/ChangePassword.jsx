'use client'
import { EditOutlined } from '@ant-design/icons'
import { Card, DatePicker, Form,Flex, Input, Button, Collapse, Spin,message } from 'antd'
import { useForm } from 'antd/es/form/Form'
import Password from 'antd/es/input/Password'
import React, { useState } from 'react'
import axioinstance from '../../Instance/api_instance'
import { showToastError, showToastSuccess } from '@/app/Component/NewToast'

function EditProfile() {
  const [form]=Form.useForm();
  const[edit,setEdit]=useState(true);
  const[spinning,setSpinning]=useState(false);
  const[newPassword,setNewPassword]=useState('');
  const[confirmPassword,setConfirmPassword]=useState('');

  const ChangePassword =() => {
    form.validateFields().then(async()=>{
    setSpinning(true);
    try{
    
    const response=await axioinstance.put("User/ChangePassword",
      {
        oldPassword:form.getFieldValue('current'),
        newPassword:form.getFieldValue('new')
      }
    );
    showToastSuccess("Password changed successfully");
    setConfirmPassword('');
    setNewPassword('');
    form.resetFields();
    
  }catch(e){
    showToastError(e,"Failed to change password");
  }
    setEdit(true);
    setSpinning(false);
}).catch((e)=>{})}

  return (
    
    



    <div>

      {/* <Collapse
      items={[{ key: '1', label: "Change Password", children: 
      <> */}
      <Spin spinning={spinning}>
       <Button size='small'   shape='circle' onClick={()=>setEdit(!edit)}><EditOutlined /></Button>  
      
        <Flex justify='center'>
        <Form form={form} style={{width:'75%'}} size='small'  name="nest-messages"  labelCol={{  span: 6,}} wrapperCol={{span:16}}  disabled={edit}>
        
        <Form.Item name="current" label="Current Password" rules={[{ required: true }]} ><Password size='medium'  /></Form.Item>
        <Form.Item name="new" label="New Password" 
         rules={[
          {
            required: true,
            message: 'Please enter your password!',
          },
          {
            pattern: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/,
            message: 'Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special character (!@#$%^&*).',
          },
        ]} >
          <Password size='medium'  onChange={(e)=>setNewPassword(e.target.value)}/>

          </Form.Item>

        <Form.Item name="new1" label="Confirm Password" rules={[{ required: true }, {
            validator: (_, value) =>
             confirmPassword==newPassword ? Promise.resolve() : Promise.reject(new Error('Confirm Password Different from New Password')),
          },
        ]} ><Password size='medium'  onChange={(e)=>setConfirmPassword(e.target.value)}/></Form.Item>
      
       <Form.Item colon={false}  label="  "   >
       <Button  type="primary"   size="medium" htmlType="submit" onClick={ChangePassword}>
        Confirm
      </Button>
      <Button style={{margin:"0 0 0 10px"}}  size="medium"  >
        Reset
      </Button>
      </Form.Item>
    
        </Form>
        </Flex>
        </Spin>
        {/* </>
        }]}
        /> */}
    </div>
  )
}

export default EditProfile