import React, { useState } from "react";
import { Modal, Form, Input, InputNumber, Button, Select } from "antd";
import axios from "axios";
const { Option } = Select;

const ProductModal = ({ openModal, onCancel }) => {
  const [productForm] = Form.useForm();
  const [imgList, setImgList] = useState([]);

  // methods
  const imgArray = (method, url, position) => {
    if (method === "add") {
      console.log("addImg");
      setImgList([...imgList, url]);
    }
  };

  const onFinish = async (values) => {
    try {
      const values = await productForm.validateFields();
      console.log(values);

      const productData = {
        name: values.name,
        category: values.category,
        description: values.description,
        price: values.price,
        stock: values.stock,
        image: []
      };
      console.log("data", productData);

      // 清空表单字段
      productForm.resetFields();

      //   onCancel();
    } catch (error) {
      console.error(error);
    } finally {
    }
  };

  return (
    <Modal
      title="產品編輯"
      width={1000}
      open={openModal}
      onCancel={onCancel}
      footer={null}
      destroyOnClose={true}
    >
      <div className="mt-3">
        <Form form={productForm} onFinish={onFinish}>
          <Form.Item
            name="name"
            label="商品名稱"
            rules={[{ required: true, message: "請輸入商品名稱" }]}
          >
            <Input maxLength={255} />
          </Form.Item>
          <Form.Item
            name="description"
            label="產品敘述"
            rules={[{ required: true, message: "請輸入產品敘述" }]}
          >
            <Input.TextArea rows={4} />
          </Form.Item>
          <Form.Item
            name="price"
            label="價格"
            rules={[{ required: true, message: "請輸入價格" }]}
          >
            <InputNumber className="ms-4" min={0} precision={0} />
          </Form.Item>
          <Form.Item
            name="stock"
            label="庫存"
            rules={[{ required: true, message: "請輸入庫存" }]}
          >
            <InputNumber className="ms-4" min={0} precision={0} />
          </Form.Item>
          <Form.Item
            name="category"
            label="商品種類"
            rules={[{ required: true, message: "請輸入商品種類" }]}
          >
            <Select
              placeholder="請選擇分類"
              onChange={(e) => {
                console.log("category", e);
              }}
            >
              <Option key="餐盒" values="餐盒">
                餐盒
              </Option>
              <Option key="乳清蛋白" values="乳清蛋白">
                乳清蛋白
              </Option>
              <Option key="雞胸肉" values="雞胸肉">
                雞胸肉
              </Option>
            </Select>
          </Form.Item>
          {/* 假设您已经正确配置了Cloudinary */}
          <Form.Item name="image" label="圖片的雲端URL">
            <Button
              onClick={() => {
                window.cloudinary.openUploadWidget(
                  {
                    cloud_name: "ddh6e9dad",
                    upload_preset: "joold_test"
                  },
                  (error, result) => {
                    if (!error && result && result.event === "success") {
                      imgArray("add", result.info.secure_url);
                      console.log("imgList", imgList);
                    }
                  }
                );
              }}
            >
              上傳圖片
            </Button>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              新增產品
            </Button>
          </Form.Item>
        </Form>
      </div>
    </Modal>
  );
};

export default ProductModal;
