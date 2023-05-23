import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Space,
  Table,
  Modal,
  Button,
  Progress,
  message,
  Descriptions,
  Tag,
  Radio,
  Image
} from "antd";
import {
  CheckCircleOutlined,
  ClockCircleOutlined,
  CloseCircleOutlined,
  ExclamationCircleOutlined,
  MinusCircleOutlined,
  SyncOutlined,
  DeleteOutlined
} from "@ant-design/icons";
import CouponModal from "./CouponModal";

const CouponManagement = () => {
  // context hook
  const [messageApi, contextHolder] = message.useMessage();
  const [coupons, setCoupons] = useState(null);
  const [isCouponNew, setIsCouponNew] = useState(true);
  const [selectedCoupon, setSelectedCoupon] = useState(null);
  const [selectedCouponChange, setSelectedCouponChange] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  // 表格欄位設定
  const columns = [
    {
      title: "優惠券編號",
      dataIndex: "coupon_id",
      key: "coupon_id",
      sorter: {
        compare: (a, b) => a.coupon_id - b.coupon_id
      }
    },
    {
      title: "名稱",
      dataIndex: "name",
      key: "name"
    },
    {
      title: "優惠碼",
      dataIndex: "code",
      key: "code"
    },
    {
      title: "優惠券折數",
      dataIndex: "discount_rate",
      key: "discount_rate"
    },
    {
      title: "使用數量",
      dataIndex: "usage",
      key: "usage",
      width: "15%",

      render: (_, coupon) => {
        return (
          <>
            <div className="px-1 fw-bold d-flex justify-content-between">
              <div>{coupon.usage_count}</div>
              <div>{coupon.usage_limit}</div>
            </div>
            <Progress
              status="active"
              percent={coupon.usage_count / coupon.usage_limit}
              showInfo={false}
              strokeColor={{ "0%": "#ffeb3b", "100%": "#f44336" }}
            />
          </>
        );
      }
    },
    {
      title: "開始日期",
      dataIndex: "start_date",
      key: "start_date",
      sorter: {
        compare: (a, b) => a.start_date - b.start_date
      },

      render: (time) => {
        const localTime = toLocalTime(time);
        return <p>{localTime}</p>;
      }
    },
    {
      title: "結束日期",
      dataIndex: "end_date",
      key: "end_date",
      sorter: {
        compare: (a, b) => a.end_date - b.end_date
      },
      render: (time) => {
        const localTime = toLocalTime(time);
        return <p>{localTime}</p>;
      }
    },
    {
      title: "操作",
      key: "action",
      render: (_, coupon) => (
        <Space>
          <Button type="primary" onClick={() => handleEdit(false, coupon)}>
            編輯
          </Button>
          <Button
            // icon={<DeleteOutlined />}
            type="primary"
            danger
            onClick={() => {
              deleteCoupon(coupon.coupon_id, coupon.name, coupon.code);
            }}
          >
            <DeleteOutlined style={{ verticalAlign: "0.1rem" }} />
          </Button>
        </Space>
      )
    }
  ];
  const toLocalTime = (time) => {
    const date = new Date(time);
    return date.toLocaleString();
  };
  const getCoupons = () => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/api/admin/coupon`)
      .then((res) => {
        if (res.data.success) {
          console.log("coupon res", res);
          setCoupons(res.data.data);
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const handleEdit = (isNew, coupon) => {
    if (isNew) {
      setIsCouponNew(true);
      setSelectedCoupon(null);
      setSelectedCouponChange(null);
      setIsModalVisible(true);
    } else {
      setIsCouponNew(false);
      setSelectedCoupon(coupon);
      setSelectedCouponChange(coupon);
      setIsModalVisible(true);
    }
  };

  // 按下ok
  const saveModal = () => {
    let status;
    if (isCouponNew) {
      status = "新增";
    } else {
      status = "更新";
    }
    Modal.success({
      title: `${status}優惠券`,
      content: `確定要${status}優惠券嗎?`,
      closable: true,
      maskClosable: true,
      okText: "確定",
      okButtonProps: {
        onClick: confirmUpdate,
        type: "primary"
      }
    });
  };
  // 按下cancel
  const closeModal = () => {
    setIsModalVisible(false);
  };

  // ok確認modal
  const confirmUpdate = () => {
    const {
      name,
      code,
      discount_rate,
      discount_algorithm,
      description,
      usage_limit,
      start_date,
      end_date
    } = selectedCouponChange;
    const data = {
      name: name,
      code: code,
      discount_rate: discount_rate,
      discount_algorithm: discount_algorithm,
      description: description,
      usage_limit: usage_limit,
      start_date: start_date,
      end_date: end_date
    };
    let api = `${process.env.REACT_APP_API_URL}/api/admin/coupon`;
    let reqMethod = "post";

    if (!isCouponNew) {
      const couponId = selectedCoupon.coupon_id;
      api = `${process.env.REACT_APP_API_URL}/api/admin/coupon/${couponId}`;
      reqMethod = "put";
    }

    axios[reqMethod](api, data)
      .then((res) => {
        setSelectedCoupon(null);
        setSelectedCouponChange(null);
        getCoupons();
        Modal.destroyAll();
        setIsModalVisible(false);
        if (res.data.success) {
          messageApi.success(`優惠券${isCouponNew ? "新增" : "更新"}成功`);
        } else {
          messageApi.error(`優惠券${isCouponNew ? "新增" : "更新"}失敗`);
        }
      })
      .catch((err) => {
        console.log(err);
        messageApi.error("伺服器錯誤");
      });
  };

  const deleteCoupon = (id, name, code) => {
    Modal.error({
      title: "刪除",
      content: (
        <>
          <p className="fs-4 fw-bold">確定要刪除優惠券嗎?</p>
          <p>
            優惠代碼: <span className="text-danger">{code}</span>
          </p>
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
            .delete(`${process.env.REACT_APP_API_URL}/api/admin/coupon/${code}`)
            .then((res) => {
              Modal.destroyAll();
              if (res.data.success) {
                messageApi.success("優惠券刪除成功");
              } else {
                messageApi.error("優惠券刪除錯誤");
              }
              getCoupons();
            })
            .catch((err) => {
              console.log(err);
              messageApi.error("伺服器錯誤");
            });
        }
      }
    });
  };
  useEffect(() => {
    getCoupons();
  }, []);
  return (
    <>
      {contextHolder}
      <div className="coupon_table">
        <button className="btn btn-primary mb-2" onClick={handleEdit}>
          新增優惠券
        </button>
        <Table dataSource={coupons} columns={columns} rowKey="coupon_id" />
        <CouponModal
          visible={isModalVisible}
          onCancel={closeModal}
          onSave={saveModal}
          couponDataOrigin={selectedCoupon}
          couponData={selectedCouponChange}
          setCouponData={setSelectedCouponChange}
        />
      </div>
    </>
  );
};

export default CouponManagement;
