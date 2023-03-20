import React, { useState } from "react";
import axios from "axios";

const Upload = () => {
  let [file, setFile] = useState(null);
  const formData = new FormData();
  formData.append("image", file);
  const uploadImg = () => {
    axios
      .post("../php/uploadTest.php", formData)
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div>
      <form action="">
        <input
          type="file"
          name="testFile"
          onChange={(event) => {
            setFile(event.target.files[0]);
          }}
        />
        <button
          onClick={() => {
            uploadImg();
          }}
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default Upload;
