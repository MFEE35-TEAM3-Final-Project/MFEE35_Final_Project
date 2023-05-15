import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import "../styles/shoppingcart.css";
import { Helmet } from "react-helmet";

const ShoppingcartPage = () => {
  const [cartData, setCartData] = useState(null);
  useEffect(() => {
    // 取得 cookie 中的購物車資料
    const cookieCartData = Cookies.get("cartData");
    if (cookieCartData) {
      setCartData(JSON.parse(cookieCartData));
    }
  }, []);
  return (
    <div className="mybody">
      <Helmet>
        <link
          href="https://fonts.googleapis.com/css2?family=Allura&display=swap"
          rel="stylesheet"
        />
      </Helmet>

      <div className="main">
        <div className="header">
          <p className="hText">購物車</p>
          <p className="hText">|</p>
          <p className="hText">會員/購買人專區</p>
          <p className="hText">|</p>
          <p className="hText">配送方式</p>
          <p className="hText">|</p>
          <p className="hText">結帳金額</p>
        </div>
      </div>

      <div className="theTopic">
        <div className="circle">
          <span>1</span>
        </div>
        <p className="myTopicText">購物車內容</p>
      </div>

      <div className="goods">
        <p className="smallTopic">商品明細</p>
        <div className="goodGroup">
          <div>
            <img
              className="goodPic"
              src="./image/store/good1.png"
              alt="第一個商品圖"
            />
          </div>
          <div className="goodText">
            <p className="goodName">波波明太子舒肥雞腿餐盒</p>
            <p className="goodPrice">NT$ 160</p>
          </div>
          <div className="buttonGroup">
            <div>
              <button id="decreaseBtn">一</button>
              <input type="text" defaultValue="1" id="addingGoods" />
              <button id="increaseBtn">十</button>
            </div>
            <p className="bigPrice">
              NT$<span id="addingGoodsPrice">160</span>
            </p>
          </div>
          <div>
            <button className="deBtn">X</button>
          </div>
        </div>
        <hr className="myhr" />
        <div className="goodGroup">
          <div>
            <img
              className="goodPic"
              src="./image/store/good1.png"
              alt="第二個商品圖"
            />
          </div>
          <div className="goodText">
            <p className="goodName">波波明太子舒肥雞腿餐盒</p>
            <p className="goodPrice">NT$ 160</p>
          </div>
          <div className="buttonGroup">
            <div>
              <button id="decreaseBtnOne">一</button>
              <input type="text" defaultValue="1" id="addingGoodsone" />
              <button id="increaseBtnOne">十</button>
            </div>
            <p className="bigPrice">
              NT$<span id="addingGoodsPriceOne">160</span>
            </p>
          </div>
          <div>
            <button className="deBtn">X</button>
          </div>
        </div>
        <hr className="myhr" />
        <p className="smallTopic goodQtys">
          購物車合計有<span id="addingTotalQty">2</span>項商品
        </p>
      </div>

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
            <input type="text" className="fillFrame" placeholder="聯絡信箱" />
          </div>
          <span className="remindText">
            訂單通知會寄到此信箱, 請您務必填入正確的E-MAIL
          </span>
        </div>
        <hr className="myhr" />

        <div className="memberBox">
          <div>
            <p className="fillRemind"> 優惠券/優惠碼</p>
            <button type="button" className="specOff">
              選擇優惠券或輸入優惠碼
            </button>
          </div>
        </div>

        <hr className="myhr" />

        <div className="memberBox">
          <div>
            <p className="fillRemind"> 取件人資訊</p>
            <span className="takingName"> 姓名</span>
            <input type="text" className="fillFrame" placeholder="購買人姓名" />
          </div>
          <span className="remindText">
            *超商取貨時請使用本名, 並記得攜帶身分證前往取貨
          </span>
          <br />
          <div>
            <span className="takingName"> 聯絡電話</span>
            <input
              type="text"
              className="fillFrame"
              placeholder="購買人聯絡電話,例: 0911222333"
            />
          </div>
          <span className="remindText">
            *取貨通知將以此電話聯繫, 請勿加入任何空格或符號,
            使用超商取貨誤請務必填寫10碼手機, 如: 0911222333
          </span>
          <div>
            <br />
            <input type="checkbox" id="sameAsBuyer" className="radioFrame" />
            &nbsp;&nbsp;&nbsp;&nbsp;
            <label htmlFor="sameAsBuyer">
              <span className="takingName sameBuyer">與購買者相同</span>
            </label>
          </div>
        </div>
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
                className="specialOff defaultCon"
                onclick="showConvenient()"
              >
                超商
              </button>
              <button
                name="dChoose"
                type="button"
                className="specialOff"
                onclick="showHomedelivery()"
              >
                宅配
              </button>
            </div>
          </div>
        </div>
        <hr className="myhr" />

        <div className="memberBox convenientBox">
          <div>
            <p className="fillRemind">請選擇超商</p>
            <button
              name="cChoose"
              type="button"
              className="cWhich defaultSelect"
            >
              <span className="sText">7-11取貨(先付款)</span>
              <span>NT$60</span>
            </button>
            <button name="cChoose" type="button" className="cWhich">
              <span className="sText">全家取貨(先付款)</span>
              <span>NT$60</span>
            </button>
            <button type="button" className="selectSeven">
              請選擇取貨門市
            </button>
          </div>
        </div>
        <div className="addressBox memberBox deliveryHide">
          <div>
            <div className="addGroup">
              <select className="citySel">
                <option defaultValue="" selected>
                  請選擇縣市
                </option>
              </select>
              <select className="sectionSel">
                <option defaultValue="" selected>
                  請選擇鄉鎮市區
                </option>
              </select>
            </div>
            <input
              type="text"
              className="addressText"
              placeholder="請輸入地址"
            />
          </div>
        </div>
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
            <button className="goodsIntro" onclick="showTypeOneBox()">
              <p>個人發票</p>
            </button>
            <button className="goodsSave" onclick="showTypeTwoBox()">
              <p>發票捐贈</p>
            </button>
            <button className="goodsSave" onclick="showTypeThreeBox()">
              <p>公司用發票</p>
            </button>
          </div>

          <p className="spaceSteal">1</p>
          <div className="invoiceGroup invoiceTypeOne">
            <input
              name="invoice1"
              type="radio"
              id="phone"
              onclick="showDeliveryBox()"
              checked
            />
            <label htmlFor="phone">
              <span className="invoiceText">手機條碼載句</span>
            </label>

            <input
              name="invoice1"
              type="radio"
              id="letter"
              onclick="showLetterBox()"
            />
            <label htmlFor="letter">
              <span className="invoiceText">紙本發票</span>
            </label>

            <input
              name="invoice1"
              type="radio"
              id="future"
              onclick="showcloudBox()"
            />
            <label htmlFor="future">
              <span className="invoiceText">自然人憑證條碼載具</span>
            </label>
          </div>

          <div className="deliveryBox ">
            <input
              type="text"
              className="cloudIv"
              placeholder="請輸入手機條碼載具"
            />
          </div>

          <div className="cloudBox hiddenIv">
            <input
              type="text"
              className="cloudIv"
              placeholder="共16碼大寫英數字"
            />
          </div>

          <div className="invoiceGroup hiddenIvGroup invoiceTypeTwo">
            <input name="invoice2" type="radio" id="phone" />
            <label htmlFor="phone">
              <span className="invoiceText">基金會</span>
            </label>

            <input name="invoice2" type="radio" id="letter" checked />
            <label htmlFor="letter">
              <span className="invoiceText">基金會</span>
            </label>

            <input name="invoice2" type="radio" id="future" />
            <label htmlFor="future">
              <span className="invoiceText">基金會</span>
            </label>
          </div>

          <div className="cloudBox hiddenIvGroup invoiceTypeThree">
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

      <div className="theTopic">
        <div className="circle">
          <span>4</span>
        </div>
        <p className="myTopicText">結帳金額</p>
      </div>

      <div className="counter">
        <hr className="myhr" />
        <div className="typingIv">
          <p>商品小計</p>
          <p>NT$320</p>
        </div>
        <hr className="myhr" />
        <div className="typingIv">
          <p>折扣</p>
          <button className="vIcon" onclick="showDiscount()">
            <img src="./image/shoppingcart/letter-v.png" alt="V" />
          </button>
          <p>-NT$0</p>
        </div>
        <div id="myDiscountDiv" className="discountFamily">
          <div className="discountGroup">
            <div className="discount">活動：</div>
            <div className="discount">-NT$0</div>
          </div>
          <div className="discountGroup">
            <div className="discount">優惠券：</div>
            <div className="discount">-NT$0</div>
          </div>
          <div className="discountGroup">
            <div className="discountTotal">合計：</div>
            <div className="discountTotal">-NT$0</div>
          </div>
        </div>
        <hr className="myhr" />
        <div className="typingIv">
          <p>運費</p>
          <p>-NT$0</p>
        </div>
        <hr className="myhr" />
        <div className="typingIv">
          <p>總計</p>
          <div>
            <p className="totalQty">NT$320</p>
            <div>(再買NT$680及享有免費優惠)</div>
          </div>
        </div>
      </div>

      <br />
      <br />

      <div className="finalCounter">
        <hr className="myhr" />
        <div className="typingIv">
          <p>購物車內容</p>
          <button className="bigvIcon" onclick="showmyShopping()">
            <img
              className="vImage"
              src="./image/shoppingcart/letter-v.png"
              alt="V"
            />
          </button>
        </div>
        <div id="myShoppingList" className="myShoppingFamily">
          <div className="myShoppingGroup">
            <div className="myShopping">
              波波明太子舒肥雞腿餐盒&nbsp;&nbsp;X&nbsp;&nbsp;1
            </div>
            <div className="myShopping">NT$ 160</div>
          </div>
          <div className="myShoppingGroup">
            <div className="myShopping">
              波波明太子舒肥雞腿餐盒&nbsp;&nbsp;X&nbsp;&nbsp;1
            </div>
            <div className="myShopping">NT$ 160</div>
          </div>
        </div>
        <hr className="myhr" />
        <div className="typingIv">
          <p>合計有2項商品</p>
        </div>
      </div>

      <div className="rNow">
        <button type="button" className="shopBtn">
          <div>立即結帳</div>
        </button>
      </div>

      <div className="cupponHidden hinds">
        <div className="hiddenBox">
          <p className="closeBtn">X</p>
          <div className="saleGroup">
            <input type="text" className="attText" placeholder="請輸入優惠碼" />
            <button className="attBtn">新增優惠券</button>
          </div>

          <div className="cupponGroup">
            <div className="borderLine">
              <img
                className="myLogo"
                src="./image/store/good1.png"
                alt="優惠券"
              />
            </div>

            <div className="cupponDec">
              <div>Special Offer</div>
              <div>$ 50 OFF</div>
            </div>
            <div className="cupponBtn">
              <button className="cupponSel">選擇</button>
            </div>
          </div>
          <div className="cupponGroup">
            <div className="borderLine">
              <img
                className="myLogo"
                src="./image/store/good1.png"
                alt="優惠券"
              />
            </div>

            <div className="cupponDec">
              <div>Special Offer</div>
              <div>$ 50 OFF</div>
            </div>
            <div className="cupponBtn">
              <button className="cupponSel">選擇</button>
            </div>
          </div>
          <div className="cupponGroup">
            <div className="borderLine">
              <img
                className="myLogo"
                src="./image/store/good1.png"
                alt="優惠券"
              />
            </div>

            <div className="cupponDec">
              <div>Special Offer</div>
              <div>$ 50 OFF</div>
            </div>
            <div className="cupponBtn">
              <button className="cupponSel">選擇</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShoppingcartPage;
