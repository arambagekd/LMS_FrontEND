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
  UserSwitchOutlined,
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
  Space,
} from "antd";
import Link from "next/link";
import AdressBar from "./AdressBar";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import axioinstance from "../Instance/api_instance";
import { UserContext} from "../Context/Context";
import NotificationDrawer from "./NotificationDrawer";
import { getFirebaseToken, onMessageListener } from "../Yes/firebase-config";
import NavigationFooter from "./footer";
import { authService } from "../../../auth/authService";
import { firebaseauth } from "../../../auth/firebaseauth";
import styles from "./Navigations.module.css";
const { Header, Content, Sider } = Layout;







function Navigations(props) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(true);
  const [unreadCount, setUnreadCount] = useState(0);
  const location = usePathname();
  const rootPath = location.split("/")[1];
  const GetUser=React.useContext(UserContext).GetUser;
  const setLoading = React.useContext(UserContext).setLoading;
  const setAuthenticated = React.useContext(UserContext).setAuthenticated;
  const setUser = React.useContext(UserContext).setUser;
  const user = React.useContext(UserContext).user;

  const logout = async () => {
    setLoading(true);
    try {
      const response = await authService.logout();
      const firebasetoken = await getFirebaseToken();
      if (firebasetoken != "no") {
        try {
          const res = await firebaseauth.removeFirebasetoken(
            firebasetoken,
            user.userName
          );
        } catch (e) {}
      }
      setAuthenticated(false);
      setUser({});
      router.replace("/LogIN");
    } catch (error) {
      
    }
  };
 

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
  const headeritems = [
    {
      key: "Home",
     label: <Link href="/Home"><HomeOutlined/></Link>,
    },
    {
      key: "Dashboard",
      label: <Link href="/Dashboard"><DashboardOutlined/></Link>,
    },
    {
      key: "Resources",
      label: <Link href="/Resources"><ReadOutlined/></Link>,
    },
    {
      key: "Locations",
      label: <Link href="/Locations"><CloudServerOutlined/></Link>,
    },
    {
      key: "Users",
      label: <Link href="/Users"><UserOutlined/></Link>,
    },
    {
      key: "Requests",
      label: <Link href="/Requests"><AuditOutlined/></Link>,
    },
    {
      key: "Notifications",
      label: <Link href="/Notifications"><MessageOutlined/></Link>,
    },
    {
      key: "Reservations",
      label: <Link href="/Reservations"><InteractionOutlined/></Link>,
    },
  ];
  const headeritemspatron = [
    {
      key: "Home",
     label: <Link href="/Home"><HomeOutlined/></Link>,
    },
    {
      key: "Dashboard",
      label: <Link href="/Dashboard"><DashboardOutlined/></Link>,
    },
    {
      key: "Resources",
      label: <Link href="/Resources"><ReadOutlined/></Link>,
    },
    {
      key: "Locations",
      label: <Link href="/Locations"><CloudServerOutlined/></Link>,
    },
    {
      key: "Requests",
      label: <Link href="/Requests"><AuditOutlined/></Link>,
    },
    {
      key: "Reservations",
      label: <Link href="/Reservations"><InteractionOutlined/></Link>,
    },
  ];
  const itemadmin = [
    {
      key: "1",

      label: (
        <Badge count={unreadCount > 9 ? 9 + "+" : unreadCount}>
          <Avatar onClick={() => setOpen(true)} icon={<MessageOutlined />} />
        </Badge>
      ),
    },
    {
      key: "2",

      label: <Avatar src={user.image} icon={<UserOutlined />} />,
      children: [
        {
          label: (
            <center>
              <Avatar src={user.image} icon={<UserOutlined />} />{" "}
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
          icon:
            user.actualType == "admin"
              ? React.createElement(UserSwitchOutlined)
              : null,
          label:
            user.actualType == "admin" ? (
              <>
                {user.userType == "admin" ? (
                  <Space
                    onClick={() => selectPatron("patron")}
                    //style={{ margin: "0 0 0 15px" }}
                  >
                    Patron View
                  </Space>
                ) : null}
                {user.userType == "patron" ? (
                  <Space
                    onClick={() => selectPatron("admin")}
                    //style={{ margin: "0 0 0 15px" }}
                  >
                    Admin View
                  </Space>
                ) : null}
              </>
            ) : null,
          key: "7",
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
        {
          icon: React.createElement(InfoCircleOutlined),
          label: <a href="/AboutUs">About </a>,
          key: "10",
        },
        {
          type: "divider",
        },
        {
          icon: React.createElement(LogoutOutlined),
          label: <Space onClick={logout}>Logout</Space>,
          key: "9",
          danger: true,
        },
      ],
    },
  ];
  const itempatron = [
    {
      key: "1",

      label: (
        <Badge count={unreadCount > 9 ? 9 + "+" : unreadCount}>
          <Avatar onClick={() => setOpen(true)} icon={<MessageOutlined />} />
        </Badge>
      ),
    },
    {
      key: "2",

      label: <Avatar src={user.image} icon={<UserOutlined />} />,
      children: [
        {
          label: (
            <center>
              <Avatar src={user.image} icon={<UserOutlined />} />{" "}
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
        {
          icon: React.createElement(InfoCircleOutlined),
          label: <Link href="/About">About </Link>,
          key: "8",
        },
        {
          type: "divider",
        },
        {
          icon: React.createElement(LogoutOutlined),
          label: <Space onClick={logout}>Logout</Space>,
          key: "9",
          danger: true,
        },
      ],
    },
  ];



  const selectPatron = async (usertype) => {
    try {
      const response = await authService.selectPatron(usertype);
      GetUser();
    } catch (e) {
    }
  };

  const getUnreadCount = async () => {
    try {
      const response = await axioinstance.post("Notification/UnreadCount");
      setUnreadCount(response.data);
    } catch (error) {
    }
  };

  useEffect(() => {
    
    onMessageListener()
      .then((payload) => {
      })
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
        getUnreadCount();
    }, 1000);

    // Clear the interval when the component unmounts
    return () => clearInterval(interval);
}, []);


 
  return rootPath != "LogIN" &&
    rootPath != "ErrorPage" &&
    rootPath != "Home" &&
    rootPath != "AboutUs" &&
    rootPath != "ContactUs" &&
    rootPath != "" ? (
    <div>
          <Layout style={{ minHeight: "100vh" }}>
            <NotificationDrawer
              getUnreadCount={getUnreadCount}
              open={open}
              setOpen={setOpen}
            />

            <Sider
            className={styles.sider}
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
                  height: "auto",
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
                 
                  <Menu
                    selectable={false}
                    onClick={(a) => {
                      a.key === "8" ? logout() : null;
                    }}
                    triggerSubMenuAction="click"
                    style={{
                      justifyContent: "end",
                    }}
                    theme="light"
                    mode="horizontal"
                    defaultSelectedKeys={["."]}
                    items={user.actualType == "admin" ? itemadmin : itempatron}
                  />
                 
                  <Menu
                  
                    selectable={false}
                    onClick={(a) => {
                      a.key === "8" ? logout() : null;
                    }}
                    
                    triggerSubMenuAction="click"
                   className={styles.headernavigation}
                    theme="light"
                    mode="horizontal"
                    defaultSelectedKeys={["."]}
                    items={user.userType == "admin" ? headeritems : headeritemspatron}
                  />
                  
                </ConfigProvider>
              </Header>
              <ConfigProvider
                theme={{
                  token: {
                    borderRadiusLG: 5,
                    borderRadiusSM: 5,
                    borderRadius: 0,
                  },
                }}
              >
                <Content style={{ margin: "0px 0% ", minHeight: "100vh" }}>
                  <Card>
                    <Flex justify="space-between" align="center" wrap="wrap">
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
                      <Flex>
                        <AdressBar
                          item={location
                            .split("/")
                            .map((item, index) => ({
                              title: (
                                <Link
                                  href={`/${location
                                    .split("/")
                                    .slice(1, index + 1)
                                    .join("/")}`}
                                >
                                  {item}
                                </Link>
                              ),
                            }))
                            .slice(1)}
                        />
                      </Flex>
                    </Flex>
                    <Divider />
                    <Flex
                      a
                      vertical
                      style={{ margin: "10px 0 0 0 ", minHeight: "80vh" }}
                    >
                      {props.children}
                    </Flex>
                  </Card>
                </Content>
              </ConfigProvider>
              <NavigationFooter />
              {/* <Footer style={{ textAlign: "center" }}>
                EasyLibro ©{new Date().getFullYear()} Created by ChicoCodes
              </Footer> */}
            </Layout>
          </Layout>
       </div>
  ) : (
        props.children
  );
}

export default Navigations;
