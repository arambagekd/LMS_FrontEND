'use client'
import axioinstance from '@/app/Instance/api_instance';
import { Collapse } from 'antd'
import React, { useEffect, useState } from 'react'
import CollapseCard from './CollapseCard';

function ShelfList({cupboardName}) {
const [shelves, setShelves] = useState([]);
const [cupboardid, setCupboard] = useState("");

    async function getLocations() {
        try {
          const response = await axioinstance.post(`Location/GetAllLocation`,
            {
                cupboardName: cupboardName
            }
          );
          setShelves(response.data[0].shelfNo);
          setCupboard(response.data[0].cupboardId);
        } catch (error) {
          console.log(error);
        }
      }
    
      useEffect(() => {getLocations()}, []);


    return (
    <div>
        {shelves.map(shelf => (
            <CollapseCard key={shelf} shelfNo={shelf} cupboardId={cupboardid}/>
        ))}
    </div>
  )
}

export default ShelfList