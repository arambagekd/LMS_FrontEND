import { Col, Row } from 'antd'
import { Footer } from 'antd/es/layout/layout'
import Link from 'next/link'
import React from 'react'

function NavigationFooter() {
  return (
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
  )
}


const styles={
    footer: {
        backgroundColor: "#001529",
        color: "#fff",
        padding: "40px 20px",
      },
      footerBottom: {
        marginTop: "20px",
        textAlign: "center",
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
}
export default NavigationFooter