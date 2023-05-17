import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../../styles/member/orders.css';
// import MemberHeader from './MemberHeader';

function Orders() {
  const [data, setData] = useState([]);
  const [expandedOrderId, setExpandedOrderId] = useState(null); // 追踪展開的訂單ID
  const [error, setError] = useState(null);
  const [hasFetched, setHasFetched] = useState(false);

  useEffect(() => {
    if (!hasFetched) {
      fetchOrderlist();
    }
  }, [hasFetched]);

  const fetchOrderlist = async () => {
    try {
      var jwtToken = document.cookie.split('=')[1].trim();
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/user/orders`, {
        headers: {
          Authorization: jwtToken,
        },
      });
      console.log(response);
      setData(response.data.data || []);
      setHasFetched(true);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const toggleOrderDetails = (orderId) => {
    setExpandedOrderId((prevOrderId) => (prevOrderId === orderId ? null : orderId));
  };

  return (
    <div>
      {/* <MemberHeader/> */}
      <ToastContainer />
      {Array.isArray(data) && data.length > 0 ? (
        <div className="order-container">
          {data.map((order, index) => (
            <div key={index} onClick={() => toggleOrderDetails(order.order_id)} className={`order-item ${expandedOrderId === order.order_id ? 'expanded' : ''}`}>
              <div className="order-header" >
                <p>訂單編號：{order.order_id}</p>
                <p>金額：{order.total_price}</p>
                {/* 顯示其他訂單相關資訊 */}
              </div>
              {expandedOrderId === order.order_id && (
                <div className="order-details">
                  {order.order_details.map((detail, detailIndex) => (
                    <div key={detailIndex} className="order-detail-item">
                      <p>產品名稱：{detail.name}</p>
                      <p>數量：{detail.quantity}</p>
                      <img src="{detail.image}"/>
                      {/* 顯示其他訂單詳細資訊 */}
                    </div>
                  ))}
                </div>
              )}
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
