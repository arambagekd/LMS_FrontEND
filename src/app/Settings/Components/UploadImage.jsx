'use client'
import React, {useState } from "react";
import {  UserOutlined, SaveOutlined, UndoOutlined } from "@ant-design/icons";
import { Avatar, Button, } from "antd";
import CloudinaryUploadWidget from "./CloudinaryUploadWidget";
import { Cloudinary,} from "@cloudinary/url-gen";
import axioinstance from "@/app/Instance/api_instance";
import { UserContext } from "@/app/Context/Context";
import { showToastError, showToastSuccess } from "@/app/Component/NewToast";

const UploadImage = ({imagepath}) => {

  const [imageUrl, setImageUrl] = useState("");
  const [publicId, setPublicId] = useState("");
  const [cloudName] = useState("dxkaiqscs");
  const [uploadPreset] = useState("myCloud");
  const getUser = React.useContext(UserContext).GetUser;


  const save=async()=>{
    try{
    const response = await axioinstance.put(`User/EditProfilePicture?image=${imageUrl}`);
    getUser();
    showToastSuccess("Profile picture updated successfully!");
    }catch(e){
      showToastError(e,"Failed to update profile picture"); 
    }
  }

  const [uwConfig] = useState({
    cloudName,
    uploadPreset,
    cropping: true,
    c_fit: "fit",
    cropingAspectRatio: 240/310,
    croppingCoordinatesMode: "custom",
    croppingShowDimensions: true,
    croppingDefaultSelectionRatio:240/310,
  });


  const cld = new Cloudinary({
    cloud: {
      cloudName,
    },
  });

  const myImage = cld.image(publicId);
  return (
    <div >
      <Avatar  src={imageUrl!=""?imageUrl:imagepath!=""?imagepath:null} icon={<UserOutlined />} size={80} style={{width:120,height:120}}/>
      <br></br><br></br>
      <CloudinaryUploadWidget uwConfig={uwConfig} setPublicId={setPublicId} setImageUrl={setImageUrl}/>
      <Button icon={<SaveOutlined/>} type="primary" shape="round"  style={{margin:"0 0 0 10px"}} onClick={()=>save()}>Save</Button>
      <Button icon={<UndoOutlined/>} type="primary" shape="round"  style={{margin:"0 0 0 10px"}} onClick={()=>setImageUrl(imagepath)}>Reset</Button>
    </div>
  );
};
export default UploadImage;
