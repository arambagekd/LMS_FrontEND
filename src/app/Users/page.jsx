'use client'
import React, { useState } from 'react'
import Navigations from '../Component/Navigations'
import ContentBox from '../Component/ContentBox'
import { HomeOutlined } from '@ant-design/icons';
import SearchResult from './Component/SearchResult';
import { Button } from 'antd';
import AddUserModal from './Component/AddUserModal';





function page() {
    
    return (
        <div>
         
                
                    
                       <SearchResult data={[]} />
                        
              
           
        </div>
    )
}

export default page
