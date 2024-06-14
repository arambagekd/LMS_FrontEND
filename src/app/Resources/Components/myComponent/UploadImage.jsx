'use client'
import React, { useState } from "react";
import { LoadingOutlined, CloudUploadOutlined } from "@ant-design/icons";
import { Image, message, Upload } from "antd";
import CloudinaryUploadWidget from "./CloudinaryUploadWidget";
import { Cloudinary, CloudinaryImage } from "@cloudinary/url-gen";
import { AdvancedImage, responsive, placeholder } from "@cloudinary/react";
import { fill } from "@cloudinary/url-gen/actions/resize";
import ResourcesAddForm from "../ResourcesAddForm";

const UploadImage = ({setImageURL,imagepath}) => {

  const [imageUrl, setImageUrl] = useState("");
  const [publicId, setPublicId] = useState("");
  const [cloudName] = useState("dxkaiqscs");
  const [uploadPreset] = useState("myCloud");

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
  if(imageUrl!==""){
  setImageURL(imageUrl);}
  return (
    <div className="App">
      <div
        style={{display:"flex",justifyContent:"center", width: "220px", height: "290px", border: "1px dotted black" }}
      >
        {myImage?.toURL() ? 
        <AdvancedImage
          style={{ maxWidth: "100%" }}
          cldImg={myImage}
          plugins={[responsive(), placeholder()]}
        />: imagepath===""?
        <CloudUploadOutlined style={{fontSize: '100px', color: '#08c',alignItems:"center"}}/>
      :<Image src={imagepath} alt="image" style={{ width: "220px", height: "290px"}}/>}
        
      </div>
      <CloudinaryUploadWidget uwConfig={uwConfig} setPublicId={setPublicId} setImageUrl={setImageUrl}/>
      
    </div>
  );
};
export default UploadImage;
