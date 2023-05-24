import React, { useEffect, useState } from "react";
import { Table, Image, Tag } from "antd";
import axios from "axios";

const ProductList = () => {
  const [products, setProducts] = useState([]);

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
      title: "Product ID",
      dataIndex: "productid",
      key: "productid"
    },
    {
      title: "Food ID",
      dataIndex: "food_id",
      key: "food_id"
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name"
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description"
    },
    {
      title: "Storage Method",
      dataIndex: "storage_method",
      key: "storage_method"
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      render: (price) => `$${Math.floor(price)}`
    },
    {
      title: "Stock",
      dataIndex: "stock",
      key: "stock"
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
      render: (category) => {
        // 根据分类ID渲染不同的标签或文本
        const categoryMapping = {
          1: <Tag color="blue">Category 1</Tag>,
          2: <Tag color="green">Category 2</Tag>
          // 添加更多分类的映射
        };
        return categoryMapping[category] || "-";
      }
    },
    {
      title: "Activity ID",
      dataIndex: "activityId",
      key: "activityId"
    },
    {
      title: "Image",
      dataIndex: "image",
      key: "image",
      render: (image) => <Image src={image[0]} alt="Product" width={80} />
    }
  ];

  return <Table dataSource={products} columns={columns} />;
};

export default ProductList;
