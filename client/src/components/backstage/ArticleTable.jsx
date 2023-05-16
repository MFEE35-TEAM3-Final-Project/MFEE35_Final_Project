import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Table,
  Modal,
  Button,
  Descriptions,
  Tag,
  Radio,
  Image,
  Select
} from "antd";
import {
  CheckCircleOutlined,
  ClockCircleOutlined,
  CloseCircleOutlined,
  ExclamationCircleOutlined,
  MinusCircleOutlined,
  SyncOutlined
} from "@ant-design/icons";
import ArticleModal from "./ArticleModal";

const ArticleTable = () => {
  // 表格欄位設定
  const columns = [
    {
      title: "文章ID",
      dataIndex: "article_id",
      key: "article_id"
    },
    {
      title: "類別",
      dataIndex: "category",
      key: "category"
    },
    {
      title: "標題",
      dataIndex: "title",
      key: "title"
    },

    {
      title: "發布狀態",
      dataIndex: "is_published",
      key: "is_published",
      render: (status) => {
        if (status === 1) {
          return (
            <Tag
              className="status_tag"
              icon={<CheckCircleOutlined />}
              color="success"
            >
              公開中
            </Tag>
          );
        } else {
          return (
            <Tag
              className="status_tag p-2"
              icon={
                <ExclamationCircleOutlined
                  style={{ verticalAlign: "0.1rem" }}
                />
              }
              color="error"
            >
              未發布
            </Tag>
          );
        }
      }
    },
    {
      title: "更新時間",
      dataIndex: "updated_at",
      key: "updated_at",
      render: (time) => {
        const localTime = toLocalTime(time);
        return <p>{localTime}</p>;
      }
    },
    {
      title: "建立時間",
      dataIndex: "created_at",
      key: "created_at",
      render: (time) => {
        const localTime = toLocalTime(time);
        return <p>{localTime}</p>;
      }
    },

    {
      title: "操作",
      key: "action",
      render: (_, article) => (
        <Button type="primary" onClick={() => editArticle(article.article_id)}>
          編輯
        </Button>
      )
    }
  ];
  // state hook
  const [categories, setCategories] = useState([]);
  const [tempCategory, setTempCategory] = useState("");
  const [articleList, setArticleList] = useState([]);
  const [articleModalVisible, setArticleModalVisible] = useState(false);
  const [tempArticle, setTempArticle] = useState(null);

  const toLocalTime = (time) => {
    const date = new Date(time);
    return date.toLocaleString();
  };
  const getCategories = () => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/api/articles/all_categories`)
      .then((res) => {
        if (res.data.success) {
          const list = res.data.categories.map((item) => ({
            value: item,
            label: item
          }));

          setCategories(list);
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };
  const getArticleList = (c) => {
    let api;
    if (c === "all") {
      api = `${process.env.REACT_APP_API_URL}/api/articles`;
    } else {
      api = `${process.env.REACT_APP_API_URL}/api/articles?category=${c}`;
    }

    axios
      .get(api)
      .then((res) => {
        if (res.data.success) {
          setArticleList(res.data.articles);
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };
  // 取得特定文章
  const getArticle = (id) => {
    const api = `${process.env.REACT_APP_API_URL}/api/articles/id=${id}`;
    axios
      .get(api)
      .then((res) => {
        console.log(res.data);
        setTempArticle(res.data.article);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const editArticle = async (id) => {
    await getArticle(id);
    setArticleModalVisible(true);
  };
  const closeModal = () => {
    setArticleModalVisible(false);
  };
  const saveArticle = () => {};

  useEffect(() => {
    getCategories();
  }, []);
  useEffect(() => {
    getArticleList(tempCategory);
  }, [tempCategory]);
  return (
    <div className="article_table">
      <p className="fs-4 fw-bold">
        類別：
        <Select
          defaultValue="all"
          style={{
            width: 120
          }}
          onChange={(key) => {
            setTempCategory(key);
          }}
          options={[
            {
              value: "all",
              label: "All"
            },
            ...categories
          ]}
        />
      </p>
      <div>
        <Table dataSource={articleList} columns={columns} rowKey="article_id" />
        <ArticleModal
          articleData={tempArticle}
          categories={categories}
          isOpen={articleModalVisible}
          onCancel={closeModal}
          onSave={saveArticle}
        />
      </div>
    </div>
  );
};

export default ArticleTable;
