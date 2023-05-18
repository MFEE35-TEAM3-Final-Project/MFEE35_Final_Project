import "../styles/article.css";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { BiMessageEdit } from "react-icons/bi";

function Article() {
  const [article, setArticle] = useState([]);
  const [articles, setArticles] = useState([]);
  const [message, setMessage] = useState("");
  const { id } = useParams();
  const [dataLoaded, setDataLoaded] = useState(false);
  const [nextArticleId, setNextArticleId] = useState(""); //下一篇文章
  const [comments, setComments] = useState([]);
  // const [isAuthorization, setIsAuthorization] = useState(false)
  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    const year = date.getFullYear();
    const month = date.toLocaleString("en-US", { month: "short" });
    const day = date.getDate();
    return `${day} ${month} ${year}`;
  };
  //抓取本篇文章內容標題
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/api/articles/id=${id}`)
      .then((res) => {
        setArticle(res.data.article);
        console.log(formatDate(res.data.article.created_at));
      })
      .catch((err) => {
        console.error(err);
      });
  }, [id]);

  //抓取文章
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/api/articles?per_page=40`)
      .then((res) => {
        setDataLoaded(true);
        console.log(res.data.articles);
        // 找文章索引
        const currentIndex = res.data.articles.findIndex(
          (article) => article.article_id === id
        );
        console.log(currentIndex);
        // 下一篇文章id
        if (
          currentIndex !== -1 &&
          currentIndex < res.data.articles.length - 1
        ) {
          setNextArticleId(res.data.articles[currentIndex + 1]);
        }
        //亂數
        const shuffledData = res.data.articles.sort(() => Math.random() - 0.5);

        //時間
        const formattedArticles = shuffledData.map((article) => {
          return {
            ...article,
            created_at: formatDate(article.created_at),
            updated_at: formatDate(article.updated_at),
          };
        });
        setArticles(formattedArticles);
        console.log(formattedArticles)
      })
      .catch((err) => {
        console.error(err);
      });
  }, [id]);
  //留言板
  const commentDate = (dateSr) => {
    const date = new Date(dateSr);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const hours = date.getHours();
    const minutes = date.getMinutes();

    const commenttedDate = `${year}/${String(month).padStart(2, "0")}/${String(
      day
    ).padStart(2, "0")}`;
    const commenttedTime = `${String(hours).padStart(2, "0")}:${String(
      minutes
    ).padStart(2, "0")}`;

    return `${commenttedDate} ${commenttedTime}`;
  };
  useEffect(() => {
    axios
      .get(
        `${process.env.REACT_APP_API_URL}/api/articles/article_comments/article_id=${id}`
      )
      .then((res) => {
        // setDataLoaded(true);
        console.log(res.data);
        const comments = res.data.comments.map((comment) => {
          return {
            ...comment,
            comment_time: commentDate(comment.comment_time),
            updated_at: commentDate(comment.updated_at),
          };
        });
        setComments(comments);
        console.log(comments);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);
  //判斷會員

  const sendMessage = async () => {
    try {
      const jwtToken =
        "JWT eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI3MjcxMjQyMzU0IiwiZW1haWwiOiJ0ZXN0MDUxNkB0ZXN0LmNvbSIsImV4cCI6MTY5MzAyMzA4MzgwMywiaWF0IjoxNjg0MzgzMDgzfQ.EnY2PeAYegAmAJCI-C7VP0vflHaTkkLwM1CPunjbRFY";
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/user/article_comments/article_id=${id}`,
        {
          comment: message,
        },
        {
          headers: {
            Authorization: jwtToken,
          },
        }
      );
      setMessage("");
      console.log(response.data);
      window.location.reload();
    } catch (error) {
      console.error(error);
    }
  };
  const userTextMes = (event) => {
    // console.log(id);
    setMessage(event.target.value);
  };

  if (comments === null) {
  }
  if (!dataLoaded) {
    return <div>載入中..</div>;
  }
  return (
    <div>
      <div className="A-article">
        <div className="row g-0">
          <div className="col-3 ">
            {/* <div className="s-title">
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
            </div> */}
          </div>
          <div className="col-6 ">
            <div className="content">
              <div>
                <div class="content-title">
                  {article.title}
                  <span>{formatDate(article.created_at)}</span>
                </div>
                <div
                  className="content-p"
                  dangerouslySetInnerHTML={{ __html: `${article.content}` }}
                />
              </div>
            </div>
            <div className="A-recommend ">
              <div className="d-flex  flex-row">
                <div className="left-r">
                  <a href={articles[0].article_id}>
                    <div className="A-recommend-text">延伸閱讀</div>
                    <div className="A-recommend-title">{articles[0].title}</div>
                  </a>
                </div>
                <div className="right-r">
                  <a href={nextArticleId.article_id}>
                    <div className="A-recommend-text">下一篇</div>
                    <div className="A-recommend-title">
                      {nextArticleId.title}{" "}
                    </div>
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
                    <label htmlFor="content-textarea">
                      嗨囉!
                      <span className="userName ps-3 pe-3">登入抓使用者</span>
                      留言分享你的想法吧！
                    </label>
                    <textarea
                      id="userText"
                      name="content"
                      value={message}
                      onChange={userTextMes}
                      className="form-control"
                      aria-label="With textarea"
                    ></textarea>
                  </div>
                  <div className="d-flex">
                    <button
                      className="btn btn-dark ms-auto"
                      onClick={sendMessage}
                    >
                      發送
                    </button>
                  </div>
                </div>
                {comments.length === 0 ? (
                  <div className="nocomment">尚無留言</div>
                ) : (
                  comments.map((commentsList) => (
                    <div key={commentsList.comment_id} className="userPost">
                      <div className="d-flex align-items-center mt-3">
                        <div className="headimg">
                          <img
                           src={commentsList.user.avatar ? commentsList.user.avatar : require("../image/article/userhead.png")}
                            alt=""
                          />
                        </div>
                        <span className="userName p-3 commentName">
                          {commentsList.user.username}
                        </span>
                        <span className="d-flex ms-auto commentTime">
                          {commentsList.comment_time}
                        </span>
                        {/* <button className="btn btn-dark ms-auto">回覆</button> */}
                      </div>
                      <div className="userCotent ">
                        <span>{commentsList.comment}</span>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
          <div className="col-3"></div>
        </div>
      </div>
      <div className="sugges-post A-container">
        <div className="sp-title">您可能還會想看</div>
        <div className="d-flex justify-content-evenly flex-wrap d-grid gap-5">
          {articles
            .map((articlelist) => (
              <div
                key={articlelist.article_id}
                className="card"
                id="cardforuser"
              >
                <div className="card-img">
                  <img src={`${articlelist.cover_image}.jpeg`} alt="" />
                </div>
                <div className="card-body c-bodylink">
                  <a href={articlelist.article_id}>
                    <span>{articlelist.created_at}</span>
                    <h3>{articlelist.title}</h3>
                  </a>
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
