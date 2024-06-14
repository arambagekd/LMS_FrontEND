"use client";
import React, { useEffect, useState } from "react";
import {
  ArrowLeftOutlined,
  UserOutlined,
  LogoutOutlined,
  MessageOutlined,
  ReadOutlined,
  AuditOutlined,
  InteractionOutlined,
  InfoCircleOutlined,
  DashboardOutlined,
  SettingOutlined,
  EditOutlined,
  HomeOutlined,
  CloudServerOutlined,
} from "@ant-design/icons";
import {
  Button,
  Card,
  ConfigProvider,
  Flex,
  Layout,
  Menu,
  Avatar,
  Badge,
  Divider,
  Spin,

} from "antd";
import Link from "next/link";
import AdressBar from "./AdressBar";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import axios from "axios";
import Cookies from "js-cookie";
import axioinstance from "../Instance/api_instance";
import { UserContext, EmailContext } from "../Context/Context";
import ErrorPage from "../ErrorPage/page";
import NotificationDrawer from "./NotificationDrawer";
import { onMessageListener } from "../Yes/firebase-config";
import NavigationFooter from "./footer";
const { Header, Content, Sider } = Layout;

const sideitems = [
  {
    key: "Home",
    icon: React.createElement(HomeOutlined),
    label: <Link href="/Home">Home</Link>,
  },
  {
    key: "Dashboard",
    icon: React.createElement(DashboardOutlined),
    label: <Link href="/Dashboard">Dashboard</Link>,
  },
  {
    key: "Resources",
    icon: React.createElement(ReadOutlined),
    label: <Link href="/Resources">Resources</Link>,
  },
  {
    key: "Locations",
    icon: React.createElement(CloudServerOutlined),
    label: <Link href="/Locations">Locations</Link>,
  },
  {
    key: "Users",

    icon: React.createElement(UserOutlined),
    label: <Link href="/Users">Users</Link>,
  },
  {
    key: "Requests",
    icon: React.createElement(AuditOutlined),
    label: <Link href="/Requests">Requests</Link>,
  },
  {
    key: "Notifications",
    icon: React.createElement(MessageOutlined),
    label: <Link href="/Notifications">Notifications</Link>,
  },
  {
    key: "Reservations",
    icon: React.createElement(InteractionOutlined),
    label: <Link href="/Reservations">Reservations</Link>,
  },
  {
    key: "Reports",
    icon: React.createElement(InfoCircleOutlined),
    label: <Link href="/Reports">Reports</Link>,
  },
  {
    key: "Settings",
    icon: React.createElement(SettingOutlined),
    label: <Link href="/Settings">Settings</Link>,
  },
];

const sideitems2 = [
  {
    key: "Dashboard",
    icon: React.createElement(DashboardOutlined),
    label: <Link href="/Dashboard">Dashboard</Link>,
  },
  {
    key: "Resources",
    icon: React.createElement(ReadOutlined),
    label: <Link href="/Resources">Resources</Link>,
  },
  {
    key: "Locations",
    icon: React.createElement(CloudServerOutlined),
    label: <Link href="/Locations">Locations</Link>,
  },

  {
    key: "Requests",
    icon: React.createElement(AuditOutlined),
    label: <Link href="/Requests">Requests</Link>,
  },

  {
    key: "Reservations",
    icon: React.createElement(InteractionOutlined),
    label: <Link href="/Reservations">Reservations</Link>,
  },

  {
    key: "Settings",
    icon: React.createElement(SettingOutlined),
    label: <Link href="/Settings">Settings</Link>,
  },
];

