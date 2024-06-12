"use client";
import {
  AppstoreOutlined,
  MailOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { FontWeight, Position } from "@cloudinary/url-gen/qualifiers";
import { justify } from "@cloudinary/url-gen/qualifiers/textAlignment";
import { Carousel, ConfigProvider, Menu } from "antd";
import React from "react";

const HomePage = () => {
  const items = [
    {
      label: "Navigation One",
      key: "mail",
      icon: <MailOutlined />,
    },
    {
      label: "Navigation Two",
      key: "app",
      icon: <AppstoreOutlined />,
    },
    {
      label: "Navigation Three - Submenu",
      key: "SubMenu",
      icon: <SettingOutlined />,
    },
  ];
  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <div style={styles.logo}>
          <img src="/translib.png" width={100} alt="Mint Logo" />
        </div>
       
          <ConfigProvider
            theme={{
              components: {
                Menu: {
                  itemBg:""
                },
              },
              token: {
               colorSplit:"rgba(5, 5, 5, 0)",
               fontSize:16,
               colorText:"white"
              },
            }}
          >
            <Menu
              
              mode="horizontal"
              items={items}
            />
          </ConfigProvider>
    
      </header>

      <Carousel autoplaySpeed={5000} autoplay >
        <div>
          <div style={contentStyle}>
            Welcome to the Library Management System
          </div>
        </div>
        <div>
          <div style={contentStyle}>
            Efficiently Manage Your Books and Resources
          </div>
        </div>
        <div>
          <div style={contentStyle}>
            Track Borrowing and Returning of Books Seamlessly
          </div>
        </div>
        <div>
          <div style={contentStyle}>
            Access a Wide Range of Digital Resources Anytime
          </div>
        </div>
      </Carousel>
      <main style={styles.main}>
        <div style={styles.textContainer}>
          <h1 style={styles.heading}>
            Experience a fresh way to <br /> manage money
          </h1>
          <p style={styles.subheading}>
            Reach your goals with personalized insights, custom budgets, spend
            tracking, and subscription monitoring—all for free.
          </p>
          <button style={styles.signUpButton}>Sign up for Mint</button>
          <div style={styles.appLinks}>
            <a href="#appstore" style={styles.appLink}>
              <img src="/path/to/app-store-badge.png" alt="App Store" />
            </a>
            <a href="#googleplay" style={styles.appLink}>
              <img src="/path/to/google-play-badge.png" alt="Google Play" />
            </a>
          </div>
        </div>
      </main>
    </div>
  );
};
const contentStyle = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  height: "100vh",
  color: "#fff",
  textAlign: "center",
  background: "#364d79",
  fontWeight: 700,
  fontSize: 55,
  backgroundImage: "url('/library.jpeg')", // Replace with your image path
  backgroundSize: "cover", // Ensures the image covers the entire background
  backgroundPosition: "center", // Centers the image
  backgroundRepeat: "no-repeat" 
};
const styles = {
  container: {
    fontFamily: "Arial, sans-serif",
  },
  header: {
    zIndex: 5,
    display: "flex",
    position: "fixed",
    width: "98%",
    top: 0,
    justifyContent: "space-between",
    alignItems: "center",
    aliignContent:"center",
    padding: "10px 20px",
    backgroundColor:"rgba(5, 5, 5, 0.8)",
    flexWrap: "wrap",
  },
  menu: {
    display: "flex",
    flexGrow: 1,
  },
  logo: {
    display: "flex",
    alignItems: "center",
  },
  nav: {
    display: "flex",
    alignItems: "center",
  },
  navLink: {
    margin: "0 10px",
    textDecoration: "none",
    color: "#333",
  },
  authButtons: {
    display: "flex",
    alignItems: "center",
  },
  button: {
    margin: "0 5px",
    padding: "10px 20px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
  main: {
    display: "flex",
    justifyContent: "space-between",
    padding: "40px 20px",
  },
  textContainer: {
    maxWidth: "50%",
  },
  heading: {
    fontSize: "36px",
    color: "#2a9d8f",
  },
  subheading: {
    fontSize: "18px",
    color: "#333",
  },
  signUpButton: {
    marginTop: "20px",
    padding: "10px 20px",
    backgroundColor: "#2a9d8f",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
  appLinks: {
    marginTop: "20px",
    display: "flex",
    alignItems: "center",
  },
  appLink: {
    margin: "0 10px",
  },
  imageContainer: {
    maxWidth: "50%",
  },
};

export default HomePage;
