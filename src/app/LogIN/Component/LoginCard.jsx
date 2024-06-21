"use client";
import React, { useEffect, useState } from "react";
import LoginForm from "./Loginform";
import Image from "next/image";
import { Spin } from "antd";
import styles from "./styles.module.css";
import { UserContext } from "@/app/Context/Context";
import { useRouter } from "next/navigation";

const LoginCard = () => {
  const [spinning, setSpinning] = useState(true);
  const authenticated=React.useContext(UserContext).authenticated;
  const router = useRouter();
  const getUser = React.useContext(UserContext).GetUser;
  useEffect(() => {
    if (authenticated) {
      setSpinning(true);
      getUser();
      router.push("/Dashboard");
    }
  }, [authenticated]);


  return (
    <>
  
   <div className={styles.bgimage}></div>
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
    </>
  );
};

export default LoginCard;
