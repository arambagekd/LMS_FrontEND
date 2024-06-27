'use client'
import React, { use, useEffect, useState } from "react";
import { LoadingOutlined, CloudUploadOutlined, UserOutlined, SaveOutlined, UndoOutlined } from "@ant-design/icons";
import { Avatar, Button, Flex, Image, message, Upload } from "antd";
import CloudinaryUploadWidget from "./CloudinaryUploadWidget";
import { Cloudinary, CloudinaryImage } from "@cloudinary/url-gen";
import { AdvancedImage, responsive, placeholder } from "@cloudinary/react";
import axioinstance from "@/app/Instance/api_instance";
import { UserContext } from "@/app/Context/Context";

const UploadImage = ({imagepath}) => {

  const [imageUrl, setImageUrl] = useState("");
  const [publicId, setPublicId] = useState("");
  const [cloudName] = useState("dxkaiqscs");
  const [uploadPreset] = useState("myCloud");
  const [messageApi, contextHolder] = message.useMessage();
  const getUser = React.useContext(UserContext).GetUser;

  const success = (m) => {
    messageApi.open({
      type: 'success',
      content: m,
    });
  };

  const error = (m) => {
    messageApi.open({
      type: 'error',
      content: m,
    });
  };

  const save=async()=>{
    try{
    const response = await axioinstance.put(`User/EditProfilePicture?image=${imageUrl}`);
    getUser();
    success("Successfully edit your profile picture!");
    }catch(e){
      console.log(e);
      error("Failed to edit your profile picture!");
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
  console.log(imageUrl);
  return (
    <div >
      {contextHolder}
      {/* <div
        style={{display:"flex",justifyContent:"center", width: "220px", height: "290px", border: "1px dotted black" }}
      > */}
        {/* {myImage?.toURL() ? 
        <AdvancedImage
          style={{ maxWidth: "100%" }}
          cldImg={myImage}
          plugins={[responsive(), placeholder()]}
        />: imagepath===""?
        <CloudUploadOutlined style={{fontSize: '100px', color: '#08c',alignItems:"center"}}/>
      :<Image src={imagepath} alt="image" style={{ width: "220px", height: "290px"}}/>} */}
        
      {/* </div> */}
      <Avatar  src={imageUrl!=""?imageUrl:imagepath!=""?imagepath:null} icon={<UserOutlined />} size={80} style={{width:120,height:120}}/>
      <br></br><br></br>
      <CloudinaryUploadWidget uwConfig={uwConfig} setPublicId={setPublicId} setImageUrl={setImageUrl}/>
      <Button icon={<SaveOutlined/>} type="primary" shape="round"  style={{margin:"0 0 0 10px"}} onClick={()=>save()}>Save</Button>
      <Button icon={<UndoOutlined/>} type="primary" shape="round"  style={{margin:"0 0 0 10px"}} onClick={()=>setImageUrl(imagepath)}>Reset</Button>
    </div>
  );
};
export default UploadImage;
