import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Modal,
  Form,
  Input,
  InputNumber,
  Button,
  Select,
  List,
  Image,
  Row,
  Col,
  Collapse,
  Space
} from "antd";
const { Panel } = Collapse;
const { Option } = Select;

const ProductModal = ({
  openModal,
  onCancel,
  isNew,
  tempProduct,
  setTempProduct,
  onSave
}) => {
  const [productForm] = Form.useForm();
  const [imgList, setImgList] = useState([]);
  const [foodCategory, setFoodCategory] = useState([]);
  //取得 category列表
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/api/food/category=all`)
      .then((res) => {
        setFoodCategory(res.data.categories);
      })
      .catch((error) => console.error(error));
  }, []);

  useEffect(() => {
    if (tempProduct) {
      console.log(tempProduct);
      productForm.setFieldsValue({
        name: tempProduct.name,
        description: tempProduct.description,
        category: tempProduct.category,
        storage_method: tempProduct.storage_method,
        activityId: tempProduct.activityId,
        price: tempProduct.price,
        stock: tempProduct.stock,

        food_category: tempProduct.food_info.category,
        content_des: tempProduct.food_info.content_des,
        common_name: tempProduct.food_info.common_name,
        unit: tempProduct.food_info.unit,
        popularity: tempProduct.food_info.popularity,
        calories: tempProduct.food_info.calories,
        calories_adjusted: tempProduct.food_info.calories_adjusted,
        water: tempProduct.food_info.water,
        crude_protein: tempProduct.food_info.crude_protein,
        crude_fat: tempProduct.food_info.crude_fat,
        saturated_fat: tempProduct.food_info.saturated_fat,
        carbohydrate: tempProduct.food_info.carbohydrate,
        sodium: tempProduct.food_info.sodium,
        dietary_fiber: tempProduct.food_info.dietary_fiber,
        trans_fat: tempProduct.food_info.trans_fat
      });
      setImgList(tempProduct.image);
    } else {
      productForm.resetFields();
      setImgList([]);
    }
  }, [openModal, tempProduct, productForm]);

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
      const imgListStr = imgList.join(",");
      console.log("rawData", values);
      const productData = {
        product: {
          name: values.name,
          category: values.category,
          description: values.description,
          storage_method: values.storage_method,
          activityId: values.activityId,
          price: values.price,
          stock: values.stock,
          image: imgListStr
        },
        nutrient: {
          category: values.food_category,
          sample_name: values.name,
          content_des: values.content_des,
          common_name: values.common_name,
          unit: values.unit,
          popularity: values.popularity,
          calories: values.calories,
          calories_adjusted: values.calories_adjusted,
          water: values.water,
          crude_protein: values.crude_protein,
          crude_fat: values.crude_fat,
          saturated_fat: values.saturated_fat,
          carbohydrate: values.carbohydrate,
          sodium: values.sodium,
          dietary_fiber: values.dietary_fiber,
          trans_fat: values.trans_fat
        }
      };
      console.log("data", productData);
      onSave(productData);
      setImgList([]);
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
      title={`產品${isNew ? "新增" : "編輯"}`}
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
            label="產品名稱"
            rules={[{ required: true, message: "請輸入產品名稱" }]}
            initialValue={tempProduct && tempProduct.name}
          >
            <Input maxLength={255} />
          </Form.Item>
          <Form.Item
            name="description"
            label="產品敘述"
            rules={[{ required: true, message: "請輸入產品敘述" }]}
            initialValue={tempProduct && tempProduct.description}
          >
            <Input.TextArea rows={2} />
          </Form.Item>
          <Row gutter={40}>
            <Col span={6}>
              <Form.Item
                name="category"
                label="產品種類"
                rules={[{ required: true, message: "請輸入產品種類" }]}
                initialValue={tempProduct && tempProduct.category}
              >
                <Select
                  placeholder="請選擇種類"
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
            </Col>
            <Col span={6}>
              <Form.Item
                name="storage_method"
                label="保存方式"
                rules={[{ required: true, message: "請選擇產品的保存方式" }]}
                initialValue={tempProduct && tempProduct.storage_method}
              >
                <Select
                  placeholder="請選擇保存方式"
                  onChange={(e) => {
                    console.log("method", e);
                  }}
                >
                  <Option key="冷凍" values="冷凍">
                    冷凍
                  </Option>
                  <Option key="冷藏" values="冷藏">
                    冷藏
                  </Option>
                  <Option key="常溫" values="常溫">
                    常溫
                  </Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item
                name="activityId"
                label="配合活動"
                initialValue={tempProduct && tempProduct.activityId}
              >
                <Select
                  placeholder="請選擇產品配合的活動"
                  onChange={(e) => {
                    console.log("activity", e);
                  }}
                >
                  <Option key="null" values={null}>
                    暫無活動
                  </Option>
                  <Option key="1" values="1">
                    活動 1
                  </Option>
                  <Option key="2" values="2">
                    活動 2
                  </Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>

          {/* 營養成分 */}
          <Collapse accordion defaultActiveKey={["1"]} className="mb-4">
            <Panel
              key="1"
              header={
                <div>
                  <span className="fw-bold fs-5">營養成分</span>
                  {tempProduct && (
                    <span className="fs-5 ms-2">
                      ID：
                      <span className="text-danger">{tempProduct.food_id}</span>
                    </span>
                  )}
                </div>
              }
            >
              <Row gutter={40}>
                <Col span={8}>
                  <Form.Item
                    name="food_category"
                    label="分類"
                    rules={[{ required: true, message: "此為必填" }]}
                    initialValue={tempProduct && tempProduct.food_info.category}
                  >
                    <Select placeholder="選擇種類">
                      {foodCategory &&
                        foodCategory.map((c, i) => (
                          <Option key={i} value={c}>
                            {c}
                          </Option>
                        ))}
                    </Select>
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item
                    name="name"
                    label="名稱"
                    rules={[{ required: true, message: "此為必填" }]}
                  >
                    <Input />
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item
                    name="common_name"
                    label="俗名"
                    initialValue={
                      tempProduct && tempProduct.food_info.common_name
                    }
                  >
                    <Input />
                  </Form.Item>
                </Col>
              </Row>
              <Row>
                <Col span={20}>
                  <Form.Item
                    className="ps-2"
                    name="content_des"
                    label="描述"
                    initialValue={
                      tempProduct && tempProduct.food_info.content_des
                    }
                  >
                    <Input.TextArea rows={1} />
                  </Form.Item>
                </Col>
              </Row>
              <Space direction="vertical">
                <Space size={50}>
                  <Form.Item
                    name="calories"
                    label="卡路里"
                    rules={[{ required: true, message: "此為必填" }]}
                    initialValue={tempProduct && tempProduct.food_info.calories}
                  >
                    <InputNumber min={0} />
                  </Form.Item>
                  <Form.Item
                    name="calories_adjusted"
                    label="調整卡路里"
                    rules={[{ required: true, message: "此為必填" }]}
                    initialValue={
                      tempProduct && tempProduct.food_info.calories_adjusted
                    }
                  >
                    <InputNumber min={0} />
                  </Form.Item>
                  <Form.Item
                    name="water"
                    label="水分重"
                    initialValue={tempProduct && tempProduct.food_info.water}
                  >
                    <InputNumber min={0} />
                  </Form.Item>
                  <Form.Item
                    name="crude_protein"
                    label="蛋白質"
                    rules={[{ required: true, message: "此為必填" }]}
                    initialValue={
                      tempProduct && tempProduct.food_info.crude_protein
                    }
                  >
                    <InputNumber min={0} />
                  </Form.Item>
                </Space>
                <Space size={50}>
                  <Form.Item
                    name="crude_fat"
                    label="粗脂肪"
                    initialValue={
                      tempProduct && tempProduct.food_info.crude_fat
                    }
                  >
                    <InputNumber min={0} />
                  </Form.Item>
                  <Form.Item
                    name="saturated_fat"
                    label="飽和脂肪"
                    rules={[{ required: true, message: "此為必填" }]}
                    initialValue={
                      tempProduct && tempProduct.food_info.saturated_fat
                    }
                  >
                    <InputNumber min={0} />
                  </Form.Item>
                  <Form.Item
                    name="carbohydrate"
                    label="碳水化合物"
                    rules={[{ required: true, message: "此為必填" }]}
                    initialValue={
                      tempProduct && tempProduct.food_info.carbohydrate
                    }
                  >
                    <InputNumber min={0} />
                  </Form.Item>
                  <Form.Item
                    name="sodium"
                    label="鈉含量"
                    rules={[{ required: true, message: "此為必填" }]}
                    initialValue={tempProduct && tempProduct.food_info.sodium}
                  >
                    <InputNumber min={0} />
                  </Form.Item>
                </Space>

                <Space size={50}>
                  <Form.Item
                    name="dietary_fiber"
                    label="膳食纖維"
                    initialValue={
                      tempProduct && tempProduct.food_info.dietary_fiber
                    }
                  >
                    <InputNumber min={0} />
                  </Form.Item>
                  <Form.Item
                    name="trans_fat"
                    label="反式脂肪"
                    initialValue={
                      tempProduct && tempProduct.food_info.trans_fat
                    }
                  >
                    <InputNumber min={0} />
                  </Form.Item>
                  <Form.Item
                    name="unit"
                    label="每單位幾克重"
                    initialValue={100}
                    rules={[{ required: true, message: "此為必填" }]}
                    initialValue={tempProduct && tempProduct.food_info.unit}
                  >
                    <InputNumber min={0} />
                  </Form.Item>
                  <Form.Item
                    name="popularity"
                    label="人氣權重"
                    initialValue={
                      tempProduct && tempProduct.food_info.popularity
                    }
                  >
                    <InputNumber min={0} />
                  </Form.Item>
                </Space>
              </Space>
            </Panel>
          </Collapse>

          <Row gutter={40}>
            <Col span={6}>
              <Form.Item
                className="ps-4"
                name="price"
                label="單價"
                rules={[{ required: true, message: "請輸入價格" }]}
                initialValue={tempProduct && tempProduct.price}
              >
                <InputNumber min={0} precision={0} />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item
                className="ps-4"
                name="stock"
                label="庫存"
                rules={[{ required: true, message: "請輸入庫存" }]}
                initialValue={tempProduct && tempProduct.stock}
              >
                <InputNumber min={0} precision={0} />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item name="image" label="產品圖片">
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
