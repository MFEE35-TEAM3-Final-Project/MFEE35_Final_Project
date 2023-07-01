import React, { useState } from "react";
import { Upload, message, Button } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import axios from "axios";

const ImagePage = () => {
  const [imageUrl, setImageUrl] = useState([]);

  const handleUpload = async (file) => {
    const formData = new FormData();
    formData.append("image", file);
    console.log(file);
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/images`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        }
      );
      console.log(res);
      setImageUrl((prevUrls) => [...prevUrls, res.data.imgUrl]);
      message.success("Image uploaded successfully!");
    } catch (error) {
      message.error("Image upload failed.");
    }
  };

  return (
    <div id="image_page">
      <div>
        <h1>Image Upload</h1>
      </div>
      <div>
        <Upload
          name="image"
          action="your-upload-url"
          showUploadList={true}
          beforeUpload={(file) => {
            handleUpload(file);
            return false; // Prevent default upload behavior
          }}
        >
          <Button icon={<UploadOutlined />}>Upload Image</Button>
        </Upload>
        <div className="">
          {imageUrl.map((url, index) => (
            <img
              className="w-100"
              key={index}
              src={url}
              alt={`Uploaded ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ImagePage;
