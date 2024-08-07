'use client'
import {EyeTwoTone } from "@ant-design/icons";
import { Button, Spin } from "antd";
import Image from "next/image";
import React, { useState } from "react";
import axioinstance from "../Instance/api_instance";

const Notifications = ({id, subject, description,ago,status,GetNotification }) => {
  const [more, setMore] = useState(false);
  const[loading,setLoading]=useState(false);

  async function markRead(id){
    setLoading(true);
    try{
    const response = await axioinstance.get(`Notification/MarkAsRead?id=${id}`);
    GetNotification();
    }catch(error){
     setLoading(false);
    }
    setLoading(false);
  }
  
  return (
    <Spin spinning={loading}>
    <div>
      <div
        style={{
          padding: "10px",
          borderBottom: "0.5px solid #ddd",
          display: "flex",
          alignItems: "center",
          backgroundColor: "#f9f9f9",
          overflow: "hidden",
        }}
      ><div style={{display:"flex",justifyContent:"center"}}>
        <Image
          src='/translogo.png'
          alt=""
          width= {30}
          height= {30}
          style={{
            borderRadius: "30%",
            marginRight: "10px",
          }}
        /></div>
        <div style={{margin:"5px 10px",flex:6}}>
          {String(description).length > 25 && more==false? (
            <p style={{ margin: 0 }}>
              <strong>{subject}</strong>
              <br />
              {String(description).slice(0, 25) + "..."}
              <Button type="link" style={{ padding: 0 }} onClick={()=>setMore(true)}>
                Read more
              </Button>
            </p>
          ) : more ? (
            <p style={{ margin: 0 }}>
              <strong>{subject}</strong>
              <br /><br/>
              {String(description)}
              <br></br>
              <Button
                type="link"
                style={{ padding: 0 }}
                onClick={() => setMore(false)}
              >
                Read less
              </Button>
            </p>
          ) : (
            <p style={{ margin: 0 }}>
              <strong>{subject}</strong>
              <br />
              {String(description)}
            </p>
          )}
          <span
            style={{
              display: "block",
              color: "gray",
              fontSize: "0.9em",
            }}
          >

            
           {ago===0?"Today":ago===1?"Yesterday":ago+" days ago"} 
          </span>
        </div>
        <div style={{display:"flex",flex:1}}>
          {status==="unread" &&
            <Button type="link" style={{ padding: 0 }} onClick={()=>markRead(id)}>
            <EyeTwoTone />
            </Button>}
        </div>
      </div>
    </div>
    </Spin>
  );
};

export default Notifications;
