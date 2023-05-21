import React, { useEffect, useState } from "react";
import MemberHeader from "../../components/member/MemberHeader";
import Orders from "../../components/member/Orders";
import Cookies from "js-cookie";

function MemberOrders() {
  useEffect(() => {
    const jwtToken = Cookies.get("jwtToken");
    console.log(jwtToken);
  }, []);
  return (
    <div style={{ backgroundColor: "#F7F4E9" }}>
      <MemberHeader />
      <div className="wrapper">
        <div className="memberTitle">
          <h3 id="titleH3">訂單</h3>
          <Orders />
        </div>
      </div>
    </div>
  );
}

export default MemberOrders;
