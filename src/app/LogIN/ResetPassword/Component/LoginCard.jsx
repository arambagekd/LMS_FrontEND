'use client'
import React, { useState } from 'react';
import ChangePassword from './ChangePassword';
import Image from 'next/image';
import { Spin } from 'antd';
import styles from './styles.module.css';

const Login = () => {
  const [spinning, setSpinning] = useState(true);

  return (
    <div className={styles.pageContainer}>
      <Spin spinning={spinning}>
        <div className={styles.container}>
          <div className={styles.imageSection}>
            <Image src='/librarylogo.png' width={250} height={150} alt='Library Logo' />
          </div>
          <div className={styles.loginForm}>
            <h2 className={styles.title}>Set New Password</h2>
            <ChangePassword spinning={spinning} setSpinning={setSpinning} />
          </div>
        </div>
      </Spin>
    </div>
  );
};

export default Login;
