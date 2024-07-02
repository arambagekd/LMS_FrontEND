'use client'
import { Button, Col, Flex, Form, Modal, Row,Drawer } from 'antd'
import React, { useState } from 'react'
import axioinsatance from '../../Instance/api_instance'
import UserAddForm from './UserAddForm';
import { showToastError, showToastSuccess } from '@/app/Component/NewToast';
import axios from 'axios';



function ReturnModal(props) {
    const [loading, setLoading] = useState(false);
    const [form] = Form.useForm();
    const[date,setDate]=useState("");
    const[type,setType]=useState("patron");
    const[gender,setGender]=useState("male");


    async function fetchData() { // Function to fetch data from server'        
        // Sending POST request to fetch data based on search parameters
        try{
        await validateEmail(form.getFieldValue("email"));
        const response=await axioinsatance.post("User/AddUser",{
                fName: form.getFieldValue("fname"),
                lName: form.getFieldValue("lname"),
                email: form.getFieldValue("email"),
                dob:date ,
                address: form.getFieldValue("address"),
                phoneNumber: form.getFieldValue("mobile"),
                userType: type,
                gender:gender,
                image: "no-image"
            });	
        
                const data = response.data; // Extracting data from response
                setTimeout(() => {
                    setLoading(false);
                    showToastSuccess("User Added Successfully");
                    props.closeModal();
                    form.resetFields();
                    props.fetchData("all");

                }, 3000);
            }
           catch (error) {
                setLoading(false);
                console.log(error);
                if(error==="Email does not exist"){
                    showToastError("Email does not exist", "Invalid Email");
                }else{
                showToastError(error, "Failed to add User");   
                }
            };

    }

    const validateEmail = async (email) => {
        try {
          const apiKey = 'e2c12c772fe64d4b9b8badf2b90f12b5'; // Use your API key here
          const response = await axios.get(`https://emailvalidation.abstractapi.com/v1/?api_key=${apiKey}&email=${email}`);
          const result = response.data;
          console.log(result);
          if (result.deliverability !== 'DELIVERABLE') {
            throw "Email does not exist"
          }
        } catch (err) {
            throw "Email does not exist"	
        }
      };

    const handleOk = () => {

        form.validateFields()
            .then(() => {
                setLoading(true);
                fetchData();
            })
            .catch(() => {
            });




    };
    const handleCancel = () => {
        props.closeModal();
        form.resetFields();
    }

    return (
        <div>
            
            <Drawer
                mask={true}
                maskClosable={false}

                style={{maxWidth:'95%'}}
                width='350px'
                centered
                title={<Flex>Add User</Flex>}
                open={props.open}
                onOk={handleOk}
                onClose={handleCancel}
                footer={[
                    <>
                        <Button block    key="submit" type="primary" loading={loading} onClick={handleOk}>
                            Add User
                        </Button>
                        
                        </>  
                ]}
                
            >
                <UserAddForm setDate={setDate} setGender={setGender} form={form} data1={props.data1} setType={setType}/>
            </Drawer>
        
        </div>
    )
}

export default ReturnModal
