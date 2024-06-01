'use client'
import SearchResult from './Components/SearchResult';
import { Button, FloatButton} from 'antd';

import SearchResources from './Components/SearchResources';
import {PlusOutlined } from '@ant-design/icons';
import Link from 'next/link';




function View() {
    return (
       
            <div>
                                   
                   <Link href={'/Resources/AddResources'}><FloatButton  icon={<PlusOutlined/>} tooltip="Add a resource" type='primary'/></Link>
                       <SearchResources/>
                       <br />
                       <SearchResult data={data} />
            </div>
       
    )
}

export default View
