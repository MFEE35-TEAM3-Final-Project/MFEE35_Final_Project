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
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [selectedOrderChange, setSelectedOrderChange] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  // 表格欄位設定
  const columns = [
    {
      title: "訂單編號",
      dataIndex: "order_id",
      key: "order_id"
    },
    {
      title: "訂單日期",
      dataIndex: "create_time",
      key: "create_time",
      render: (time) => {
        const localTime = toLocalTime(time);
        return <p>{localTime}</p>;
      }
    },
    {
      title: "訂單狀態",
      dataIndex: "status",
      key: "status",
      render: (status) => {
        const statusTag = statusConfig(status);
        return (
          <Tag
            className="status_tag"
            icon={statusTag.icon}
            color={statusTag.color}
          >
            {statusTag.text}
          </Tag>
        );
      }
    },
    {
      title: "優惠券",
      dataIndex: "coupon_code",
      key: "coupon_code"
    },
    {
      title: "購買人",
      dataIndex: "email",
      key: "email"
    },
    {
      title: "操作",
      key: "action",
      render: (_, record) => (
        <Button type="primary" onClick={() => handleEdit(record)}>
          編輯
        </Button>
      )
    }
  ];

  const getOrder = () => {
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
  const handleEdit = (order) => {
    setSelectedOrder(order);
    setSelectedOrderChange(order);
    setIsModalVisible(true);
  };
  const handleModalCancel = () => {
    if (selectedOrder === selectedOrderChange) {
      setSelectedOrder(null);
      setSelectedOrderChange(null);
      setIsModalVisible(false);
    } else {
      warningModal();
    }
  };

  const orderStatusChange = (e) => {
    setSelectedOrderChange({
      ...selectedOrderChange,
      status: e.target.value
    });
  };
  // 確認離開
  const confirmClose = () => {
    setSelectedOrder(null);
    setSelectedOrderChange(null);
    Modal.destroyAll();
    setIsModalVisible(false);
  };

  const confirmUpdate = () => {
    const orderId = selectedOrderChange.order_id;
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
    } = selectedOrderChange;
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
        setSelectedOrder(null);
        setSelectedOrderChange(null);
        getOrder();
        Modal.destroyAll();
        setIsModalVisible(false);
      })
      .catch((err) => {
        console.error(err);
        setSelectedOrder(null);
        setSelectedOrderChange(null);
        getOrder();
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
    getOrder();
  }, []);
  return (
    <div className="order_table">
      {/* <Table dataSource={orders} columns={columns} rowKey="order_id" /> */}
    </div>
  );
};

export default CouponManagement;
