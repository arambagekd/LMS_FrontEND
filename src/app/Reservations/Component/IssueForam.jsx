"use client";
import { ConfigProvider, Checkbox, DatePicker, Form, Input, Select } from "antd";
import moment from "moment";
import React, { use, useEffect, useState } from "react";
import { UserContext } from "../../Context/Context";
import axioinstance from "@/app/Instance/api_instance";

const validateMessages = {
  required: "${label} is required!",
  types: {
    email: "${label} is not a valid email!",
    number: "${label} is not a valid number!",
  },
  number: {
    range: "${label} must be between ${min} and ${max}",
  },
};

function IssueForam({ form, data, email, setEmail, setDate }) {
  const user = React.useContext(UserContext).user;
  const [users, setUsers] = useState([]);

  const fetchData = async(type)=>{
   
    try{
      const response = await axioinstance.post('User/SearchUser',{
        keyword:"",
        type:type
      });
      setUsers(response.data);
      console.log(response.data);
    }catch(error){
    }
  }

  useEffect(() => {
      fetchData("all");
  },[])

  return (
    <ConfigProvider
      theme={{
        components: {
          Form: {
            itemMarginBottom: 18,
          },
        },
      }}
    >
      <Form
        form={form}
        size="small"
        layout="vertical"
        name="nest-messages"
        validateMessages={validateMessages}
      >
        <Form.Item
          name="resourceId"
          label="Resource/ISBN"
          initialValue={data}
        >
          <Input size="medium" disabled />
        </Form.Item>
        <Form.Item
          name="issuerId"
          label="Issued By"
          rules={[{ required: true }]}
          initialValue={user.userName}
        >
          <Input size="medium" disabled />
        </Form.Item>
        <Form.Item
          name="borrowerId"
          label="Borrowed By"
          rules={[{ required: true }]}
          
        >
        
                      <Select
                      size="medium"
                       // defaultValue={cupNo!=undefined?cupNo:""}
                        filterOption={true}
                        showSearch
                        optionFilterProp="label"
                        options={users.map((item) => ({
                          value: item.username,
                          label: item.username,
                        }))}
                      />
        </Form.Item>

        <Form.Item name="dueDate" label="Due Date" rules={[{ required: true }]}>
          <DatePicker
            size="medium"
            disabledDate={(current) => current.isBefore(moment())}
            onChange={(e, s) => setDate(s)}
          />
        </Form.Item>

        <br></br>
        <br></br>
        <Form.Item name="email">
          <Checkbox checked={email} onChange={(e) => setEmail(!email)}>
            {" "}
            Send email notification to user
          </Checkbox>
        </Form.Item>
      </Form>
    </ConfigProvider>
  );
}

export default IssueForam;
