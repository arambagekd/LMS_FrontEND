'use client'
import React, { useEffect, useState } from 'react';
import LoginForm from './Loginform';
import Image from 'next/image';
import { Spin } from 'antd';
import styles from './styles.module.css'




const Login = () => {

  const[spinning,setSpinning]=useState(true);
 
  

  const containerStyle = {
    fontFamily: "Arial, sans-serif",
    display: 'flex',
    flexWrap: 'wrap',
    minHeight: '150px',
    boxShadow: '0 0 20px rgba(0, 0, 0, 0.1)',
    borderRadius: '10px',
    overflow: 'hidden',
   
  };

  const loginFormStyle = {
    background: 'white',
    flexWrap: 'wrap',
    flex: 1.5,
    minWidth: '300px',
    flexWrap:'wrap',
  };

 

  const imageSectionStyle = {
    flexWrap: 'wrap',
    flex: 1,
    display: 'flex',	
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgb(0,20,41)',
  };


  return (
    <div className={styles.screen}>
        <Spin spinning={spinning} >
    <div className={styles.container}>
    <div className={styles.loginform}>
      <Image src='/librarylogo.png'  width={250} height={150} alt=''/>
      </div>
      <div style={styles.imagesection}>
        <h2 style={{margin:"30px 0 10px 0",textAlign:"center"}}>Enter Your Email</h2>
        <p style={{textAlign:"center",fontSize:"10pt",margin:"0 20px"}}>Enter your primary email address here<br/>then we send password reset link to your email address..</p>
        <LoginForm spinning={spinning} setSpinning={setSpinning}/>
      </div>
      
    </div>
    </Spin>
    </div>
  );
};

export default Login;
