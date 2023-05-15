import React, { useEffect, useState } from "react";
import axios from "axios";
import { Table, Modal, Button, Descriptions, Tag, Radio, Image } from "antd";
import {
  CheckCircleOutlined,
  ClockCircleOutlined,
  CloseCircleOutlined,
  ExclamationCircleOutlined,
  MinusCircleOutlined,
  SyncOutlined
} from "@ant-design/icons";

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
              className="status_tag"
              icon={<ExclamationCircleOutlined />}
              color="danger"
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
        <Button type="primary" onClick={() => editArticle(article)}>
          編輯
        </Button>
      )
    }
  ];
  // state hook
  const [articles, setArticles] = useState([]);
  const [tempArticle, setTempArticle] = useState(null);
  const [tempArticleChange, setTempArticleChange] = useState(null);

  const toLocalTime = (time) => {
    const date = new Date(time);
    return date.toLocaleString();
  };
  const getArticles = () => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/api/articles`)
      .then((res) => {
        console.log(res);
        if (res.data.success) {
          setArticles(res.data.data);
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const editArticle = (article) => {
    console.log(article);
  };

  useEffect(() => {
    getArticles();
  }, []);
  return (
    <div className="article_table">
      <Table dataSource={articles} columns={columns} rowKey="article_id" />
    </div>
  );
};

export default ArticleTable;
