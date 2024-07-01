"use client";
import {
  Button,
  Drawer,
  Flex,
  Radio,
  Space,
  Spin,
} from "antd";
import React, { useEffect, useState } from "react";
import axioinstance from "../Instance/api_instance";
import Notification from "./Notification";
import { ConfigProvider } from "antd";
import { DoubleRightOutlined } from "@ant-design/icons";

function NotificationDrawer({ setOpen, open,getUnreadCount }) {
  const [loading, setLoading] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [all, setAll] = useState(false);
  const [placement, setPlacement] = useState("unread");

  const handlePlacementChange = (e) => {
    setPlacement(e.target.value);
  };
  
  const GetNotification = async () => {
    //etLoading(true); // Set loading to true while fetching
    try {
      // Sending POST request to fetch data based on search parameters
      const response = await axioinstance.post(
        "Notification/GetMyNotificatons"
      );
      const data = response.data.reverse(); // Extracting data from response
      //setLoading(false); // Setting loading to false after data is fetched
      setNotifications(data);
      getUnreadCount(); // Updating items state with fetched data
    } catch (error) {
    }
  };

  useEffect(() => {
    setLoading(true);
    GetNotification();
    setLoading(false);
  }, [open == true]);

  return (
    <ConfigProvider
      theme={{
        token: {
          paddingLG: 0,
        },
      }}
    >
      <Drawer
        mask={true}
        maskClosable={false}
        closeIcon={<DoubleRightOutlined />}
        style={{ maxWidth: "95%" }}
        width="400px"
        title={
          <>
            <Flex align="center" justify="space-between">
              Notifications
              <Space style={{ margin: "0 20px 0 0" }}>
                <Radio.Group
                  value={placement}
                  onChange={handlePlacementChange}
                  size="medium"
                  block
                >
                  <Radio.Button value="read">Read</Radio.Button>
                  <Radio.Button value="unread">Unread</Radio.Button>
                </Radio.Group>
              </Space>
            </Flex>
          </>
        }
        open={open}
        onClose={() => setOpen(false)}
        footer={
          notifications
          .filter(
            (notification) => notification.status === placement
          )
          .length > 5 ? (
            <Button block onClick={() => setAll(!all)}>
              {all == false ? "Show All" : "Show Less"}
            </Button>
          ) : null
        }
      >
        <div style={{ overflowX: "hidden" }}>
          <Spin spinning={loading}>
            {all == true || notifications.length <= 5
              ? notifications
              .filter((notification) => notification.status === placement)
              .map((notification) => (
                  <>
                    {/* <div  style={{height:"50px",overflow:"hidden"}}>
                    <div><strong>{notification.subject}</strong></div>
                    {notification.description}</div>
                    <br></br> */}
                    <Notification
                      id={notification.id}
                      GetNotification={GetNotification}
                      status={notification.status}
                      subject={notification.subject}
                      description={notification.description}
                      ago={notification.ago}
                    />
                  </>
                ))
              : notifications
                  .filter((notification) => notification.status === placement)
                  .splice(0, 4)
                  .map((notification) => (
                    <>
                      {/* <div  style={{height:"100px"}}>
                    <div><strong>{notification.subject}</strong></div>
                    {notification.description}</div>
                    <br></br> */}
                      <Notification
                        id={notification.id}
                        GetNotification={GetNotification}
                        status={notification.status}
                        subject={notification.subject}
                        description={notification.description}
                        ago={notification.ago}
                      />
                    </>
                  ))}
          </Spin>
        </div>
      </Drawer>
    </ConfigProvider>
  );
}

export default NotificationDrawer;
