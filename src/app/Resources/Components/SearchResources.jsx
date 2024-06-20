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


function SearchResources({ func1, func2, func3,func4,func5,ascending, search }) {

    const [placement, setPlacement] = useState('title');
    

    // Handler for placement change
    const handlePlacementChange = (e) => {
        setPlacement(e.target.value);
        func1(e.target.value);
    };
    
    // Handler for type change
    const handleTypeChange = (v) => {
        func5(v);
    }

    const handleTagChange = (v) => {
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
            <Row  style={{ margin: "0 0 20px 0" }} gutter={[10, 10]}>

                <Col xs={24} sm={16}>

                    <Flex s wrap='wrap' align='center'>
                        <Radio.Group  size="large" value={placement} onChange={handlePlacementChange} style={{ margin: ' 0 15px 0 0' }}>
                            <Radio.Button value="title">Title</Radio.Button>
                            <Radio.Button value="latest">Latest</Radio.Button>
                            <Radio.Button value="popular">Popular</Radio.Button>
                        </Radio.Group>
                        <Button onClick={()=>func4(!ascending)} icon={ascending?<SortDescendingOutlined />:<SortAscendingOutlined />}></Button>
                        
                    </Flex>
                </Col>
                <Col xs={24} sm={8} >
                    <Flex wrap='wrap' justify='right'>
                    <Space.Compact>
                        <Select
                             size="large"
                            defaultValue="all"
                            style={{
                                width: 100,
                            }}
                          onChange={handleTypeChange}
                            options={[
                                {
                                    value: 'all',
                                    label: 'All',
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
                                }
                                ]}>
                        </Select>
                        <Select
                             size="large"
                            defaultValue="all"
                            style={{
                                width: 100,
                            }}
                            onChange={handleTagChange}
                            options={[
                                {
                                    value: 'all',
                                    label: 'All',
                                },
                                {
                                    value: 'isbn',
                                    label: 'ISBN',
                                },
                                {
                                    value: 'title',
                                    label: 'Title',
                                },
                                {
                                    value: 'author',
                                    label: 'Author',
                                },
                                ]}>
                        </Select>
                        <Search
                         size="large"
                            placeholder="input search text"
                            allowClear
                            onSearch={handleSearch}
                            onChange={handleKeywordChange}
                        />
                    </Space.Compact>
                    </Flex>
                </Col>

            </Row>

        </div>
    )
}

export default SearchResources
