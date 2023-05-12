import React from 'react';

// import '../styles/member/register_2.css';
import MemberHeader from '../components/member/MemberHeader';
import Footer from '../components/member/Footer';

import logo from "../../src/images/logo/logo.png";

function RegisterForm() {
  return (
    <div style={{ backgroundColor: "#F7F4E9" }}>
    <MemberHeader />
    <div className="wapper">
      <div>
        <h3 id="titleH3">會員註冊</h3>
      </div>
      <div  style={{ margin: "20px" }}>
        <img id="logoimg" src={logo} alt="" />
      </div>

      <div className="container">
        <div className="userInfo row">
          <form className="col-12" action="">
            <div className="row">
              <div className="col-4">
                <label htmlFor="userName">姓名：</label>
              </div>
              <div className="col-6">
                <input className="userInput" type="text" name="userName" placeholder="" required /><br />
              </div>
            </div>

            <div className="row">
              <div className="col-4">
                <label htmlFor="userGender">性別：</label>
              </div>
              <div className="col-6 row">
                <div className="col-5">
                  <input className="userGender" type="radio" name="userGender" id="male" />
                  <label className="usergender" htmlFor="male">男生</label>
                </div>
                <div className="col-5">
                  <input className="userGender" type="radio" name="userGender" id="fmale" />
                  <label className="usergender" htmlFor="fmale">女生</label><br />
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-4">
                <label htmlFor="userAge">年齡：</label>
              </div>
              <div className="col-6">
                <input className="userInput" type="text" name="userAge" placeholder="" required /><br />
              </div>
            </div>

            <div className="row">
              <div className="col-4">
                <label htmlFor="userHeight">身高：</label>
              </div>
              <div className="col-6">
                <input className="userInput" type="text" name="userHeight" placeholder="" required /><br />
              </div>
            </div>

            <div className="row">
              <div className="col-4">
                <label htmlFor="userWeight">體重：</label>
              </div>
              <div className="col-6">
                <input className="userInput" type="text" name="userWeight" placeholder="" required /><br />
              </div>
            </div>

            <div className="row">
              <div className="col-4">
                <label htmlFor="userMail">信箱：</label>
              </div>
              <div className="col-6">
                <input className="userInput" type="email" name="userMail" placeholder="" required /><br />
              </div>
            </div>

            <div className="row">
              <div className="col-4">
                <label style={{ minWidth: '80px' }} htmlFor="userSport">運動頻率：</label>
              </div>
              <div className="col-6">
                <select>
                  <option>幾乎不運動</option>
                  <option>每週運動 1-3 天</option>
                  <option>每週運動 3-5 天
                  </option>
                  <option>每週運動 6-7 天</option>
                  <option>長時間運動或體力勞動工作</option>
                </select>
                <br />
              </div>
            </div>
            <div className="row">
              <div className="col-3"></div>
              <div className="col-6">
                <button type="submit" className="mysubmit">Finish</button><br />
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
    <Footer />
    </div>
  );
}
export default RegisterForm;