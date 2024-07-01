"use client";
import { Button, Checkbox, Form, Input, Spin, message } from "antd";
import { useForm } from "antd/es/form/Form";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { UserContext } from "../../Context/Context";
import Link from "next/link";
import Cookies from "js-cookie";
import { getFirebaseToken, onMessageListener } from "../../Yes/firebase-config";
import { get } from "http";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { authService } from "../../../../auth/authService";
import { firebaseauth } from "../../../../auth/firebaseauth";
import { showToastError, showToastSuccess } from "@/app/Component/NewToast";

function Loginform({  setSpinning }) {
  const [form] = Form.useForm();
  const getUser = React.useContext(UserContext).GetUser;
  const user = React.useContext(UserContext).user;
  const setUser = React.useContext(UserContext).setUser;
  const spinningFullScreen=React.useContext(UserContext).setLoading;
  const setAuthenticated = React.useContext(UserContext).setAuthenticated;
  const authenticated = React.useContext(UserContext).authenticated;
  const [loading, setLoading] = useState(false);
  const [loading1, setLoading1] = useState(false);
  const [loading2, setLoading2] = useState(false);
  const [login, setLogin] = useState(false);
  const [firebasetoken, setFireBaseToken] = useState("no");


  const router = useRouter();

  const LogIn = async () => {
    setLoading(true);
    setUser({});
    setSpinning(true);
    try {
      const user = String(form.getFieldValue("username"));
      const response = await authService.login (  String(form.getFieldValue("username")),  String(form.getFieldValue("password")), )
      getUser();
      setAuthenticated(true);
        router.push("/Dashboard");
      if (firebasetoken != "no") {
        const response2 = firebaseauth.setFirebasetoken(firebasetoken, user);
      }
     showToastSuccess("Log in successfully")
    } catch (error) {
      showToastError(error,"Log in Failed");
      router.push("/LogIN");
      setLoading(false);
      setSpinning(false);
    } 
  };


  useEffect(() => {
    const fetchToken = async () => {
      try {
        // const token = await getFirebaseToken();
        // console.log(token);
        // setFireBaseToken(token);
        const permission = await Notification.requestPermission();
        if (permission === "granted") {
          console.log("Notification permission granted.");
          const token = await getFirebaseToken();
          setFireBaseToken(token);
        } else {
          console.log("Unable to get permission to notify.");
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchToken();
  }, []);
 
  useEffect(() => {});

  return (
      <div style={{ margin: 30 }}>
        <Form
          form={form}
          name="basic"
          style={{
            maxWidth: 600,
          }}
          initialValues={{
            remember: true,
          }}
          onFinish={LogIn}
          // onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            name="username"
            rules={[
              {
                required: true,
                message: "Please input your username!",
              },
            ]}
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="Username"
            />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: "Please input your password!",
              },
            ]}
          >
            <Input.Password
              prefix={<LockOutlined className="site-form-item-icon" />}
              placeholder="Password"
            />
          </Form.Item>

          <Form.Item
            name="remember"
            valuePropName="checked"
            wrapperCol={{
              offset: 0,
              span: 24,
            }}
          >
            <center>
              <Link href="/LogIN/ForgetPassword">Forget Password?</Link>
            </center>
          </Form.Item>

          <Form.Item
            wrapperCol={{
              offset: 0,
              span: 24,
            }}
          >
            <Button block type="primary" htmlType="submit" loading={loading}>
              Sign In
            </Button>
          </Form.Item>
        </Form>
      
  </div>
  );}
export default Loginform;
