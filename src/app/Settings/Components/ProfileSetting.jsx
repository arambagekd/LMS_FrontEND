'use'
import { Tabs } from 'antd';
import React from 'react'
import EditProfile from './EditProfile';
import ChangePassword from './ChangePassword';
import ChangeEmail from './ChangeEmail';

function ProfileSetting() {
  return (
    <Tabs
    type="card"
    items={[{
        label: "EditProfile",
        key: "1",
        children: <EditProfile />,
      },
      {
        label: "ChangePassword",
        key: "2",
        children:<ChangePassword />,
      },
      // {
      //   label: "ChangeEmail",
      //   key: "3",
      //   children: <ChangeEmail />,
      // }
      ]}
  />
  )
}

export default ProfileSetting