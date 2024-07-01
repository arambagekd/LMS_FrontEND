'use client'
import { Button, Popconfirm} from 'antd'
import React from 'react'

import axioinstance from '../../Instance/api_instance';
import { showToastError, showToastSuccess } from '@/app/Component/NewToast';




function DeleteModal({requestId,fetchData}) {

    const handleRemove=async()=>{
        try{
            await axioinstance.delete(`Request/RemoveRequest?id=${requestId}`)
            showToastSuccess("Request Removed Successfully");
            fetchData();
        }catch(error){
            showToastError(error,"Failed to remove request");
        }
    }

    return (
        <>
        <Popconfirm
        title="Remove Requests"
        description="Are you sure to remove this request?"
        okText="Yes"
        cancelText="No"
        onConfirm={() => handleRemove(requestId)}
    >
        
        <Button
            danger
            type='primary'
            shape='round'
            size='small' 
        >
            Remove
        </Button>
        </Popconfirm>
        </>
    )
}

export default DeleteModal
