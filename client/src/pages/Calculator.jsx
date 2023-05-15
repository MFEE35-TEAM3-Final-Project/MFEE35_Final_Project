import { useState, useRef, useEffect, useCallback } from "react";
import "../styles/tdeecalculator.css";

function Calculator() {
  const [userAge, setUserAge] = useState("");
  const [userHeight, setUserHeight] = useState("");
  const [userWeight, setUserWeight] = useState("");
  const [userSports, setUserSports] = useState("");
  const [gender, setGender] = useState(null);
  const [result1, setResult1] = useState(0);
  const [result2, setResult2] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const resultRef = useRef(null);
  const [foodList, setFoodList] = useState(0);

  const calculateFoodList = useCallback(
    (result2) => {
      // 根據結果數字的大小，決定建議份數
      const newFoodList = {
        rice:
          result2 >= 2700
            ? [4, 1.5, 2.5]
            : result2 >= 2500
            ? [4, 1.5, 2.5]
            : result2 >= 2200
            ? [3.5, 1.5, 2]
            : result2 >= 2000
            ? [3, 1, 2]
            : result2 >= 1800
            ? [3, 1, 2]
            : result2 <= 1500 && result2 >= 1200
            ? [2.5, 1, 1.5]
            : [1.5, 1, 0.5],
        meat:
          result2 >= 2700
            ? 8
            : result2 >= 2500
            ? 7
            : result2 <= 2200 && result2 >= 2000
            ? 6
            : result2 >= 1800
            ? 5
            : result2 <= 1500 && result2 >= 1200
            ? 4
            : 3,
        milk: result2 >= 2700 ? 2 : 1.5,
        vegetable:
          result2 >= 2500 ? 5 : result2 <= 2200 && result2 >= 2000 ? 4 : 3,
        fruit:
          result2 >= 2700
            ? 4
            : result2 >= 2500
            ? 4
            : result2 <= 2200
            ? 3.5
            : result2 >= 2000
            ? 3
            : 2,
        bean:
          result2 >= 2700
            ? [8, 7, 1]
            : result2 >= 2500
            ? [7, 6, 1]
            : result2 >= 2200 && result2 <= 2000
            ? [6, 5, 1]
            : result2 >= 1800
            ? [5, 4, 1]
            : [4, 3, 1],
      };
      setFoodList(newFoodList);
    },
    [setFoodList]
  );

  useEffect(() => {
    if (showResult && resultRef.current) {
      resultRef.current.scrollIntoView({ behavior: "smooth" });
    }
    calculateFoodList(result2);
  }, [result2, showResult, resultRef, calculateFoodList]);

  const InputuserAge = (event) => {
    setUserAge(event.target.value);
  };
  const InputuserHeight = (event) => {
    setUserHeight(event.target.value);
  };
  const InputuserWeight = (event) => {
    event.preventDefault();
    setUserWeight(event.target.value);
  };
  const ImageClick = (event) => {
    event.preventDefault();
    const value = parseFloat(event.target.getAttribute("data-value"));
    setUserSports(value);
    console.log(value);
  };
  const genderSelect = (event) => {
    setGender(parseInt(event.target.value));
  };
  function getResult() {
    if (!userAge || !userHeight || !userWeight || !userSports || !gender) {
      alert("尚未填寫完資料");
      return;
    }
    const sum1 =
      9.99 * userWeight +
      6.25 * userHeight -
      4.92 * userAge +
      (166 * gender - 161);
    setResult1(Math.round(sum1));
    const sum2 = Math.round(sum1) * userSports;
    setResult2(Math.round(sum2));
    setShowResult(!showResult);
  }
  function reGetResult() {
    setShowResult(!showResult);
    const element = document.getElementById("BMR");
    element.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <div>
      <div class="calculator">
        <div class="container">
          <div class="tdee-Banner"></div>
          <div class="BMR-cal">
            <span class="cal-title" id="BMR">
              基礎代謝率 (BMR) 計算機
            </span>
            <p>
              基礎代謝BMR
              指人體在休息狀態下，維持新陳代謝所需的熱量，BMR就像是你走進一間餐廳的低消，當一個沙發馬鈴薯躺著一整天，例如：呼吸、器官運作、體溫維持等，即使整天躺著不動也會消耗的最低熱量。BMR
              會隨著年紀增加或體重減輕而降低，會隨著肌肉量增加而上升
            </p>
            <div class="UserText">
              <div class="form-check radioBG">
                <input
                  class="form-check-input"
                  type="radio"
                  name="gender"
                  id="flexRadioDefault1"
                  value="1"
                  onChange={genderSelect}
                />
                <label class="form-check-label" for="flexRadioDefault1">
                  男生
                </label>
              </div>
              <div class="form-check radioBG">
                <input
                  class="form-check-input"
                  type="radio"
                  name="gender"
                  id="flexRadioDefault2"
                  value="0"
                  onChange={genderSelect}
                />
                <label class="form-check-label" for="flexRadioDefault2">
                  女生
                </label>
              </div>
              <label for="age">年齡:</label>
              <input
                class="form-control"
                type="number"
                id="age"
                pattern="[0-100]"
                value={userAge}
                onChange={InputuserAge}
              />
              <label for="height">身高:</label>
              <input
                class="form-control"
                type="number"
                id="height"
                pattern="[0-200]"
                value={userHeight}
                onChange={InputuserHeight}
              />
              <label for="weight">體重:</label>
              <input
                class="form-control"
                type="number"
                id="weight"
                pattern="[0-300]"
                value={userWeight}
                onChange={InputuserWeight}
              />
            </div>
            <span class="annotation">
              計算公式 (Mifflin-St Jeor formula) 9.99 × 體重 + 6.25 × 身高 -
              4.92 × 年齡 +(166 × 性別 (男 1、女 0) - 161) = 基礎代謝率 (BMR)
            </span>
          </div>
          <div class="TDEE-cal">
            <span class="cal-title">選擇日常運動頻率</span>
            <p>
              {" "}
              身體每日所能消耗的熱量TDEE（Total Daily Energy
              Expenditure）：TDEE是最後的結帳金額，會依據你每天活動量、吃的食物計算出來的數字就不一樣，簡單廣義理解：BMR加上你的活動量，就可以理解為TDEE。每一個人都是獨一無二的，走進的餐廳不同，點的餐也不一樣，所以BMR和TDEE都不一樣喔！
            </p>
            <div class="sports">
              <div class="sportList">
                <div class="sportList-img">
                  <input
                    name="image1"
                    type="image"
                    src={require("../image/tdee/1.png")}
                    data-value="1.2"
                    onClick={ImageClick}
                    alt=""
                  />
                </div>
                <div class="sportList-text">
                  <span class="s-title">身體活動趨於靜態</span>
                  <br />
                  <span class="s-text">(幾乎不運動)</span>
                </div>
              </div>
              <div class="sportList">
                <div class="sportList-img">
                  <input
                    name="image2"
                    type="image"
                    src={require("../image/tdee/2.png")}
                    data-value="1.375"
                    onClick={ImageClick}
                    alt=""
                  />
                </div>
                <div class="sportList-text">
                  <span class="s-title">身體活動程度較低</span>
                  <br />
                  <span class="s-text">(每週運動 1-3 天)</span>
                </div>
              </div>
              <div class="sportList">
                <div class="sportList-img">
                  <input
                    name="image3"
                    type="image"
                    src={require("../image/tdee/3.png")}
                    data-value="1.55"
                    onClick={ImageClick}
                    alt=""
                  />
                </div>
                <div class="sportList-text">
                  <span class="s-title">身體活動程度正常</span>
                  <br />
                  <span class="s-text">(每週運動 3-5 天)</span>
                </div>
              </div>
              <div class="sportList">
                <div class="sportList-img">
                  <input
                    name="image4"
                    type="image"
                    src={require("../image/tdee/4.png")}
                    data-value="1.72"
                    onClick={ImageClick}
                    alt=""
                  />
                </div>
                <div class="sportList-text">
                  <span class="s-title">身體活動程度較高</span>
                  <br />
                  <span class="s-text">(每週運動 5-7 天)</span>
                </div>
              </div>
              <div class="sportList">
                <div class="sportList-img">
                  <input
                    name="image5"
                    type="image"
                    src={require("../image/tdee/5.png")}
                    data-value="1.9"
                    onClick={ImageClick}
                    alt=""
                  />
                </div>
                <div class="sportList-text">
                  <span class="s-title">身體活動程度激烈</span>
                  <br />
                  <span class="s-text">(長時間運動)</span>
                </div>
              </div>
            </div>
            <div>
              <button onClick={getResult} class="custom-btn btn-3">
                <span>開始計算</span>
              </button>
            </div>
          </div>
          {showResult && (
            <div class="aboutfood" ref={resultRef}>
              <div className="result">
                <div>
                  <span className="result-title">計算結果</span>
                </div>
                <div class="BMR">
                  基礎代謝率 (BMR)<span>{result1}</span>
                </div>
                <div class="TDEE">
                  每日總能量消耗(TDEE)<span>{result2}</span>
                </div>
              </div>
              <div>
                <span class="cal-title">飲食攝取該如何分配</span>
              </div>
              <p>根據您的TDEE，下方將推薦每日飲食攝取該如何分配</p>
              <span class="annotation">
                下方六大類建議份數參考
                國健署《每日飲食指南》，依最為接近的熱量需求計算（熱量區間以
                ±100-150 大卡作進位捨去）
              </span>
              <div class="sixfood row">
                <div class=" col-lg-2 col-md-6 justify-contant-center">
                  <div class="foodlist">
                    <div class="foodlist-img">
                      <img src={require("../image/tdee/rice.png")} alt="" />
                    </div>
                    <div class="">
                      <span class="foodlist-text">
                        建議: <span>{foodList.rice[0]} </span>(份)
                      </span>
                      <span class="foodlist-text">
                        未精緻:<span> {foodList.rice[1]}</span>(碗)
                      </span>
                      <span class="foodlist-text">
                        其他類:<span>{foodList.rice[2]} </span>(碗)
                      </span>
                    </div>
                  </div>
                </div>
                <div class=" col-lg-2 col-md-6 justify-contant-center">
                  <div class="foodlist">
                    <div class="foodlist-img">
                      <img src={require("../image/tdee/meat.png")} alt="" />
                    </div>
                    <div class="">
                      <span class="foodlist-text">
                        建議:<span>{foodList.meat}</span>(份)
                      </span>
                    </div>
                  </div>
                </div>
                <div class=" col-lg-2 col-md-6 justify-contant-center">
                  <div class="foodlist">
                    <div class="foodlist-img">
                      <img src={require("../image/tdee/milk.png")} alt="" />
                    </div>
                    <div class="">
                      <span class="foodlist-text">
                        建議:<span>{foodList.milk}</span>(份)
                      </span>
                    </div>
                  </div>
                </div>
                <div class=" col-lg-2 col-md-6 justify-contant-center">
                  <div class="foodlist">
                    <div class="foodlist-img">
                      <img
                        src={require("../image/tdee/vegertable.png")}
                        alt=""
                      />
                    </div>
                    <div class="">
                      <span class="foodlist-text">
                        建議:<span>{foodList.vegetable}</span>(份)
                      </span>
                    </div>
                  </div>
                </div>
                <div class=" col-lg-2 col-md-6 justify-contant-center">
                  <div class="foodlist">
                    <div class="foodlist-img">
                      <img src={require("../image/tdee/fruit.png")} alt="" />
                    </div>
                    <div class="">
                      <span class="foodlist-text">
                        建議:<span>{foodList.fruit}</span>(份)
                      </span>
                    </div>
                  </div>
                </div>
                <div class=" col-lg-2 col-md-6 justify-contant-center">
                  <div class="foodlist">
                    <div class="foodlist-img">
                      <img src={require("../image/tdee/bean.png")} alt="" />
                    </div>
                    <div class="">
                      <span class="foodlist-text">
                        建議:<span>{foodList.bean[0]}</span>(份)
                      </span>
                      <span class="foodlist-text">
                        油脂類:<span>{foodList.bean[1]} </span>(碗)
                      </span>
                      <span class="foodlist-text">
                        堅果種子: <span>{foodList.bean[2]}</span>(碗)
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <button onClick={reGetResult} class="custom-btn btn-3">
                  <span>重新測量</span>
                </button>
              </div>
              <span class="annotation">
                「未精製」主食品，如糙米飯、全麥食品、燕麥、玉米、甘薯等，請依據「六大類食物簡介」。{" "}
                <br />
                「其他」指白米飯、白麵條、白麵包、饅頭等。以「未精製」取代「其他」，更佳。
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Calculator;
