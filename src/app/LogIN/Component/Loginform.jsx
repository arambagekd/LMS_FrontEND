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

function Loginform({ spinning, setSpinning }) {
  const [form] = Form.useForm();
  const getUser = React.useContext(UserContext).GetUser;
  const user = React.useContext(UserContext).user;
  const setUser = React.useContext(UserContext).setUser;
  const setAuthenticated = React.useContext(UserContext).setAuthenticated;
  const [loading, setLoading] = useState(false);
  const [loading1, setLoading1] = useState(false);
  const [loading2, setLoading2] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();
  const [login, setLogin] = useState(false);
  const [firebasetoken, setFireBaseToken] = useState("no");

  const successModal = () => {
    messageApi.open({
      type: "success",
      content: "Log in successfully",
    });
  };

  const errorModal = (e) => {
    messageApi.open({
      type: "error",
      content: e,
    });
  };

  const NewLogIn = () => {
    Cookies.remove("jwt");
    setUser({});
    setAuthenticated(false);
    setLoading1(true);
    setLoading1(false);
    setLogin(false);
  };

  const continueLogIn = () => {
    setSpinning(true);
    setLoading2(true);
    router.push("/Dashboard");
  };

  const router = useRouter();

  const LogIn = async () => {
    setLoading(true);
    setUser({});
    setSpinning(true);
    try {
      const user = String(form.getFieldValue("username"));
      const response = await axios.post(
        "https://bde8-43-250-241-21.ngrok-free.app/api/Auth/login",
        {
          userName: String(form.getFieldValue("username")),
          password: String(form.getFieldValue("password")),
        },
        { withCredentials: true }
      );
        Cookies.set("jwt", response.data.token,{ expires: 2 });
        getUser();
        setAuthenticated(true);
      if (firebasetoken != "no") {
        const response2 = await axios.post(
          "https://bde8-43-250-241-21.ngrok-free.app/api/Notification/SetFireBaseToken",
          {
            token: firebasetoken,
            userName: user,
          }
        );
      }
      router.push("/Dashboard");
      successModal();
    } catch (error) {
      router.push("/LogIN");
      setLoading(false);
      setSpinning(false);
      errorModal(error.response.data);
    } 
  };

  useEffect(() => {
    const token = Cookies.get("jwt");
    if (token) {
      setLogin(true);
      getUser();
    } else {
      setAuthenticated(false);
    }
    setSpinning(false);
  }, []);

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
      {contextHolder}

      {!login ? (
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
              Log In
            </Button>
          </Form.Item>
        </Form>
      ) : (
        //   <Form
        //   form={form}
        //   name="normal_login"
        //   className="login-form"
        //   initialValues={{
        //     remember: true,
        //   }}
        //   onFinish={onFinish}
        // >
        //   <Form.Item
        //     name="username"
        //     rules={[
        //       {
        //         required: true,
        //         message: 'Please input your Username!',
        //       },
        //     ]}
        //   >

        //     <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
        //   </Form.Item>
        //   <Form.Item
        //     name="password"
        //     rules={[
        //       {
        //         required: true,
        //         message: 'Please input your Password!',
        //       },
        //     ]}
        //   >
        //     <Input
        //       prefix={<LockOutlined className="site-form-item-icon" />}
        //       type="password"
        //       placeholder="Password"
        //     />
        //   </Form.Item>
        //   <Form.Item>
        //     <Form.Item name="remember" valuePropName="checked" noStyle>
        //       <Checkbox>Remember me</Checkbox>
        //     </Form.Item>

        //     <a className="login-form-forgot" href="">
        //       Forgot password
        //     </a>
        //   </Form.Item>

        //   <Form.Item>
        //     <Button type="primary" htmlType="submit" className="login-form-button">
        //       Log in
        //     </Button>
        //     Or <a href="">register now!</a>
        //   </Form.Item>
        // </Form>
        <div>
          <strong>
            You have already login as {user.fName + " " + user.lName}
          </strong>
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />

          <Button type="primary" block onClick={NewLogIn} loading={loading1}>
            Log in As New User
          </Button>
          <br />
          <br />
          <Button
            type="primary"
            block
            onClick={continueLogIn}
            loading={loading2}
          >
            Continue as {user.fName + " " + user.lName}
          </Button>
        </div>
      )}
    </div>
  );
}
export default Loginform;
