'use client'

import React, { useState } from 'react';
import ResourseReport from "./ResourseReport"
import { PlusOutlined } from '@ant-design/icons';
import {
  Button,
  Cascader,
  Checkbox,
  ColorPicker,
  DatePicker,
  Empty,
  Flex,
  Form,
  Input,
  InputNumber,
  Radio,
  Select,
  Slider,
  Switch,
  TreeSelect,
  Upload,
} from 'antd';
const { RangePicker } = DatePicker;
const { TextArea } = Input;
const normFile = (e) => {
  if (Array.isArray(e)) {
    return e;
  }
  return e?.fileList;
};
const Form1= () => {

  const [dates, setDates] = useState([]);
  const [bookType, setBookType] = useState('');

  const onDateChange = (dates) => {
    setDates(dates);
  };

  const onBookTypeChange = (value) => {
    setBookType(value);
  };

  const [Genarate,setGenarate]=useState(false)

  const [selectedTypes, setSelectedTypes] = useState([]);

    const handleCheckboxChange = (event) => {
        const value = event.target.value;
        setSelectedTypes((prev) => 
            event.target.checked ? [...prev, value] : prev.filter((type) => type !== value)
        );
    };

    const onSubmit = async () => {
      if (dates.length === 2 && bookType) {
        const [start, end] = dates;
        try {
          const response = await axios.post('/api/Report/count', {
            startDate: start.format('YYYY-MM-DD'),
            endDate: end.format('YYYY-MM-DD'),
            bookType
          });
          <ResourseReport style={{marginLeft:"2000px"}}/>
          console.log('Response:', response.data);
        } catch (error) {
          console.error('Error:', error);
        }
      }
    };

  return (
    <>
      <Flex wrap='wrap'>

      <RangePicker onChange={onDateChange} />
      <Button type="primary" onClick={()=>setGenarate(true)} style={{ marginLeft: 8 }}>
        Submit
      </Button>
      { Genarate?<ResourseReport style={{marginLeft:"2000px"}}/>: <Empty style={{padding:150 }}/>} 
    

      </Flex>
    </>
  );
};

export default Form1;



