import React, { useEffect, useState } from "react";
import {
  Modal,
  Form,
  Input,
  Switch,
  Select,
  Row,
  Col,
  Descriptions
} from "antd";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

const { Option } = Select;

const ArticleEditorModal = ({
  articleData: tempArticle,
  categories,
  isOpen,
  onCancel,
  onSave
}) => {
  const [form] = Form.useForm();
  const [articleChange, setArticleChange] = useState(null);
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
    console.log("update temp article", tempArticle);
    setArticleChange(tempArticle);
  }, [tempArticle]);

  if (!tempArticle) {
    return null;
    // 如果没有文章详细信息，则不渲染Modal
  }
  return (
    <Modal
      title="文章编辑"
      width={1200}
      open={isOpen}
      onCancel={onCancel}
      footer={[
        <button key="cancel" onClick={onCancel}>
          取消
        </button>,
        <button key="save" type="primary" onClick={handleSave}>
          保存
        </button>
      ]}
    >
      <Form className="mt-5" form={form} layout="vertical">
        <Form.Item>
          <Row gutter={16}>
            <Col span={8}>
              <div className="px-1">
                <p className="fw-bold text-secondary">文章ID</p>
                <p>{articleChange.article_id}</p>
              </div>
            </Col>
            <Col span={8}>
              <div className="px-1">
                <p className="fw-bold text-secondary">上個編輯者</p>
                <p>{articleChange.admin_id}</p>
              </div>
            </Col>
            <Col span={8}>
              <div className="px-1">
                <p className="fw-bold text-secondary">更新時間</p>
                <p>{toLocalTime(articleChange.updated_at)}</p>
              </div>
            </Col>
          </Row>
        </Form.Item>
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

          <Col span={8}>
            <Form.Item
              name="category"
              label="文章分類"
              rules={[{ required: true, message: "請選擇分類" }]}
            >
              <Select placeholder="請選擇分類">
                {categories.map((c, i) => (
                  <Option value={c}>{c}</Option>
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
              value={articleChange.is_published}
              onChange={() => {
                articleChange.is_published = !articleChange.is_published;
              }}
              valuePropName="checked"
            >
              <Switch />
            </Form.Item>
          </Col>
        </Row>

        <Form.Item
          name="sub_title"
          label="副标题"
          rules={[{ required: true, message: "请输入副标题" }]}
        >
          <Input maxLength={100} />
        </Form.Item>

        <Form.Item
          name="content"
          label="内容"
          rules={[{ required: true, message: "请输入内容" }]}
        >
          <CKEditor
            editor={ClassicEditor}
            data={editorContent}
            onChange={handleEditorChange}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ArticleEditorModal;
