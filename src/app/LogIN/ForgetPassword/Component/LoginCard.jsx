'use client'
import React, { useEffect, useState } from 'react';
import LoginForm from './Loginform';
import Image from 'next/image';
import { Spin } from 'antd';
import styles from './styles.module.css'




const Login = () => {

  const[spinning,setSpinning]=useState(true);
 
  


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
            <h2 style={{ margin: "30px 0 0 0", textAlign: "center" }}>Forget Password</h2>
            <br></br>
            <p style={{textAlign:"center",fontSize:"10pt",margin:"0 20px"}}>Enter your primary email address here<br/>then we send password reset link to your email address..</p>
            <LoginForm spinning={spinning} setSpinning={setSpinning} />
          </div>
        </div>
      </Spin>
    </div></>
    // <div className={styles.screen}>
    //     <Spin spinning={spinning} >
    // <div className={styles.container}>
    // <div className={styles.loginform}>
    //   <Image src='/librarylogo.png'  width={250} height={350} alt=''/>
    //   </div>
    //   <div style={styles.imagesection}>
    //     <h2 style={{margin:"30px 0 10px 0",textAlign:"center"}}>Enter Your Email</h2>
    //     <p style={{textAlign:"center",fontSize:"10pt",margin:"0 20px"}}>Enter your primary email address here<br/>then we send password reset link to your email address..</p>
    //     <LoginForm spinning={spinning} setSpinning={setSpinning}/>
    //   </div>
      
    // </div>
    // </Spin>
    // </div>
    
  );
};

export default Login;
