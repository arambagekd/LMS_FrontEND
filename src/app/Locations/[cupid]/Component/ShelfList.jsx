'use client'
import axioinstance from '@/app/Instance/api_instance';
import { Collapse } from 'antd'
import React, { useEffect, useState } from 'react'
import CollapseCard from './CollapseCard';

function ShelfList({cupboardName}) {
const [shelves, setShelves] = useState([]);
const [cupboardid, setCupboard] = useState("");
const[cupboardName2, setCupboardName] = useState("")

    async function getLocations() {
        try {
          const response = await axioinstance.post(`Location/GetAllLocation`,
            {
                cupboardName: cupboardName
            }
          );
          setShelves(response.data[0].shelfNo);
          setCupboard(response.data[0].cupboardId);
          setCupboardName(response.data[0].cupboardName);
        } catch (error) {
          console.log(error);
        }
      }
    
      useEffect(() => {getLocations()}, []);


    return (
    <div>
        {shelves.map(shelf => (
            <CollapseCard key={shelf} shelfNo={shelf} cupboardId={cupboardid} cupboardName={cupboardName2}/>
        ))}
    </div>
  )
}

export default ShelfList