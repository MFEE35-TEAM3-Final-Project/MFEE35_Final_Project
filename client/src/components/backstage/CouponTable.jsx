import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Space,
  Table,
  Modal,
  Button,
  Progress,
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

// status config
const statusConfig = (status) => {
  switch (status) {
    case "unpaid":
      return {
        icon: <ExclamationCircleOutlined />,
        color: "default",
        text: "未付款"
      };
    case "paid":
      return {
        icon: <ClockCircleOutlined />,
        color: "warning",
        text: "已付款 待出貨"
      };
    case "shipping":
      return {
        icon: <SyncOutlined spin />,
        color: "processing",
        text: "已出貨"
      };
    case "completed":
      return {
        icon: <CheckCircleOutlined />,
        color: "success",
        text: "完成"
      };
    case "cancel":
      return {
        icon: <CloseCircleOutlined />,
        color: "error",
        text: "已取消"
      };
    default:
      return {
        icon: <MinusCircleOutlined />,
        color: "default",
        text: "錯誤"
      };
  }
};

const CouponManagement = () => {
  const [coupons, setCoupons] = useState(null);
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
          <Button
            type="primary"
            onClick={() => handleEdit(false, coupon.coupon_id)}
          >
            編輯
          </Button>
          <Button
            // icon={<DeleteOutlined />}
            type="primary"
            danger
            onClick={() => {
              deleteModal(coupon.coupon_id, coupon.name);
            }}
          >
            <DeleteOutlined style={{ verticalAlign: "0.1rem" }} />
          </Button>
        </Space>
      )
    }
  ];

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
  const toLocalTime = (time) => {
    const date = new Date(time);
    return date.toLocaleString();
  };
  const handleEdit = (coupon) => {
    setSelectedCoupon(coupon);
    setSelectedCouponChange(coupon);
    setIsModalVisible(true);
  };
  const deleteModal = () => {
    console.log("dellllll!");
  };
  const handleModalCancel = () => {
    if (selectedCoupon === selectedCouponChange) {
      setSelectedCoupon(null);
      setSelectedCouponChange(null);
      setIsModalVisible(false);
    } else {
      warningModal();
    }
  };

  const orderStatusChange = (e) => {
    setSelectedCouponChange({
      ...selectedCouponChange,
      status: e.target.value
    });
  };
  // 確認離開
  const confirmClose = () => {
    setSelectedCoupon(null);
    setSelectedCouponChange(null);
    Modal.destroyAll();
    setIsModalVisible(false);
  };

  const confirmUpdate = () => {
    const couponId = selectedCouponChange.coupon_id;
    const {
      user_id,
      phone,
      name,
      coupon_code,
      total_quantity,
      total_price,
      payment_method,
      shipping_method,
      shipping_address,
      ship_store,
      status
    } = selectedCouponChange;
    const updateData = {
      user_id,
      phone,
      name,
      coupon_code,
      total_quantity,
      total_price,
      payment_method,
      shipping_method,
      shipping_address,
      ship_store,
      status
    };
    axios
      .put(`${process.env.REACT_APP_API_URL}/api/admin/coupon`, updateData)
      .then((res) => {
        setSelectedCoupon(null);
        setSelectedCouponChange(null);
        getCoupons();
        Modal.destroyAll();
        setIsModalVisible(false);
      })
      .catch((err) => {
        console.error(err);
        setSelectedCoupon(null);
        setSelectedCouponChange(null);
        getCoupons();
        Modal.destroyAll();
        setIsModalVisible(false);
      });
  };

  const warningModal = () => {
    Modal.warning({
      title: "放棄更變",
      content: "確定要放棄更變嗎?",
      closable: true,
      maskClosable: true,
      okText: "確認放棄",
      okButtonProps: {
        danger: true,
        onClick: confirmClose,
        type: "primary"
      }
    });
  };
  const updateModal = () => {
    Modal.success({
      title: "更新資料",
      content: "確定要更新資料嗎?",
      closable: true,
      maskClosable: true,
      okText: "更新資料",
      okButtonProps: {
        onClick: confirmUpdate,
        type: "primary"
      }
    });
  };
  useEffect(() => {
    getCoupons();
  }, []);
  return (
    <div className="coupon_table">
      <Table dataSource={coupons} columns={columns} rowKey="coupon_id" />
    </div>
  );
};

export default CouponManagement;
