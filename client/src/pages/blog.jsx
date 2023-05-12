import React, { useState, useEffect } from "react";
import "../styles/blog.css";
import axios from "axios";
import { FaRegCommentAlt } from "react-icons/fa";
function Blog() {
  const [articles, setArticles] = useState([]);
  const [category, setCategory] = useState([]);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/api/articles?page=1&per_page=10`)
      .then((res) => {
        setArticles(res.data.articles);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);
  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    const year = date.getFullYear();
    const month = date.toLocaleString("en-US", { month: "short" });
    const day = date.getDate();
    return `${day} ${month} ${year}`;
  };
  useEffect(() => {
    if (category) {
      axios
        .get(
          `${process.env.REACT_APP_API_URL}/api/articles?page=1&per_page=10&category=${category}`
        )
        .then((res) => {
          console.log(res.data.articles);
          const formattedArticles = res.data.articles.map((article) => {
            return {
              ...article,
              created_at: formatDate(article.created_at),
              updated_at: formatDate(article.updated_at),
            };
          });
          setArticles(formattedArticles);
        })
        .catch((err) => {
          console.error(err);
        });
    }
  }, [category]);
  const handleClickCategory = (category) => {
    setCategory(category);
  };

  return (
    <div>
      <div className=" F-container mt-5">
        <div className="row g-5">
          <div className="col-lg-7 col-12">
            <div className="B-Title">.NEW</div>
            <div className="newpost">
              <div
                id="carouselExampleControls"
                className="carousel slide "
                data-bs-ride="carousel"
              >
                <div className="carousel-inner">
                  <div className="carousel-item active newimgbox">
                    <div className="carousel-imgtext-box">
                      <h1>大標題</h1>
                      <span>小標題</span>
                    </div>
                    <img
                      src="/image/blog/carousel1.jpg"
                      className="d-block w-100 img-fluid"
                      alt="..."
                    />
                  </div>
                  <div className="carousel-item newimgbox">
                    <div className="carousel-imgtext-box">
                      <h1>大標題</h1>
                      <span>小標題</span>
                    </div>
                    <img
                      src="/image/blog/carousel2.jpg"
                      className="d-block w-100 img-fluid"
                      alt="..."
                    />
                  </div>
                  <div className="carousel-item newimgbox">
                    <div className="carousel-imgtext-box">
                      <h1>大標題</h1>
                      <span>小標題</span>
                    </div>
                    <img
                      src="/image/blog/carousel3.jpg"
                      className="d-block w-100 img-fluid"
                      alt="..."
                    />
                  </div>
                </div>
                <button
                  className="carousel-control-prev"
                  type="button"
                  data-bs-target="#carouselExampleControls"
                  data-bs-slide="prev"
                >
                  <span
                    className="carousel-control-prev-icon"
                    aria-hidden="true"
                  ></span>
                  <span className="visually-hidden">Previous</span>
                </button>
                <button
                  className="carousel-control-next"
                  type="button"
                  data-bs-target="#carouselExampleControls"
                  data-bs-slide="next"
                >
                  <span
                    className="carousel-control-next-icon"
                    aria-hidden="true"
                  ></span>
                  <span className="visually-hidden">Next</span>
                </button>
              </div>
            </div>
          </div>
          <div className="col-lg-5 col-12">
            <div className="B-Title">.POPULAR</div>
            <div className="row g-0 pe-5 popular">
              <a href="/">
                <div className="col-12 d-flex flex-md-row ">
                  <div className="popular-img  me-md-3">
                    <img
                      src="/image/blog/popular1.jpg"
                      alt=""
                      className="img-fluid"
                    />
                  </div>
                  <div className="popular-text">
                    <h5>素食、葷食 哪種飲食型態對跑步表現較好?</h5>
                    <span>
                      無論做任何運動，營養補給都是影響運動表現相當重要的關鍵...
                    </span>
                  </div>
                </div>
              </a>
              <a href="/">
                <div className="col-12  d-flex flex-md-row popular-img-pad">
                  <div className="popular-img  me-md-3">
                    <img
                      src="/image/blog/popular2.jpg"
                      alt=""
                      className="img-fluid"
                    />
                  </div>
                  <div className="popular-text">
                    <h5>吃素就一定比較健康嗎？研究結果和你想得不一樣</h5>
                    <span>選擇吃素的朋友可能有各種不同的初衷...</span>
                  </div>
                </div>
              </a>
              <a href="/">
                <div className="col-12 d-flex flex-md-row">
                  <div className="popular-img me-md-3">
                    <img
                      src="/image/blog/popular3.jpg"
                      alt=""
                      className="img-fluid"
                    />
                  </div>
                  <div className="popular-text">
                    <h5>靠TDEE與基礎代謝率BMR計算機就能減肥？</h5>
                    <span>
                      其實快速減肥的方法有好多種，生酮、低醣（低碳）飲食、間歇性斷食⋯
                    </span>
                  </div>
                </div>
              </a>
            </div>
          </div>
        </div>
        <div className="Title">.Category</div>
        <div className="classify row g-0 nav nav-tabs" role="tablist">
          <div className="classify-img col-md-1 col-12">
            <a
              className="active"
              data-bs-toggle="tab"
              href="HEALTHY"
              role="tab"
              aria-controls="HEALTHY"
              aria-selected="true"
              tabIndex="0"
              onClick={() => handleClickCategory([])}
            >
              <img src="/image/blog/all.jpg" className="img-fluid" alt="" />
              <div>ALL</div>
            </a>
          </div>
          <div className="classify-img col-md-1 col-12">
            <a
              className="active"
              data-bs-toggle="tab"
              href="HEALTHY"
              role="tab"
              aria-controls="HEALTHY"
              aria-selected="true"
              tabIndex="0"
              onClick={() => handleClickCategory("HEALTHY")}
            >
              <img src="/image/blog/healthy.png" className="img-fluid" alt="" />
              <div>HEALTHY</div>
            </a>
          </div>
          <div className="classify-img col-md-1 col-12">
            <a
              className=""
              data-bs-toggle="tab"
              role="tab"
              href="#FITNESS"
              aria-controls="FITNESS"
              aria-selected="true"
              tabIndex="0"
              onClick={() => handleClickCategory("FITNESS")}
            >
              <img
                src="/image/blog/fitness.jpg"
                className="img-fluid "
                alt=""
              />
              <div>FITNESS</div>
            </a>
          </div>
          <div className="classify-img col-md-1 col-12">
            <a
              className=""
              data-bs-toggle="tab"
              href="#NUTRITION"
              role="tab"
              aria-controls="NUTRITION"
              aria-selected="true"
              tabIndex="0"
              onClick={() => handleClickCategory("NUTRITION")}
            >
              <img
                src="/image/blog/nutrition.jpg"
                className="img-fluid"
                alt=""
              />
              <div>NUTRITION</div>
            </a>
          </div>
        </div>
        <div className="articlelist">
          <div className="row g-0  tab-content">
            <div
              className="col-lg-8 col-md-12 flex-column fade tab-pane show active"
              id="HEALTHY"
            >
              {articles.map((article) => (
                <div key={article.article_id} className="article  d-flex row">
                  <div className=" col-md-6 col-12 article-img">
                    <div>
                      <a href={`/article/${article.article_id}`}>
                        <img
                          src={article.cover_image}
                          alt=""
                          className="img-fluid"
                        />
                      </a>
                    </div>
                  </div>
                  <div className="col-md-6 col-12 article-text ms-5 d-flex flex-column">
                    <div>
                      <a href={`/article/${article.article_id}`}>
                        <span>{article.created_at}</span>
                        <h1>{article.title}</h1>
                        {article.sub_title}
                      </a>
                    </div>
                    <div className=" d-flex mt-auto">
                      <span className="ms-auto">
                        <FaRegCommentAlt value={{ className: "react-icons" }} />
                        <span className="ms-2">{article.is_published}</span>
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Blog;
