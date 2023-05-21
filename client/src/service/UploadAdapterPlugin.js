import { UploadOutlined } from "@ant-design/icons";
import { Button, message, Upload } from "antd";
import axios from "axios";

const CloudinaryUpload = () => {
  const handleUpload = async (options) => {
    const { onSuccess, onError, file } = options;
    console.log("fil", file);
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "joold_test"); // 將 "your_cloudinary_preset" 替換為你的Cloudinary上傳預設值

    try {
      const response = await axios.post(
        "https://api.cloudinary.com/v1_1/ddh6e9dad/image/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        }
      );
      console.log("re", response);
      if (response.data && response.data.secure_url) {
        onSuccess("success");
        message.success(`${file.name} uploaded successfully`);
      } else {
        onError("error");
        message.error(`${file.name} upload failed.`);
      }
    } catch (error) {
      onError("error");
      message.error(`${file.name} upload failed.`);
    }
  };

  return (
    <Upload
      customRequest={handleUpload}
      accept="image/*"
      showUploadList={false}
    >
      <Button icon={<UploadOutlined />}>Click to Upload</Button>
    </Upload>
  );
};

export default CloudinaryUpload;
