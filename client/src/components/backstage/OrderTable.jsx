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
// // 訂單進度條
// const OrderStatusProgress = ({ status }) => {
//   let progressStatus;
//   let percent;

//   switch (status) {
//     case "unpaid":
//       progressStatus = "";
//       percent = 25;
//       break;
//     case "paid":
//       progressStatus = "active";
//       percent = 50;
//       break;
//     case "shipping":
//       progressStatus = "active";
//       percent = 75;
//       break;
//     case "completed":
//       progressStatus = "success";
//       percent = 100;
//       break;
//     case "cancel":
//       progressStatus = "exception";
//       percent = 0;
//       break;
//     default:
//       progressStatus = "normal";
//       percent = 0;
//   }

//   return (
//     <div>
//       <Progress percent={percent} status={progressStatus} />
//     </div>
//   );
// };

const OrderManagement = () => {
  const [orders, setOrders] = useState(null);
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
            className="status_tag p-2"
            icon={React.cloneElement(statusTag.icon, {
              style: { verticalAlign: "0.1rem" }
            })}
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
      .get(`${process.env.REACT_APP_API_URL}/api/admin/orders`)
      .then((res) => {
        if (res.data.success) {
          console.log("order res", res);
          setOrders(res.data.data);
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
      .put(
        `${process.env.REACT_APP_API_URL}/api/admin/orders/${orderId}`,
        updateData
      )
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
      <Table dataSource={orders} columns={columns} rowKey="order_id" />

      <Modal
        id="order_modal"
        title={`訂單詳細情況   ${selectedOrder && selectedOrder.order_id}`}
        open={isModalVisible}
        onCancel={handleModalCancel}
        onOk={() => {
          updateModal();
        }}
        okButtonProps={{
          disabled: selectedOrder === selectedOrderChange
        }}
        bodyStyle={{ maxHeight: "70vh", overflowY: "auto" }}
        width={1200}
        maskClosable={selectedOrder === selectedOrderChange}
      >
        {selectedOrder && (
          <Descriptions bordered>
            <Descriptions.Item label="購買人ID">
              {selectedOrderChange.user_id || "非會員 :("}
            </Descriptions.Item>
            <Descriptions.Item label="購買人姓名">
              {selectedOrderChange.name}
            </Descriptions.Item>
            <Descriptions.Item label="購買人Email">
              {selectedOrderChange.email}
            </Descriptions.Item>
            <Descriptions.Item label="購買人電話">
              {selectedOrderChange.phone}
            </Descriptions.Item>
            <Descriptions.Item label="付款方式">
              {selectedOrderChange.payment_method}
            </Descriptions.Item>
            <Descriptions.Item label="運送方式">
              {selectedOrderChange.shipping_method}
            </Descriptions.Item>
            <Descriptions.Item label="訂單成立時間">
              {toLocalTime(selectedOrderChange.create_time)}
            </Descriptions.Item>
            <Descriptions.Item label="運送地址" span={2}>
              {selectedOrderChange.shipping_address}
            </Descriptions.Item>
            <Descriptions.Item label="訂單狀態" span={3}>
              <Radio.Group
                onChange={orderStatusChange}
                value={selectedOrderChange.status}
              >
                <Radio value="unpaid">未付款</Radio>
                <Radio value="paid">已付款待出貨</Radio>
                <Radio value="shipping">出貨中</Radio>
                <Radio value="completed">完成</Radio>
                <Radio value="cancel">取消</Radio>
              </Radio.Group>
            </Descriptions.Item>
            <Descriptions.Item label="優惠券">
              {selectedOrderChange.coupon_code || "未使用"}
            </Descriptions.Item>
            <Descriptions.Item label="折扣金額">-</Descriptions.Item>
            <Descriptions.Item label="總金額">
              <span className="text-danger">
                $ {parseInt(selectedOrderChange.total_price, 10)}
              </span>
            </Descriptions.Item>
            <Descriptions.Item label="購買商品">
              <div className="detail_list">
                {selectedOrderChange.order_details.map((product) => (
                  <div className="detail_item" key={product.detail_id}>
                    <div>
                      <div className="img_container">
                        <Image width={150} src={product.image[0]} />
                      </div>
                      <div>
                        <p>名稱: {product.name}</p>
                        <p>
                          數量:
                          <span className="fw-bold">{product.quantity}</span>
                        </p>
                        <p>
                          單價:
                          <span className="fw-bold">
                            {parseInt(product.price)}
                          </span>
                        </p>
                        <p>
                          總價:
                          <span className="fw-bold text-danger">
                            {product.price * product.quantity}
                          </span>
                        </p>
                      </div>
                    </div>
                    <hr />
                  </div>
                ))}
              </div>
            </Descriptions.Item>
          </Descriptions>
        )}
      </Modal>
    </div>
  );
};

export default OrderManagement;
