'use client'
import { Button, Card, Col, Flex, Form, Input, InputNumber, Row } from 'antd'
import React from 'react'

function AddLocations() {
  return (
    <Row justify="end">
        <Col sm={24} xs={24}>
    <Card title="Add a location" >
        <Form>
            <Row gutter={[20,0]}>
                <Col sm={10} xs={24}>
            <Form.Item
            label={"Cupboard Name"}
            name="cupboard"
            >
                <Input placeholder="Cupborad Name" />
            </Form.Item>
            </Col>
            
                <Col  sm={10} xs={24}>
            <Form.Item
            label={"No of Shelves" }
            name="shelf">
                <InputNumber placeholder="No of Shelves" />
            </Form.Item>
            </Col>
            <Col sm={4} xs={24}>
                
            <Form.Item
            name="add">
                <Button block type="primary">Add a Location</Button>
            </Form.Item>
            
            </Col>
            </Row>
        </Form>
    </Card>
    </Col>
    </Row>
  )
}

export default AddLocations