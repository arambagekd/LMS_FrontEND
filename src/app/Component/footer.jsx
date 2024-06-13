import { Col, Divider, Row } from 'antd';
import { Footer } from 'antd/es/layout/layout';
import Link from 'next/link';
import React from 'react';

function NavigationFooter() {
  return (

    <Footer style={styles.footer}>
        <Divider />
      <Row justify="space-around">
        <Col span={6}>
          <h3 style={styles.heading}>About Us</h3>
          <p style={styles.text}>Learn more about our mission and values.</p>
        </Col>
        <Col span={6}>
          <h3 style={styles.heading}>Contact Us</h3>
          <p style={styles.text}>Get in touch with our support team.</p>
        </Col>
        <Col span={6}>
          <h3 style={styles.heading}>Resources</h3>
          <p style={styles.text}>Explore our collection of resources and guides.</p>
        </Col>
        <Col span={6}>
          <h3 style={styles.heading}>Follow Us</h3>
          {/* <Space>
            <a href="https://twitter.com"><img src="/path/to/twitter-icon.png" alt="Twitter" /></a>
            <a href="https://facebook.com"><img src="/path/to/facebook-icon.png" alt="Facebook" /></a>
            <a href="https://instagram.com"><img src="/path/to/instagram-icon.png" alt="Instagram" /></a>
          </Space> */}
        </Col>
      </Row>
      <div style={styles.footerBottom}>
        <p>&copy; 2024 Library Management System. All rights reserved.</p>
        <Link href="/privacy-policy" style={styles.link}>Privacy Policy</Link> | <Link href="/terms-of-service" style={styles.link}>Terms of Service</Link>
      </div>
    </Footer>
  );
}

const styles = {
  footer: {
   // backgroundColor: "#f9f9f9", // Light background color
    color: "#000", // Dark text color for contrast
    padding: "40px 20px",
  },
  heading: {
    color: "#001529", // Darker color for headings
  },
  text: {
    color: "#333", // Darker color for text
  },
  footerBottom: {
    marginTop: "20px",
    textAlign: "center",
    borderTop: "1px solid #ccc", // Light border color for subtlety
    paddingTop: "20px",
    color: "#333", // Darker color for bottom text
  },
  link: {
    color: "#001529", // Darker color for links
    marginLeft: "10px",
    marginRight: "10px",
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

export default NavigationFooter;
