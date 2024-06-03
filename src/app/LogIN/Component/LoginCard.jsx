"use client";
import React, { useEffect, useState } from "react";
import LoginForm from "./Loginform";
import Image from "next/image";
import { Spin } from "antd";
import styles from "./styles.module.css";

const LoginCard = () => {
  const [spinning, setSpinning] = useState(true);

  return (
    <div className={styles.screen}>
      <Spin spinning={spinning}>
        <div className={styles.container}>
          <div className={styles.imageSection}>
            <Image src="/librarylogo.png" width={250} height={150} alt="" />
          </div>
          <div className={styles.loginForm}>
            <h2 style={{ margin: "30px 0 0 0", textAlign: "center" }}>Login</h2>
            <LoginForm spinning={spinning} setSpinning={setSpinning} />
          </div>
        </div>
      </Spin>
    </div>
  );
};

export default LoginCard;
