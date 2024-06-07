"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import styles from "./LocationCard.module.css";
import axioinstance from "@/app/Instance/api_instance";
import { Pagination } from "antd";

function LocationCard({cupboards}) {
    const[page,changepage]=useState(1);

    const changingPage =(pnumber,size)=>{
          changepage(pnumber);
    }

  return (
    <>
    <div className={styles.container}>
      {cupboards.slice((page-1)*9,(page-1)*9+ 9).map((cupboard, index) => (
        <div className={styles.card} key={index}>
          <Link href={`/Locations/${cupboard.cupboardName}`} key={index}>
            <h2 className={styles.cupboardName}>Cupboard {cupboard.cupboardId}-{cupboard.cupboardName.length>3?cupboard.cupboardName.slice(0,4)+"..":cupboard.cupboardName}</h2>
            <p className={styles.details}>
              Number of Shelves: {cupboard.shelfNo.length}
            </p>
            <p className={styles.details}>Number of Books: {cupboard.count}</p>
          </Link>
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
