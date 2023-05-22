import React, { useEffect, useState } from "react";
import { Modal, Form, Input, Switch, Select, Row, Col, Button } from "antd";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import "@ckeditor/ckeditor5-build-classic/build/translations/zh.js";

import ImageUploader from "../ImageUploader";

const { Option } = Select;

const ArticleEditorModal = ({
  isNew,
  articleDataOld,
  articleData,
  setArticleData,
  categories,
  isOpen,
  onCancel,
  onSave
}) => {
  const [dataOrigin, setDataOrigin] = useState(null);

  //設定原本資料
  useEffect(() => {
    if (articleData) {
      setDataOrigin(articleData);
    }
  }, [articleDataOld]);

  // function
  const toLocalTime = (time) => {
    const date = new Date(time);
    return date.toLocaleString();
  };
  const formHandler = (fieldName, value) => {
    setArticleData((origin) => ({
      ...origin,
      [fieldName]: value
    }));
  };
  const switchOnChange = (checked) => {
    const newValue = checked ? 1 : 0;
    formHandler("is_published", newValue);
  };
  const imgChange = (url) => {
    formHandler("cover_image", url);
  };
  const handleEditorChange = (event, editor) => {
    const data = editor.getData();
    formHandler("content", data);
  };

  if (!articleData) {
    return null;
  }
  return (
    <Modal
      title="文章編輯"
      width={1000}
      style={{
        top: 20
      }}
      open={isOpen}
      onCancel={onCancel}
      maskClosable={dataOrigin === articleData}
      footer={[
        <Button key="cancel" onClick={onCancel}>
          取消
        </Button>,
        <Button
          key="save"
          type="primary"
          onClick={onSave}
          disabled={dataOrigin === articleData}
        >
          保存
        </Button>
      ]}
    >
      <Form className="mt-3" layout="vertical">
        {!isNew && (
          <Form.Item className="my-3">
            <Row gutter={16}>
              <Col span={8}>
                <div className="px-1">
                  <p className="fw-bold text-secondary">文章ID</p>
                  {articleData && <p>{articleData.article_id}</p>}
                </div>
              </Col>
              <Col span={8}>
                <div className="px-1">
                  <p className="fw-bold text-secondary">上個編輯者</p>
                  {articleData && <p>{articleData.admin_id}</p>}
                </div>
              </Col>
              <Col span={8}>
                <div className="px-1">
                  <p className="fw-bold text-secondary">更新時間</p>
                  {articleData && <p>{toLocalTime(articleData.updated_at)}</p>}
                </div>
              </Col>
            </Row>
          </Form.Item>
        )}
        <Row gutter={16}>
          <Col span={8}>
            <Form.Item
              name="cover_image"
              label={
                <p className="m-0">
                  <span className="text-danger">* </span>封面圖片
                </p>
              }
            >
              <div>
                <ImageUploader
                  getImg={imgChange}
                  imgUrl={articleData && articleData.cover_image}
                />
              </div>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  name="category"
                  label="文章分類"
                  rules={[{ required: true, message: "請選擇分類" }]}
                  initialValue={articleData && articleData.category}
                >
                  <Select
                    placeholder="請選擇分類"
                    name="category"
                    onChange={(e) => {
                      formHandler("category", e);
                    }}
                  >
                    {categories.map((c, i) => (
                      <Option key={"option_" + i} {...c}>
                        {c.value}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label={
                    <p className="m-0">
                      <span className="text-danger">* </span>是否發布
                    </p>
                  }
                >
                  <Switch
                    className="ms-2"
                    checked={articleData.is_published === 1 ? true : false}
                    name="is_published"
                    onChange={switchOnChange}
                  />
                </Form.Item>
              </Col>
            </Row>

            <Form.Item
              name="title"
              label="文章標題"
              initialValue={articleData.title}
              rules={[{ required: true, message: "請輸入文章標題" }]}
            >
              <Input
                name="title"
                maxLength={45}
                onChange={(e) => {
                  formHandler("title", e.target.value);
                }}
              />
            </Form.Item>

            <Form.Item
              name="sub_title"
              label="副標題"
              initialValue={articleData.sub_title}
              rules={[{ required: true, message: "請輸入副標題" }]}
            >
              <Input
                name="sub_title"
                maxLength={100}
                onChange={(e) => {
                  formHandler("sub_title", e.target.value);
                }}
              />
            </Form.Item>
          </Col>
        </Row>

        <Form.Item
          label={
            <p className="m-0">
              <span className="text-danger">* </span>文章內容
            </p>
          }
          rules={[{ required: true, message: "請輸入內容" }]}
        >
          <CKEditor
            editor={ClassicEditor}
            data={articleData && articleData.content}
            onChange={handleEditorChange}
            style={{ minHeight: "300px" }}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ArticleEditorModal;
