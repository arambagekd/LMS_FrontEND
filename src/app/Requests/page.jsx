import React from 'react'
import SearchResult from './Component/SearchResult'
import Navigations from '../Component/Navigations'
import ContentBox from '../Component/ContentBox'
import { HomeOutlined,InteractionOutlined } from '@ant-design/icons';
import { Space } from 'antd';


const PageRoot = [
  {
        key:'1',
      href: '',
      title: <HomeOutlined />,
  },
  {
    key:'2',
      href: '',
      title: (
          <>
              <InteractionOutlined />
              <span>Requests</span>
          </>
      ),
  },
  {
    key:'3',
      href: '',
      title: (
          
              <span> Search Results</span>
      ),
  },
]



function page() {
  return (
   
    <div>
        
            
               <SearchResult />
            
       
    </div>

  )
}

export default page
