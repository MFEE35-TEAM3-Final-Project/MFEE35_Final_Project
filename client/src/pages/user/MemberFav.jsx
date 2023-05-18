import React, { useState } from "react";
import MemberHeader from "../../components/member/MemberHeader";
import Footer from "../../components/Footer";
import Favorite from "../../components/member/Favorite";


function MemberFav() {
  return (
    
    <div style={{ backgroundColor: "#F7F4E9" }}>
      <MemberHeader/>
      <div className="wrapper">
      
        <div className="memberTitle">
          <h3 id="titleH3">追蹤清單</h3>
          <Favorite/>
        </div>
      </div>
  
    </div>
  );
}

export default MemberFav;
