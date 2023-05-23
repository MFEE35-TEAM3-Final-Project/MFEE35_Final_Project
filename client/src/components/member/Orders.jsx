import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../../styles/member/orders.css";
import MemberHeader from "./MemberHeader";
// Cookie
import Cookies from "js-cookie";


function Orders() {
  const [data, setData] = useState([]);
  const [expandedOrderId, setExpandedOrderId] = useState(null);
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
      setExpandedOrderId(response.data.data[0]?.order_id || null);
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
      <ToastContainer />
      {Array.isArray(data) && data.length > 0 ? (
        <div className="order-container ">
          {data.map((order, index) => (
            <div
              key={index}
              className={`order-item ${expandedOrderId === order.order_id ? "expanded " : ""
                }`}
            >

              {order.order_details.length > 0 && (

                <div className="order-detail-item row">
                  <div className="col-12 order-detail">
                    <h1 className="status">訂單狀態：{order.status}</h1>
                    <p>商品數量：{order.total_quantity}</p>
                    <p>訂單金額：{order.total_price}</p>
                    {expandedOrderId === order.order_id && (
                      <div className="order-item expanded">
                        <p>寄送資訊</p>
                      </div>
                    )}
                  </div>
                  <a className=" order_list row" href={`/goods/${order.order_details[0].productid}/${order.order_details[0].activityId}/${order.order_details[0].food_id}`}>
                    <img
                      className="col-4"
                      src={order.order_details[0].image[0]}
                      alt={order.order_details[0].name}
                    />

                    <div className="col-8">
                      <h2>{order.order_details[0].name}</h2>
                      <p>x{order.order_details[0].quantity}</p>
                      <p>${order.order_details[0].price}</p>
                      <button>再買一次</button>
                    </div>
                  </a>
                  <div
                    className={` ${expandedOrderId === order.order_id ? "expanded order-detail-item-product" : ""
                      }`}
                  >
                    {expandedOrderId === order.order_id &&
                      order.order_details.slice(1).map((detail, detailIndex) => (
                        <div key={detailIndex} className="row order-detail-item-product">
                          <a className=" order_list row" href={`/goods/${detail.productid}/${detail.activityId}/${detail.food_id}`}>
                            <img className="col-4" src={detail.image[0]} alt={detail.name} />
                            <div className="col-8">
                              <h2>{detail.name}</h2>
                              <p>x{detail.quantity}</p>
                              <p>${detail.price}</p>
                              <button>再買一次</button>
                            </div>
                          </a>
                        </div>
                      ))}
                  </div>
                  {order.order_details.length > 1 ? <button className="order-detail-item expand-button" onClick={() => toggleOrderDetails(order.order_id)} > 展開
                  </button> : <span></span>}
                </div>


              )}
            </div>

          ))}
        </div>
      ) : (
        <p>沒有可用的訂單資料。</p>
      )
      }
    </div >

  );
}

export default Orders;
