'use client'
import React, { useEffect, useState } from 'react';
import LoginForm from './Loginform';
import Image from 'next/image';
import { Spin } from 'antd';
import { useMediaQuery } from 'react-responsive';



const Login = () => {

  const[spinning,setSpinning]=useState(true);
  const isDesktop = useMediaQuery({ query: '(min-width: 600px)',defaultValue:true ,initializeWithValue:false});
  

  const containerStyle = {
    fontFamily: "Arial, sans-serif",
    display: 'flex',
    flexWrap: 'wrap',
    minHeight: '150px',
    height:isDesktop?'auto':'100vh',
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
    height:isDesktop?'auto':'100vh'
   
  };

 

  const imageSectionStyle = {
    flexWrap: 'wrap',
    flex: 1,
    display: 'flex',	
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgb(0,20,41)',
    height:isDesktop?'auto':150	
  };


  return (
    <div style={{height:"100vh",display:"flex",alignItems:"center",justifyContent:"center",background:"#f8f8f8",overflowX:"hidden",flexWrap:'wrap'}}>
        <Spin spinning={spinning} >
    <div style={containerStyle}>
    <div style={imageSectionStyle}>
      <Image src='/librarylogo.png'  width={250} height={150} alt=''/>
      </div>
      <div style={loginFormStyle}>
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
