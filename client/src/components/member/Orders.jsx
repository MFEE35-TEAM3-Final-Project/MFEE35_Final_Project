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
  const [expanded, setExpanded] = useState(false);

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
    setExpanded(!expanded);
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
                  <div className=" order-detail row">
                    <div className="col-4 ">
                      <h1 className="status">{order.status}</h1>
                    </div>
                    <div className="col-8 ">
                      <h3>商品數量：{order.total_quantity}</h3>
                      <h3>訂單金額：{order.total_price}</h3>
                    </div>

                    <div>
                      {expandedOrderId === order.order_id && (
                        <div className="order-item expanded mt-3">
                          <div className="row">
                            <h3 className="col-9">寄送地址 : {order.shipping_address}</h3>
                          </div>
                          <div>
                            <h3>付款方式 : {order.payment_method}</h3>
                            <h3>訂單編號 : {order.order_id}</h3>
                          </div>
                        </div>
                      )}
                    </div>

                  </div>
                  <a className=" order_list row" href={`/goods/${order.order_details[0].productid}/${order.order_details[0].activityId}/${order.order_details[0].food_id}`}>
                    <img
                      className="col-4"
                      src={order.order_details[0].image[0]}
                      alt={order.order_details[0].name}
                    />

                    <div className="col-8 row">
                      <h2>{order.order_details[0].name}</h2>
                      <h4>${order.order_details[0].price} x {order.order_details[0].quantity}</h4>

                      <button onClick={(event) => {
                        event.preventDefault();
                      }}
                        className="buybutton offset-8 col-3">再買一次</button>
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
                            <div className="col-8 row">
                              <h2>{detail.name}</h2>
                              <h4>${detail.price} x {detail.quantity}</h4>
                              <button onClick={(event) => {
                                event.preventDefault();
                              }} className="buybutton offset-8 col-3">再買一次</button>
                            </div>
                          </a>
                        </div>
                      ))}
                  </div>
                  {order.order_details.length > 1 ?
                    <button className="expand-button" onClick={() => toggleOrderDetails(order.order_id)} >
                      {expanded ? '收回細節' : '展開細節'}
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
