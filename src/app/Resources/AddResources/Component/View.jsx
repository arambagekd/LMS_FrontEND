'use client'
import React,{useState} from 'react'
import ResourcesAddForm from '../../Components/ResourcesAddForm'
import { Form,Button, Flex,Modal,Tooltip, message } from 'antd';
import axios from 'axios';
import axioinstance from '@/app/Instance/api_instance';


function View(props) {

   const [loading, setLoading] = useState(false);
   const [form] = Form.useForm();
   const [imageurl,setImageURL]=useState("");
   const[cupboard,selectCupboard]=useState('');
    const[shelf,selectShelf]=useState('');
    const [messageApi, contextHolder] = message.useMessage();

    const successModal = (e) => {
      messageApi.open({
        type: "success",
        content: e,
      });
    };
    const errorModal = (e) => {
      messageApi.open({
        type: "error",
        content: e,
      });
    };
  

   const submitForm = async () => {
    try{
    if(imageurl===""){
      throw "Please upload an image";
    }
   await axioinstance.post('Resource/AddResource', {
        isbn: form.getFieldValue('isbn'),
        title: form.getFieldValue('title'),
        author: form.getFieldValue('auther'),
        type: form.getFieldValue('type'),
        quantity: form.getFieldValue('quantity'),
        price: form.getFieldValue('price'),
        pages: form.getFieldValue('pagecount'),
        imagePath: imageurl,
        year:2020,
        url: 'rvtfe',
        cupboardId: cupboard,
        shelfNo: shelf,
        description: form.getFieldValue('description'),
    })
   
        setTimeout(() => {
            setLoading(false);
            successModal(`Successfully added the resource ${response.data.isbn}`);
            form.resetFields();
            setImageURL("");
        }, 3000);
      }
    catch(error) {
        setLoading(false);
        console.log(error);
        errorModal('An error occurred while processing your request.');
    };
   
};


const handleOk = () => {
  form.validateFields()
      .then(() => {
          setLoading(true);   
          submitForm();
      })
      .catch(() => {
          console.log("Validate Failed:");
      });




};
const handleCancel = () => {
  props.close();
  form.resetFields();
  setImageURL("");
}
  return (
    <div>
      {contextHolder}
      <Flex justify="space-between">
        <div style={{ fontSize: '18px',fontWeight:'600',marginLeft:'30px',marginBottom:'30px'}}>
          <font>Add New Resource</font>
        </div>
      </Flex>
      <ResourcesAddForm form={form} setImageURL={setImageURL} imageurl={imageurl} selectCupboard={selectCupboard} selectShelf={selectShelf} cupboard={cupboard} shelf={shelf}/>
      <Flex justify="end">
        <Button
          key="submit"
          type='primary' size="medium" 
          loading={loading}
          onClick={handleOk}
          style={{marginRight:'10px'}}
        >
          Add Resource
        </Button>

        <Button key="back"  size="medium"  onClick={handleCancel}>
          Cancel
        </Button>
      </Flex>
    </div>
  );
}

export default View
