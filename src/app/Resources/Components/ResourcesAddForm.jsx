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
  Space,
} from "antd";
import UploadImage from "./myComponent/UploadImage";
import React, { useEffect, useState } from "react";
import EditModal from "../[isbn]/Components/EditModel";
import TextArea from "antd/es/input/TextArea";
import moment from "moment";
import axioinstance from "@/app/Instance/api_instance";
import { useSearchParams } from "next/navigation";
import { isbn } from '@form-validation/validator-isbn';
import axios from "axios";
import { get } from "http";
import { RedoOutlined } from "@ant-design/icons";

function ResourcesAddForm({
  form,
  setImageURL,
  selectCupboard,
  selectShelf,
  cupboard,
  shelf,
  imageurl
}){

  const searchParams = useSearchParams()
  const [location, setLocation] = useState([]);
  const [options, setOptions] = useState([]);
  const cupNo = searchParams.get('cupboardId');
  const shelfNo = searchParams.get('shelfNo');
  const[disable,setDisable]=useState(true);
 const[isbnfield,setIsbn]=useState("");

  const isbnValidator = async (rule, value) => {
    const result = isbn().validate({
      value: value,
    });

    if (result && result.valid) {
      return Promise.resolve();
    } else {
      const errorMessage = 'The value is not a valid ISBN';
      return Promise.reject(errorMessage);
    }
  };


  async function searchBookByISBN() {
    const isbn=form.getFieldValue('isbn');
    form.resetFields();
    try {
        const response = await axios.get( `https://www.googleapis.com/books/v1/volumes?q=isbn:${isbn}&key=AIzaSyBITr3YQgHb6O8OzjODFdHLdmuLDFKDSL0`);
        console.log( response.data);
        form.setFieldsValue({
          isbn:response.data.items[0].volumeInfo.industryIdentifiers[0].identifier,
          title:response.data.items[0].volumeInfo.title,
          auther:response.data.items[0].volumeInfo.authors[0],
          type:response.data.items[0].volumeInfo.categories[0],
          year:response.data.items[0].volumeInfo.publishedDate,
          pagecount:response.data.items[0].volumeInfo.pageCount,
          description:response.data.items[0].volumeInfo.description
        });
        setImageURL(response.data.items[0].volumeInfo.imageLinks.thumbnail);
    } catch (error) {
        form.setFieldsValue({isbn:isbn});
        console.log('Error fetching book:', error);
        return null;
    }

}


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
    const result = isbn().validate({
      value: isbnfield,
    });
    
    if (result && result.valid && isbnfield.length>0){
      setDisable(false);
    }
    else{
      setDisable(true);
    }
  },[isbnfield]);

  useEffect(() => {
    getlocation();
    if(cupNo!=undefined && shelfNo!=undefined)
    {
      selectCupboard(cupNo);
      selectShelf(shelfNo);
    }
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
                      rules={[{ required: true ,
                        validator:isbnValidator
                      }]}
                      onChange={(e)=>setIsbn(e.target.value)}
                    >
                      <Input suffix={<Button disabled={disable} 
                    
                      onClick={()=>searchBookByISBN()}><RedoOutlined/></Button>}/>
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
                      label="Author"
                      rules={[{ required: true },

                      ]}
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
                      initialValue={cupNo!=""?cupNo:""}
                    >
                      <Select
                       // defaultValue={cupNo!=undefined?cupNo:""}
                        disabled={cupNo!=undefined}
                        filterOption={true}
                        showSearch
                        optionFilterProp="label"
                        onChange={(value) => selectCupboard(value)}
                        options={location.map((item) => ({
                          value: item.cupboardId,
                          label: item.cupboardId+"-"+item.cupboardName,
                        }))}
                      />
                    </Form.Item>
                  </Col>
                  <Col xs={24} sm={12}>
                    <Form.Item
                      name="shelf"
                      label="Shelf"
                      rules={[{ required: true }]}
                      initialValue={shelfNo}
                    >
                      <Select
                        //defaultValue={shelfNo!=undefined?shelfNo:""}
                        disabled={!(cupNo==undefined && cupboard!="")}
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
                    <UploadImage setImageURL={setImageURL} imagepath={imageurl}/>{" "}
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
