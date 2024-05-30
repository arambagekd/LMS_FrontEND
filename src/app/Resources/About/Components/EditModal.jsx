import { Button, DatePicker, Flex, Form, Input } from 'antd'
import Modal from 'antd/es/modal/Modal'
import React, { useState } from 'react'

function EditModal({ open, close1}) {

    const [formState, changeFormState] = useState(false);

    const changeInForm = () => {
        changeFormState(true);
    }

    const [form] = Form.useForm();

    return (
        <div>
            <Modal
                title="Extend Due Date"
                width="300px"
                open={open}
                onOk={open}
                onCancel={close1}
                footer={[
                    <Flex wrap='wrap' gap="5px">
                        <Button style={{ flex: 1 }} size='small' shape='round' key="submit" type="primary" disabled={formState ? false : true}  >
                            Save
                        </Button>
                        <Button style={{ flex: 1 }} size='small' shape='round' key="back" onClick={close1}>
                            Cancel
                        </Button>

                    </Flex>
                ]}
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
                                    required: true,
                                },
                            ]}
                        ><DatePicker  onChange={changeInForm} />
                        </Form.Item>
                        
                    </Form>
                </div>

            </Modal>
        </div>
    )
}

export default EditModal
