'use client'
import { Button, Popconfirm } from 'antd'
import React, { useState } from 'react'
import { DeleteOutlined,QuestionCircleOutlined } from '@ant-design/icons';
import axioinstance from '../../../Instance/api_instance';
import { useRouter } from 'next/navigation';
import { showToastError, showToastSuccess } from '@/app/Component/NewToast';

function DeleteModal({reservation}) {
    const router=useRouter();

    const deleteReservation=async()=>{
            try{
                const response=await axioinstance.delete(`Reservation/DeleteReservation?id=${reservation}`)
                if(response.data==true){
                    showToastSuccess("Reservation deleted successfully")
                    router.push("/Reservations")}
                else
                    showToastError("abc","delete failed")
            }catch(error)
            {
                showToastError(error,"Failed to delete reservation")
            }
    }

  return (
    <Popconfirm
    onConfirm={()=>deleteReservation(reservation)}
    title="Delete the reservation"
    description="Are you sure to delete this reservation?"
    icon={
      <QuestionCircleOutlined
        style={{
          color: 'red',
        }}
      />
    }
  >
  
    <Button size='large' type='primary' style={{ margin: '0 10px 0 0' }} shape='circle'><DeleteOutlined /></Button>
  </Popconfirm>
  )
}

export default DeleteModal
