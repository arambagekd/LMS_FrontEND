'use client'
import React, { useEffect, useRef, useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { Button, Divider, Input, Select, Space } from 'antd';
import axioinstance from '../Instance/api_instance';

let index = 0;

const App = () => {
  const [items, setItems] = useState([]);
  const [name, setName] = useState('');
  const inputRef = useRef(null);

  const onNameChange = (event) => {
    setName(event.target.value);
  };

  const getall = async () => {
    try {
      const response = await axioinstance.get("Resource/GetAuthorList");
      setItems(response.data);
    } catch (error) {
      console.error("Error fetching author list:", error);
    }
  }

  useEffect(() => {
    getall();
  }, []);

  const addItem = (e) => {
    e.preventDefault();
    setItems([...items, { authorName: name || `New item ${index++}` }]);
    setName('');
    setTimeout(() => {
      inputRef.current?.focus();
    }, 0);
  };

  return (
    <Select
      style={{
        width: 300,
      }}
      placeholder="custom dropdown render"
      dropdownRender={(menu) => (
        <>
          {menu}
          <Divider
            style={{
              margin: '8px 0',
            }}
          />
          <Space
            style={{
              padding: '0 8px 4px',
            }}
          >
            <Input
              placeholder="Please enter item"
              ref={inputRef}
              value={name}
              onChange={onNameChange}
              onKeyDown={(e) => e.stopPropagation()}
            />
            <Button type="text" icon={<PlusOutlined />} onClick={addItem}>
              Add item
            </Button>
          </Space>
        </>
      )}
      options={items.map((item) => ({
        label: item.authorName,
        value: item.authorName,
      }))}
    />
  );
};

export default App;
