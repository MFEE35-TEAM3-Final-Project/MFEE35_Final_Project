import React, { useEffect, useState } from "react";
import { Table, Image, Tag, Space, Button, Select, message } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import axios from "axios";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  // context hook
  const [messageApi, contextHolder] = message.useMessage();
  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/product/getProducts`
      ); // 替换为实际的 API URL
      console.log(response);
      setProducts(response.data.results);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const columns = [
    {
      title: "產品圖片",
      dataIndex: "image",
      key: "image",
      render: (image) => <Image src={image[0]} alt="Product" width={80} />
    },
    {
      title: "產品 ID",
      dataIndex: "productid",
      key: "productid"
    },
    {
      title: "產品名稱",
      dataIndex: "name",
      key: "name"
    },
    {
      title: "儲存方式",
      dataIndex: "storage_method",
      key: "storage_method"
    },
    {
      title: "單價",
      dataIndex: "price",
      key: "price",
      render: (price) => `$${Math.floor(price)}`
    },
    {
      title: "庫存量",
      dataIndex: "stock",
      key: "stock"
    },
    {
      title: "種類",
      dataIndex: "category",
      key: "category",
      render: (category) => {
        // 根据分类ID渲染不同的标签或文本
        const categoryMapping = {
          餐盒: <Tag color="red">餐盒</Tag>,
          乳清蛋白: <Tag color="blue">乳清蛋白</Tag>,
          雞胸肉: <Tag color="green">雞胸肉</Tag>
          // 添加更多分类的映射
        };
        return categoryMapping[category] || "-";
      }
    },
    {
      title: "配合活動 ID",
      dataIndex: "activityId",
      key: "activityId"
    },
    {
      title: "操作",
      key: "action",
      render: (_, product) => (
        <Space>
          <Button
            type="primary"
            onClick={() => {
              console.log("edit product");
            }}
          >
            編輯
          </Button>
          <Button
            // icon={<DeleteOutlined />}
            type="primary"
            danger
            onClick={() => {
              console.log("del product");
            }}
          >
            <DeleteOutlined style={{ verticalAlign: "0.1rem" }} />
          </Button>
        </Space>
      )
    }
  ];

  return (
    <>
      {contextHolder}
      <div className="product_table">
        <div className="row mb-2">
          <div className="col d-flex">
            <div className="fs-4 fw-bold">類別：</div>
            <div>
              <Select
                defaultValue="all"
                style={{
                  width: 120
                }}
                onChange={(key) => {
                  console.log(key);
                }}
                options={[
                  {
                    value: "餐盒",
                    label: "餐盒"
                  },
                  {
                    value: "乳清蛋白",
                    label: "乳清蛋白"
                  },
                  {
                    value: "雞胸肉",
                    label: "雞胸肉"
                  }
                ]}
              />
            </div>
          </div>
          <div className="col-2" style={{ paddingLeft: "5rem" }}>
            <Button
              type="primary"
              onClick={() => {
                console.log("add product");
              }}
            >
              新增產品
            </Button>
          </div>
        </div>
        <div>
          <Table dataSource={products} columns={columns} rowKey="productid" />
        </div>
      </div>
    </>
  );
};

export default ProductList;
