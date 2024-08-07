"use client";
import { AppstoreOutlined, MailOutlined, LoginOutlined, PhoneOutlined, EnvironmentOutlined, HomeOutlined } from "@ant-design/icons";
import { FontWeight } from "@cloudinary/url-gen/qualifiers";
import { Button, Card, Layout, Menu, Row, Col, Form, Input,notification } from "antd";
import Link from "next/link";
import React from "react";
import { useState } from 'react';
import Image from 'next/image';

const { Header, Footer, Content } = Layout;

const ContactUsPage = () => {
  const [loading, setLoading] = useState(false);
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
  // const onFinish = (values) => {
  //   console.log('Success:', values);
  // };

  const onFinish = (values) => {
    setLoading(true);
    // Simulate a request to a server
    setTimeout(() => {
      notification.success({
        message: 'Success',
        description: 'Your message has been sent successfully!',
      });
      setLoading(false);
    }, 2000);
  };
  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <Layout>
      <Menu
        style={{ position: "fixed", zIndex: 100, height: "60px", width: "100vw", opacity: 0.9, justifyContent: "right" }}
        inlineCollapsed={false}
        mode="horizontal"
        items={items}
        selectedKeys={['mail']}
      />
      <Content style={styles.container}>
        <section style={styles.contactSection}>
          <div ><h1 style={styles.heading}>Contact Us</h1></div>
          <div style={styles.textContainer}>
            <div style={{backgroundImage:"url('library.jpeg')",padding:100 }}>
            <p style={styles.paragraph}>

We would love to hear from you!<br/> <br/> Whether you have a question about our system, need assistance, or just want to provide feedback, feel free to reach out to us.
</p></div>
            <Row gutter={[16, 16]} justify="center"style={{margin:"50px 0"}}>
              <Col sm={12} xs={24} >
                <Form
                  name="contact"
                  initialValues={{ remember: true }}
                  onFinish={onFinish}
                  onFinishFailed={onFinishFailed}
                  style={styles.form}
                >
                  <Form.Item
                    name="name"
                    rules={[{ required: true, message: 'Please enter your name' }]}
                  >
                    <Input placeholder="Your Name" />
                  </Form.Item>

                  <Form.Item
                    name="email"
                    rules={[{ required: true, message: 'Please enter your email', type: 'email' }]}
                  >
                    <Input placeholder="Your Email" />
                  </Form.Item>

                  <Form.Item
                    name="message"
                    rules={[{ required: true, message: 'Please enter your message' }]}
                  >
                    <Input.TextArea rows={4} placeholder="Your Message" />
                  </Form.Item>

                  <Form.Item><center>
                  <Button type="primary" htmlType="submit" loading={loading}>
                      Submit
                    </Button>
                  </center>
                    
                  </Form.Item>
                </Form>
              </Col>
              <Col sm={8} xs={24}>
                <Card style={styles.contactCard}>
                  <h3>Contact Information</h3>
                  <p><PhoneOutlined /> Phone: (123) 456-7890</p>
                  <p><MailOutlined /> Email: contact@easylibro.com</p>
                  <p><EnvironmentOutlined /> Address: 123 Library Lane, Booktown, BK 12345</p>
                </Card>
              </Col>
              <Col sm={4}><div><Image src="/contact.jpg" alt="Contact Image"layout="responsive" width={100} height={100} /></div></Col>
            </Row>
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
  contactSection: {
    padding: "60px 20px",
    backgroundColor: "#f5f5f5",
  },
  textContainer: {
    maxWidth: "95%",
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
    textAlign: "center",
    margin: "20px 0",
    fontSize: "25px",
    color: "white",
    FontWeight:"200"
  },
  form: {
    margin: "30px 0",
    maxWidth: "600px",
    margin: "0 auto",
  },
  contactCard: {
    padding: "20px",
    boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.75)",
   // backgroundImage:"url('/contact.jpg')",
    //backgroundColor:"#93a8bc"
  },
  mapContainer: {
    marginTop: "20px",
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

export default ContactUsPage;