function Navigations(props) {
  const router = useRouter();
  const [user, setUser] = useState({});
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [authenticated, setAuthenticated] = useState(false);
  const [collapsed, setCollapsed] = useState(true);
  const [unreadCount, setUnreadCount] = useState(0);
  const location = usePathname();
  const rootPath = location.split("/")[1];

 

  const logout = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5164/api/Auth/Logout",
        { withCredentials: true }
      );
      Cookies.remove("jwt");
      setUser({});
      router.replace("/LogIN");
    } catch (error) {
      console.log(error);
    }
  };
  const GetUser=async()=>{
    try {
      const response = await axioinstance.post("User/GetMyData");
      const response1 = await axioinstance.post("User/GetEmail");
      console.log(response.data);
      setUser(response.data);
      setEmail(response1.data);
    } catch (error) {
      
      console.log(error);
      setLoading(false);
    }
  };
  const selectPatron = async (usertype) => {
    try {
      const token = Cookies.get("jwt");
      Cookies.remove("jwt");
      console.log(token);
      const response = await axios.post(
        `http://localhost:5164/api/Auth/selectusertype?userType=${usertype}`,
        null,
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
            timeout: 1000,
          },
        }
      );
      GetUser();
    } catch (e) {
      console.log(e);
    }
  };
  const getUnreadCount=async()=>{
    try {
      const response = await axioinstance.post("Notification/UnreadCount");
      console.log(response.data);
      setUnreadCount(response.data);
    } catch (error) {
      console.log(error);
    }
  }
  const items = [
    {
      key: "1",

      label: (
        <Badge count={unreadCount>9?9+"+":unreadCount}>
        <Avatar  onClick={() => setOpen(true)} icon={<MessageOutlined />} />
        </Badge>
      ),
    },
    {
      key: "2",

      label: <Avatar icon={<UserOutlined />} />,
      children: [
        {
          label: (
           
              <center>
                <Avatar icon={<UserOutlined />} />{" "}
              </center>
           
          ),
          key: "3",
        },
        {
          label: <center>{user.fName + " " + user.lName}</center>,
          key: "4",
        },
        {
          type: "divider",
        },
        {
          icon: React.createElement(EditOutlined),
          label: <Link href="/Settings">Edit Profile</Link>,
          key: "5",
        },
        {
          icon: React.createElement(SettingOutlined),
          label: <Link href="/Settings">Settings </Link>,
          key: "6",
        },
        // {
        //   icon: React.createElement(QuestionCircleOutlined),
        //   label: <a href="https://www.aliyun.com">Help & Support </a>,
        //   key: "6",
        // },
        {
          icon: React.createElement(InfoCircleOutlined),
          label: <a href="https://www.aliyun.com">About</a>,
          key: "7",
        },
        {
          type: "divider",
        },
        {
          icon: React.createElement(LogoutOutlined),
          label: "Log out",
          key: "8",
          danger: true,
        },
      ],
    },
  ];

  useEffect(() => {
      GetUser();
    
      onMessageListener()
            .then((payload) => {
              console.log('Message received. ', payload);
            })
            .catch((err) => console.log('Failed to receive message. ', err));
        
    }, []);

    useEffect(() => {
      // Fetch unread count immediately on component mount
      getUnreadCount();

      // Set up the interval to fetch unread count every 10 seconds
      // const intervalId = setInterval(getUnreadCount, 10000); // 10000ms = 10 seconds

      // // Clean up the interval on component unmount
      // return () => clearInterval(intervalId);
  }, []); // E
   
  useEffect(() => {
    if (user.userName != undefined) {
      setAuthenticated(true);
      setLoading(false);
    }
  }, [user.userName]);

  return rootPath != "LogIN" && rootPath != "ErrorPage" && rootPath!="Home" && rootPath!=""?  (
    <UserContext.Provider value={{ user, GetUser ,setUser}}>
      <EmailContext.Provider value={{ email, setEmail }}>
        {loading ? (
          <Spin spinning={loading} fullscreen />
        ) : !authenticated ? (
          <ErrorPage />
        ) : (
          <Layout style={{ minHeight: "100vh" }}>
            <NotificationDrawer getUnreadCount={getUnreadCount} open={open} setOpen={setOpen} />

            <Sider
              collapsible
              collapsed={collapsed}
              onCollapse={(value) => setCollapsed(value)}
              style={{ height: "auto" }}
            >
              <div style={{ position: "sticky", top: 0 }}>
                <div
                  style={{
                    color: "white",
                    width: "100%",
                    textAlign: "center",
                    padding: "20px 10px",
                  }}
                >
                  {!collapsed ? (
                    <Image src="/translib.png" width={140} height={35} />
                  ) : (
                    <Image src="/translogo.png" width={40} height={35} />
                  )}
                </div>
                <ConfigProvider
                  theme={{
                    components: {
                      Menu: {
                        iconSize: 20,
                        iconMarginInlineEnd: 20,
                        darkItemHoverBg: "rgba(0, 0, 0, 0.3)",
                        collapsedIconSize: 20,
                        darkItemSelectedBg: "#2b4368",
                      },
                    },
                  }}
                >
                  <Menu
                    theme="dark"
                    mode="inline"
                    items={user.userType == "admin" ? sideitems : sideitems2}
                    selectedKeys={rootPath}
                  />
                </ConfigProvider>
              </div>
            </Sider>
            <Layout>
              <Header
                style={{
                  zIndex: 2,
                  position: "sticky",
                  top: 0,
                  padding: 0,
                  background: "rgb(255,255,255)",
                }}
              >
                <ConfigProvider
                  theme={{
                    components: {
                      Menu: {
                        iconMarginInlineEnd: 25,
                      },
                    },
                  }}
                >
                  <Flex
                    justify={
                      user.actualType == "admin" ? "space-between" : "right"
                    }
                    align="center"
                  >
                    {user.actualType == "admin" ? (
                      <>
                        {user.userType == "admin" ? (
                          <Button
                            onClick={() => selectPatron("patron")}
                            style={{ margin: "0 0 0 15px" }}
                          >
                            Patron View
                          </Button>
                        ) : null}
                        {user.userType == "patron" ? (
                          <Button
                            onClick={() => selectPatron("admin")}
                            style={{ margin: "0 0 0 15px" }}
                          >
                            Admin View
                          </Button>
                        ) : null}
                      </>
                    ) : null}

                    <Menu
                      selectable={false}
                      onClick={(a) => {a.key==="8"?logout():null}}
                      triggerSubMenuAction="click"
                      style={{
                        position: "sticky",
                        top: 0,
                        justifyContent: "end",
                      }}
                      theme="light"
                      mode="horizontal"
                      defaultSelectedKeys={["."]}
                      items={items}
                    />
                  </Flex>
                </ConfigProvider>
              </Header>
              <Content style={{ margin: "24px 5%" }}>
                <Card>
                  <Flex  justify="space-between" align="center" wrap="wrap">
                    <Flex
                      style={{ fontSize: "25px", fontWeight: "600" }}
                      align="center"
                      flex={1}
                    >
                      {" "}
                      <Button
                        onClick={() => router.back()}
                        style={{ margin: "0 20px 0 0" }}
                        shape="circle"
                        icon={<ArrowLeftOutlined />}
                      />
                      {rootPath}
                    </Flex>
                    <Flex style={{ minWidth:300}} justify="right">
                    
                      <AdressBar item={location.split("/").map((item,index) => ({ title: <Link href={`/${location.split("/").slice(1, index + 1).join('/')}`}>{item}</Link> })).slice(1)} />
                      
                    </Flex>
                  </Flex>
                  <Divider />
                  <Flex a vertical style={{ margin: "10px 0 0 0 " }}>
                    {props.children}
                  </Flex>
                </Card>
              </Content>
              <NavigationFooter/>
              {/* <Footer style={{ textAlign: "center" }}>
                EasyLibro ©{new Date().getFullYear()} Created by ChicoCodes
              </Footer> */}
            </Layout>
          </Layout>
        )}
      </EmailContext.Provider>
    </UserContext.Provider>
  ) : (
    <UserContext.Provider value={{ user, GetUser,setUser,setAuthenticated }}>
      <EmailContext.Provider value={{ email, setEmail }}>
        {props.children}
      </EmailContext.Provider>
    </UserContext.Provider>
  );
}

export default Navigations;
