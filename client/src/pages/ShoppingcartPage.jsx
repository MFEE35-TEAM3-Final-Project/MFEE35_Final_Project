import React, { Fragment, useEffect, useState, useRef } from "react";
import axios from "axios";
import { Helmet } from "react-helmet";
import "../styles/shoppingcart.css";
import cityCountryData from "../json/CityCountyData.json";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import Nav from "../components/Nav";
import Cookies from "js-cookie";

const ShoppingcartPage = () => {
  // 會員驗證的TOKEN
  const token = Cookies.get("jwtToken");
  const cartData = Cookies.get("cartData");

  const [userInfo, setUserInfo] = useState(null);
  // -----------------------------------------------------
  const [incomingDatas, setIncomingData] = useState([]);
  const [activityInfo, setActivityInfo] = useState([]);

  //  最初渲染網頁的function
  useEffect(() => {
    const fetchData = async () => {
      const orderId = Cookies.get("orderId");
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_API_URL}/api/activity/getActivity`
        );
        setActivityInfo(res.data);
      } catch (error) {
        console.error(error);
      }
      if (token) {
        try {
          const res = await axios.get(
            `${process.env.REACT_APP_API_URL}/api/user/cart`
          );
          if (res.data.data.length !== 0) {
            setIncomingData(res.data.data);
            const response = await axios.post(
              `${process.env.REACT_APP_API_URL}/api/user/check`,
              token
            );
            // console.log(response.data.user);
            setUserInfo(response.data.user);
          } else {
            toast.warning("購物車沒有資料");
          }
        } catch (err) {
          console.error(err);
        }
      } else if (cartData) {
        const userCartData = JSON.parse(cartData);
        const quantityTracker = {};

        const promises = userCartData.map((cartData) => {
          const cartProductId = cartData.productid;
          quantityTracker[cartProductId] = cartData.quantity;
          return axios.get(
            `${process.env.REACT_APP_API_URL}/api/product/getProductsById?productId=${cartProductId}`
          );
        });

        try {
          const responses = await Promise.all(promises);
          const data = responses.reduce((accumulator, res, index) => {
            if (res) {
              const productData = res.data[0];
              productData.quantity =
                quantityTracker[userCartData[index].productid];
              accumulator.push(productData);
            }
            return accumulator;
          }, []);
          setIncomingData(data);
        } catch (error) {
          console.error(error);
        }
      } else if (orderId) {
        toast.success("已送出訂單");
      } else {
        toast.warning("購物車沒有資料");
      }
    };

    fetchData();
  }, []);

  // -----------------------------------------------------

  // 處理地址JSON的function
  const cityList = cityCountryData;
  const [selectedCity, setSelectedCity] = useState("請選擇縣市");
  const [selectedTownship, setSelectedTownship] = useState("請先選擇縣市");
  const [selectedCityData, setSelectedCityData] = useState({});
  const [detailAddress, setDetailAddress] = useState("");
  const handleCityChange = (event) => {
    const selectedCity = event.target.value;
    setSelectedCity(selectedCity);
    setSelectedTownship("");
  };
  const handleTownshipChange = (event) => {
    const selectedTownship = event.target.value;
    setSelectedTownship(selectedTownship);
  };
  const renderedOptions = selectedCityData.AreaList
    ? selectedCityData.AreaList.map((township, index) => (
        <option key={index} value={township.AreaName}>
          {township.AreaName}
        </option>
      ))
    : null;
  useEffect(() => {
    const allAddress = selectedCity + selectedTownship + detailAddress;
    if (allAddress) {
      order.shipping_address = allAddress;
    }
  }, [selectedCity, selectedTownship, detailAddress]);

  useEffect(() => {
    const selectedCityData =
      cityList.find((city) => city.CityName === selectedCity) || {};
    setSelectedCityData(selectedCityData);
  }, [selectedCity, cityList]);

  // -----------------------------------------------------

  // 更改商品數量的function
  const handleQuantityChange = async (cart_id, newQuantity, productid) => {
    try {
      if (token) {
        if (newQuantity < 1) {
          toast.warning("購物車數量不得低於 1");
          return;
        }

        await axios.put(
          `${process.env.REACT_APP_API_URL}/api/user/cart/update`,
          {
            cart_id,
            quantity: newQuantity,
          }
        );

        const updatedData = incomingDatas.map((item) => {
          if (item.cart_id === cart_id) {
            return {
              ...item,
              quantity: newQuantity,
            };
          }
          return item;
        });
        setIncomingData(updatedData);
      }

      if (cartData) {
        const expires = 7;
        const userCartDatas = JSON.parse(cartData);
        const targetIndex = incomingDatas.findIndex(
          (item) => item.productid === productid
        );
        const targetCookie = userCartDatas.findIndex(
          (item) => item.productid === productid
        );

        if (targetIndex !== -1) {
          if (newQuantity < 1) {
            toast.warning("購物車數量不得低於 1");
            return;
          }

          const updatedData = [...incomingDatas];
          updatedData[targetIndex].quantity = newQuantity;
          setIncomingData(updatedData);

          const updatedCookieData = [...userCartDatas];
          updatedCookieData[targetCookie].quantity = newQuantity;
          const updatedCookie = JSON.stringify(updatedCookieData);
          Cookies.set("cartData", updatedCookie, { expires });
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  // 刪除商品的function
  const handleDelete = async (id, productid) => {
    try {
      if (token) {
        // 發送刪除請求
        await axios.delete(
          `${process.env.REACT_APP_API_URL}/api/user/cart/${id}`
        );
        toast.warning("已刪除該商品");
        const updatedData = incomingDatas.filter((item) => item.cart_id !== id);
        setIncomingData(updatedData);
        if (updatedData.length === 0) {
          setUserAddingCartPrice(0);
        }
      } else if (cartData) {
        const expires = 7;
        const userCartDatas = JSON.parse(cartData);
        const updatedCookieData = userCartDatas.filter(
          (item) => item.productid !== productid
        );
        if (updatedCookieData.length === 0) {
          // 如果 updatedCookieData 的長度為 0，則刪除 cartData
          Cookies.remove("cartData");
        } else {
          const updatedCookie = JSON.stringify(updatedCookieData);
          Cookies.set("cartData", updatedCookie, { expires });
        }
        toast.warning("已刪除該商品");
        const updatedData = incomingDatas.filter(
          (item) => item.productid !== productid
        );
        setIncomingData(updatedData);
        if (updatedData.length === 0) {
          setUserAddingCartPrice(0);
        }
      }
    } catch (error) {
      console.log(id);
      console.log(error);
    }
  };

  // -----------------------------------------------------
  // 頁面第四部分的隱藏選單
  const [hideDiscount, setHideDiscount] = useState(true);
  const [hideShoppingCart, setHideShoppingCart] = useState(true);
  const openDiscount = () => {
    setHideDiscount((prevState) => !prevState);
  };
  const openShoppingCart = () => {
    setHideShoppingCart((prevState) => !prevState);
  };

  // -----------------------------------------------------

  // 訂單細節的金額需下判斷式
  const [code, setCode] = useState("");
  const [coupons, setCoupons] = useState([]);
  const [callCouponApi, setCallCouponApi] = useState(false);
  const [couponApplied, setCouponApplied] = useState(false);
  const [popCuppon, setPopCuppon] = useState(true);
  const [couponInfo, setCouponInfo] = useState(null);

  // -----------------------------------------------------
  const [warning, setWarning] = useState(false);
  const [order, setOrder] = useState({
    phone: "",
    name: "",
    email: "",
    coupon_code: "",
    total_quantity: 0,
    total_price: 0,
    payment_method: "信用卡付款",
    shipping_address: "",
    ship_store: "導入超商介面",
    order_details: null,
  });

  const [tempOrder, setTempOrder] = useState({ ...order }); // 创建临时状态来存储用户输入的临时值

  const updateOrder = (event) => {
    const { name, value } = event.target;
    setTempOrder((prevTempOrder) => ({
      ...prevTempOrder,
      [name]: value,
    }));
  };

  const handleConfirm = () => {
    setOrder(tempOrder);
  };

  useEffect(() => {
    if (tempOrder.email || tempOrder.name || tempOrder.phone) {
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const namePattern = /^[\u4E00-\u9FFFa-zA-Z]{1,10}$/;
      const phonePattern = /^\d{10}$/;

      if (!emailPattern.test(tempOrder.email)) {
        setOrder((prevOrder) => ({
          ...prevOrder,
          email: "",
        }));
        setWarning(true);
        return;
      }
      handleConfirm();
      if (!namePattern.test(tempOrder.name) || tempOrder.name.length > 10) {
        setOrder((prevOrder) => ({
          ...prevOrder,
          name: "",
        }));
        setWarning(true);
        return;
      }
      handleConfirm();
      if (!phonePattern.test(tempOrder.phone)) {
        setOrder((prevOrder) => ({
          ...prevOrder,
          phone: "",
        }));
        setWarning(true);
        return;
      }
      setWarning(false);
    }
  }, [tempOrder]);

  const userPushOrder = async () => {
    try {
      if (
        order.phone !== "" &&
        order.name !== "" &&
        order.email !== "" &&
        order.order_details !== null
      ) {
        if (token) {
          const response = await axios.post(
            `${process.env.REACT_APP_API_URL}/api/user/orders`,
            order,
            {
              headers: {
                Authorization: token,
              },
            }
          );
          const orderId = response.data.orderId;

          Cookies.set("orderId", orderId, { expires: 1 });
          Cookies.set("userPhone", order.phone, { expires: 1 });
          Cookies.set("userEmail", order.email, { expires: 1 });
        } else {
          const response = await axios.post(
            `${process.env.REACT_APP_API_URL}/api/orders/order`,
            order
          );
          if (cartData) {
            Cookies.remove("cartData");
          }
          const orderId = response.data.orderId;

          Cookies.set("orderId", orderId, { expires: 1 });
          Cookies.set("userPhone", order.phone, { expires: 1 });
          Cookies.set("userEmail", order.email, { expires: 1 });
        }

        setIncomingData([]);
        toast.success("已成功送出訂單");
      } else {
        toast.warning("資料尚未完整填入");
      }
    } catch (error) {
      console.log(error);
      console.log(order);
    }
  };

  //  儲存get到的購物車物件 => map()
  const [userAddingCartInformation, setUserAddingCartInformation] = useState(0);
  //  判斷是否有活動後 累加的總金額
  const [userAddingCartPrice, setUserAddingCartPrice] = useState(0);
  // 活動折扣總金額
  const [userAddingCartDiscount, setUserAddingCartDiscount] = useState(0);
  // 優惠券折價金額
  const [totalCouponPrice, setTotalCouponPrice] = useState(0);
  // 沒有活動也沒有優惠券的金額
  const [userAddingCartOgPrice, setUserAddingCartOgPrice] = useState(0);
  // 總共的折價金額 活動＋優惠
  const [finalTotalDiscount, setFinalTotalDiscount] = useState(0);

  useEffect(() => {
    if (incomingDatas !== null) {
      let totalCheckingActivityPrice = 0;
      let totalDiscount = 0;
      let totalOgPrice = 0;
      let totalMapCouponPrice = 0;
      let finalMapTotalDiscount = 0;

      const calculatePrices = (incomingData) => {
        const { activityId, afterPrice, price, quantity, discountedPrice } =
          incomingData;

        const checkingActivityPrice =
          activityId !== 0
            ? Math.floor(afterPrice * quantity)
            : Math.floor(parseInt(price) * quantity);
        const checkDiscount =
          activityId !== 0 ? Math.floor(discountedPrice * quantity) : 0;
        const checkOgPrice = Math.floor(price * quantity);

        totalCheckingActivityPrice += checkingActivityPrice;
        totalDiscount += checkDiscount;
        totalOgPrice += checkOgPrice;

        return {
          checkingActivityPrice,
          checkDiscount,
          checkOgPrice,
        };
      };

      const updatedUserAddingCartInformation = incomingDatas.map(
        (incomingData, index) => {
          const workPlace = activityInfo.map((activity, activityIndex) => {
            if (incomingData.activityId === activity.activityId) {
              if (activity.activityId === "1") {
                return (
                  <span className="goodInActivityTitleOne" key={activityIndex}>
                    {activity.activityName}
                  </span>
                );
              } else if (activity.activityId === "2") {
                return (
                  <span className="goodInActivityTitleTwo" key={activityIndex}>
                    {activity.activityName}
                  </span>
                );
              }
            }
            return null;
          });

          const { checkingActivityPrice, checkDiscount, checkOgPrice } =
            calculatePrices(incomingData);

          setUserAddingCartDiscount(totalDiscount);
          setUserAddingCartPrice(totalCheckingActivityPrice);
          setUserAddingCartOgPrice(totalOgPrice);

          if (couponInfo) {
            const checkMapCouponPrice =
              checkingActivityPrice -
              Math.floor(checkingActivityPrice * couponInfo.discount_rate);

            const checkMapTotalDiscount =
              Math.floor(incomingData.discountedPrice * incomingData.quantity) +
              checkingActivityPrice -
              Math.floor(checkingActivityPrice * couponInfo.discount_rate);

            totalMapCouponPrice += checkMapCouponPrice;
            finalMapTotalDiscount += checkMapTotalDiscount;
          }

          return (
            <Fragment key={index}>
              <div className="cartSection">
                <div className="goodGroup">
                  <div>
                    <img
                      className="goodPic"
                      src={incomingData.image[0]}
                      alt="第一個商品圖"
                    />
                  </div>
                  <div className="goodText">
                    <br />
                    {workPlace}
                    <p className="goodName">{incomingData.name}</p>
                    <br />
                    <br />
                    <span className="goodPrice">
                      NT$ {incomingData.afterPrice}
                    </span>
                    <span className="goodSprice">NT$ {incomingData.price}</span>
                  </div>
                </div>

                <div className="goodGroupTwo">
                  <div className="buttonGroup">
                    <div>
                      <button
                        id="decreaseBtn"
                        onClick={() =>
                          handleQuantityChange(
                            incomingData.cart_id,
                            incomingData.quantity - 1,
                            incomingData.productid
                          )
                        }
                      >
                        一
                      </button>
                      <input
                        type="text"
                        value={incomingData.quantity}
                        readOnly
                        id="addingGoods"
                      />
                      <button
                        id="increaseBtn"
                        onClick={() =>
                          handleQuantityChange(
                            incomingData.cart_id,
                            incomingData.quantity + 1,
                            incomingData.productid
                          )
                        }
                      >
                        十
                      </button>
                    </div>
                    <p className="bigPrice">
                      NT$ &nbsp;
                      <span id="addingGoodsPrice">
                        {couponInfo
                          ? Math.floor(
                              checkingActivityPrice * couponInfo.discount_rate
                            )
                          : checkingActivityPrice}
                      </span>
                    </p>
                    {incomingData.activityId !== 0 && (
                      <span className="inCouponTitle">
                        已折扣
                        <span className="cartCoupon">
                          &nbsp; NT$&nbsp; {checkDiscount}&nbsp;
                        </span>
                      </span>
                    )}
                    <br />
                    {couponInfo && (
                      <span className="inCouponTitle">
                        已使用優惠券&nbsp; {couponInfo.code}
                        &nbsp;已折扣&nbsp;
                        <span className="cartCoupon">
                          NT$&nbsp;
                          {checkingActivityPrice -
                            Math.floor(
                              checkingActivityPrice * couponInfo.discount_rate
                            )}
                          &nbsp;
                        </span>
                      </span>
                    )}
                  </div>
                  <div>
                    <button
                      className="deBtn"
                      onClick={() =>
                        handleDelete(
                          incomingData.cart_id,
                          incomingData.productid
                        )
                      }
                    >
                      X
                    </button>
                  </div>
                </div>
                <hr className="myhr" />
              </div>
            </Fragment>
          );
        }
      );

      setUserAddingCartInformation(updatedUserAddingCartInformation);
      setTotalCouponPrice(totalMapCouponPrice);
      setFinalTotalDiscount(finalMapTotalDiscount);
    }
  }, [incomingDatas, couponInfo]);

  // -----------------------------------------------------

  // 更新訂單狀態
  useEffect(() => {
    const totalQuantity = incomingDatas.reduce(
      (accumulator, currentItem) => accumulator + currentItem.quantity,
      0
    );

    let extractedData = incomingDatas.map((incomingData, index) => {
      const { productid, quantity } = incomingData;
      let price = 0;

      if (incomingData.activityId !== "0") {
        price = incomingData.afterPrice * incomingData.quantity;
      } else {
        price = incomingData.price * incomingData.quantity;
      }

      if (couponInfo) {
        price *= couponInfo.discount_rate;
      }

      return {
        productid,
        quantity,
        price: Math.floor(price),
      };
    });

    const updatedOrder = {
      ...order,
      order_details: extractedData,
      total_quantity: totalQuantity,
      total_price: couponInfo
        ? userAddingCartPrice - totalCouponPrice
        : userAddingCartPrice,
      coupon_code: couponInfo ? couponInfo.code : order.coupon_code,
    };

    setOrder(updatedOrder);
  }, [
    incomingDatas,
    couponInfo,
    userAddingCartInformation,
    userAddingCartPrice,
    totalCouponPrice,
    order.coupon_code,
  ]);

  // -----------------------------------------------------

  // 呼叫折價券
  const findCoupon = async () => {
    setCallCouponApi(false);
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/coupon/use`,
        { code }
      );
      const { coupon_id } = res.data.message;
      const isExist = coupons.some((coupon) => coupon.coupon_id === coupon_id);
      if (isExist) {
        setCouponApplied(false);
        toast.warning("已儲存此折價券");
        return;
      }
      setCoupons([res.data.message, ...coupons]);
      setCouponApplied(true);
    } catch (error) {
      // console.log(error);
      toast.warning("此折價券不存在");
      setCouponApplied(false);
    }
  };

  // -----------------------------------------------------
  const [isConvenient, setIsConvenient] = useState(true);
  const [activeButton, setActiveButton] = useState(true);
  const [invoiceClass, setInvoiceClass] = useState(1);
  const [perInvoice, setPerInvoice] = useState(1);

  const sevenEleven = () => {
    setActiveButton(true);
  };
  const familyMart = () => {
    setActiveButton(false);
  };
  const showConvenient = () => {
    setIsConvenient(true);
  };

  const showHomedelivery = () => {
    setIsConvenient(false);
  };
  const personalInvoice = () => {
    setInvoiceClass(1);
  };
  const donateInvoice = () => {
    setInvoiceClass(2);
  };
  const companyInvoice = () => {
    setInvoiceClass(3);
  };
  const mobileCarrier = () => {
    setPerInvoice(1);
  };
  const paperInvoice = () => {
    setPerInvoice(2);
  };
  const NaturalInvoice = () => {
    setPerInvoice(3);
  };

  // 彈跳視窗開啟
  const showPop = () => {
    setPopCuppon(false);
    setCode("");
  };
  // 彈跳視窗關閉
  const closePop = () => {
    setPopCuppon(true);
    setCallCouponApi(false);
  };

  // 判斷購物車是否為空並返回對應內容
  const renderCartContent = (isEmpty) => {
    const userEmail = Cookies.get("userEmail");
    const userPhone = Cookies.get("userPhone");
    const orderId = Cookies.get("orderId");
    if (isEmpty && orderId) {
      return (
        <div className="nothingBoxInCart goods">
          <div className="cartHasNothing">
            <Link to={`/store`} className="cartToStore">
              點我進入商城
            </Link>
          </div>
          <br />
          <br />
          <br />
          <div className="orderBox">
            <div>
              <p className="orderInfo">訂購人信箱：{userEmail}</p>
              <p className="orderInfo">訂購人電話：{userPhone}</p>
              <p className="orderInfo">訂單單號：{orderId}</p>
            </div>
          </div>
        </div>
      );
    } else if (isEmpty) {
      return (
        <div className="nothingBoxInCart goods">
          <p className="smallTopic">商品明細</p>
          <div className="cartHasNothing">
            <span>購物車內尚未有商品</span>
            <Link to={`/store`} className="cartToStore">
              點我進入商城
            </Link>
          </div>
        </div>
      );
    } else {
      // 當isEmpty為false且Cookie中沒有userEmail和orderId時的處理邏輯
      return (
        <div className="goods" key={incomingDatas.length}>
          <p className="smallTopic">商品明細</p>
          {userAddingCartInformation}
          <div className="goodQtys">
            合計有&nbsp;
            <span className="cartTotalQuantity">
              {incomingDatas.reduce((accumulator, currentItem) => {
                return accumulator + currentItem.quantity;
              }, 0)}
            </span>
            &nbsp;項商品
          </div>
          <div className="totalQty">
            總計
            <span className="cartTotalPrice">
              &nbsp;NT$&nbsp;
              {couponInfo
                ? userAddingCartPrice - totalCouponPrice
                : userAddingCartPrice}
            </span>
          </div>
        </div>
      );
    }
  };

  const cartContent = renderCartContent(incomingDatas.length === 0);
  // -----------------------------------------------------
  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxChange = () => {
    if (!isChecked) {
      setTempOrder((prevOrder) => ({
        ...prevOrder,
        email: userInfo.email,
        name: userInfo.username,
        phone: userInfo.phone,
      }));
      setOrder((prevOrder) => ({
        ...prevOrder,
        email: userInfo.email,
        name: userInfo.username,
        phone: userInfo.phone,
      }));
    } else {
      setTempOrder((prevOrder) => ({
        ...prevOrder,
        email: "",
        name: "",
        phone: "",
      }));
      setOrder((prevOrder) => ({
        ...prevOrder,
        email: "",
        name: "",
        phone: "",
      }));
    }
    setIsChecked(!isChecked);
  };
  // -----------------------------------------------------

  // 刪除存在cookie的訂單資料

  useEffect(() => {
    const handleBeforeUnload = () => {
      Cookies.remove("orderId");
      Cookies.remove("userPhone");
      Cookies.remove("userEmail");
    };

    const handleLocationChange = () => {
      handleBeforeUnload();
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    window.addEventListener("popstate", handleLocationChange);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
      window.removeEventListener("popstate", handleLocationChange);
    };
  }, []);

  // -----------------------------------------------------

  return (
    <div className="mybody">
      <Nav />
      <Helmet>
        <link
          href="https://fonts.googleapis.com/css2?family=Allura&display=swap"
          rel="stylesheet"
        />
      </Helmet>
      <ToastContainer />
      <div className="main">
        <div className="cartHeader">
          <span className="hText">購物車</span>
          <span className="hText">|</span>
          <span className="hText">會員/購買人專區</span>
          <span className="hText">|</span>
          <span className="hText">配送方式</span>
          <span className="hText">|</span>
          <span className="hText">結帳金額</span>
        </div>
      </div>
      <div className="theTopic">
        <div className="circle">
          <span>1</span>
        </div>
        <p className="myTopicText">購物車內容</p>
      </div>

      {cartContent}
      {incomingDatas.length !== 0 ? (
        <div>
          <div className="theTopic">
            <div className="circle">
              <span>2</span>
            </div>
            <p className="myTopicText">會員/購買人專區</p>
          </div>

          <div className="goods">
            <div className="memberBox">
              {token ? (
                ""
              ) : (
                <Fragment>
                  <span className="member">會員登入</span>
                  <span className="remindText">登入會員管理訂單更加方便</span>
                </Fragment>
              )}
              <div>
                <p className="fillRemind"> 購買人聯絡方式</p>
                <input
                  type="text"
                  className="fillFrame"
                  placeholder="聯絡信箱"
                  name="email"
                  value={tempOrder.email}
                  onChange={updateOrder}
                />
              </div>
              <div className="warningMessage">
                {warning && !order.email ? "email格式有誤，需包含@及." : ""}
              </div>
              <p className="remindText">
                訂單通知會寄到此信箱, 請您務必填入正確的E-MAIL
              </p>
            </div>

            <hr className="myhr" />
            <div className="memberBox">
              <div>
                <p className="fillRemind"> 取件人資訊</p>
                <p className="takingName"> 姓名</p>
                <input
                  type="text"
                  className="fillFrame"
                  placeholder="購買人姓名"
                  name="name"
                  value={tempOrder.name}
                  onChange={updateOrder}
                />
              </div>
              <div className="warningMessage">
                {warning && !order.name
                  ? "姓名格式有誤，請輸入中/英文且不得超過10碼"
                  : ""}
              </div>
              <span className="remindText">
                *超商取貨時請使用本名, 並記得攜帶身分證前往取貨
              </span>
              <br />
              <div>
                <p className="takingName"> 聯絡電話</p>
                <input
                  type="text"
                  className="fillFrame"
                  placeholder="購買人聯絡電話,例: 0911222333"
                  name="phone"
                  value={tempOrder.phone}
                  onChange={updateOrder}
                />
              </div>
              <div className="warningMessage">
                {warning && !order.phone ? "電話格式有誤，請輸入10碼數字" : ""}
              </div>
              <span className="remindText">
                *取貨通知將以此電話聯繫, 請勿加入任何空格或符號,
                使用超商取貨誤請務必填寫10碼手機, 如: 0911222333
              </span>
              {!token ? (
                ""
              ) : (
                <div>
                  <br />
                  <input
                    type="checkbox"
                    id="sameAsBuyer"
                    className="radioFrame"
                    checked={isChecked}
                    onChange={handleCheckboxChange}
                  />
                  &nbsp;&nbsp;&nbsp;&nbsp;
                  <label htmlFor="sameAsBuyer">
                    <span className="takingName sameBuyer">與會員相同</span>
                  </label>
                </div>
              )}
            </div>
            <hr className="myhr" />

            <div className="memberBox">
              <div>
                <p className="fillRemind"> 優惠券/優惠碼</p>
                <button type="button" className="specOff" onClick={showPop}>
                  {couponInfo
                    ? `${couponInfo.code}：  ${
                        100 - couponInfo.discount_rate * 100
                      }% OFF `
                    : "選擇優惠券或輸入優惠碼"}
                </button>
              </div>
            </div>

            <hr className="myhr" />
          </div>

          <div className="theTopic">
            <div className="circle">
              <span>3</span>
            </div>
            <p className="myTopicText">付款運送方式</p>
          </div>

          <div className="goods">
            <div className="memberBox">
              <div>
                <p className="fillRemind">配送方式</p>
                <div className="deliveryWay">
                  <button
                    name="dChoose"
                    type="button"
                    className={`specialOff ${isConvenient ? "defaultCon" : ""}`}
                    onClick={showConvenient}
                  >
                    超商
                  </button>
                  <button
                    name="dChoose"
                    type="button"
                    className={`specialOff ${isConvenient ? "" : "defaultCon"}`}
                    onClick={showHomedelivery}
                  >
                    宅配
                  </button>
                </div>
              </div>
            </div>
            <hr />

            {isConvenient ? (
              <div className="memberBox convenientBox">
                <div>
                  <p className="fillRemind">請選擇超商</p>
                  <button
                    name="cChoose"
                    type="button"
                    className={`${activeButton ? "defaultSelect" : "cWhich"}`}
                    onClick={sevenEleven}
                  >
                    <span className="sText">7-11取貨(先付款)</span>
                    <span className="cartDeliveryCost">NT$&nbsp;60</span>
                  </button>
                  <button
                    name="cChoose"
                    type="button"
                    className={`${activeButton ? "cWhich" : "defaultSelect"}`}
                    onClick={familyMart}
                  >
                    <span className="sText">全家取貨(先付款)</span>
                    <span className="cartDeliveryCost">NT$&nbsp;60</span>
                  </button>
                  <button type="button" className="selectSeven">
                    請選擇取貨門市
                  </button>
                </div>
              </div>
            ) : (
              <div className="addressBox memberBox">
                <div>
                  <div className="addGroup">
                    <select
                      className="citySel"
                      value={selectedCity}
                      onChange={handleCityChange}
                    >
                      <option defaultValue="" disabled>
                        請選擇縣市
                      </option>
                      {cityList.map((city) => (
                        <option key={city.CityName} value={city.CityName}>
                          {city.CityName}
                        </option>
                      ))}
                    </select>

                    <select
                      className="citySel"
                      value={selectedTownship}
                      onChange={handleTownshipChange}
                    >
                      <option defaultValue="" disabled>
                        請先選擇縣市
                      </option>
                      {renderedOptions}
                    </select>
                  </div>
                  <input
                    type="text"
                    className="addressText"
                    placeholder="請輸入地址"
                    value={detailAddress}
                    onChange={(e) => setDetailAddress(e.target.value)}
                  />
                </div>
              </div>
            )}

            <hr className="myhr" />

            <div className="memberBox">
              <div>
                <p className="fillRemind">付款方式</p>
                <div className="deliveryWay">
                  <button type="button" className="payingWay">
                    <span className="sText">信用卡</span>
                    <span>VISA | MASTERCARD | JCB</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          <br />

          <div className="goods">
            <div className="memberBox">
              <p className="counterRemind">結帳須知</p>
              <span className="countReminder">
                請注意,訂單為您對於本公司所發出的採購邀約,本公司於未發出出貨通知以前,仍保有同意買賣契約成立與否的權利。
              </span>
              <p className="fillRemind">發票資料</p>
              <div className="invoiceInfo  goodsExplain">
                <button
                  className={`${
                    invoiceClass === 1 ? "goodsIntro" : "goodsSave"
                  }`}
                  onClick={personalInvoice}
                >
                  <span>個人發票</span>
                </button>
                <button
                  className={`${
                    invoiceClass === 2 ? "goodsIntro" : "goodsSave"
                  }`}
                  onClick={donateInvoice}
                >
                  <span>發票捐贈</span>
                </button>
                <button
                  className={`${
                    invoiceClass === 3 ? "goodsIntro" : "goodsSave"
                  }`}
                  onClick={companyInvoice}
                >
                  <span>公司用發票</span>
                </button>
              </div>
              <p className="spaceSteal">1</p>
              <div className={`${invoiceClass === 1 ? "" : "hiddenIvGroup"}`}>
                <div className="invoiceGroup">
                  <input
                    name="invoice1"
                    type="radio"
                    id="phone"
                    onClick={mobileCarrier}
                    defaultChecked
                  />
                  <label htmlFor="phone">
                    <span className="invoiceText">手機條碼載句</span>
                  </label>

                  <input
                    name="invoice1"
                    type="radio"
                    id="letter"
                    onClick={paperInvoice}
                  />
                  <label htmlFor="letter">
                    <span className="invoiceText">紙本發票</span>
                  </label>

                  <input
                    name="invoice1"
                    type="radio"
                    id="future"
                    onClick={NaturalInvoice}
                  />
                  <label htmlFor="future">
                    <span className="invoiceText">自然人憑證條碼載具</span>
                  </label>
                </div>
                <div className="deliveryBox ">
                  <input
                    type="text"
                    className={`cloudIv ${perInvoice === 1 ? "" : "hiddenIv"}`}
                    placeholder="請輸入手機條碼載具"
                  />
                </div>

                <div
                  className={`cloudBox ${perInvoice === 3 ? "" : "hiddenIv"}`}
                >
                  <input
                    type="text"
                    className="cloudIv"
                    placeholder="共16碼大寫英數字"
                  />
                </div>
              </div>
              <div className={`${invoiceClass === 2 ? "" : "hiddenIvGroup"}`}>
                <div className="invoiceGroup">
                  <input
                    name="invoice2"
                    type="radio"
                    id="phone"
                    defaultChecked
                  />
                  <label htmlFor="phone">
                    <span className="invoiceText">伊甸園基金會</span>
                  </label>

                  <input name="invoice2" type="radio" id="letter" />
                  <label htmlFor="letter">
                    <span className="invoiceText">家扶中心基金會</span>
                  </label>

                  <input name="invoice2" type="radio" id="future" />
                  <label htmlFor="future">
                    <span className="invoiceText">喜憨兒社會福利基金會</span>
                  </label>
                </div>
              </div>
              <div className={`${invoiceClass === 3 ? "" : "hiddenIvGroup"}`}>
                <div className="invoiceGroup">
                  <input
                    type="text"
                    className="cloudIv"
                    placeholder="請輸入統一編號"
                  />
                  <input
                    type="text"
                    className="cloudIv"
                    placeholder="請輸入公司名稱"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="theTopic">
            <div className="circle">
              <span>4</span>
            </div>
            <p className="myTopicText">結帳金額</p>
          </div>

          <div className="counter">
            <hr className="myhr" />
            <div className="typingIv">
              <p>商品原價</p>
              <p className="theLastPartPrice">
                NT$&nbsp;
                {userAddingCartOgPrice}
              </p>
            </div>
            <hr className="myhr" />
            <div className="typingIv">
              <p>折扣</p>
              <button className="vIcon" onClick={openDiscount}>
                <img
                  src={require("../image/shoppingcart/letter-v.png")}
                  alt="V"
                />
              </button>
              <p className={`${hideDiscount ? "" : "discountFamily"}`}>
                <span className="theLastPartPrice">
                  -NT$&nbsp;
                  {couponInfo
                    ? userAddingCartDiscount +
                      userAddingCartPrice -
                      Math.floor(userAddingCartPrice * couponInfo.discount_rate)
                    : userAddingCartDiscount}
                </span>
              </p>
            </div>
            <div
              id="myDiscountDiv"
              className={`${hideDiscount ? "discountFamily" : ""}`}
            >
              <div className="discountGroup">
                <div className="discount">活動折扣：</div>

                <div className="discount theLastPartPrice">
                  -NT$&nbsp;{userAddingCartDiscount}
                </div>
              </div>
              <div className="discountGroup">
                <div className="discount">優惠券折扣：</div>
                <div className="discount">
                  <div className="discount theLastPartPrice">
                    -NT$&nbsp;
                    {couponInfo ? totalCouponPrice : "0"}
                    {/* -NT$0 */}
                  </div>
                </div>
              </div>
              <div className="discountGroup">
                <div className="discountTotal">合計：</div>
                <div className="discountTotal theLastPartPrice">
                  -NT$&nbsp;
                  {couponInfo ? finalTotalDiscount : userAddingCartDiscount}
                </div>
              </div>
            </div>
            <hr className="myhr" />
            <div className="typingIv">
              <p>運費</p>
              <p className="theLastPartPrice">-NT$&nbsp;0</p>
            </div>
            <hr className="myhr" />
            <div className="typingIv">
              <p>總計</p>
              <div>
                <p className="totalQty theLastPartPrice">
                  NT$&nbsp;
                  {couponInfo
                    ? userAddingCartPrice - totalCouponPrice
                    : userAddingCartPrice}
                </p>
              </div>
            </div>
          </div>

          <br />
          <br />

          <div className="finalCounter">
            <hr className="myhr" />
            <div className="typingIv">
              <p>購物車內容</p>
              <button className="bigvIcon" onClick={openShoppingCart}>
                <img
                  className="vImage"
                  src={require("../image/shoppingcart/letter-v.png")}
                  alt="V"
                />
              </button>
            </div>

            {incomingDatas.map((incomingData, index) => (
              <div
                id="myShoppingList"
                key={index}
                className={`${hideShoppingCart ? "myShoppingFamily" : ""}`}
              >
                <div className="myShoppingGroup">
                  <div className="myShopping">
                    {incomingData.name}&nbsp;&nbsp;X&nbsp;&nbsp;
                    {incomingData.quantity}
                  </div>
                </div>
              </div>
            ))}

            <hr className="myhr" />

            <div className="typingIv">
              <p>
                合計有&nbsp;
                <span className="theLastPartPrice">
                  {incomingDatas.reduce((accumulator, currentItem) => {
                    return accumulator + currentItem.quantity;
                  }, 0)}
                </span>
                &nbsp;項商品
              </p>
            </div>
          </div>

          <div className="rNow">
            <button type="button" className="shopBtn" onClick={userPushOrder}>
              <div>立即結帳</div>
            </button>
          </div>
          <div className={`${popCuppon ? "cupponHidden" : ""}`}>
            <div className="hinds">
              <div className="hiddenBox">
                <p className="closeBtn" onClick={closePop}>
                  X
                </p>
                <div className="saleGroup">
                  <input
                    type="text"
                    className="attText"
                    placeholder="請輸入優惠碼"
                    name="coupon_code"
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                  />
                  <button className="attBtn" onClick={findCoupon}>
                    新增優惠券
                  </button>
                </div>
                {callCouponApi && !couponApplied && (
                  <h4 style={{ color: "red" }}>無效的折扣碼</h4>
                )}
                {coupons.map((coupon, index) => (
                  <div key={index}>
                    <div className="cupponGroup">
                      <div className="borderLine">
                        <img
                          className="myLogo"
                          src={require("../image/footer/logo.png")}
                          alt="優惠券"
                        />
                      </div>
                      <div className="cupponDec">
                        <div>{coupon.code}</div>
                        <div> {100 - coupon.discount_rate * 100} OFF </div>
                      </div>
                      <div className="cupponBtn">
                        <button
                          className="cupponSel"
                          onClick={() => {
                            setCouponInfo(coupon);
                            closePop();
                          }}
                        >
                          選擇
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default ShoppingcartPage;
