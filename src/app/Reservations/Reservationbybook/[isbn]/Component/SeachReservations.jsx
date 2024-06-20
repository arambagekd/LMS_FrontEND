import React, { useState } from 'react';
import {  DatePicker, Radio, Select } from 'antd';
import {Col, Flex, Row, Space } from 'antd';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import Search from 'antd/es/input/Search';



// Extend dayjs with customParseFormat plugin
dayjs.extend(customParseFormat);

// Destructure RangePicker from DatePicker
const { RangePicker } = DatePicker;


// Define the SearchReservations component
function SearchReservations({ func1, func2,isbn }) {


    // State for placement
    const [placement, setPlacement] = useState("*");

    // Handler for placement change
    const handlePlacementChange = (e) => {
        setPlacement(e.target.value);
        func1(e.target.value);
    };
    
    return (
        <div>
            <Row style={{ margin: "0 0 20px 0" }} gutter={[10, 10]}>
                <Col xs={24} sm={24}>
                    <Flex wrap='wrap' align='center' justify='space-between'>
                        <div style={{fontSize:20,fontWeight:400}}>Reservations of {isbn}</div>
                        <div>
                        <DatePicker style={{ width: '125px' ,margin: ' 0 15px 0 0' }} />
                        <Radio.Group   size="large" value={placement} onChange={handlePlacementChange} >
                            <Radio.Button value="*">All</Radio.Button>
                            <Radio.Button value="overdue">Due</Radio.Button>
                            <Radio.Button value="borrowed">Borrowed</Radio.Button>
                            <Radio.Button value="reserved">Reserved</Radio.Button>
                        </Radio.Group>
                        
                        </div>
                    </Flex>
                </Col>
            </Row>
        </div>
    );
}

export default SearchReservations;
