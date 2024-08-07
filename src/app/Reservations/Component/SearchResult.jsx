"use client";
import ResultTable from "../Component/ResultTable";
import React, { useEffect, useState } from "react";
import { UserDeleteOutlined, MoreOutlined } from "@ant-design/icons";
import { Button, ConfigProvider, Space, Spin, Tag, Tooltip } from "antd";
import ReturnModal from "./ReturnModal";
import Link from "next/link";
import SeachReservations from "./SeachReservations";
import axios from "axios";
import Cookies from "js-cookie";
import axioinstance from "../../Instance/api_instance";
import { UserContext } from "../../Context/Context";
import dayjs from "dayjs";

function SearchResult() {
  const [recordData, setRecord] = useState([]);
  const [open, setOpen] = useState(false);
  const [keyword, setKeyword] = useState(""); // State for keyword
  const [status, setStatus] = useState("*"); // State for status
  const [date, setDate] = useState(dayjs(null)); // State for date
  const [type, setType] = useState("all"); // State for type
  const [items, setItems] = useState([]); // State for items (search results)
  const [loading, setLoading] = useState(true); // Loading state
  const user = React.useContext(UserContext).user;

  const showModal = (record) => {
    setRecord(record);
    setOpen(true);
  };
  const closeModal = () => {
    setOpen(false);
  };

  const columnsAdimn = [
    {
      title: "ISBN",
      dataIndex: "resource",
      key: "resource",
      render: (isbn, record) => <Link href={`/Resources/${isbn}`}>{isbn}</Link>,
    },
    {
      title: "Book",
      dataIndex: "resourceTitle",
      key: "resourceTitle",
    },
    {
      title: "User ID",
      dataIndex: "userId",
      key: "userId",
      render: (useid, record) => (
        <Tooltip title={record.userName}>{record.userId}</Tooltip>
      ),
      responsive: ["md","lg","xl","xxl"]
    },
    {
      title: "Due Date",
      dataIndex: "dueDate",
      key: "dueDate",
      responsive: ["md","lg","xl","xxl"]
    },
    // {
    //   title: "Issue Date",
    //   dataIndex: "issueDate",
    //   key: "issueDate",
    // },

    {
      title: "Action",
      dataIndex: "",
      key: "x",
      render: (status, record) => (
        <Space size="large">
          <Link href={`/Reservations/${record.reservationNo}`}>
            <Button type="primary" size="small" shape="round">
              More
            </Button>
          </Link>
        </Space>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status, record) =>
        status == "borrowed" ? (
          <Button
            onClick={() => showModal(record)}
            type="primary"
            size="small"
            shape="round"
          >
            Borrowed
          </Button>
        ) : status == "overdue" ? (
          <Button
            onClick={() => showModal(record)}
            type="primary"
            danger
            size="small"
            shape="round"
          >
            Overdue
          </Button>
        ) : (
          <Button type="primary" disabled size="small" shape="round">
            Received
          </Button>
        ),
        responsive: ["md","lg","xl","xxl"]
    },
  ];

  const columnsUser = [
    {
      title: "ISBN",
      dataIndex: "resource",
      key: "resource",
      render: (isbn, record) => <Link href={`/Resources/${isbn}`}>{isbn}</Link>,
    },
    {
      title: "Book",
      dataIndex: "resourceTitle",
      key: "resourceTitle",
    },

    // title: 'User Name',
    //dataIndex: 'borrowerName',
    //key: 'borrowerName',
    //},
    {
      title: "Due Date",
      dataIndex: "dueDate",
      key: "dueDate",
    },

    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (isbn, record) =>record.status==="overdue"?<Tag color="red">{record.status}</Tag>:record.status==="received"?<Tag color="green">{record.status}</Tag>:<Tag color="geekblue">{record.status}</Tag>
    },
    {
      title: "Action",
      dataIndex: "",
      key: "x",
      render: (status, record) => (
        <Space size="large">
          <Link href={`/Reservations/${record.reservationNo}`}>
            <Button type="primary" size="small" shape="round">
              More
            </Button>
          </Link>
        </Space>
      ),
    },
  ];

  async function fetchData() {
    // Function to fetch data from server
    setLoading(true); // Set loading to true while fetching
    try {
      // Sending POST request to fetch data based on search parameters
      const response = await axioinstance.post(
        "Reservation/SearchReservation",
        {
          keywords: keyword,
          type: type,
        }
      );
      const data = response.data.reverse(); // Extracting data from response
      setLoading(false); // Setting loading to false after data is fetched
      setItems(data); 
    } catch (error) {
      setLoading(false); // Setting loading to false if there's an error
    }
  }

  async function mydata() {
    try {
      const response = await axioinstance.post("User/GetMyData", null);
    } catch (error) {
      console.log(error.data);
    }
  }

  const search = () => {
    fetchData();
  }; // Function to trigger search

  useEffect(() => {
    fetchData(type);
    mydata();
  }, [user.userType]); // Fetch data on component mount

  return (
    <div>
      <SeachReservations
        func1={setStatus}
        func2={setType}
        func3={setKeyword}
        setDate={setDate}
        search={search}
      />
      <ResultTable
        loading={loading}
        nodata={false}
        dataset={
          items
            .filter((book) => status === "*" || book.status === status) // Filter by status
            .filter(
              (book) =>
                date.format("YYYY-MM-DD") === "Invalid Date" ||
                dayjs(book.issueDate).isSame(date, "day")
            ) // Filter by date
        }
        columnset={user.userType == "admin" ? columnsAdimn : columnsUser}
        pagination={{ pageSize: 20 }}
      />
      <ReturnModal
        fetchData={fetchData}
        open={open}
        openFuntion={showModal}
        close={closeModal}
        recordData={recordData}
      />
    </div>
  );
}

export default SearchResult;
