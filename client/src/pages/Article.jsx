import "../styles/article.css";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { BiMessageEdit } from "react-icons/bi";

function Article() {
  const [article, setArticle] = useState([]);
  const [articles, setArticles] = useState([]);
  const { id } = useParams();
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/api/articles/id=${id}`)
      .then((res) => {
        setArticle(res.data.article);
        console.log(res.data.article);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/api/articles`)
      .then((res) => {
        console.log(res.data.articles);
        setArticles(res.data.articles);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);
  const shuffledArticles = articles.sort(() => Math.random() - 0.5);
  useEffect(() => {
    axios
      .get(
        `${process.env.REACT_APP_API_URL}/api/articles/article_comments/article_id=${id}`
      )
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);
  return (
    <div>
      <div className="A-article">
        <div className="row g-0">
          <div className="col-3 ">
            <div className="s-title">
              <a href="">
                <span>飲食怎麼樣才算健康？</span>
              </a>
              <a href="">
                <span>每日均衡飲食怎麼做</span>
              </a>
              <a href="">
                <span>飲食分類與分量</span>
              </a>
              <a href="">
                <span>改變飲食習慣</span>
              </a>
              <a href="">
                <span>改變飲食習慣</span>
              </a>
              <a href="">
                <span>最佳飲食法選擇一</span>
              </a>
              <a href="">
                <span className="ps-5">地中海飲食法怎麼吃？</span>
              </a>
              <a href="">
                <span>最佳飲食法選擇二</span>
              </a>
              <a href="">
                <span className="ps-5">得舒飲食法飲食原則</span>
              </a>
              <a href="">
                <span>結論</span>
              </a>
            </div>
          </div>
          <div className="col-6 ">
            <div className="content">
              <div>
                <div
                  dangerouslySetInnerHTML={{ __html: `${article.content}` }}
                />
              </div>
              {/* <div className="content-title">
                健康飲食怎麼吃？營養師曝「最佳飲食法」操作指南
                <span>2023/04/27</span>
              </div>
              <div className="content-p">
                民以食為天，飲食文化是各個國家都在關注的，身心靈的健康與飲食是有很大關聯的，加上近幾年因健康相關風氣盛行，更多人開始討論健康飲食，到底有什麼樣的飲食法有助於促進健康？今天就來跟大家聊一聊！
              </div>
              <div className="content-h3">飲食怎麼樣才算健康？</div>
              <div className="content-p">
                於2016年的時候，聯合國大會4月宣布2016年到2025年，因應現代人的飲食習慣不健康，為時長達十年的營養問題行動從2016年開始。說明了健康飲食的重要性，是現今全球的飲食問題。
                《美國新聞與世界報導》最新統計的2022最佳飲食法在3月時公告給了民眾，不出所料的最佳飲食法仍是「地中海飲食」。地中海飲食已經蟬聯了最佳飲食法第五年，是各專家公認的最佳飲食法。
              </div>
              <div className="content-h3">每日均衡飲食怎麼做</div>
              <div className="content-p">
                想要健康飲食那就從每日的均衡飲食，飲食的話可以依照國民健康署的「每日飲食指南」之食物分類以及建議份量，來作為飲食搭配的依據。
              </div>
              <div className="content-p">
                飲食指南的話除了是讓飲食的營養更均衡外，還考量了現代人常見的癌症與心血管代謝疾病的飲食原則，納入飲食指南的考量當中。
              </div>
              <div className="content-h3">飲食分類與分量</div>
              <div className="content-p">
                根據國民健康署的飲食指南來看，主要將食物分成了六大類：全榖雜糧類、豆魚蛋肉類、­乳品類、蔬菜類、水果類、油脂與堅果種子類等六大類食物。均衡飲食不是多吃菜、多喝水就可以了，更多的是這六大類食物要攝取足量搭配均衡。
              </div>
              <div className="content-p">
                要如何攝取足夠，以下的飲食份量基準，提供大家參考：
              </div>
              <div className="content-h3">改變飲食習慣</div>
              <div className="content-p">
                不良的飲食習慣，則是導致身體不健康以及肥胖的因素，改變你的飲食型態則是邁向健康與減肥的第一步驟，再加上定期鍛鍊相結合時，均衡的飲食可以幫助一個人減少肥胖或體重增加的風險因素，也能降低心血管疾病。
              </div>
              <div className="content-p">
                對於一些人來說，每天增加 30
                分鐘的步行時間並做一些小的改變，比如走樓梯，可以幫助他們燃燒卡路里並減輕體重，對於那些可以的人，增加包括有氧運動和阻力訓練在內的適度運動將有助於加速減肥。
              </div>
              <div className="content-h3">
                最佳飲食法選擇一：地中海飲食（Mediterranean diet）
              </div>
              <div className="content-p">
                何謂地中海飲食呢？地中海飲食最早源自於地中海周圍的國家，也是一直至今都很受到推崇的健康飲食法之一。
              </div>
              <div className="content-p">
                地中海飲食法已經被證實具有許多健康益處，例如降低心血管疾病風險、降低死亡風險。飲食原則是減少加工食物的攝取，多以原型食物為主、攝取大量膳食纖維、健康油脂。
              </div>
              <div className="content-h4">地中海飲食法怎麼吃？</div>
              <ul>
                <li>全穀類、蔬菜、水果、豆類、堅果種子類、橄欖油可天天攝取</li>
                <li>魚以及海鮮一週建議兩次</li>
                <li>乳製品、蛋一週適量攝取即可</li>
                <li>紅肉、加工肉品、甜點盡可能減少攝取機率</li>
                <li>可以適量飲用紅酒</li>
                <li>攝取足夠水分</li>
              </ul>
              <div className="content-h3">
                最佳飲食法選擇二：得舒飲食法（DASH Diet）
              </div>
              <div className="content-p">
                得舒飲食法的英文全名為（Dietary Approaches to Stop
                Hypertension）其實
              </div>
              <div className="content-p">
                是一種利用飲食中的營養素來預防高血壓的一種健康的飲食方式，除了降血壓也可以減少心臟病發生的風險。這樣的飲食法適合健康者、無腎臟疾病者，若有特殊生理情況建議先與專業醫事人員進行討論在開始執行。得舒飲食以水果、蔬菜、全麥和瘦肉為主要營養素來源。相反地，飲食中紅肉類、鹽巴、添加的精製糖和脂肪含量要盡量降低。
              </div>
              <div className="content-p">
                在得舒飲食計劃中，鈉的攝取量每天不可以超過2,300 毫克 （1 茶匙）1
                茶匙，也能符合大多數國家的飲食指南，更嚴格的低鹽飲食甚至建議鈉的攝取量每天不可以超過1,500
                毫克（3/4 茶匙）。
              </div>
              <div className="content-h4">得舒飲食法飲食原則：</div>
              <div className="content-p">
                得舒飲食法鼓勵攝取天然蔬菜、水果、低脂乳品類、家禽、魚類、堅果。
                此飲食原則是透過攝取天然食物來獲得營養素，例如：鉀、鎂、鈣、膳食纖維，並降低飽和脂肪、膽固醇攝取量，利用此飲食方法可以預防高血壓。
              </div>
              <div className="content-h3">結論</div>
              <div className="content-p">
                這樣的飲食模式已流傳已久，且許多研究也證實地中海飲食法與得舒飲食法，具有多個健康效益，其中地中海飲食法的執行難易度相較於其他飲食方法，更容易長久執行。只要均衡的攝取到地中海飲食法的食物類別，以及保持適度的運動、攝取適量水分，要維持身體健康其實不難
              </div> */}
            </div>
            <div className="A-recommend ">
              <div className="d-flex  flex-row">
                <div className="left-r">
                  <a href="">
                    <div className="A-recommend-text">延伸閱讀</div>
                    <div className="A-recommend-title">標題 What is Lorem </div>
                  </a>
                </div>
                <div className="right-r">
                  <a href="">
                    <div className="A-recommend-text">下一篇</div>
                    <div className="A-recommend-title">標題 What is Lorem </div>
                  </a>
                </div>
              </div>
            </div>
            <div className="message-board">
              <div>
                <h1>
                  <BiMessageEdit />
                  <strong>留言板</strong>
                </h1>
              </div>
              <div>
                <div className="userText ">
                  <div className="">
                    <label for="content-textarea">
                      嗨囉!
                      <span className="userName ps-3 pe-3">Name</span>
                      留言分享你的想法吧！
                    </label>
                    <textarea
                      id="userText"
                      name="content"
                      className="form-control"
                      aria-label="With textarea"
                    ></textarea>
                  </div>
                  <div className="d-flex">
                    <button className="btn btn-dark ms-auto">發送</button>
                  </div>
                </div>
                <div className="userPost">
                  <div className="d-flex align-items-center mt-3">
                    <div>
                      <img src="/image/article/userhead.png" alt="" />
                    </div>
                    <span className="userName p-3">Name</span>
                    <span>2023/04/27 12:00</span>
                    {/* <button className="btn btn-dark ms-auto">回覆</button> */}
                  </div>
                  <div className="userCotent ">
                    <span>22</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-3"></div>
        </div>
      </div>
      <div className="sugges-post A-container">
        <div className="sp-title">您可能還會想看</div>
        <div className="d-flex justify-content-evenly flex-wrap d-grid gap-5">
          {shuffledArticles
            .map((articlelist) => (
              <div key={articlelist.article_id} className="card">
                <div className="card-img">
                  <img src={articlelist.cover_image} alt="" />
                </div>
                <div className="card-body">
                  <span>{articlelist.created_at}</span>
                  <h3>{articlelist.title}</h3>
                </div>
              </div>
            ))
            .slice(0, 6)}
        </div>
      </div>
      <div className="overflow-hidden">
        <footer className="row row-cols-1 row-cols-sm-2 row-cols-md-5 pt-5 px-5 border-top">
          <div className="col mb-3">
            <a
              href="/"
              className="d-flex align-items-center mb-3 link-dark text-decoration-none"
            >
              <img src="" alt="" />
            </a>
            <p className="text-muted">© 2022</p>
          </div>

          <div className="col mb-3">
            <ul className="nav flex-column">
              <li className="nav-item mb-2">
                <a href="#" className="nav-link p-0 text-light">
                  關於
                </a>
              </li>
            </ul>
          </div>

          <div className="col mb-3">
            <ul className="nav flex-column">
              <li className="nav-item mb-2">
                <a href="#" className="nav-link p-0 text-light">
                  計算機
                </a>
              </li>
            </ul>
          </div>

          <div className="col mb-3">
            <ul className="nav flex-column">
              <li className="nav-item mb-2">
                <a href="#" className="nav-link p-0 text-light">
                  商城
                </a>
              </li>
            </ul>
          </div>

          <div className="col mb-3">
            <ul className="nav flex-column" />
            <li className="nav-item mb-2">
              <a href="#" className="nav-link p-0 text-light">
                會員專區
              </a>
            </li>
          </div>
        </footer>
      </div>
    </div>
  );
}
export default Article;
