import React, { useEffect, useState } from "react";
import { Table, Image, Tag, Space, Button, Select, message, Modal } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import axios from "axios";
import ProductModal from "./ProductModal";

const ProductList = () => {
  // context hook
  const [messageApi, contextHolder] = message.useMessage();
  const [products, setProducts] = useState([]);
  const [totalPage, setTotalPage] = useState(1);
  const [tempPage, setTempPage] = useState(1);
  const [showProductModal, setShowProductModal] = useState(false);
  const [isNewProduct, setIsNewProduct] = useState(true);
  const [tempProduct, setTempProduct] = useState(null);

  useEffect(() => {
    fetchProducts(1);
  }, []);

  const fetchProducts = async (page) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/product/getProducts?page=${page}`
      );
      console.log(response);
      setProducts(response.data.results);
      setTotalPage(response.data.totalPages);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };
  // 取得特定產品營養成分
  const getFoodData = (foodId) => {
    return new Promise((resolve, reject) => {
      const api = `${process.env.REACT_APP_API_URL}/api/food/search?food_id=${foodId}`;
      axios
        .get(api)
        .then((res) => {
          resolve(res.data);
        })
        .catch((err) => {
          console.log(err);
          reject(err);
        });
    });
  };
  // open modal
  const handleEdit = async (isNew, product) => {
    if (isNew) {
      setIsNewProduct(true);
      setTempProduct(null);
      setShowProductModal(true);
    } else {
      const food_info = await getFoodData(product.food_id);
      setIsNewProduct(false);
      setTempProduct({ ...product, food_info });
      setShowProductModal(true);
    }
  };

  // 按下ok
  const saveProduct = (updateData) => {
    let status;
    if (isNewProduct) {
      status = "新增";
    } else {
      status = "更新";
    }

    Modal.success({
      title: `${status}產品`,
      content: `確定要${status}產品嗎?`,
      closable: true,
      maskClosable: true,
      okText: "確定",
      okButtonProps: {
        onClick: () => {
          confirmUpdate(updateData);
        },
        type: "primary"
      }
    });

    // 確認modal OK
    const confirmUpdate = async (finalData) => {
      try {
        const foodData = finalData.nutrient;

        const {
          activityId,
          name,
          category,
          description,
          storage_method,
          price,
          stock,
          image
        } = finalData.product;
        let productData = {
          activityId: activityId,
          name: name,
          category: category,
          description: description,
          storage_method: storage_method,
          price: price,
          stock: stock,
          image: image
        };
        let foodApi = `${process.env.REACT_APP_API_URL}/api/admin/food`;
        let productApi = `${process.env.REACT_APP_API_URL}/api/admin/addProducts`;
        let reqMethod = "post";

        if (isNewProduct) {
          const foodRes = await axios[reqMethod](foodApi, foodData);
          if (!foodRes.data.success) {
            messageApi.error("產品營養成分新增失敗");
            throw new Error("產品營養成分新增失敗");
          }
          const foodId = foodRes.data.food_id;
          productData = {
            ...productData,
            food_id: foodId
          };
          // 發送product data
          const productRes = await axios[reqMethod](productApi, productData);
          if (productRes.data.success) {
            messageApi.success("產品新增成功");
          } else {
            messageApi.error("產品新增失敗");
          }
        } else {
          const productId = tempProduct.productid;
          const foodId = tempProduct.food_id;
          productApi = `${process.env.REACT_APP_API_URL}/api/admin/products/${productId}`;
          foodApi = `${process.env.REACT_APP_API_URL}/api/admin/food/food_id=${foodId}`;
          reqMethod = "put";

          const foodRes = await axios[reqMethod](foodApi, foodData);
          if (!foodRes.data.success) {
            messageApi.error("產品營養成分更新失敗");
            throw new Error("產品營養成分更新失敗");
          }

          productData = {
            ...productData,
            food_id: foodId
          };

          // 發送product data
          const productRes = await axios[reqMethod](productApi, productData);

          if (productRes.data.success) {
            messageApi.success("產品更新成功");
          } else {
            messageApi.error("產品更新失敗");
          }
        }
        setIsNewProduct(true);
        setTempProduct(null);
        fetchProducts(tempPage);
        Modal.destroyAll();
        setShowProductModal(false);
      } catch (err) {
        console.error(err, err.response.data.message);
        messageApi.error(
          <>伺服器錯誤 {<p className="mt-2">{err.response.data.message}</p>}</>
        );
        throw err;
      }
    };
  };

  const deleteProduct = (id, name) => {
    Modal.error({
      title: "刪除",
      content: (
        <>
          <p className="fs-4 fw-bold">確定要刪除產品嗎?</p>
          <p>名稱: {name}</p>
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
            .delete(`${process.env.REACT_APP_API_URL}/api/admin/products/${id}`)
            .then((res) => {
              Modal.destroyAll();
              if (res.data.success) {
                messageApi.success("產品刪除成功");
              } else {
                messageApi.error("產品刪除錯誤");
              }
              fetchProducts(tempPage);
            })
            .catch((err) => {
              console.log(err, err.response.data.message);

              messageApi.error(
                <>
                  伺服器錯誤
                  {<p className="mt-2">{err.response.data.message}</p>}
                </>
              );
            });
        }
      }
    });
  };

  const closeModal = () => {
    setTempProduct(null);
    setShowProductModal(false);
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
              handleEdit(false, product);
            }}
          >
            編輯
          </Button>
          <Button
            type="primary"
            danger
            onClick={() => {
              deleteProduct(product.productid, product.name);
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
                handleEdit(true);
              }}
            >
              新增產品
            </Button>
          </div>
        </div>
        <div>
          <Table
            dataSource={products}
            columns={columns}
            rowKey="productid"
            pagination={{
              pageSize: 12,
              total: 12 * totalPage,
              onChange: (e) => {
                setTempPage(e);
                fetchProducts(e);
              }
            }}
          />
        </div>
      </div>
      <ProductModal
        destroyOnClose={true}
        openModal={showProductModal}
        onCancel={closeModal}
        isNew={isNewProduct}
        tempProduct={tempProduct}
        setTempProduct={setTempProduct}
        onSave={saveProduct}
      />
    </>
  );
};

export default ProductList;
