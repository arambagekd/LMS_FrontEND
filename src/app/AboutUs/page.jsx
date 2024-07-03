"use client";
import { AppstoreOutlined, MailOutlined, LoginOutlined, HomeOutlined } from "@ant-design/icons";
import { Button, Card, Layout, Menu, Row, Col } from "antd";
import Link from "next/link";
import React from "react";

const { Header, Footer, Content } = Layout;

const AboutUsPage = () => {
  const items = [
    {
      label: <Link href="/Home">Home</Link>,
      key: "home",
      icon: <HomeOutlined />,
    },
    {
      label: <Link href="/ContactUs">Contact us</Link>,
      key: "mail",
      icon: <MailOutlined />,
    },
    {
      label: <Link href="/AboutUs">About us</Link>,
      key: "about",
      icon: <AppstoreOutlined />,
    },
    {
      label: <Link href="/LogIN">Sign in</Link>,
      key: "signin",
      icon: <LoginOutlined />,
    },
  ];

  return (
    <Layout>
      <Menu
        style={{ position: "fixed", zIndex: 100, height: "60px", width: "100vw", opacity: 0.9, justifyContent: "right" }}
        inlineCollapsed={false}
        mode="horizontal"
        items={items}
        selectedKeys={["about"]}
      />
      <Content style={styles.container}>
        <section style={styles.aboutSection}>
          <h1 style={styles.heading}>About Us</h1>
          <div style={styles.textContainer}>
            <p style={styles.paragraph}>
              Welcome to EasyLibro, your go-to library management system. Our mission is to simplify the way you access and manage library resources, providing a seamless experience for both librarians and patrons.
            </p>
            <p style={styles.paragraph}>
              With EasyLibro, you can effortlessly discover and borrow your favorite books, manage your personalized reading list, and explore a vast collection of digital resources. Our system is designed to enhance your reading experience with features like real-time availability status, remote book reservations, and timely notifications about book availability and reservations.
            </p>
            <p style={styles.paragraph}>
              At EasyLibro, we believe in the power of technology to make library management more efficient and user-friendly. Join us on this journey to revolutionize the way you interact with your library.
            </p>
          </div>
        </section>
      </Content>
      <Footer style={styles.footer}>
        <Row justify="space-around">
          <Col span={6}>
            <h3>About Us</h3>
            <p>Learn more about our mission and values.</p>
          </Col>
          <Col span={6}>
            <h3>Contact Us</h3>
            <p>Get in touch with our support team.</p>
          </Col>
          <Col span={6}>
            <h3>Resources</h3>
            <p>Explore our collection of resources and guides.</p>
          </Col>
          <Col span={6}>
            <h3>Follow Us</h3>
            {/* <Space>
              <a href="https://twitter.com"><img src="/path/to/twitter-icon.png" alt="Twitter" /></a>
              <a href="https://facebook.com"><img src="/path/to/facebook-icon.png" alt="Facebook" /></a>
              <a href="https://instagram.com"><img src="/path/to/instagram-icon.png" alt="Instagram" /></a>
            </Space> */}
          </Col>
        </Row>
        <div style={styles.footerBottom}>
          <p>&copy; 2024 Library Management System. All rights reserved.</p>
          <Link href="/privacy-policy">Privacy Policy</Link> | <Link href="/terms-of-service">Terms of Service</Link>
        </div>
      </Footer>
    </Layout>
  );
};

const styles = {
  container: {
    fontFamily: "Arial, sans-serif",
  },
  aboutSection: {
    padding: "60px 20px",
    backgroundColor: "#f5f5f5",
  },
  textContainer: {
    maxWidth: "70%",
    margin: "0 auto",
    padding: "20px",
    backgroundColor: "white",
    borderRadius: "10px",
    boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.15)",
  },
  heading: {
    textAlign: "center",
    fontSize: "36px",
    color: "rgb(0,21,41)",
  },
  paragraph: {
    textAlign: "justify",
    margin: "20px 0",
    fontSize: "18px",
    color: "#333",
  },
  footer: {
    backgroundColor: "#001529",
    color: "#fff",
    padding: "40px 20px",
  },
  footerBottom: {
    textAlign: "center",
    marginTop: "20px",
    borderTop: "1px solid #fff",
    paddingTop: "20px",
  },
};

export default AboutUsPage;
