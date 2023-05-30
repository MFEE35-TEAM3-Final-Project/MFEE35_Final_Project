import React, { useEffect, useState } from "react";
import {
  Modal,
  Form,
  Input,
  InputNumber,
  Button,
  Select,
  List,
  Image
} from "antd";

import axios from "axios";
const { Option } = Select;

const ProductModal = ({ openModal, onCancel }) => {
  const [productForm] = Form.useForm();
  const [imgList, setImgList] = useState([]);
  useEffect(() => {
    console.log("img list", imgList);
  }, [imgList]);

  // methods
  const imgArray = (method, arr, position) => {
    if (method === "add") {
      console.log("addImg");
      setImgList([...imgList, ...arr]);
    } else if (method === "delete") {
      console.log("deleteImg");
      const updatedImgList = imgList.filter((_, index) => index !== position);
      setImgList(updatedImgList);
    }
  };

  const onFinish = async () => {
    try {
      const values = await productForm.validateFields();
      console.log(values);
      const imgListStr = imgList.join(",");
      const productData = {
        name: values.name,
        category: values.category,
        description: values.description,
        price: values.price,
        stock: values.stock,
        image: imgListStr
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
  const openWidget = () => {
    console.log("in widget");
    const imgArr = [];
    const widget = window.cloudinary.openUploadWidget(
      {
        cloud_name: "ddh6e9dad",
        upload_preset: "joold_test",
        multiple: true,
        resource_type: "image",
        max_files: 5,
        max_file_size: 5242880 // 5MB
      },
      (error, result) => {
        if (!error && result && result.event === "success") {
          imgArr.push(result.info.secure_url);
          imgArray("add", imgArr);
        }
      }
    );
  };

  return (
    <Modal
      title="產品編輯"
      width={1000}
      open={openModal}
      onCancel={onCancel}
      destroyOnClose={true}
      onOk={() => {
        onFinish();
      }}
    >
      <div className="mt-3">
        <Form form={productForm}>
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

          <Form.Item name="image" label="圖片的雲端URL">
            <Button
              onClick={() => {
                openWidget();
              }}
            >
              上傳圖片
            </Button>
          </Form.Item>

          <Form.Item>
            <div>
              <List
                grid={{ gutter: 16, column: 4 }}
                dataSource={imgList}
                renderItem={(item, index) => (
                  <List.Item className="d-flex flex-column align-items-center ">
                    <Image src={item} />
                    <Button
                      className="mt-2 me-1 align-self-end"
                      type="primary"
                      danger
                      onClick={() => {
                        imgArray("delete", null, index);
                      }}
                    >
                      刪除
                    </Button>
                  </List.Item>
                )}
              />
            </div>
          </Form.Item>
        </Form>
      </div>
    </Modal>
  );
};

export default ProductModal;
