import React, { useState } from "react";
import { Upload, message } from "antd";
import { Cloudinary } from "@cloudinary/base";
import { CloudinaryContext } from "cloudinary-react";
import axios from "axios";

const cloudinary = new Cloudinary({
  cloud: {
    cloudName: "YOUR_CLOUDINARY_CLOUD_NAME", // 替换为你的Cloudinary Cloud名称
    apiKey: "YOUR_CLOUDINARY_API_KEY" // 替换为你的Cloudinary API密钥
  }
});

const ImageUploader = () => {
  const [imageUrl, setImageUrl] = useState(null);

  const handleUpload = async (options) => {
    const { file } = options;

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "YOUR_CLOUDINARY_UPLOAD_PRESET"); // 替换为你的Cloudinary上传预设名称

      const response = await axios.post(
        `https://api.cloudinary.com/v1_1/${cloudinary.cloud.cloudName}/image/upload`,
        formData
      );

      const { secure_url } = response.data;
      setImageUrl(secure_url);
      message.success("图片上传成功！");
    } catch (error) {
      console.error("图片上传失败:", error);
      message.error("图片上传失败！");
    }
  };

  return (
    <CloudinaryContext cloudinary={cloudinary}>
      <Upload
        name="image"
        accept="image/*"
        showUploadList={false}
        beforeUpload={() => false}
        customRequest={handleUpload}
      >
        {imageUrl ? (
          <img src={imageUrl} alt="Uploaded" style={{ width: "100%" }} />
        ) : (
          <div>点击上传图片</div>
        )}
      </Upload>
    </CloudinaryContext>
  );
};

export default ImageUploader;
