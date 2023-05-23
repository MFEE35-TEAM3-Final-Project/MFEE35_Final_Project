import React, { useState, useEffect } from "react";
import { Collapse, Form, Input, Button, message } from "antd";
import axios from "axios";

const { Panel } = Collapse;

const FoodSearch = () => {
  const [foods, setFoods] = useState([]);
  const [tempCategory, setTempCategory] = useState("水果類");
  const [keyword, setKeyword] = useState("香");

  useEffect(() => {
    // 取得食材列表
    fetchFoods(tempCategory, keyword);
  }, []);

  const fetchFoods = async (category, key) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/food/search?category=${category}&keyword=${key}`
      ); // 根據你的後端路由和API設計修改URL
      console.log(response);
      setFoods(response.data.suggestions);
    } catch (error) {
      console.error("無法取得食材列表:", error);
    }
  };

  const handleFormSubmit = async (foodId, values) => {
    try {
      // 更新食物資料
      const response = await axios.put(`/api/foods/${foodId}`, values);
      const updatedFood = response.data;
      setFoods((prevFoods) =>
        prevFoods.map((food) =>
          food.id === updatedFood.id ? updatedFood : food
        )
      );
      message.success("食物資料已更新");
    } catch (error) {
      console.error("無法更新食物資料:", error);
      message.error("更新食物資料時發生錯誤");
    }
  };

  const handleDeleteFood = async (foodId) => {
    try {
      // 刪除食物
      await axios.delete(`/api/foods/${foodId}`);
      setFoods((prevFoods) => prevFoods.filter((food) => food.id !== foodId));
      message.success("食物已刪除");
    } catch (error) {
      console.error("無法刪除食物:", error);
      message.error("刪除食物時發生錯誤");
    }
  };

  return (
    <div>
      <Collapse>
        {foods.map((food) => (
          <Panel header={food.name} key={food.food_id}>
            <Form
              initialValues={{
                calories: food.Calories_adjusted,
                protein: food.Crude_protein
              }}
              onFinish={(values) => handleFormSubmit(food.id, values)}
            >
              <Form.Item name="calories" label="熱量">
                <Input />
              </Form.Item>
              <Form.Item name="protein" label="蛋白質">
                <Input />
              </Form.Item>
              {/* 添加其他食物詳細資料的表單項目 */}
              <Form.Item>
                <Button type="primary" htmlType="submit">
                  保存
                </Button>
                <Button type="danger" onClick={() => handleDeleteFood(food.id)}>
                  刪除
                </Button>
              </Form.Item>
            </Form>
          </Panel>
        ))}
      </Collapse>
    </div>
  );
};

export default FoodSearch;
