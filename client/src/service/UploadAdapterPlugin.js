import axios from "axios";
import { v2 as cloudinary } from "cloudinary";

const UploadAdapterPlugin = (editor) => {
  editor.plugins.get("FileRepository").createUploadAdapter = (loader) => {
    return {
      upload: () => {
        return new Promise((resolve, reject) => {
          loader.file.then((file) => {
            cloudinary.v2.uploader.upload(
              file,
              {
                upload_preset: "joold_test" // 你的 Cloudinary 上傳預設值
              },
              (error, result) => {
                if (error) {
                  reject(error);
                } else {
                  const imageUrl = result.secure_url;
                  resolve({
                    default: imageUrl
                  });
                }
              }
            );
          });
        });
      },
      abort: () => {
        // Implement aborting the upload if needed
      }
    };
  };
};

export default UploadAdapterPlugin;
