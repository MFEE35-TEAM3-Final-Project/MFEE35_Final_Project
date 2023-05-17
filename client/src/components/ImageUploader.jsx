import React, { useEffect, useState } from "react";
import { Button, Image } from "antd";
import { UploadOutlined } from "@ant-design/icons";

function ImageUploader({ getImg, imgUrl: tempImg }) {
  const [imageUrl, setImageUrl] = useState(null);

  const openWidget = () => {
    window.cloudinary.openUploadWidget(
      {
        cloud_name: "ddh6e9dad",
        upload_preset: "joold_test"
      },
      (error, result) => {
        if (!error && result && result.event === "success") {
          setImageUrl(result.info.secure_url);
          getImg(result.info.secure_url);
        }
      }
    );
  };
  useEffect(() => {
    if (tempImg) {
      setImageUrl(tempImg);
    }
  }, [tempImg]);
  return (
    <div>
      <Button className="my-1" type="primary" onClick={openWidget}>
        Upload <UploadOutlined />
      </Button>
      {imageUrl && (
        <div className="cover_img_container">
          <Image width={200} src={imageUrl} />
        </div>
      )}
    </div>
  );
}

export default ImageUploader;
