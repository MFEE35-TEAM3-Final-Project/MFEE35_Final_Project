import React, { useState } from "react";
import { useLocation } from "react-router-dom";

function RegisterForm() {
  const { state } = useLocation();

  const [formValues, setFormValues] = useState({
    userName: "",
    userGender: "",
    userAge: "",
    userHeight: "",
    userWeight: "",
    userMail: state?.userMail || "",
    userSport: "幾乎不運動",
  });

  const {
    userName,
    userGender,
    userAge,
    userHeight,
    userWeight,
    userSport,
    userMail,
  } = formValues;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleButtonClick = (e) => {
    e.preventDefault();
    console.log("userName:", formValues.userName);
    console.log("userGender:", formValues.userGender);
    console.log("userAge:", formValues.userAge);
    console.log("userHeight:", formValues.userHeight);
    console.log("userWeight:", formValues.userWeight);
    console.log("userSport:", formValues.userSport);
    console.log("userMail:", formValues.userMail);
  };

  return (
    <div style={{ backgroundColor: "#F7F4E9", padding: "20px" }}>
      <div className="wapper">
        <div>
          <h3 id="titleH3">會員註冊</h3>
        </div>
        <div style={{ margin: "20px" }}>
          <img id="logoimg" src="/image/logo/logo.png" alt="" />
        </div>

        <div className="container">
          <div className="userInfo row">
            <form className="col-12" action="">
              <div className="row">
                <div className="col-4">
                  <label htmlFor="userName">姓名：</label>
                </div>
                <div className="col-6">
                  <input
                    className="userInput"
                    type="text"
                    name="userName"
                    placeholder=""
                    value={userName}
                    onChange={handleChange}
                    required
                  />
                  <br />
                </div>
              </div>

              <div className="row">
                <div className="col-4">
                  <label htmlFor="userGender">性別：</label>
                </div>
                <div className="col-6 row">
                  <div className="col-5">
                    <input
                      className="userGender"
                      type="radio"
                      name="userGender"
                      id="male"
                      value="男生"
                      checked={userGender === "男生"}
                      onChange={handleChange}
                    />
                    <label className="usergender" htmlFor="male">
                      男生
                    </label>
                  </div>
                  <div className="col-5">
                    <input
                      className="userGender"
                      type="radio"
                      name="userGender"
                      id="female"
                      value="女生"
                      checked={userGender === "女生"}
                      onChange={handleChange}
                    />
                    <label className="usergender" htmlFor="female">
                      女生
                    </label>
                    <br />
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-4">
                  <label htmlFor="userAge">年齡：</label>
                </div>
                <div className="col-6">
                  <input
                    className="userInput"
                    type="text"
                    name="userAge"
                    placeholder=""
                    value={userAge}
                    onChange={handleChange}
                    required
                  />
                  <br />
                </div>
              </div>

              <div className="row">
                <div className="col-4">
                  <label htmlFor="userHeight">身高：</label>
                </div>
                <div className="col-6">
                  <input
                    className="userInput"
                    type="text"
                    name="userHeight"
                    placeholder=""
                    value={userHeight}
                    onChange={handleChange}
                    required
                  />
                  <br />
                </div>
              </div>
              <div className="row">
                <div className="col-4">
                  <label htmlFor="userWeight">體重：</label>
                </div>
                <div className="col-6">
                  <input
                    className="userInput"
                    type="text"
                    name="userWeight"
                    placeholder=""
                    value={userWeight}
                    onChange={handleChange}
                    required
                  />
                  <br />
                </div>
              </div>

              <div className="row">
                <div className="col-4">
                  <label htmlFor="userMail">信箱：</label>
                </div>
                <div className="col-6">
                  <input
                    className="userInput"
                    type="email"
                    name="userMail"
                    placeholder=""
                    value={userMail}
                    readOnly
                    required
                  />

                  <br />
                </div>
              </div>

              <div className="row">
                <div className="col-4">
                  <label style={{ minWidth: "80px" }} htmlFor="userSport">
                    運動頻率：
                  </label>
                </div>
                <div className="col-6">
                  <select
                    name="userSport"
                    value={userSport}
                    onChange={handleChange}
                  >
                    <option value="幾乎不運動">幾乎不運動</option>
                    <option value="每週運動 1-3 天">每週運動 1-3 天</option>
                    <option value="每週運動 3-5 天">每週運動 3-5 天</option>
                    <option value="每週運動 6-7 天">每週運動 6-7 天</option>
                    <option value="長時間運動或體力勞動工作">
                      長時間運動或體力勞動工作
                    </option>
                  </select>
                  <br />
                </div>
              </div>
              <div className="row">
                <div className="col-3"></div>
                <div className="col-6">
                  <button
                    type="submit"
                    className="mysubmit"
                    onClick={handleButtonClick}
                  >
                    Finish
                  </button>
                  <br />
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RegisterForm;
