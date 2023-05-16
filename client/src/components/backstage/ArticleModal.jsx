import React, { useEffect, useState } from "react";
import {
  Modal,
  Form,
  Input,
  Switch,
  Select,
  Row,
  Col,
  Descriptions,
  Button
} from "antd";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import ImageUploader from "../ImageUploader";

const { Option } = Select;

const ArticleEditorModal = ({
  articleData: tempArticle,
  categories,
  isOpen,
  onCancel,
  onSave
}) => {
  const [form] = Form.useForm();
  const [articleChange, setArticleChange] = useState({
    article_id: "",
    admin_id: "",
    title: "",
    sub_title: "",
    category: "",
    cover_image: "",
    content: "",
    is_published: 0,
    created_at: "",
    updated_at: ""
  });
  const [editorContent, setEditorContent] = useState("");
  const toLocalTime = (time) => {
    const date = new Date(time);
    return date.toLocaleString();
  };
  const handleEditorChange = (event, editor) => {
    const data = editor.getData();
    setEditorContent(data);
  };

  const handleSave = () => {
    form.validateFields().then((values) => {
      onSave({ ...values, content: editorContent });
      form.resetFields();
      setEditorContent("");
    });
  };
  useEffect(() => {
    // console.log("update temp article", tempArticle);

    setArticleChange(tempArticle);
  }, [tempArticle]);

  if (!tempArticle) {
    return null;
    // 如果没有文章详细信息，则不渲染Modal
  }
  return (
    <Modal
      title="文章編輯"
      width={1000}
      style={{
        top: 100
      }}
      open={isOpen}
      onCancel={onCancel}
      footer={[
        <Button key="cancel" onClick={onCancel}>
          取消
        </Button>,
        <Button key="save" type="primary" onClick={handleSave}>
          保存
        </Button>
      ]}
    >
      <Form className="mt-5" form={form} layout="vertical">
        <Form.Item>
          <Row gutter={16}>
            <Col span={8}>
              <div className="px-1">
                <p className="fw-bold text-secondary">文章ID</p>
                {articleChange && <p>{articleChange.article_id}</p>}
              </div>
            </Col>
            <Col span={8}>
              <div className="px-1">
                <p className="fw-bold text-secondary">上個編輯者</p>
                {articleChange && <p>{articleChange.admin_id}</p>}
              </div>
            </Col>
            <Col span={8}>
              <div className="px-1">
                <p className="fw-bold text-secondary">更新時間</p>
                {articleChange && (
                  <p>{toLocalTime(articleChange.updated_at)}</p>
                )}
              </div>
            </Col>
          </Row>
        </Form.Item>
        <Row gutter={16}>
          <Col span={8}>
            <Form.Item name="cover_image" label="封面圖片">
              <ImageUploader />
            </Form.Item>
          </Col>

          <Col span={8}>
            <Form.Item
              name="category"
              label="文章分類"
              rules={[{ required: true, message: "請選擇分類" }]}
            >
              <Select placeholder="請選擇分類">
                {categories.map((c, i) => (
                  <Option key={"option_" + i} {...c}>
                    {c.value}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              name="is_published"
              label="是否發布"
              checkedChildren={1}
              unCheckedChildren={0}
              value={articleChange && articleChange.is_published}
              onChange={() => {
                articleChange.is_published = !articleChange.is_published;
              }}
              valuePropName="checked"
            >
              <Switch />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={8}>
            <Form.Item
              name="title"
              label="文章標題"
              rules={[{ required: true, message: "請輸入文章標題" }]}
            >
              <Input maxLength={45} />
            </Form.Item>
          </Col>
          <Col span={16}>
            <Form.Item
              name="sub_title"
              label="副標題"
              rules={[{ required: true, message: "請輸入副標題" }]}
            >
              <Input maxLength={100} />
            </Form.Item>
          </Col>
        </Row>

        <Form.Item
          name="content"
          label="文章內容"
          rules={[{ required: true, message: "請輸入內容" }]}
        >
          <CKEditor
            editor={ClassicEditor}
            data={editorContent}
            onChange={handleEditorChange}
            style={{ minHeight: "300px" }}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ArticleEditorModal;
