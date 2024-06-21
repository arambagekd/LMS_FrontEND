"use client";
import {
  AppstoreOutlined,
  LoginOutlined,
  MailOutlined,
  MobileFilled,
  MobileOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { FontWeight, Position } from "@cloudinary/url-gen/qualifiers";
import { justify } from "@cloudinary/url-gen/qualifiers/textAlignment";
import { Button, Card, Carousel, ConfigProvider, Flex, Menu, Layout, Row, Col, Space } from "antd";
import Link from "next/link";
import React from "react";

const { Header, Footer, Content } = Layout;

const HomePage = () => {
  const items = [
    {
      label: "Contact us",
      key: "mail",
      icon: <MailOutlined />,
    },
    {
      label: "About us",
      key: "about",
      icon: <AppstoreOutlined />,
    },
    {
      label: <Link href="/LogIN">Login</Link>,
      key: "login",
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
        />
     
      <Content style={styles.container}>
        <Carousel autoplaySpeed={5000} autoplay>
          <div>
            <div style={contentStyle}>
              Welcome to the EasyLibro
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
              Experience a New Era of <br /> Library Access
            </h1>
            <p style={styles.subheading}>
              Effortlessly discover and borrow your favorite books, manage your personalized reading list, and explore a vast collection of digital resources. Enjoy seamless tracking of your borrowed items and receive tailored recommendations to enhance your reading experience—all for free.
            </p>
            <br />
            <Flex wrap="wrap" justify="center" align="center" gap={15}>
              <Link href="/LogIN"><Button size="large"   type="primary">Sign in to EasyLibro</Button></Link>
            </Flex>
          </div>
        </main>

        <section style={styles.featuresSection}>
          
          <Row gutter={[16,16]} justify="center">
            <Col sm={8} xs={24}>
              <Card title="Alerts and reminders" bordered={false} style={styles.featureCard}>
                <p>EasyLibro includes a robust notifications system that sends alerts for various events. Users receive notifications about book availability, reservation confirmations, and other important updates</p>
              </Card>
            </Col>
            <Col sm={8} xs={24}>
              <Card title="Remote book reservation" bordered={false} style={styles.featureCard}>
                <p>Users can request to borrow books directly from their home. This feature allows them to reserve books online, making the borrowing process convenient and efficient.</p>
              </Card>
            </Col>
            <Col sm={8} xs={24}>
              <Card title="Real-time availability status" bordered={false} style={styles.featureCard}>
                <p>The system shows the current availability status of each book, indicating whether it is available, checked out, or reserved. This helps users plan their reading and borrowing schedule effectively.</p>
              </Card>
            </Col>
          </Row>
        </section>

        <section style={styles.testimonialsSection}>
          <h2 style={styles.sectionHeading}>What Our Users Say</h2>
          <Carousel autoplay>
            <div>
              <Card style={styles.testimonialCard}>
                <p>"This library system has transformed how I manage my reading list."</p>
                <p>- Jane Doe</p>
              </Card>
            </div>
            <div>
              <Card style={styles.testimonialCard}>
                <p>"An excellent resource for finding and borrowing books seamlessly."</p>
                <p>- John Smith</p>
              </Card>
            </div>
            <div>
              <Card style={styles.testimonialCard}>
                <p>"Highly recommend this system for any library!"</p>
                <p>- Sarah Brown</p>
              </Card>
            </div>
          </Carousel>
        </section>

        <section style={styles.ctaSection}>
          <h2 style={styles.sectionHeading}>Join Us Today</h2>
          <p>Sign up now and start exploring a world of books and resources at your fingertips.</p>
          <Link href="/LogIN"><Button type="primary" size="large">Get Started</Button></Link>
        </section>
      </Content>
      <Footer style={styles.footer}>
        <Row justify="space-between">
          <Col  >
            <h3>About Us</h3>
            <p>Learn more about our mission and values.</p>
          </Col>
          <Col >
            <h3>Contact Us</h3>
            <p>Get in touch with our support team.</p>
            <ul style={{listStyle:"none"}}>
              <li><MobileOutlined/><Space style={{margin:"0 0 0 15px",fontSize:18}}>041 226 8205</Space></li>
              <li> <MailOutlined/><Space style={{margin:"0 0 0 15px",fontSize:18}}><a href="mailto:easyLibro.online">easyLibro.online</a></Space></li>
            </ul>
            
           
            
          </Col>
          <Col >
            <h3>Resources</h3>
            <p>Explore our collection of resources and guides.</p>
          </Col>
          <Col>
            <h3>Follow Us</h3>
            {/* <Space>
              <a href="https://twitter.com"><img src="/path/to/twitter-icon.png" alt="Twitter" /></a>
              <a href="https://facebook.com"><img src="/path/to/facebook-icon.png" alt="Facebook" /></a>
              <a href="https://instagram.com"><img src="/path/to/instagram-icon.png" alt="Instagram" /></a>
            </Space> */}
          </Col>
        </Row>
        <div style={styles.footerBottom}>
          <p>&copy; EasyLibro Library Management System. All rights reserved.</p>
          <Link href="/privacy-policy">Privacy Policy</Link> | <Link href="/terms-of-service">Terms of Service</Link>
        </div>
      </Footer>
    </Layout>
  );
};

const contentStyle = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  height: "60vh",
  color: "#fff",
  textAlign: "center",
  background: "#364d79",
  fontWeight: 700,
  fontSize: 40,
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
    width: "100%",
    top: 0,
    justifyContent: "space-between",
    alignItems: "center",
    padding: "10px 20px",
    backgroundColor: "rgba(5, 5, 5, 0.8)",
    flexWrap: "wrap",
  },
  logo: {
    display: "flex",
    alignItems: "center",
  },
  main: {
    display: "flex",
    justifyContent: "center",
    padding: "0px 20px 30px 20px",
    backgroundColor: "#f5f5f5",
  },
  textContainer: {
    maxWidth: "70%",
    //boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.15)',
    //backgroundColor: "white",
    borderRadius: "10px",
    padding: "20px"
  },
  heading: {
    textAlign: "center",
    fontSize: "36px",
    color: "rgb(0,21,41)",
  },
  subheading: {
    textAlign: "justify",
    margin: "0 40px",
    fontSize: "18px",
    color: "#333",
  },
  featuresSection: {
    padding: "60px 20px",
    backgroundColor: "#fff",
  },
  featureCard: {
    textAlign: "center",
    padding: "20px",
    boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.15)',
  },
  testimonialsSection: {
    padding: "60px 20px",
    backgroundColor: "#f5f5f5",
  },
  sectionHeading: {
    textAlign: "center",
    fontSize: "28px",
    marginBottom: "20px",
  },
  testimonialCard: {
    padding: "20px",
    textAlign: "center",
    boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.15)',
  },
  ctaSection: {
    padding: "60px 20px",
    textAlign: "center",
    backgroundColor: "#fff",
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
