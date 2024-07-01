'use client'
import { Button, Col, Flex, Form, Drawer, Row,Modal, message } from 'antd'
import React, { useEffect, useState } from 'react'
import IssueForam from './IssueForam'
import axios from 'axios';
import axioinstance from '../../Instance/api_instance';
import { showToastError, showToastSuccess } from '@/app/Component/NewToast';



function IssueModal(props) {
    const [loading, setLoading] = useState(false);
    const[date,setDate]=useState("");
    const [email, setEmail] = useState(true);
    const [form] = Form.useForm();

    async function fetchData() { // Function to fetch data from server
        try {
          // Sending POST request to fetch data based on search parameters
          const response = await axioinstance.post('Reservation/Issuebook', {
             isbn: String(form.getFieldValue('resourceId')),
             borrowerID:String(form.getFieldValue('borrowerId')) ,
             issuedID:String (form.getFieldValue('issuerId')),
             dueDate:  date ,
             email:email,
             requestId:props.data.id
          });
          const data = response.data; // Extracting data from response
          setTimeout(() => {
            setLoading(false);
           // fetchData(form);
            showToastSuccess("Book Issued Successfully");
            props.close();
            form.resetFields();
            props.fetchData();
        }, 3000);
        } catch (error) {
          setLoading(false);
          showToastError(error, "Failed to Issue Book");
        }
      }
                
    const handleOk = () => {

        form.validateFields()
            .then(() => {
                setLoading(true);
                fetchData();
            })

            .catch(() => {
                console.log("Validate Failed:");
            });




    };

    const handleCancel = () => {
        props.close();
        form.resetFields();
    }

    useEffect(()=>{console.log(props.data.isbn)},[])
    return (
        <div>

            <Drawer
                mask={true}
                maskClosable={false}
                
               
                style={{ maxWidth: '95%' }}
                width='350px'
                open={props.open}
                centered
                title="Issue Book"
                onOk={handleOk}
                onClose={handleCancel}
                footer={[
                    
                            <Button block size='medium'  key="submit" type="primary" loading={loading} onClick={handleOk} >
                                Issue
                            </Button>
                        
                ]}

            >
                
                <IssueForam date={setDate} form={form} data={props.data} setEmail={setEmail} email={email}/>
            </Drawer>

        </div>
    )
}

export default IssueModal
