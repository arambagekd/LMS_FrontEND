'use client'
import { useRouter, useSearchParams } from 'next/navigation'
import Cookies from "js-cookie";
import React, { useEffect } from 'react'


function SetToken() {

    const searchParams = useSearchParams()
    const jwt = searchParams.get('jwt')
    const router = useRouter();
    

  
  useEffect(() => {
    if (jwt) {
      localStorage.setItem("jwt", jwt);
    }
  },[]);

  return (
    <a href='/LogIN/ResetPassword'>Click Here to Reset Password..............</a>
    
  )
}

export default SetToken