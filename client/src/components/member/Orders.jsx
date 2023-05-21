import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../../styles/member/orders.css";
import MemberHeader from "./MemberHeader";

// Cookie
import Cookies from "js-cookie";

// import MemberHeader from './MemberHeader';

function Orders() {
  const [data, setData] = useState([]);
  const [expandedOrderId, setExpandedOrderId] = useState(null); // 追踪展开的订单ID
  const [error, setError] = useState(null);
  const [hasFetched, setHasFetched] = useState(false);

  useEffect(() => {
    if (!hasFetched) {
      fetchOrderlist();
    }
  }, [hasFetched]);

  const fetchOrderlist = async () => {
    try {
      var jwtToken = Cookies.get("jwtToken");
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/user/orders`,
        {
          headers: {
            Authorization: jwtToken,
          },
        }
      );
      console.log(response);
      setData(response.data.data || []);
      setExpandedOrderId(response.data.data[0]?.order_id || null); // 设置展开的订单ID为第一笔订单的ID
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      setHasFetched(true);
    }
  };

  const toggleOrderDetails = (orderId) => {
    setExpandedOrderId((prevOrderId) =>
      prevOrderId === orderId ? null : orderId
    );
  };

  return (
    <div>
      <MemberHeader />
      {/* <MemberHeader/> */}
      <ToastContainer />
      {Array.isArray(data) && data.length > 0 ? (
        <div className="order-container">
          {data.map((order, index) => (
            <div
              key={index}
              className={`order-item ${
                expandedOrderId === order.order_id ? "expanded" : ""
              }`}
            >
              <div className="order-header">
                {order.order_details.length > 0 && (
                  <div className="order-detail-item">
                    <img
                      src={order.order_details[0].image[0]}
                      alt={order.order_details[0].name}
                    />
                    <p>產品名稱：{order.order_details[0].name}</p>
                    <p>數量：{order.order_details[0].quantity}</p>
                  </div>
                )}
                <div
                  className={`order-details ${
                    expandedOrderId === order.order_id ? "expanded" : ""
                  }`}
                >
                  {expandedOrderId === order.order_id &&
                    order.order_details.map((detail, detailIndex) => (
                      <div key={detailIndex} className="order-detail-item">
                        <p>產品名稱：{detail.name}</p>
                        <p>數量：{detail.quantity}</p>
                        <img src={detail.image[0]} alt={detail.name} />
                        {/* 顯示其他訂單詳細資訊 */}
                      </div>
                    ))}
                </div>
                <div
                  className="expand-button"
                  onClick={() => toggleOrderDetails(order.order_id)}
                >
                  展開
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>沒有可用的訂單資料。</p>
      )}
    </div>
  );
}

export default Orders;
