"use client";
import React, { useEffect, useState } from "react";
import LoginForm from "./Loginform";
import Image from "next/image";
import { Spin } from "antd";
import styles from "./styles.module.css";
import { UserContext } from "@/app/Context/Context";
import { useRouter } from "next/navigation";
import { authService } from "../../../../auth/authService";

const LoginCard = () => {
  const [spinning, setSpinning] = useState(true);
  const setUser=React.useContext(UserContext).setUser;
  const setAuthenticated=React.useContext(UserContext).setAuthenticated;
  const router = useRouter();
 


  const GetUser=async()=>{
    try {
      const response=await authService.getuser();
      setUser(response.user);
      setAuthenticated(true);
      router.push("/Dashboard");
    } catch (error) {
      try{
        await authService.refreshToken();
        GetUser();
        }catch(e){
          setSpinning(false);
        }
    }
  };

  useEffect(() => {
    GetUser();
  }, []);


  return (
    <>
  {spinning && <Spin size="large" spinning={spinning} fullscreen/>}
  {!spinning &&<>
   <div className={styles.bgimage}></div>
    <div className={styles.screen}>
       <Spin spinning={spinning}> 
        <div className={styles.container}>
          <div className={styles.imageSection}>
            <Image src="/librarylogo.png" width={250} height={150} alt="" />
          </div>
          <div className={styles.loginForm}>
            <h2 style={{ margin: "30px 0 0 0", textAlign: "center" }}>Sign In</h2>
            <LoginForm spinning={spinning} setSpinning={setSpinning} />
          </div>
        </div>
       </Spin> 
    </div>
    </>}
    </>
  );
};

export default LoginCard;
