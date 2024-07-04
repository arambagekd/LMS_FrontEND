import React, { useState } from 'react';
import {  DatePicker, Radio, Select } from 'antd';
import {Col, Flex, Row, Space } from 'antd';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import Search from 'antd/es/input/Search';
import { UserContext } from '../../Context/Context';


// Extend dayjs with customParseFormat plugin
dayjs.extend(customParseFormat);

// Destructure RangePicker from DatePicker
const { RangePicker } = DatePicker;


// Define the SearchReservations component
function SearchReservations({ func1, func2, func3, search,setDate }) {


    // State for placement
    const [placement, setPlacement] = useState("*");

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
                        <Radio.Group  size="large" value={placement} onChange={handlePlacementChange} style={{ margin: ' 0 15px 0 0' }}>
                            <Radio.Button value="*">All</Radio.Button>
                            <Radio.Button value="overdue">Due</Radio.Button>
                            <Radio.Button value="borrowed">Borrowed</Radio.Button>
                            <Radio.Button value="received">Received</Radio.Button>
                        </Radio.Group>
                        <DatePicker 
                         onChange={(e, s) => e? setDate(e):setDate(dayjs(null))} 
                        
                         style={{ width: '125px' }} />
                    </Flex>
                </Col>
                <Col xs={24} sm={10}>
                <Flex justify='right'>
                    <Space.Compact>
                        
                        <Select
                         size="large"
                            defaultValue="all"
                            style={{ width: 130 }}
                            onChange={handleTypeChange}
                            options={[
                                { value: 'all', label: 'All' },
                                { value: 'reservationId', label: 'Reservation' },
                                { value: 'userId', label: 'User' },
                                { value: 'resourceId', label: 'Resource' },
                            ]}
                        />
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
    );
}

export default SearchReservations;
