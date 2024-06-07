"use client";
import axioinstance from "@/app/Instance/api_instance";
import { Button, Card, Col, Flex, Form, Input, InputNumber, Row, message } from "antd";
import React, { useState } from "react";

function AddLocations() {
  const [form] = Form.useForm();
  const [messageApi, contextHolder] = message.useMessage();
  const [loading, setLoading] = useState(false);


  const successModal = () => {
    messageApi.open({
      type: 'success',
      content: 'Adding Location successfully',
    });
  };
  const errorModal = () => {
    messageApi.open({
      type: 'error',
      content: "Adding Location Failed",
    });
  };

  async function addLocation() {
    setLoading(true);
    try {
      const response = await axioinstance.post(`Location/AddLocation`, {
        cupboardName: form.getFieldValue("cupboard"),
        shelfNo: form.getFieldValue("shelf"),
      });
      setTimeout(() => {
        successModal();
        setLoading(false)
      }, 3000);
      
    } catch (error) {
      console.log(error);
      errorModal();
      setLoading(false)
    }
    
  }

  const onFinish = () => {
    form
      .validateFields()
      .then(() => {
        addLocation();
      })
      .catch((error) => {});
  };
  
  return (
    <>
    {contextHolder}
    <Row justify="end">
      <Col sm={24} xs={24}>
        <Card title="Add a location">
          <Form form={form}>
            <Row gutter={[20, 0]}>
              <Col sm={10} xs={24}>
                <Form.Item
                  label={"Cupboard Name"}
                  name="cupboard"
                  rules={[{ required: true }]}
                >
                  <Input placeholder="Cupborad Name" />
                </Form.Item>
              </Col>

              <Col sm={10} xs={24}>
                <Form.Item
                  label={"No of Shelves"}
                  name="shelf"
                  rules={[{ required: true }]}
                  initialValue={1}
                >
                  <InputNumber min={1} placeholder="No of Shelves" />
                </Form.Item>
              </Col>
              <Col sm={4} xs={24}>
                <Form.Item name="add">
                  <Button loading={loading} block type="primary" onClick={() => onFinish()}>
                    Add a Location
                  </Button>
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </Card>
      </Col>
    </Row>
    </>
  );
}

export default AddLocations;
