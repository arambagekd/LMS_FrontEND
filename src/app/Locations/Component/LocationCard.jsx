"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import styles from "./LocationCard.module.css";
import axioinstance from "@/app/Instance/api_instance";
import { Button, Empty, Flex, Pagination, Popconfirm, Spin } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import { showToastError, showToastSuccess } from "@/app/Component/NewToast";

function LocationCard({cupboards,loading,getLocations}) {
    const[page,changepage]=useState(1);

    const changingPage =(pnumber,size)=>{
          changepage(pnumber);
    }

    const deleteCupboard=async(id)=>{
        try{
            await axioinstance.delete(`Location/DeleteLocation?cupboardid=${id}`);
            showToastSuccess("Location Deleted");
            getLocations();
        }catch(error){
          showToastError(error,"Failed to delete location");
        }
    }

  return (
    <>
    <div className={styles.container}>
    {loading && < Spin size='large' spinning={loading}><div style={{height:200}}></div></Spin>}
    {!loading && cupboards.length==0 &&<Empty/>}
      {cupboards.slice((page-1)*9,(page-1)*9+ 9).map((cupboard, index) => (
        <div className={styles.card} key={index}>
          <Link href={`/Locations/${cupboard.cupboardName}`} key={index}>
            <h2 className={styles.cupboardName}>{cupboard.cupboardName.length>10?cupboard.cupboardName.slice(0,11)+"..":cupboard.cupboardName}</h2>
            <p className={styles.details}>
              Number of Shelves: {cupboard.shelfNo.length}
            </p>
            <p className={styles.details}>Number of Books: {cupboard.count}</p>
          </Link>
          <Popconfirm
                title="Remove Location"
                description="Are you sure you want to remove this location?"	
                onConfirm={()=>deleteCupboard(cupboard.cupboardId)}
                okText="Yes"
                cancelText="No"
              >     
          <Flex justify="right"><Button disabled={cupboard.count>0} shape="circle" size="small" type="primary" danger><DeleteOutlined/></Button></Flex>
        </Popconfirm>
        </div>
      ))}
      
      
       
       
    </div>
    <div style={{margin:"20px 0 0 0"}}>
    <center><Pagination defaultCurrent={1} total={cupboards.length} onChange={changingPage} pageSize={9}/></center>
    </div>
    </>
  );
}

export default LocationCard;
