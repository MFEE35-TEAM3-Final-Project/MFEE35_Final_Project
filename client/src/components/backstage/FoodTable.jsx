import React, { useState, useEffect } from "react";
import {
  Collapse,
  Form,
  Input,
  message,
  Select,
  Space,
  InputNumber,
  Row,
  Col,
  Modal
} from "antd";
import { PlusCircleTwoTone } from "@ant-design/icons";
import axios from "axios";
const { Search } = Input;
const { Option } = Select;
const { Panel } = Collapse;
const FoodSearch = () => {
  const [createFoodForm] = Form.useForm();
  // context hook
  const [messageApi, contextHolder] = message.useMessage();
  const [categoryList, setCategoryList] = useState([]);
  const [tempCategory, setTempCategory] = useState("all");
  const [maxResultQty, setMaxResultQty] = useState(50);
  const [keyword, setKeyword] = useState("");
  const [foods, setFoods] = useState([]);
  const [tempFood, setTempFood] = useState("");
  const [createFood, setCreateFood] = useState(false);

  useEffect(() => {
    console.log(tempFood);
  }, [tempFood]);

  //取得 category列表
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/api/food/category=all`)
      .then((res) => {
        setCategoryList(res.data.categories);
      })
      .catch((error) => console.error(error));
  }, []);
  // 搜尋食物
  useEffect(() => {
    let inputTimer = null;
    const delay = 1000;
    if (keyword.trim().length > 0) {
      inputTimer = setTimeout(() => {
        fetchFoods(tempCategory, maxResultQty, keyword);
      }, delay);
    } else {
      setFoods([]);
    }
    return () => {
      if (inputTimer) {
        clearTimeout(inputTimer);
      }
    };
  }, [tempCategory, maxResultQty, keyword]);

  const fetchFoods = async (category, qty, key) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/food/search?category=${category}&qty=${qty}&keyword=${key}`
      ); // 根據你的後端路由和API設計修改URL
      setFoods(response.data.suggestions);
    } catch (error) {
      console.error("無法取得食材列表:", error);
      setFoods([]);
    }
  };

  const updateFood = (isNew, foodData, foodId) => {
    console.log(isNew, foodData, foodId);
    let status;
    if (isNew) {
      status = "新增";
    } else {
      status = "修改";
    }
    Modal.success({
      title: `${status}食物資訊`,
      content: `確定要${status}食物資訊嗎?`,
      closable: true,
      maskClosable: true,
      okText: "確定",
      okButtonProps: {
        onClick: () => {
          confirmUpdate(foodData, foodId);
        },
        type: "primary"
      }
    });
    // 確認modal OK
    const confirmUpdate = (finalData, fId) => {
      const data = {
        ...finalData
      };
      let api = `${process.env.REACT_APP_API_URL}/api/admin/food`;
      let reqMethod = "post";

      if (!isNew) {
        const foodId = fId;
        api = `${process.env.REACT_APP_API_URL}/api/admin/food/food_id=${foodId}`;
        reqMethod = "put";
      }
      axios[reqMethod](api, data)
        .then((res) => {
          setTempFood("");
          fetchFoods(tempCategory, maxResultQty, keyword);
          Modal.destroyAll();
          if (res.data.success) {
            messageApi.success(`食物資訊${status}成功`);
          } else {
            console.log(res);
            messageApi.error(`食物資訊${status}失敗`);
          }
          setTempFood("");
          setCreateFood(false);
          createFoodForm.resetFields();
          fetchFoods(tempCategory, maxResultQty, keyword);
        })
        .catch((err) => {
          console.log(err);
          messageApi.error(
            <>
              伺服器錯誤 {<p className="mt-2">{err.response.data.message}</p>}
            </>
          );
          setTempFood("");
          setCreateFood(false);
          createFoodForm.resetFields();
        });
    };
  };

  const deleteFood = (foodId, foodName) => {
    Modal.error({
      title: "刪除",
      content: (
        <>
          <p className="fs-4 fw-bold">確定要刪除該食物資訊嗎?</p>
          <p>
            ID: <span className="text-danger">{foodId}</span>
          </p>
          <p>
            食物名: <span className="text-danger">{foodName}</span>
          </p>
        </>
      ),
      closable: true,
      maskClosable: true,
      okText: "刪除",
      okButtonProps: {
        danger: true,
        type: "primary",
        onClick: () => {
          axios
            .delete(
              `${process.env.REACT_APP_API_URL}/api/admin/food/food_id=${foodId}`
            )
            .then((res) => {
              Modal.destroyAll();
              if (res.data.success) {
                messageApi.success("食物資訊刪除成功");
              } else {
                messageApi.error("食物資訊刪除失敗");
              }
              setTempFood("");
              fetchFoods(tempCategory, maxResultQty, keyword);
            })
            .catch((err) => {
              messageApi.error(
                <>
                  伺服器錯誤
                  {<p className="mt-2">{err.response.data.message}</p>}
                </>
              );
              setTempFood("");
            });
        }
      }
    });
  };

  return (
    <>
      {contextHolder}
      <div className="row mb-2 justify-content-between">
        <div className="col">
          <Space.Compact>
            <Select
              style={{ width: "200px" }}
              placeholder="選擇種類"
              value={tempCategory}
              onChange={(value) => {
                setTempCategory(value);
              }}
            >
              <Option key="all" value="all">
                ALL
              </Option>
              {categoryList &&
                categoryList.map((c, i) => (
                  <Option key={i} value={c}>
                    {c}
                  </Option>
                ))}
            </Select>
            <Search
              size="large"
              enterButton
              placeholder="搜尋食物"
              allowClear
              onChange={(e) => {
                setKeyword(e.target.value);
              }}
              onSearch={(e) => {
                fetchFoods(tempCategory, maxResultQty, e);
              }}
              style={{
                width: 500
              }}
            />
          </Space.Compact>
        </div>
        <div className="col-2">
          <Select
            style={{ width: "100px" }}
            placeholder="最多顯示結果數量"
            value={maxResultQty}
            onChange={(value) => {
              setMaxResultQty(value);
            }}
          >
            <Option key="qty_20" value={20}>
              20 筆
            </Option>
            <Option key="qty_50" value={50}>
              50 筆
            </Option>
            <Option key="qty_100" value={100}>
              100 筆
            </Option>
          </Select>
        </div>
      </div>
      <div>
        <Collapse accordion>
          {foods.map((food) => (
            <Panel header={food.sample_name} key={food.food_id}>
              <div>
                <p className="fs-5">
                  ID： <span className="text-danger">{food.food_id}</span>
                </p>
              </div>
              <Form
                initialValues={{
                  category: food.category,
                  sample_name: food.sample_name,
                  content_des: food.content_des,
                  common_name: food.common_name,
                  unit: food.unit,
                  popularity: food.popularity,
                  calories: food.calories,
                  calories_adjusted: food.calories_adjusted,
                  water: food.water,
                  crude_protein: food.crude_protein,
                  crude_fat: food.crude_fat,
                  saturated_fat: food.saturated_fat,
                  carbohydrate: food.carbohydrate,
                  sodium: food.sodium,
                  dietary_fiber: food.dietary_fiber,
                  trans_fat: food.trans_fat
                }}
                layout="vertical"
                disabled={tempFood !== food.food_id}
                onFinish={(values) => updateFood(false, values, food.food_id)}
              >
                <Row gutter={40}>
                  <Col span={4}>
                    <Form.Item
                      name="category"
                      label="分類"
                      rules={[{ required: true, message: "此為必填" }]}
                    >
                      <Select placeholder="選擇種類">
                        {categoryList &&
                          categoryList.map((c, i) => (
                            <Option key={i} value={c}>
                              {c}
                            </Option>
                          ))}
                      </Select>
                    </Form.Item>
                  </Col>
                  <Col span={4}>
                    <Form.Item
                      name="sample_name"
                      label="名稱"
                      rules={[{ required: true, message: "此為必填" }]}
                    >
                      <Input />
                    </Form.Item>
                  </Col>
                  <Col span={4}>
                    <Form.Item name="common_name" label="俗名">
                      <Input />
                    </Form.Item>
                  </Col>
                  <Col span={8}>
                    <Form.Item name="content_des" label="描述">
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
                    >
                      <InputNumber min={0} />
                    </Form.Item>
                    <Form.Item
                      name="calories_adjusted"
                      label="調整卡路里"
                      rules={[{ required: true, message: "此為必填" }]}
                    >
                      <InputNumber min={0} />
                    </Form.Item>
                    <Form.Item name="water" label="水分重">
                      <InputNumber min={0} />
                    </Form.Item>
                    <Form.Item
                      name="crude_protein"
                      label="蛋白質"
                      rules={[{ required: true, message: "此為必填" }]}
                    >
                      <InputNumber min={0} />
                    </Form.Item>
                    <Form.Item name="crude_fat" label="粗脂肪">
                      <InputNumber min={0} />
                    </Form.Item>
                    <Form.Item
                      name="saturated_fat"
                      label="飽和脂肪"
                      rules={[{ required: true, message: "此為必填" }]}
                    >
                      <InputNumber min={0} />
                    </Form.Item>
                    <Form.Item
                      name="carbohydrate"
                      label="碳水化合物"
                      rules={[{ required: true, message: "此為必填" }]}
                    >
                      <InputNumber min={0} />
                    </Form.Item>
                    <Form.Item
                      name="sodium"
                      label="鈉含量"
                      rules={[{ required: true, message: "此為必填" }]}
                    >
                      <InputNumber min={0} />
                    </Form.Item>
                  </Space>

                  <Space size={50}>
                    <Form.Item name="dietary_fiber" label="膳食纖維">
                      <InputNumber min={0} />
                    </Form.Item>
                    <Form.Item name="trans_fat" label="反式脂肪">
                      <InputNumber min={0} />
                    </Form.Item>
                    <Form.Item
                      name="unit"
                      label="每單位幾克重"
                      rules={[{ required: true, message: "此為必填" }]}
                    >
                      <InputNumber min={0} />
                    </Form.Item>
                    <Form.Item name="popularity" label="人氣權重">
                      <InputNumber min={0} />
                    </Form.Item>
                  </Space>
                </Space>
                <Form.Item>
                  {tempFood === food.food_id ? (
                    <>
                      <button className="btn btn-success" type="submit">
                        保存
                      </button>
                      <button
                        className="btn btn-danger"
                        type="button"
                        onClick={(e) => {
                          e.preventDefault();
                          setTempFood("");
                        }}
                        style={{ marginLeft: "16px" }}
                      >
                        取消
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        className="btn btn-outline-primary"
                        type="button"
                        onClick={(e) => {
                          e.preventDefault();
                          setTempFood(food.food_id);
                        }}
                      >
                        編輯
                      </button>
                      <button
                        className="btn btn-outline-danger"
                        type="button"
                        onClick={(e) => {
                          e.preventDefault();
                          deleteFood(food.food_id, food.sample_name);
                        }}
                        style={{ marginLeft: "16px" }}
                      >
                        刪除
                      </button>
                    </>
                  )}
                </Form.Item>
              </Form>
            </Panel>
          ))}
          <Panel
            header={
              <div>
                <span className="fw-bold fs-5">新增食物 </span>
                <PlusCircleTwoTone
                  twoToneColor="#52c41a"
                  style={{ fontSize: "1.25rem", verticalAlign: "0.1rem" }}
                />
              </div>
            }
            key="addNewFood"
          >
            <Form
              form={createFoodForm}
              layout="vertical"
              disabled={!createFood}
              onFinish={(values) => updateFood(true, values)}
            >
              <Row gutter={40}>
                <Col span={4}>
                  <Form.Item
                    name="category"
                    label="分類"
                    rules={[{ required: true, message: "此為必填" }]}
                  >
                    <Select placeholder="選擇種類">
                      {categoryList &&
                        categoryList.map((c, i) => (
                          <Option key={i} value={c}>
                            {c}
                          </Option>
                        ))}
                    </Select>
                  </Form.Item>
                </Col>
                <Col span={4}>
                  <Form.Item
                    name="sample_name"
                    label="名稱"
                    rules={[{ required: true, message: "此為必填" }]}
                  >
                    <Input />
                  </Form.Item>
                </Col>
                <Col span={4}>
                  <Form.Item name="common_name" label="俗名">
                    <Input />
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item name="content_des" label="描述">
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
                  >
                    <InputNumber min={0} />
                  </Form.Item>
                  <Form.Item
                    name="calories_adjusted"
                    label="調整卡路里"
                    rules={[{ required: true, message: "此為必填" }]}
                  >
                    <InputNumber min={0} />
                  </Form.Item>
                  <Form.Item name="water" label="水分重">
                    <InputNumber min={0} />
                  </Form.Item>
                  <Form.Item
                    name="crude_protein"
                    label="蛋白質"
                    rules={[{ required: true, message: "此為必填" }]}
                  >
                    <InputNumber min={0} />
                  </Form.Item>
                  <Form.Item name="crude_fat" label="粗脂肪">
                    <InputNumber min={0} />
                  </Form.Item>
                  <Form.Item
                    name="saturated_fat"
                    label="飽和脂肪"
                    rules={[{ required: true, message: "此為必填" }]}
                  >
                    <InputNumber min={0} />
                  </Form.Item>
                  <Form.Item
                    name="carbohydrate"
                    label="碳水化合物"
                    rules={[{ required: true, message: "此為必填" }]}
                  >
                    <InputNumber min={0} />
                  </Form.Item>
                  <Form.Item
                    name="sodium"
                    label="鈉含量"
                    rules={[{ required: true, message: "此為必填" }]}
                  >
                    <InputNumber min={0} />
                  </Form.Item>
                </Space>

                <Space size={50}>
                  <Form.Item name="dietary_fiber" label="膳食纖維">
                    <InputNumber min={0} />
                  </Form.Item>
                  <Form.Item name="trans_fat" label="反式脂肪">
                    <InputNumber min={0} />
                  </Form.Item>
                  <Form.Item
                    name="unit"
                    label="每單位幾克重"
                    initialValue={100}
                    rules={[{ required: true, message: "此為必填" }]}
                  >
                    <InputNumber min={0} />
                  </Form.Item>
                  <Form.Item
                    name="popularity"
                    label="人氣權重"
                    initialValue={0}
                  >
                    <InputNumber min={0} />
                  </Form.Item>
                </Space>
              </Space>
              <Form.Item>
                {createFood ? (
                  <>
                    <button className="btn btn-success" type="submit">
                      保存
                    </button>
                    <button
                      className="btn btn-danger"
                      type="button"
                      onClick={(e) => {
                        e.preventDefault();
                        setCreateFood(false);
                      }}
                      style={{ marginLeft: "16px" }}
                    >
                      取消
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      className="btn btn-outline-primary"
                      type="button"
                      onClick={(e) => {
                        e.preventDefault();
                        setCreateFood(true);
                      }}
                    >
                      編輯
                    </button>
                  </>
                )}
              </Form.Item>
            </Form>
          </Panel>
        </Collapse>
      </div>
    </>
  );
};

export default FoodSearch;
