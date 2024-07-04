'use client'
import React from 'react'
import EditProfile from './EditProfile';
import ChangePassword from './ChangePassword';
import { Tabs } from 'antd';

function ProfileSetting() {
  return (
    <Tabs
    defaultActiveKey="1">
     <Tabs.TabPane tab="EditProfile" key="1"><EditProfile/></Tabs.TabPane>
     <Tabs.TabPane tab="ChangePassword" key="2"><ChangePassword/></Tabs.TabPane>
  </Tabs>
  )
}

export default ProfileSetting