import React, { Fragment, useEffect, useState } from "react";
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
  // const [cartData, setCartData] = useState(null);
  const [nothing, setNothing] = useState(true);
  const [isConvenient, setIsConvenient] = useState(true);
  const [activeButton, setActiveButton] = useState(true);
  const [invoiceClass, setInvoiceClass] = useState(1);
  const [perInvoice, setPerInvoice] = useState(1);
  const [incomingDatas, setIncomingData] = useState([]);

  // 訂單細節的金額需下判斷式
  const [eachData, setEachData] = useState([]);
  const [allQuantity, setAllQuantity] = useState(null);

  // 總金額需下判斷式
  // const [allPrice, setAllPrice] = useState(null);

  const [code, setCode] = useState("");
  const [coupons, setCoupons] = useState([]);
  const [callCouponApi, setCallCouponApi] = useState(false);
  const [couponApplied, setCouponApplied] = useState(false);
  const [popCuppon, setPopCuppon] = useState(true);
  const [couponInfo, setCouponInfo] = useState(null);

  // 輸入地址select
  const [cityList, setCityList] = useState([]);
  const [selectedCity, setSelectedCity] = useState("請選擇縣市");
  const [selectedTownship, setSelectedTownship] = useState("請先選擇縣市");
  const [selectedCityData, setSelectedCityData] = useState({});
  const [detailAddress, setDetailAddress] = useState("");

  // 頁面第四部分的隱藏選單
  const [hideDiscount, setHideDiscount] = useState(true);
  const [hideShoppingCart, setHideShoppingCart] = useState(true);

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
  const updateOrder = (event) => {
    const { name, value } = event.target;
    setOrder((prevOrder) => ({
      ...prevOrder,
      [name]: value,
    }));
  };

  const handleCityChange = (event) => {
    setSelectedCity(event.target.value);
    setSelectedTownship("");
  };

  const handleTownshipChange = (event) => {
    setSelectedTownship(event.target.value);
  };

  // -----------------------------------------------------
  useEffect(() => {
    setCityList(cityCountryData);
    // const cookieCartData = Cookies.get("cartData");

    if (token) {
      axios
        .get(`${process.env.REACT_APP_API_URL}/api/user/cart`)
        .then((res) => {
          if (res.data.data.length !== 0) {
            // console.log(res);
            // console.log(res.data.data);
            setIncomingData(res.data.data);
            // 设置订单数据
          } else {
            toast.warning("購物車沒有資料");
            setNothing(false);
          }
        })
        .catch((err) => {
          console.error(err);
        });
    } else if (cartData) {
      // console.log(cartData);
      const userCartData = JSON.parse(cartData);
      // console.log(userCartData);
      const fetchData = async () => {
        const quantityTracker = {}; // 跟踪productid及其数量的对象
        const promises = userCartData.map((cartData) => {
          const cartProductId = cartData.productid;
          quantityTracker[cartProductId] = cartData.quantity; // 设置初始数量为1
          return axios.get(
            `${process.env.REACT_APP_API_URL}/api/product/getProductsById?productId=${cartProductId}`
          );
        });
        try {
          const responses = await Promise.all(promises);
          // console.log(responses);
          const data = responses.reduce((accumulator, res, index) => {
            if (res) {
              // 如果res不为null，则表示对应的请求成功
              const productData = res.data[0];
              // console.log(productData);
              productData.quantity =
                quantityTracker[userCartData[index].productid]; // 添加quantity属性
              accumulator.push(productData);
            }
            return accumulator;
          }, []);
          // console.log(data);
          setIncomingData(data);
        } catch (error) {
          console.error(error);
        }
      };

      fetchData();
    } else {
      toast.warning("購物車沒有資料");
      setNothing(false);
    }
  }, []);

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

  // 折扣後的商品價格 x 數量
  // const [checkingActivityPrice, setCheckingActivityPrice] = useState(0);

  useEffect(() => {
    // 測試
    // 判斷是否有活動後的單項金額
    let checkingActivityPrice = 0;
    // 判斷是否有活動後的總金額
    let totalCheckingActivityPrice = 0;
    // 活動已折扣的單項金額
    let checkDiscount = 0;
    // 活動已折扣的總金額
    let totalDiscount = 0;
    // 原始的單項價格
    let checkOgPrice = 0;
    // 原始的總價格
    let totalOgPrice = 0;
    // 總共優惠券總計
    let checkMapCouponPrice = 0;
    let totalMapCouponPrice = 0;
    // 活動折價+優惠券合計
    let checkMapTotalDiscount = 0;
    let finalMapTotalDiscount = 0;

    if (incomingDatas !== null) {
      const meowmm = incomingDatas.map((incomingData, index) => {
        if (incomingData.activityId !== 0) {
          // 如果有活動 -> 計算有活動價格*數量
          checkingActivityPrice = Math.floor(
            incomingData.afterPrice * incomingData.quantity
          );
          checkDiscount = Math.floor(
            // 計算活動折扣金額*數量
            incomingData.discountedPrice * incomingData.quantity
          );
          checkOgPrice = Math.floor(incomingData.price * incomingData.quantity); // 計算原價
        } else if (incomingData.activityId === 0) {
          // 如果沒有活動->計算正常價格*數量
          checkingActivityPrice = Math.floor(
            parseInt(incomingData.price) * incomingData.quantity
          );
          checkOgPrice = Math.floor(incomingData.price * incomingData.quantity); // 計算原價
        }

        totalCheckingActivityPrice += checkingActivityPrice;
        totalDiscount += checkDiscount;
        totalOgPrice += checkOgPrice;
        setUserAddingCartDiscount(totalDiscount); // 若是有活動的總折扣金額
        setUserAddingCartPrice(totalCheckingActivityPrice); // 已判斷是否有活動的總金額
        setUserAddingCartOgPrice(totalOgPrice); // 原始價格的總金額

        if (couponInfo) {
          checkMapCouponPrice =
            checkingActivityPrice -
            Math.floor(checkingActivityPrice * couponInfo.discount_rate);
          checkMapTotalDiscount =
            Math.floor(incomingData.discountedPrice * incomingData.quantity) +
            checkingActivityPrice -
            Math.floor(checkingActivityPrice * couponInfo.discount_rate);
        }
        totalMapCouponPrice += checkMapCouponPrice;
        finalMapTotalDiscount += checkMapTotalDiscount;
        setTotalCouponPrice(totalMapCouponPrice);
        setFinalTotalDiscount(finalMapTotalDiscount);

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
                  {incomingData.activityId === "1" ? (
                    <span className="goodInActivityTitleOne">
                      活動商品:畢業歡送季節
                    </span>
                  ) : (
                    <span className="goodInActivityTitleTwo">
                      活動商品:老闆生日大優惠
                    </span>
                  )}
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
                  {incomingData.activityId !== 0 ? (
                    <div className="inActivity">
                      <span>已折扣</span>
                      <span className="cartDiscount">
                        &nbsp; NT$&nbsp;
                        {checkDiscount}&nbsp;
                      </span>
                    </div>
                  ) : (
                    ""
                  )}
                  <br />
                  {couponInfo ? (
                    <span className="inCouponTitle">
                      已使用優惠券&nbsp;
                      {couponInfo.code}
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
                  ) : (
                    ""
                  )}
                </div>
                <div>
                  <button
                    className="deBtn"
                    onClick={() => {
                      handleDelete(
                        incomingData.cart_id,
                        incomingData.productid
                      );
                    }}
                  >
                    X
                  </button>
                </div>
              </div>
              <hr className="myhr" />
            </div>
          </Fragment>
        );
      });
      setUserAddingCartInformation(meowmm);
    } else {
      setNothing(false);
    }
  }, [incomingDatas, couponInfo]);

  // 當購物車更新時將訂單更新
  useEffect(() => {
    setAllQuantity(
      incomingDatas.reduce((accumulator, currentItem) => {
        return accumulator + currentItem.quantity;
      }, 0)
    );
    // console.log("有計算ㄇ");
    // }
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
        order.coupon_code = couponInfo.code;
        // console.log("我用優惠券後有好好更新訂單資料");
      }
      return {
        productid,
        quantity,
        price: Math.floor(price),
      };
    });
    // console.log(extractedData);
    setEachData(extractedData);
    order.order_details = extractedData;
    order.total_quantity = allQuantity;
    order.total_price = userAddingCartPrice;
    // console.log(allQuantity);
    // console.log("我有好好更新訂單資料");
    // console.log(incomingDatas);
  }, [incomingDatas, couponInfo, userAddingCartInformation]);

  useEffect(() => {
    if (couponInfo) {
      order.coupon_code = couponInfo.code;
    }
  }, [couponInfo]);

  useEffect(() => {
    if (couponInfo) {
      order.total_price = userAddingCartPrice - totalCouponPrice;
    }
  }, [totalCouponPrice]);

  useEffect(() => {
    const allAddress = selectedCity + selectedTownship + detailAddress;
    // console.log(allAddress);
    if (allAddress) {
      order.shipping_address = allAddress;
    }
  }, [selectedCity, selectedTownship, detailAddress]);

  // 釣魚台
  useEffect(() => {
    const selectedCityData =
      cityList.find((city) => city.CityName === selectedCity) || {};
    setSelectedCityData(selectedCityData);
  }, [selectedCity, cityList]);

  useEffect(() => {
    if (callCouponApi && !couponApplied) {
      findCoupon();
    }
  }, [callCouponApi, couponApplied]);

  const handleDelete = async (id, productid) => {
    // console.log(id);
    if (token) {
      try {
        // 发送删除请求
        const res = await axios.delete(
          `${process.env.REACT_APP_API_URL}/api/user/cart/${id}`
        );
        toast.warning("已刪除該商品");
        const targetIndex = incomingDatas.findIndex(
          (item) => item.cart_id === id
        );
        if (targetIndex !== -1) {
          const updatedData = [...incomingDatas];
          updatedData.splice(targetIndex, 1);
          setIncomingData(updatedData);
          if (updatedData.length === 0) {
            setNothing(false);
            setUserAddingCartPrice(0);
            order.coupon_code = null;
          }
        }
      } catch (error) {
        console.log(id);
        console.log(error);
      }
    } else if (cartData) {
      const expires = 7;
      const userCartDatas = JSON.parse(cartData);
      const targetCookie = userCartDatas.findIndex(
        (item) => item.productid === productid
      );

      if (targetCookie !== -1) {
        const updatedCookieData = [...userCartDatas];
        updatedCookieData.splice(targetCookie, 1);

        if (updatedCookieData.length === 0) {
          // 如果 updatedCookieData 的长度为 0，则删除 cartData
          Cookies.remove("cartData");
        } else {
          const updatedCookie = JSON.stringify(updatedCookieData);
          Cookies.set("cartData", updatedCookie, { expires });
        }
      }
      toast.warning("已刪除該商品");
      const targetIndex = incomingDatas.findIndex(
        (item) => item.productid === productid
      );
      if (targetIndex !== -1) {
        const updatedData = [...incomingDatas];
        updatedData.splice(targetIndex, 1);
        setIncomingData(updatedData);
        if (updatedData.length === 0) {
          setNothing(false);
          setUserAddingCartPrice(0);
          order.coupon_code = null;
        }
      }
    }
  };

  const renderedOptions = selectedCityData.AreaList
    ? selectedCityData.AreaList.map((township, index) => (
        <option key={index} value={township.AreaName}>
          {township.AreaName}
        </option>
      ))
    : null;

  //  card_id 為目標變更的cart_id 、newQuantity為已變更的數量了
  const handleQuantityChange = (cart_id, newQuantity, productid) => {
    if (token) {
      axios
        .put(`${process.env.REACT_APP_API_URL}/api/user/cart/update`, {
          cart_id: cart_id,
          quantity: newQuantity,
        })
        .then((res) => {
          const targetIndex = incomingDatas.findIndex(
            (item) => item.cart_id === cart_id
          );
          // console.log(targetIndex);
          if (targetIndex !== -1) {
            const updatedData = [...incomingDatas];
            updatedData[targetIndex].quantity = newQuantity;
            // console.log(updatedData);
            setIncomingData(updatedData);
            // console.log("我做完put的請求了");
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
    if (cartData) {
      // console.log(productid);
      const expires = 7;
      const targetIndex = incomingDatas.findIndex(
        (item) => item.productid === productid
      );
      const userCartDatas = JSON.parse(cartData);
      const targetCookie = userCartDatas.findIndex(
        (item) => item.productid === productid
      );
      // console.log(targetIndex);
      if (targetIndex !== -1) {
        if (newQuantity !== 0) {
          // 更新狀態值
          const updatedData = [...incomingDatas];
          updatedData[targetIndex].quantity = newQuantity;
          setIncomingData(updatedData);
          // 更新存在cookie的cartData
          const updatedCookieData = [...userCartDatas];
          updatedCookieData[targetCookie].quantity = newQuantity;
          const updatedCookie = JSON.stringify(updatedCookieData);
          // console.log(updatedCookie);
          // console.log(cartData);
          // Cookies.set("cartData", updatedCookieData);
          Cookies.set("cartData", updatedCookie, { expires });
        } else {
          toast.warning("購物車數量不得低於 1");
        }
      }
    }
  };

  // 發送訂單詳情
  const userPushOrder = () => {
    if (
      order.phone !== "" &&
      order.name !== "" &&
      order.email !== "" &&
      order.order_details !== null
    ) {
      axios
        .post(`${process.env.REACT_APP_API_URL}/api/user/orders`, order, {
          headers: {
            Authorization: token,
          },
        })
        .then((res) => {
          // console.log(res);
          toast.success("已送出訂單");
          window.location.reload();
          // setNothing(true);
        })
        .catch((error) => {
          console.log(error);
          console.log(order);
        });
    } else {
      toast.warning("資料尚未完整填入");
    }
  };

  const findCoupon = async () => {
    setCallCouponApi(true);
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/coupon/use`,
        { code }
      );
      const isExist = coupons.some(
        (coupon) => coupon.coupon_id === res.data.message.coupon_id
      );
      if (isExist) {
        // console.log("此折價券已儲存");
        setCouponApplied(false);
        toast.warning("已儲存此折價券");
        return;
      } else {
        setCoupons([...coupons, res.data.message]); // 在以新贈的優惠券上繼續新增
        setCouponApplied(true);
        // console.log(res);
      }
    } catch (error) {
      console.log(error);
      setCouponApplied(false);
    }
  };

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

  const openDiscount = () => {
    if (hideDiscount) {
      setHideDiscount(false);
    } else {
      setHideDiscount(true);
    }
  };
  const openShoppingCart = () => {
    if (hideShoppingCart) {
      setHideShoppingCart(false);
    } else {
      setHideShoppingCart(true);
    }
  };

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

      {nothing ? (
        <div className="goods">
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
      ) : (
        <div className="nothingBoxInCart goods">
          <p className="smallTopic">商品明細</p>
          <div className="cartHasNothing">
            <span>購物車內尚未有商品</span>
            <Link to={`/store`} className="cartToStore">
              點我進入商城
            </Link>
          </div>
        </div>
      )}
      {nothing ? (
        <div>
          <div className="theTopic">
            <div className="circle">
              <span>2</span>
            </div>
            <p className="myTopicText">會員/購買人專區</p>
          </div>

          <div className="goods">
            <div className="memberBox">
              <span className="member">會員登入</span>
              <span className="remindText">登入會員管理訂單更加方便</span>
              <div>
                <p className="fillRemind"> 購買人聯絡方式</p>
                <input
                  type="text"
                  className="fillFrame"
                  placeholder="聯絡信箱"
                  name="email"
                  value={order.email}
                  onChange={updateOrder}
                />
              </div>
              <span className="remindText">
                訂單通知會寄到此信箱, 請您務必填入正確的E-MAIL
              </span>
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
                  value={order.name}
                  onChange={updateOrder}
                />
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
                  value={order.phone}
                  onChange={updateOrder}
                />
              </div>
              <span className="remindText">
                *取貨通知將以此電話聯繫, 請勿加入任何空格或符號,
                使用超商取貨誤請務必填寫10碼手機, 如: 0911222333
              </span>
              <div>
                <br />
                <input
                  type="checkbox"
                  id="sameAsBuyer"
                  className="radioFrame"
                />
                &nbsp;&nbsp;&nbsp;&nbsp;
                <label htmlFor="sameAsBuyer">
                  <span className="takingName sameBuyer">與購買者相同</span>
                </label>
              </div>
            </div>
            <hr className="myhr" />

            <div className="memberBox">
              <div>
                <p className="fillRemind"> 優惠券/優惠碼</p>
                <button type="button" className="specOff" onClick={showPop}>
                  {couponInfo
                    ? `Special Offer $ ${
                        100 - couponInfo.discount_rate * 100
                      }% OFF ${couponInfo.code}`
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
              {/* 個人發票 */}
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
                    // className="cloudIv"
                    className={`cloudIv ${perInvoice === 1 ? "" : "hiddenIv"}`}
                    placeholder="請輸入手機條碼載具"
                  />
                </div>

                <div
                  // className="cloudBox hiddenIv"
                  className={`cloudBox ${perInvoice === 3 ? "" : "hiddenIv"}`}
                >
                  <input
                    type="text"
                    className="cloudIv"
                    placeholder="共16碼大寫英數字"
                  />
                </div>
              </div>
              {/* 基金會 */}
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

                  <input
                    name="invoice2"
                    type="radio"
                    id="letter"
                    // checked
                  />
                  <label htmlFor="letter">
                    <span className="invoiceText">家扶中心基金會</span>
                  </label>

                  <input name="invoice2" type="radio" id="future" />
                  <label htmlFor="future">
                    <span className="invoiceText">喜憨兒社會福利基金會</span>
                  </label>
                </div>
              </div>
              {/* 公司發票 */}
              <div className={`${invoiceClass === 3 ? "" : "hiddenIvGroup"}`}>
                <div
                  // className="invoiceGroup"
                  className="invoiceGroup"
                >
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
                  {/* <div className="myShopping">
                NT$ {incomingData.price * incomingData.quantity}
              </div> */}
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
                        <div>Special Offer</div>
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
