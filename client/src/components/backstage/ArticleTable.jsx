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
  Select,
  message,
  Space
} from "antd";
import {
  CheckCircleOutlined,
  ExclamationCircleOutlined,
  DeleteOutlined
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
              className="status_tag p-2"
              icon={<CheckCircleOutlined style={{ verticalAlign: "0.1rem" }} />}
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
        <Space>
          <Button
            type="primary"
            onClick={() => editArticle(false, article.article_id)}
          >
            編輯
          </Button>
          <Button
            // icon={<DeleteOutlined />}
            type="primary"
            danger
            onClick={() => {
              deleteModal(article.article_id, article.title);
            }}
          >
            <DeleteOutlined style={{ verticalAlign: "0.1rem" }} />
          </Button>
        </Space>
      )
    }
  ];
  // 元物件
  const originArticleData = {
    title: "",
    sub_title: "",
    category: "",
    cover_image: "",
    content: "",
    is_published: 0
  };
  // context hook
  const [messageApi, contextHolder] = message.useMessage();

  // state hook
  const [categories, setCategories] = useState([]);
  const [tempCategory, setTempCategory] = useState("");
  const [articleList, setArticleList] = useState([]);
  const [articleModalVisible, setArticleModalVisible] = useState(false);

  const [tempArticle, setTempArticle] = useState(null);
  const [tempArticleChange, setTempArticleChange] = useState(null);
  const [isNewArticle, setIsNewArticle] = useState(false);

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
    return new Promise((resolve, reject) => {
      const api = `${process.env.REACT_APP_API_URL}/api/articles/id=${id}`;
      axios
        .get(api)
        .then((res) => {
          resolve(res.data.article);
        })
        .catch((err) => {
          console.log(err);
          reject(err);
        });
    });
  };
  const editArticle = async (isNew, id) => {
    if (isNew) {
      setIsNewArticle(true);
      setTempArticle(originArticleData);
      setTempArticleChange(originArticleData);

      setArticleModalVisible(true);
    } else {
      setIsNewArticle(false);
      const articleData = await getArticle(id);
      setTempArticle(articleData);
      setTempArticleChange(articleData);
      setArticleModalVisible(true);
    }
  };
  // 刪除文章
  const deleteModal = (id, name) => {
    Modal.error({
      title: "刪除文章",
      content: (
        <>
          <p className="fs-4 fw-bold">確定要刪除文章嗎?</p>
          <p>ID: {id}</p>
          <p>標題: {name}</p>
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
            .delete(`${process.env.REACT_APP_API_URL}/api/admin/article/${id}`)
            .then((res) => {
              Modal.destroyAll();
              if (res.data.success) {
                messageApi.success("文章刪除成功");
              } else {
                messageApi.error("文章更新失敗");
              }
              getArticleList(tempCategory);
            })
            .catch((err) => {
              console.log(err);
              messageApi.error("伺服器錯誤");
            });
        }
      }
    });
  };

  // modal按下cancel
  const closeModal = () => {
    if (tempArticle === tempArticleChange) {
      setTempArticle(null);
      setTempArticleChange(null);

      Modal.destroyAll();

      setArticleModalVisible(false);
    } else {
      confirmWarning();
    }
  };
  // modal按下OK
  const saveArticle = (isNew = isNewArticle) => {
    let status;
    if (isNew) {
      status = "新增";
    } else {
      status = "更新";
    }
    Modal.success({
      title: `${status}文章`,
      content: `確定要${status}文章嗎?`,
      closable: true,
      maskClosable: true,
      okText: "確定",
      okButtonProps: {
        onClick: confirmUpdate,
        type: "primary"
      }
    });
  };
  // 放棄警告
  const confirmWarning = () => {
    Modal.warning({
      title: "放棄更變",
      content: "確定要放棄更變嗎?",
      closable: true,
      maskClosable: true,
      okText: "確認",
      okButtonProps: {
        danger: true,
        type: "primary",
        onClick: () => {
          setTempArticle(null);
          setTempArticleChange(null);
          Modal.destroyAll();
          setArticleModalVisible(false);
        }
      }
    });
  };
  // 確認更新
  const confirmUpdate = () => {
    const { title, sub_title, category, cover_image, content, is_published } =
      tempArticleChange;
    const data = {
      title,
      sub_title,
      category,
      cover_image,
      content,
      is_published
    };
    let reqMethod;
    let api;

    if (isNewArticle) {
      api = `${process.env.REACT_APP_API_URL}/api/admin/article`;
      reqMethod = "post";
    } else {
      const articleId = tempArticleChange.article_id;
      api = `${process.env.REACT_APP_API_URL}/api/admin/article/${articleId}`;
      reqMethod = "put";
    }
    axios[reqMethod](api, data)
      .then((res) => {
        setTempArticle(null);
        setTempArticleChange(null);
        getArticleList(tempCategory);
        Modal.destroyAll();
        setArticleModalVisible(false);

        if (res.data.success) {
          messageApi.success(`文章${isNewArticle ? "新增" : "更新"}成功`);
        } else {
          messageApi.error(`文章${isNewArticle ? "新增" : "更新"}失敗`);
        }
      })
      .catch((err) => {
        messageApi.error("伺服器錯誤");
        console.log(err);
      });
  };

  useEffect(() => {
    getCategories();
  }, []);
  useEffect(() => {
    getArticleList(tempCategory);
  }, [tempCategory]);

  return (
    <>
      {contextHolder}
      <div className="article_table ">
        <div className="row">
          <div className="col">
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
          </div>
          <div className="col-2" style={{ paddingLeft: "5rem" }}>
            <Button
              type="primary"
              onClick={() => {
                editArticle(true);
              }}
            >
              新增文章
            </Button>
          </div>
        </div>
        {/* 表格 */}
        <div>
          <Table
            dataSource={articleList}
            columns={columns}
            rowKey="article_id"
          />
          <ArticleModal
            isNew={isNewArticle}
            articleDataOld={tempArticle}
            articleData={tempArticleChange}
            setArticleData={setTempArticleChange}
            categories={categories}
            isOpen={articleModalVisible}
            onCancel={closeModal}
            onSave={saveArticle}
          />
        </div>
      </div>
    </>
  );
};

export default ArticleTable;
