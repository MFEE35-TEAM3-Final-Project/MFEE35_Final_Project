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
  const shuffledArticles = articles.sort(() => Math.random() - 0.5); //亂數
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
    </div>
  );
}
export default Article;
