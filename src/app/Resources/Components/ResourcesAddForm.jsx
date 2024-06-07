"use client";
import {
  Button,
  Checkbox,
  Col,
  Form,
  Image,
  Input,
  InputNumber,
  Row,
  Select,
  DatePicker,
  ConfigProvider,
  Divider,
  Card,
} from "antd";
import UploadImage from "./myComponent/UploadImage";
import React, { useEffect, useState } from "react";
import EditModal from "../[isbn]/Components/EditModel";
import TextArea from "antd/es/input/TextArea";
import moment from "moment";
import axioinstance from "@/app/Instance/api_instance";
import { useSearchParams } from "next/navigation";

function ResourcesAddForm({
  form,
  setImageURL,
  selectCupboard,
  selectShelf,
  cupboard,
  shelf,
}){

  const searchParams = useSearchParams()
  const [location, setLocation] = useState([]);
  const [options, setOptions] = useState([]);
  const cupNo = searchParams.get('cupboardId');
  const shelfNo = searchParams.get('shelfNo');

  const getlocation = async () => {
    try {
      const response = await axioinstance.post(`Location/GetAllLocation`,  
      {
        cupboardName: ""
      });
      setLocation(response.data);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getlocation();
  }, []);

  useEffect(() => {
    const cup = location.find((item) => item.cupboardId === cupboard);
    if (cup!= undefined) {
      setOptions(
        cup.shelfNo.map((item) => ({
          value: item,
          label: item,
        }))
      );
    }
  }, [cupboard]);
  return (
    <div>
      <ConfigProvider
        theme={{
          token: {
            lineHeight: "30px",
          },
          components: {
            Form: {
              itemMarginBottom: 18,
            },
          },
        }}
      >
        <Form form={form} layout="vertical">
          <Row align="top" gutter={[30, 10]} style={{ fontWeight: "600" }}>
            <Col xs={24} sm={13}>
              <Card style={{ background: "#f5f5f5" }}>
                <Divider orientation="left">Book Details</Divider>
                <Row gutter={[30, 10]}>
                  <Col xs={24} sm={24}>
                    <Form.Item
                      name="isbn"
                      label="ISBN No"
                      rules={[{ required: true }]}
                    >
                      <Input />
                    </Form.Item>
                  </Col>
                </Row>
                <Row gutter={[30, 10]}>
                  <Col xs={24} sm={24}>
                    <Form.Item
                      name="title"
                      label="Title"
                      rules={[{ required: true }]}
                    >
                      <Input />
                    </Form.Item>
                  </Col>
                </Row>
                <Row gutter={[30, 10]}>
                  <Col xs={24} sm={24}>
                    <Form.Item
                      name="auther"
                      label="Auther"
                      rules={[{ required: true }]}
                    >
                      <Input />
                    </Form.Item>
                  </Col>
                </Row>
                <Row gutter={[30, 10]}>
                  <Col xs={24} sm={24}>
                    <Form.Item
                      name="type"
                      label="Type"
                      rules={[{ required: true }]}
                    >
                      <Input />
                    </Form.Item>
                  </Col>
                </Row>
                <Row gutter={[30, 10]}>
                  <Col xs={24} sm={24}>
                    <Form.Item
                      name="year"
                      label="Year"
                      rules={[{ required: true }]}
                    >
                      <Input />
                    </Form.Item>
                  </Col>
                </Row>
              </Card>
              <br></br>
              <Card style={{ background: "#f5f5f5" }}>
                <Divider orientation="left">Book Metrics</Divider>
                <Row gutter={[0, 0]}>
                  <Col xs={24} sm={8}>
                    <Form.Item
                      name="quantity"
                      label="Quantity"
                      rules={[{ required: true }]}
                    >
                      <InputNumber min={0} />
                    </Form.Item>
                  </Col>
                  <Col xs={24} sm={8}>
                    <Form.Item
                      name="price"
                      label="Price"
                      rules={[{ required: true }]}
                    >
                      <InputNumber min={0} />
                    </Form.Item>
                  </Col>
                  <Col xs={24} sm={8}>
                    <Form.Item
                      name="pagecount"
                      label="No of pages"
                      rules={[{ required: true }]}
                    >
                      <InputNumber min={0} />
                    </Form.Item>
                  </Col>
                </Row>
              </Card>
              <br></br>
              <Card style={{ background: "#f5f5f5" }}>
                <Divider orientation="left">Location Details</Divider>
                <Row gutter={[30, 10]}>
                  <Col xs={24} sm={12}>
                    <Form.Item
                      name="cupboard"
                      label="Cupboard"
                      rules={[{ required: true }]}
                    >
                      <Select
                        defaultValue={cupNo!=undefined?cupNo:""}
                        disabled={cupNo!=undefined?true:false}
                        filterOption={true}
                        optionFilterProp="label"
                        onChange={(value) => selectCupboard(value)}
                        options={location.map((item) => ({
                          value: item.cupboardId,
                          label: item.cupboardName,
                        }))}
                      />
                    </Form.Item>
                  </Col>
                  <Col xs={24} sm={12}>
                    <Form.Item
                      name="shelf"
                      label="Shelf"
                      rules={[{ required: true }]}
                    >
                      <Select
                        defaultValue={shelfNo!=undefined?shelfNo:""}
                        disabled={cupboard == "" ? true : false}
                        showSearch
                        onChange={(value) => selectShelf(value)}
                        options={options}
                      />
                    </Form.Item>
                  </Col>
                </Row>
              </Card>
              {/* <Row gutter={[30,10]}>
                            <Col xs={24} sm={18}><Form.Item name='addedOn' label="Added On"><DatePicker defaultValue={moment()} disabled style={{ width: '180px',height:'30px'}}/></Form.Item></Col>
                        </Row> */}
            </Col>
            <Col xs={24} sm={10} align="middle">
              <Row gutter={[30, 11]}>
                <Col xs={24} sm={24}>
                  <Form.Item>
                    <UploadImage setImageURL={setImageURL} />{" "}
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={[30, 10]}>
                <Col xs={24} sm={24}>
                  <Form.Item name="description" label="Description">
                    <TextArea rows={16} />
                  </Form.Item>
                  <p>Using html format description for more appriciate...</p>
                </Col>
              </Row>
            </Col>
          </Row>
        </Form>
      </ConfigProvider>
    </div>
  );
}

export default ResourcesAddForm;
