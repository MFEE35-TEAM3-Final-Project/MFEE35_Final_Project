import React, { useState, useEffect } from "react";
import "../styles/blog.css";
import axios from "axios";
import { HiShoppingBag, HiArrowNarrowRight } from "react-icons/hi";
import { GrNext, GrPrevious } from "react-icons/gr";
import Nav from "../components/Nav";

function Blog() {
  const [articles, setArticles] = useState([]);
  const [allarticles, setAllarticles] = useState();
  const [category, setCategory] = useState([]);
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState();
  const [dataLoaded, setDataLoaded] = useState(false);
  const [productlist, setProductlist] = useState([]);

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    const year = date.getFullYear();
    const month = date.toLocaleString("en-US", { month: "short" });
    const day = date.getDate();
    return `${day} ${month} ${year}`;
  };
  //分類
  useEffect(() => {
    axios
      .get(
        `${process.env.REACT_APP_API_URL}/api/articles?page=${page}&per_page=6&category=${category}`
      )
      .then((res) => {
        const formattedArticles = res.data.articles.map((article) => {
          return {
            ...article,
            created_at: formatDate(article.created_at),
            updated_at: formatDate(article.updated_at),
          };
        });
        setArticles(formattedArticles);
        setPagination(res.data.pagination);
        console.log(res.data.pagination);
        setDataLoaded(true);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [category, page]);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/api/articles?page=1&per_page=30`)
      .then((res) => {
        console.log(res.data.articles);

        setAllarticles(res.data.articles.sort(() => Math.random() - 0.5));
      })
      .catch((err) => {
        console.error(err);
      });
  }, [setAllarticles]);
  //商品
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/api/product/getProducts`)
      .then((res) => {
        console.log(res.data.results.sort(() => Math.random() - 0.5));
        setProductlist(res.data.results.sort(() => Math.random() - 0.5));
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);
  const handleClickCategory = (category) => {
    setCategory(category);
  };
  const handleClickPage = (page) => {
    setPage(page);
  };

  useEffect(() => {
    setPage(1);
  }, [category]);

  if (!dataLoaded) {
    return <div>載入中..</div>;
  }
  if (!articles || !allarticles) {
    return <div>載入中...</div>;
  }
  return (
    <div>
      <Nav />
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
                      <h1>健康飲食怎麼吃？營養師曝「最佳飲食法」</h1>
                      <span>民以食為天，飲食文化是各個國家都在關注的...</span>
                    </div>
                    <img
                      src={require("../image/blog/carousel1.jpg")}
                      className="d-block w-100 img-fluid"
                      alt="..."
                    />
                  </div>
                  <div className="carousel-item newimgbox">
                    <div className="carousel-imgtext-box">
                      <h1>減肥餐自己煮！5個低卡便當食譜公開!</h1>
                      <span>
                        烤雞腿、糖醋排骨通通有，熱量低又美味減肥超有感...
                      </span>
                    </div>
                    <img
                      src={require("../image/blog/carousel2.jpg")}
                      className="d-block w-100 img-fluid"
                      alt="..."
                    />
                  </div>
                  <div className="carousel-item newimgbox">
                    <div className="carousel-imgtext-box">
                      <h1>把握3招4式，外食族也能吃出健康與滿足！</h1>
                      <span>面對忙碌的生活，外食方便與快速的特性...</span>
                    </div>
                    <img
                      src={require("../image/blog/carousel3.jpg")}
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
                      src={require("../image/blog/popular1.jpg")}
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
                      src={require("../image/blog/popular2.jpg")}
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
                      src={require("../image/blog/popular3.jpg")}
                      alt=""
                      className="img-fluid"
                    />
                  </div>
                  <div className="popular-text">
                    <h5>靠tdee與基礎代謝率BMR計算機就能減肥？</h5>
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
          <div className="classify-img col-md-3 col-12">
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
              <img
                src={require("../image/blog/all.jpg")}
                className="img-fluid"
                alt=""
              />
              <div>ALL</div>
            </a>
          </div>
          <div className="classify-img col-md-3 col-12">
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
              <img
                src={require("../image/blog/healthy.png")}
                className="img-fluid"
                alt=""
              />
              <div>HEALTHY</div>
            </a>
          </div>
          <div className="classify-img col-md-3 col-12">
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
                src={require("../image/blog/fitness.jpg")}
                className="img-fluid "
                alt=""
              />
              <div>FITNESS</div>
            </a>
          </div>
          <div className="classify-img col-md-3 col-12">
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
                src={require("../image/blog/nutrition.jpg")}
                className="img-fluid"
                alt=""
              />
              <div>NUTRITION</div>
            </a>
          </div>
        </div>
        <div className="articlelist">
          <div className="row g-4   d-flex ">
            <div className="col-lg-8 col-md-12    flex-wrap">
              {articles.map((article) => (
                <div
                  key={article.article_id}
                  className="article  d-flex flex-row "
                >
                  <div className="  article-img">
                    <div>
                      <a href={`/article/${article.article_id}`}>
                        <img
                          src={article.cover_image}
                          // src={`${article.cover_image}.jpeg`}
                          alt=""
                          // className="img-fluid"
                        />
                      </a>
                    </div>
                  </div>
                  <div className=" article-text ms-5 d-flex flex-column">
                    <div>
                      <a href={`/article/${article.article_id}`}>
                        <span>{article.created_at}</span>
                        <h1>{article.title}</h1>
                        {article.sub_title}
                      </a>
                    </div>
                    <div className=" d-flex mt-auto">
                      <span className="ms-auto">
                        {/* <FaRegCommentAlt value={{ className: "react-icons" }} /> */}
                        {/* <span className="ms-2">0</span> */}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
              <div className="pageNav">
                <nav className="" aria-label="Page navigation">
                  <ul className=" pagination">
                    <li className="">
                      <button
                        className={`${
                          pagination.current_page === 1
                            ? "pagenone"
                            : "pageButton-next"
                        }`}
                        onClick={() =>
                          handleClickPage(pagination.current_page - 1)
                        }
                      >
                        <GrPrevious />
                      </button>
                    </li>
                    {Array.from(
                      { length: pagination.total_pages },
                      (item, index) => index + 1
                    ).map((pageNumber) => (
                      <li key={pageNumber} className="pageButton-li ">
                        <button
                          className={`pageButton  ${
                            pageNumber === pagination.current_page
                              ? "pagefucus"
                              : ""
                          }`}
                          onClick={() => handleClickPage(pageNumber)}
                        >
                          {pageNumber}
                        </button>
                      </li>
                    ))}

                    <li className="">
                      <button
                        className={`${
                          pagination.current_page === pagination.total_pages
                            ? "pagenone"
                            : "pageButton-next"
                        }`}
                        onClick={() =>
                          handleClickPage(pagination.current_page + 1)
                        }
                      >
                        <GrNext />
                      </button>
                    </li>
                  </ul>
                </nav>
              </div>
            </div>
            <div className="col-lg-3 sidebar">
              <div className="s-post ">
                <div className="B-Title">.Today's Top Posts</div>
                {allarticles
                  .map((allarticle) => (
                    <div
                      className="toppost d-flex flex-row "
                      key={allarticle.article_id}
                    >
                      <a href={`/article/${allarticle.article_id}`}>
                        <img
                          src={allarticle.cover_image}
                          alt=""
                          className="img-fluid"
                        />
                      </a>

                      <div>
                        <a href={`/article/${allarticle.article_id}`}>
                          {allarticle.title}
                        </a>
                      </div>
                    </div>
                  ))
                  .slice(0, 3)}
                <div className="adboard">
                  {productlist
                    .map((product) => (
                      <div className="adbox" key={product.productid}>
                        <img src={product.image[0]} alt="" />
                        <div className="adboxbuy">
                          推薦商品
                          <br />
                          馬上看
                        </div>
                        <div className="overlay">
                          <a
                            href={`/goods/${product.productid}/${product.activityId}/${product.food_id}`}
                          >
                            <div className="overlay-item">
                              <div className="overlay-item-name">
                                {product.name}
                              </div>
                              <div className="overlay-item-price">
                                <span>$ {product.price}</span>
                                <br />
                                <span>$ {product.afterPrice} </span>
                              </div>
                              <div className="overlay-item-buy ">
                                <HiShoppingBag /> 前往商品頁{" "}
                                <HiArrowNarrowRight />
                              </div>
                            </div>
                          </a>
                        </div>
                      </div>
                    ))
                    .slice(0, 1)}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Blog;
