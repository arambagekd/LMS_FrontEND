"use client";
import {  Col, Descriptions, Flex, Image, Row, Spin } from "antd";
import Card from "antd/es/card/Card";
import React, { useEffect, useState } from "react";
import axioinstance from "../../Instance/api_instance";
import Link from "next/link";

function AboutCard({ reservationId }) {
  const [items, setItem] = useState([]);
  const [error, seterror] = useState(false);
  const [loading, setLoading] = useState(true);
  const [imagePath,setImagePath]=useState("");
  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await axioinstance.post(
        `Reservation/About?resId=${reservationId}`
      );
      setImagePath(response.data.imagePath);
      const items = [
        {
          key: "1",
          label: "Reservation ID",
          children: response.data.resId,
        },
        {
          key: "7",
          label: "Resource ID (ISBN)",
          span: 2,
          children: <Link href={`/Resources/${response.data.isbnisbn}`}>{response.data.isbn}</Link>,
        },
        {
          key: "5",
          label: "Book Title",
          children: response.data.bookTitle,
        },

        {
          key: "2",
          label: "Username",
          children: response.data.userName,
        },
        {
          key: "4",
          label: "Issuer",
          children: response.data.issuer,
        },

        {
          key: "9",
          label: "Borrow Date",
          children: response.data.dateIssue,
        },
        {
          key: "10",
          label: "Due Date",
          children: response.data.dueDate,
        },
        {
          key: "11",
          label: "Return Date",
          children: response.data.returnDate,
        },
        {
          key: "12",
          label: "Penalty Status",
          children: "None",
        },
      ];
      setItem(items);
      setLoading(false);
    } catch (error) {
      console.log(error);
      seterror(true);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Flex style={{ width: "100%" }} justify="center" align="center">
      {error ? (
        <div>Loading has failed....</div>
      ) : (
        <Spin spinning={loading} size="large">
          {!loading && (
            <Flex style={{ width: "100%" }} justify="center" align="center">
              <Card bordered style={{ width: "100%" }}>
                <Row gutter={[30, 30]} align="middle">
                  <Col md={6} sm={6} xs={6}>
                    <Image
                      src={imagePath}
                      alt="Image loading is failed"
                      width="140px"
                      style={{ borderRadius: "5px" }}
                    />
                  </Col>
                  <Col md={18} sm={24} xs={24}>
                    
                    <Descriptions
                      title={
                        <div>
                          Reservation Details of Reservation {reservationId}{" "}
                        </div>
                      }
                      layout="horizontal"
                      column={{
                        xs: 1,
                        sm: 2,
                        md: 2,
                        lg: 2,
                        xl: 2,
                        xxl: 2,
                      }}
                      items={items}
                    />
                  </Col>
                </Row>
              </Card>
            </Flex>
          )}
        </Spin>
      )}
    </Flex>
  );
}

export default AboutCard;
