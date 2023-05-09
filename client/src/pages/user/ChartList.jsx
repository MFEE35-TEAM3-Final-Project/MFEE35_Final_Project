import React from "react";
import MyBarChart from "../../components/member/BarChart";
import MemberHeader from "../../components/member/MemberHeader";
import Footer from "../../components/member/Footer";
import MyDonutChart from "../../components/member/MyDonutChart";

function ChartListPage() {
  return (
    <div>
      < MemberHeader />
      <div className="wapper">
        <div className="memberTitle">
          <h3>數據圖表</h3>
        </div>
      </div>
      <div className="container">
        <div className="row chartInfo">
          <div className="col-12">
            <div className="row">
                <MyBarChart />
                <MyDonutChart/>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default ChartListPage;
