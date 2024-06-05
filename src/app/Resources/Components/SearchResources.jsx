'use client'
import React, { useState } from 'react';
import { Checkbox, DatePicker, Radio, Select } from 'antd';
import { Button, Col, Flex, Input, Row, Space } from 'antd';
dayjs.extend(customParseFormat);
const { RangePicker } = DatePicker;
const dateFormat = 'YYYY-MM-DD'
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat'
import SearchResult from './SearchResult';
import { SortAscendingOutlined, SortDescendingOutlined } from '@ant-design/icons';



const { Search } = Input;

const onSearch = (value, _e, info) => console.log(info?.source, value);


const handleChange = (value) => {
    console.log(`selected ${value}`);
};


function SearchResources({ func1, func2, func3,func4,ascending, search }) {

    const [placement, setPlacement] = useState('title');
    

    // Handler for placement change
    const handlePlacementChange = (e) => {
        setPlacement(e.target.value);
        func1(e.target.value);
    };
    
    // Handler for type change
    const handleTypeChange = (v) => {
        func2(v);
    }
  
    // Handler for search
    const handleSearch = (value, _e, info) => {
        search();
    }

    // Handler for keyword change
    const handleKeywordChange = (e) => {
        func3(e.target.value);
    }
  

    return (
        <div>
            <Row style={{ margin: "0 0 20px 0" }} gutter={[10, 10]}>

                <Col xs={24} sm={14}>

                    <Flex wrap='wrap' align='center'>
                        <Radio.Group value={placement} onChange={handlePlacementChange} style={{ margin: ' 0 15px 0 0' }}>
                            <Radio.Button value="title">Title</Radio.Button>
                            <Radio.Button value="latest">Latest</Radio.Button>
                            <Radio.Button value="popular">Popular</Radio.Button>
                        </Radio.Group>
                        <Button onClick={()=>func4(!ascending)} icon={ascending?<SortDescendingOutlined />:<SortAscendingOutlined />}></Button>
                        
                    </Flex>
                </Col>
                <Col xs={24} sm={10}>

                    <Space.Compact>
                        <Select

                            defaultValue="Type"
                            style={{
                                width: 100,
                            }}
                          //  onChange={handleChange}
                            options={[
                                {
                                    value: 'none',
                                    label: 'Type',
                                },
                                {
                                    value: 'books',
                                    label: 'Books',
                                },
                                {
                                    value: 'journals',
                                    label: 'Journals',
                                },
                                {
                                    value: 'ebooks',
                                    label: 'Ebooks',
                                },
                                {
                                    value: 'others',
                                    label: 'Others',
                                },
                                ]}>
                        </Select>
                        <Select

                            defaultValue="None"
                            style={{
                                width: 100,
                            }}
                            onChange={handleTypeChange}
                            options={[
                                {
                                    value: 'none',
                                    label: 'None',
                                },
                                {
                                    value: 'ISBN',
                                    label: 'By ISBN',
                                },
                                {
                                    value: 'author',
                                    label: 'By Author',
                                },
                                {
                                    value: 'publisher',
                                    label: 'By Publisher',
                                },]}>
                        </Select>
                        <Search
                            placeholder="input search text"
                            allowClear
                            onSearch={onSearch}
                            onChange={handleKeywordChange}
                        />
                    </Space.Compact>

                </Col>

            </Row>

        </div>
    )
}

export default SearchResources
