'use client'
import { EditOutlined } from '@ant-design/icons'
import { Card, DatePicker, Form,Flex, Input, Button, Collapse ,Spin,message, ConfigProvider, Select } from 'antd'
import { useForm } from 'antd/es/form/Form'
import React, { use, useEffect, useState } from 'react'
import axioinstance from '../../Instance/api_instance'
import dayjs from 'dayjs';
import { UserContext } from '../../Context/Context'
import UploadImage from './UploadImage'
import { showToastError, showToastSuccess } from '@/app/Component/NewToast'

function EditProfile() {
  const [form]=useForm();
  const[edit,setEdit]=useState(true);
  const[save,setSave]=useState(true);
  const[date,setDate]=useState('');
  const[spinning,setSpinning]=useState(false);
  const [gender, setGender]=useState("");
  //using Context
  const user = React.useContext(UserContext).user;
  const getUser = React.useContext(UserContext).GetUser;
  const [imagepath,setImagePath]=useState("");
  const isValidPhoneNumber = (phoneNumber) => {
    // Simple regex for validating phone numbers (you can customize this)
    const phoneRegex = /^[+]?[0-9\s-]{10,15}$/;
    return phoneRegex.test(phoneNumber);
  };

  const phoneValidator = async (rule, value) => {
    if (!value || isValidPhoneNumber(value)) {
      return Promise.resolve();
    } else {
      return Promise.reject('The value is not a valid phone number');
    }
  };
  const SaveChanges = ()=>{
    form.validateFields().then(
    async()=>{
    setSpinning(true);
    try{
    const response = await axioinstance.put("User/EditUser",
    {
      fName:form.getFieldValue('fname'),
      lName:form.getFieldValue('lname'),
      dob:date,
      address:form.getFieldValue('address'),
      phoneNumber:form.getFieldValue('mobile'),
      gender:gender,
    }
  )
    setEdit(true);
    showToastSuccess("Edit details is successful!");
    getUser();
  }catch(e){
    showToastError(e,"Failed to edit details");
  }
  setSpinning(false);

  }).catch((e)=>{})}
  

  const GetMyData =async()=>{
    setSpinning(true);
      try{
      form.setFieldValue('fname',user.fName);
      form.setFieldValue('lname',user.lName);
      form.setFieldValue('address',user.address);
      form.setFieldValue('mobile',user.phone);
      form.setFieldValue('dob',dayjs(user.dob, "YYYY-MM-DD"));
      form.setFieldValue('gender',user.gender)
      setDate(user.dob);
      setImagePath(user.image);
      setGender(user.gender);
      }catch(e){
        showToastError(e,"Failed to get details");
      }
      setSave(true);
      setSpinning(false);
  }



 useEffect(() => {GetMyData()}, [user])

  return (
    <div>
      {/* <Collapse
      items={[{ key: '1', label: "Edit Profile Details", children: <> */}
       <Button size='small'  shape='circle' onClick={()=>setEdit(!edit)}><EditOutlined /></Button>  
       <Spin spinning={spinning}>
        <Flex justify='center'>
        <Form onValuesChange={()=>setSave(false)} form={form} style={{width:'75%'}} size='small'  name="nest-messages"  labelCol={{  span: 6,}} wrapperCol={{span:16}}  disabled={edit} >
        {/* initialValue={dayjs(date, "YYYY-MM-DD")}></Form> */}
        <ConfigProvider
  theme={{
    token: {
      colorBgContainerDisabled:"white",
      colorTextDisabled:"black"
      /* here is your global tokens */
    },
  }}
>
<Flex justify='center'><UploadImage imagepath={imagepath}/></Flex>
<br></br>
        <Form.Item name="fname" label="First Name" rules={[{ required: true }]}  ><Input size='medium' /></Form.Item>
        <Form.Item name="lname" label="Last Name" rules={[{ required: true }]} ><Input size='medium'  /></Form.Item>
        <Form.Item name="gender" label="Gender" required initialValue={gender} >
          <Select
            onChange={(value) => {setGender(value);setSave(false)}}
            size="medium"
            options={[
              {
                value: "male",
                label: "Male",
              },
              {
                value: "female",
                label: "Female",
              },
            ]}
          ></Select>
        </Form.Item>
        <Form.Item name="dob" label="Date of Birth" rules={[{ required: true }]} ><DatePicker size='medium' onChange={(e, s) => setDate(s)}/></Form.Item>
        <Form.Item name="address" label="Address" rules={[{ required: true }]} ><Input size='medium'   /></Form.Item>
        <Form.Item name="mobile" label="Mobile" rules={[{ required: true},{ validator: phoneValidator }]} ><Input size='medium'   /></Form.Item>
        </ConfigProvider>
       <Form.Item colon={false}  label="  "   >
       
     
        <Button onClick={SaveChanges}  type="primary"   size="medium" htmlType="submit" disabled={save||edit}>
        Save
      </Button>
      <Button onClick={GetMyData} style={{margin:"0 0 0 10px"}}  size="medium"  >
        Reset
      </Button>
      
      </Form.Item>
    
        </Form>
       
        </Flex>
        </Spin>
        {/* </>
        }]}
         */}
    </div>
  )
}

export default EditProfile