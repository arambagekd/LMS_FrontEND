"use client";
import React, { use, useEffect, useState, useCallback } from "react";
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
} from "@ant-design/icons";
import {
  Button,
  Card,
  ConfigProvider,
  Flex,
  Layout,
  Menu,
  Avatar,
  Spin,
  Divider,
} from "antd";
import Link from "next/link";
import AdressBar from "./AdressBar";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import axios from "axios";
import Cookies from "js-cookie";
import Profile from "./Profile";
import axioinstance from "../Instance/api_instance";
import { UserContext, EmailContext } from "../Context/Context";
import MyHub from "../Notifications/MyHub/page";
import ErrorPage from "../ErrorPage/page";
import NotificationDrawer from "./NotificationDrawer";
import styles from "./Navigations.module.css";

const { Header, Content, Footer, Sider } = Layout;

const sideitems = [
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

  const logout = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5164/api/Auth/Logout",
        { withCredentials: true }
      );
      Cookies.remove("jwt");
      router.push("/LogIN");
    } catch (error) {
      console.log(error);
    }
  };

  async function GetUser() {
    try {
      const response = await axioinstance.post("User/GetMyData");
      const response1 = await axioinstance.post("User/GetEmail");
      setUser(response.data);
      setEmail(response1.data);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }

  const selectPatron = async (usertype) => {
    try {
      const token = Cookies.get("jwt");
      Cookies.remove("jwt");
      const response = await axios.post(
        `https://fb10-61-245-161-144.ngrok-free.app/api/Auth/selectusertype?userType=${usertype}`,
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

  const [collapsed, setCollapsed] = useState(false);
  const location = usePathname();
  const rootPath = location.split("/")[1];

  const items = [
    {
      key: "1",
      label: (
        <Avatar onClick={() => setOpen(true)} icon={<MessageOutlined />} />
      ),
    },
    {
      key: "2",
      label: <Avatar icon={<UserOutlined />} />,
      children: [
        {
          label: (
            <a href="https://www.antgroup.com">
              <center>
                <Avatar icon={<UserOutlined />} />
              </center>
            </a>
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
          label: <a href="https://www.aliyun.com">Edit Profile</a>,
          key: "4",
        },
        {
          icon: React.createElement(SettingOutlined),
          label: <a href="https://www.aliyun.com">Settings </a>,
          key: "5",
        },
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
          label: <div onClick={logout}>Log out</div>,
          key: "8",
        },
      ],
    },
  ];

  useEffect(() => {
    GetUser();
  }, []);

  useEffect(() => {
    if (user.userName != undefined) {
      setAuthenticated(true);
      setLoading(false);
    }
  }, [user.userName]);

  return rootPath != "LogIN" && rootPath != "ErrorPage" ? (
    <UserContext.Provider value={{ user, GetUser }}>
      <EmailContext.Provider value={{ email, setEmail }}>
        {loading ? (
          <Spin spinning={loading} fullscreen />
        ) : !authenticated ? (
          <ErrorPage />
        ) : (
          <Layout className={styles.layout}>
            <NotificationDrawer open={open} setOpen={setOpen} />
            <Sider
              collapsible
              collapsed={collapsed}
              onCollapse={(value) => setCollapsed(value)}
              style={{ height: "auto" }}
            >
              <div style={{ position: "sticky", top: 0 }}>
                <div className={styles.siderLogo}>
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
                    defaultSelectedKeys={rootPath}
                  />
                </ConfigProvider>
              </div>
            </Sider>
            <Layout>
              <Header className={styles.header}>
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
                    {user.actualType == "admin" && (
                      <>
                        {user.userType == "admin" && (
                          <Button
                            onClick={() => selectPatron("patron")}
                            style={{ margin: "0 0 0 15px" }}
                          >
                            Patron View
                          </Button>
                        )}
                        {user.userType == "patron" && (
                          <Button
                            onClick={() => selectPatron("admin")}
                            style={{ margin: "0 0 0 15px" }}
                          >
                            Admin View
                          </Button>
                        )}
                      </>
                    )}
                    <Menu
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
              <Content className={styles.content}>
                <Card>
                  <Flex justify="space-between" align="center" wrap="">
                    <Flex className={styles.title} align="center">
                      <Button
                        onClick={() => router.back()}
                        className={styles.backButton}
                        shape="circle"
                        icon={<ArrowLeftOutlined />}
                      />
                      {rootPath}
                    </Flex>
                    <div>
                      <AdressBar item={props.pageroot} />
                    </div>
                  </Flex>
                  <Divider />
                  <Flex className={styles.addressBarContainer}>
                    <MyHub>{props.children}</MyHub>
                  </Flex>
                </Card>
              </Content>
              <Footer className={styles.footer}>
                Ant Design ©{new Date().getFullYear()} Created by Ant UED
              </Footer>
            </Layout>
          </Layout>
        )}
      </EmailContext.Provider>
    </UserContext.Provider>
  ) : (
    <UserContext.Provider value={{ user, GetUser }}>
      <EmailContext.Provider value={{ email, setEmail }}>
        {props.children}
      </EmailContext.Provider>
    </UserContext.Provider>
  );
}

export default Navigations;
