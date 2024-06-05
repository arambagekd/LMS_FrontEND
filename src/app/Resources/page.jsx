"use client";
import React, { useEffect, useState } from "react";
import { HomeOutlined } from "@ant-design/icons";
import SearchResult from "./Components/SearchResult";
import { Button, FloatButton } from "antd";
import SearchResources from "./Components/SearchResources";
import { PlusOutlined } from "@ant-design/icons";
import Link from "next/link";
import axioinstance from "../Instance/api_instance";

function page() {
  const [books, setBooks] = useState([]);

  const [keyword, setKeyword] = useState(""); // State for keyword
  const [sort, setsort] = useState("title"); // State for status
  const [type, setType] = useState("*"); // State for type
  const [ascending,setAscending] = useState(false); // State for items (search results)

  const search = async () => {
    try {
      const response = await axioinstance.post(`Resource/GetAllResource`);
      const searchData = response.data;
      setBooks(searchData);
    } catch (error) {
      alert("Error searching data:");
    }
  };

  useEffect(() => {
    search();
  }, []);

  return (
    <div>
      <Link href={"/Resources/AddResources"}>
        <FloatButton
          icon={<PlusOutlined />}
          tooltip="Add a resource"
          type="primary"
        />
      </Link>
      <SearchResources
        func1={setsort}
        func2={setType}
        func3={setKeyword}
        func4={setAscending}
        ascending={ascending}
        search={search}
      />
      <br />
      <SearchResult
        data={ascending?(
          sort === "title"
            ? books.sort((a, b) => b.title.localeCompare(a.title))
            : sort === "popular"
            ? books.sort((a, b) => a.noOfRes - b.noOfRes)
            : sort === "latest"
            ? books.sort((a, b) => new Date(a.dateadded) - new Date(b.dateadded))
            : books):
            (
              sort === "title"
              ? books.sort((a, b) => a.title.localeCompare(b.title))
              : sort === "popular"
              ? books.sort((a, b) => b.noOfRes - a.noOfRes)
              : sort === "latest"
              ? books.sort((a, b) => new Date(b.dateadded) - new Date(a.dateadded))
              : books
            )
        }
      />
    </div>
  );
}

export default page;
