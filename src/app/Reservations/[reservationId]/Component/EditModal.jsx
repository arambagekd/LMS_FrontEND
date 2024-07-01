import { Button, DatePicker, Flex, Form, Input,Modal,message } from 'antd'
import moment from 'moment';

import React, { useState } from 'react'
import axioinstance from '../../../Instance/api_instance';
import { showToastError, showToastSuccess } from '@/app/Component/NewToast';

function EditModal({reservationId,modalState,closeModal,fetchData}) {
    

    const [formState, changeFormState] = useState(true);
    const[date,setDate] = useState("");
    const[loading,setLoading] = useState(false);

   
    const [form] = Form.useForm();

    const extend =async()=>{
            try{
                setLoading(true);
                const response=await axioinstance.put(`Reservation/ExtendDue?id=${reservationId}&due=${date}`);
                setTimeout(() => {
                    setLoading(false);
                    closeModal();
                    form.resetFields();
                    setDate("");
                    fetchData()
                    showToastSuccess("Due Date Extended Successfully");
                }, 3000);
                
                
            }catch(error){
                setLoading(false);
                console.log("sadas");
                showToastError(error,"Failed to extend due date");
            }
    }

    return (
        <div>
            {contextHolder}
            <Modal
                mask={true}
                maskClosable={false}
                
                title="Extend Due Date"
                width="300px"
                open={modalState}
                onCancel={closeModal}
                
                footer={
                    <Flex wrap='wrap' gap="5px">
                        <Button style={{ flex: 1 }} size='small' shape='round' key="submit" type="primary" disabled={(formState||date=="" )}  onClick={extend} loading={loading}>
                            Save
                        </Button>
                        <Button style={{ flex: 1 }} size='small' shape='round' key="back" onClick={closeModal}>
                            Cancel
                        </Button>

                    </Flex>
                }
            >

                <div style={{
                    maxHeight: "350px",
                    padding: '20px 10px 0 0',
                    overflowY: 'auto',
                }}>
                    <Form form={form}
                       
                        size='small'
                        layout='vertical'
                        name="nest-messages"

                       >

                       
                        <Form.Item
                            name='dueDate'
                           
                            rules={[
                                {
                                    key: 'dueDate',
                                    required: true,
                                },
                            ]}
                        ><DatePicker  onChange={(e, s) => {setDate(s); changeFormState(false);}} disabledDate={(current) => current.isBefore(moment())}/>
                        </Form.Item>
                       
                    </Form>
                </div>

            </Modal>
        </div>
    )
}

export default EditModal
