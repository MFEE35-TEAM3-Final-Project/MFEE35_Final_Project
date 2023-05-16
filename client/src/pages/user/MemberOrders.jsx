import React, { useState } from "react";
// import MemberHeader from "../../components/member/MemberHeader";
import Orders from "../../components/member/Orders";


function MemberOrders() {
  return (
    <div style={{ backgroundColor: "#F7F4E9" }}>
      <div className="wrapper">
        <div className="memberTitle">
          <h3 id="titleH3">訂單</h3>
          <Orders/>
        </div>
      </div>
  
    </div>
  );
}

export default MemberOrders;
