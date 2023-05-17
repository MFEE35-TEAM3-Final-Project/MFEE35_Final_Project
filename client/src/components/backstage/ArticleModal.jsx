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

  // function
  const toLocalTime = (time) => {
    const date = new Date(time);
    return date.toLocaleString();
  };
  const formHandler = (key, name) => {
    // const { name, value } = e.target;
    // setArticleChange((origin) => ({
    //   ...origin,
    //   [name]: value
    // }));
    console.log(key, name);
  };
  const switchOnChange = (checked) => {
    const newValue = checked ? 1 : 0;
    setArticleChange((origin) => ({
      ...origin,
      is_published: newValue
    }));
  };
  const imgChange = (url) => {
    console.log("imgUrl", url);
    setArticleChange((origin) => ({
      ...origin,
      cover_image: url
    }));
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
        top: 20
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
              <div>
                <ImageUploader
                  getImg={imgChange}
                  imgUrl={articleChange && articleChange.cover_image}
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
                >
                  <Select
                    placeholder="請選擇分類"
                    name="category"
                    value={articleChange.category}
                    onSelect={formHandler(key, name)}
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
                <Form.Item label="是否發布">
                  <Switch
                    name="is_published"
                    checked={articleChange && articleChange.is_published}
                    onChange={switchOnChange}
                  />
                </Form.Item>
              </Col>
            </Row>

            <Form.Item
              name="title"
              label="文章標題"
              rules={[{ required: true, message: "請輸入文章標題" }]}
            >
              <Input
                name="title"
                maxLength={45}
                value={articleChange && articleChange.title}
                onChange={formHandler}
              />
            </Form.Item>

            <Form.Item
              name="sub_title"
              label="副標題"
              rules={[{ required: true, message: "請輸入副標題" }]}
            >
              <Input
                name="sub_title"
                maxLength={100}
                value={articleChange && articleChange.sub_title}
                onChange={formHandler}
              />
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
