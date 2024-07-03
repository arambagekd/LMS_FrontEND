"use client";
import React, { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { Spin } from 'antd';
import ErrorPage from '../src/app/ErrorPage/page';
import { authService } from './authService';
import { UserContext, EmailContext } from '../src/app/Context/Context';

export const UserAuthProvider = ({ children }) => {
  const location = usePathname();
  const [user, setUser] = useState({});
  const [email, setEmail] = useState({});
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);
  const rootPath = location.split("/")[1];

  const GetUser = async () => {
    try {
      const response = await authService.getuser();
      setUser(response.user);
      setEmail(response.email);
      setAuthenticated(true);
    } catch (error) {
      try {
        await authService.refreshToken();
        GetUser();
      } catch (e) {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    if (rootPath !== "LogIN" && rootPath !== "Home" && rootPath !== "") {
      GetUser();
    }
  }, []);

  useEffect(() => {
    if (user.userName !== undefined) {
      setAuthenticated(true);
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    }
  }, [user.userName]);

  return (
    <UserContext.Provider value={{ user, setUser, GetUser, setAuthenticated, authenticated, setLoading, loading }}>
      <EmailContext.Provider value={{ email, setEmail }}>
        {rootPath !== "LogIN" &&
        rootPath !== "ErrorPage" &&
        rootPath !== "Home" &&
        rootPath !== "" && 
        rootPath !=="AboutUs" && 
        rootPath !=="ContactUs" &&
        (
          <div>
            {loading && <Spin size="large" spinning={loading} fullscreen />}
            {!authenticated && !loading && <ErrorPage />}
            {user.permission==false && !loading && <ErrorPage />}
            {authenticated && user.permission!=false && !loading && children}
          </div>
        )}
        {(rootPath === "LogIN" ||
          rootPath === "ErrorPage" ||
          rootPath === "Home" ||
          rootPath === "AboutUs"||
          rootPath === "" ||
          rootPath === "ContactUs"
        ) &&
          children}
      </EmailContext.Provider>
    </UserContext.Provider>
  );
};
