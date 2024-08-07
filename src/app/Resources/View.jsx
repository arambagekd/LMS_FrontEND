"use client";
import React, { useEffect, useState } from "react";
import { HomeOutlined } from "@ant-design/icons";
import SearchResult from "./Components/SearchResult";
import { Button, FloatButton } from "antd";
import SearchResources from "./Components/SearchResources";
import { PlusOutlined } from "@ant-design/icons";
import Link from "next/link";
import axioinstance from "../Instance/api_instance";
import { UserContext } from "../Context/Context";

function View({location}) {
  const [books, setBooks] = useState([]);

  const [keyword, setKeyword] = useState(""); // State for keyword
  const [sort, setsort] = useState("title"); // State for status
  const [type, setType] = useState("all"); // State for type
  const [tag, setTag] = useState("all"); // State for tag
  const [ascending,setAscending] = useState(false); // State for items (search results)
  const user= React.useContext(UserContext).user;
  const[loading,setLoading]=useState(true);

  const search = async () => {
    try {
      if(location=="no"){
        const response = await axioinstance.post(`Resource/SearchResources`,
        {
          keyword: keyword,
          type: type,
          tag: tag
        }
      );
      const searchData = response.data;
      setBooks(searchData);
      }
      else{
        const response = await axioinstance.post(`Location/SearchResources`,
        {
          keyword: keyword,
          type: type,
          tag: tag,
          location: location
        }
      );
      
      const searchData = response.data;
      setBooks(searchData);

    }  
    } catch (error) {
    }
    setLoading(false);
  };

  useEffect(() => {
    search();
  }, []);

  return (
    <div>
      {location=="no"?
        user.userType==="admin" && <Link href={"/Resources/AddResources"}>
        <FloatButton
          icon={<PlusOutlined />}
          tooltip="Add a resource"
          type="primary"
        />
      </Link>:
      null}
      <SearchResources
        func1={setsort}
        func2={setTag}
        func3={setKeyword}
        func4={setAscending}
        func5={setType}
        ascending={ascending}
        search={search}
      />
     
      <SearchResult
      loading={loading}
        data={ascending?(
          sort === "rating"
            ? books.sort((a, b) =>   a.ratings - b.ratings)
            : sort === "popular"
            ? books.sort((a, b) => a.noOfRes - b.noOfRes)
            : sort === "latest"
            ? books.sort((a, b) => new Date(a.dateadded) - new Date(b.dateadded))
            : books):
            (
              sort === "rating"
              ? books.sort((a, b) =>   b.ratings - a.ratings)
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

export default View;
