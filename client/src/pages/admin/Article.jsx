import React, { useState } from "react";
import axios from "axios";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

const Articles = () => {
  const [content, setContent] = useState("");

  const handleEditorChange = (event, editor) => {
    const editorContent = editor.getData();
    setContent(editorContent);
  };

  const sendToBack = () => {
    try {
      const articleData = {
        title: "test word",
        content: content,
        is_published: 0
      };
      console.log(articleData);
      axios.post("/api/admin/articles", articleData).then((res) => {
        console.log(res);
      });
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div
      style={{
        backgroundColor: "lightpink"
      }}
    >
      <h1 className="text-white">TEST ARTICLE PAGE</h1>
      <div id="content">
        <h2>Using CKEditor 5 build in React</h2>
        <CKEditor
          editor={ClassicEditor}
          data={content}
          onChange={handleEditorChange}
        />
      </div>
      <button
        className="btn btn-primary"
        onClick={() => {
          sendToBack();
        }}
      >
        SUBmit
      </button>
    </div>
  );
};

export default Articles;
