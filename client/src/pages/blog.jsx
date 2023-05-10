import React from "react";
import "../styles/blog.css";
function Blog() {
  return (
    <div>
      <div className=" F-container mt-5">
        <div className="row g-5">
          <div className="col-lg-7 col-12">
            <div className="newpost">
              <div
                id="carouselExampleControls"
                className="carousel slide"
                data-bs-ride="carousel"
              >
                <div className="carousel-inner">
                  <div className="carousel-item active">
                    <img src="..." className="d-block w-100" alt="..." />
                  </div>
                  <div className="carousel-item">
                    <img src="..." className="d-block w-100" alt="..." />
                  </div>
                  <div className="carousel-item">
                    <img src="..." className="d-block w-100" alt="..." />
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
            <div className="row g-4 pe-5 popular">
              <a href="/">
                <div className="col-12 d-flex flex-md-row">
                  <div className="popular-img me-4">
                    <img src="./test.jpg" alt="" />
                  </div>
                  <div className="popular-text">
                    <h5>What is Lorem</h5>
                    <p>
                      Lorem Ipsum is simply dummy text of the printing and
                      typesetting industry.
                      LoremLoremLoremLoremLoremLoremLoremLoremLoremLorem
                    </p>
                  </div>
                </div>
              </a>
              <a href="/">
                <div className="col-12 d-flex flex-md-row">
                  <div className="popular-img me-4">
                    <img src="./test.jpg" alt="" />
                  </div>
                  <div className="popular-text">
                    <h5>What is Lorem</h5>
                    <p>
                      Lorem Ipsum is simply dummy text of the printing and
                      typesetting industry.
                      LoremLoremLoremLoremLoremLoremLoremLoremLoremLorem
                    </p>
                  </div>
                </div>
              </a>
              <a href="/">
                <div className="col-12 d-flex flex-md-row">
                  <div className="popular-img me-4">
                    <img src="./test.jpg" alt="" />
                  </div>
                  <div className="popular-text">
                    <h5>What is Lorem</h5>
                    <p>
                      Lorem Ipsum is simply dummy text of the printing and
                      typesetting industry.
                      LoremLoremLoremLoremLoremLoremLoremLoremLoremLorem
                    </p>
                  </div>
                </div>
              </a>
            </div>
          </div>
        </div>
        <div className="classify row g-0 nav nav-tabs" role="tablist">
          <div className="classify-img col-md-4 col-12">
            <a
              className="active"
              data-bs-toggle="tab"
              href="#HEALTHY"
              role="tab"
              aria-controls="HEALTHY"
              aria-selected="true"
              tabIndex="0"
            >
              <img src="/image/blog/healthy.png" className="img-fluid" alt="" />
              <div>HEALTHY</div>
            </a>
          </div>
          <div className="classify-img col-md-4 col-12">
            <a
              className=""
              data-bs-toggle="tab"
              role="tab"
              href="#FITNESS"
              aria-controls="FITNESS"
              aria-selected="true"
              tabIndex="0"
            >
              <img
                src="/image/blog/fitness.jpg"
                className="img-fluid "
                alt=""
              />
              <div>FITNESS</div>
            </a>
          </div>
          <div className="classify-img col-md-4 col-12">
            <a
              className=""
              data-bs-toggle="tab"
              href="#NUTRITION"
              role="tab"
              aria-controls="NUTRITION"
              aria-selected="true"
              tabIndex="0"
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
              <div className="article  d-flex align-items-center row">
                <a href="/">
                  <div className=" col-md-6 col-12 article-img">
                    <div>
                      <img
                        src="./1c4e27dcfbe370a7f4cd4b5243d88bc2.jpg"
                        alt=""
                        className="img-fluid"
                      />
                    </div>
                  </div>
                  <div className="article-text col-6 ms-5">
                    <span>19 jan 2023</span>
                    <h1>HEALTHY</h1>
                    <p>
                      Lorem Ipsum is simply dummy text of the printing and
                      typesetting industry. Lorem Ipsum has been the industry's
                      standard dummy text ever since the 1500s, when an u Lorem
                      Ipsum is simply dummy text of the printing and typesetting
                      industry. Lorem Ipsum has been the industry's standard
                      dummy text ever since the 1500s, when an u
                    </p>
                    <div className="Userfeedback d-flex flex-row">
                      <span>
                        <img src="./images/conversation.png" alt="" />
                        100
                      </span>
                      <span className="ms-auto">
                        <img src="./images/send.png" alt="" />
                      </span>
                    </div>
                  </div>
                </a>
              </div>

              <div className="article  d-flex align-items-center row">
                <a href="/">
                  <div className=" col-md-6 col-12 article-img">
                    <div>
                      <img
                        src="./1c4e27dcfbe370a7f4cd4b5243d88bc2.jpg"
                        alt=""
                        className="img-fluid"
                      />
                    </div>
                  </div>
                  <div className="article-text col-6 ms-5">
                    <span>19 jan 2023</span>
                    <h1>What is Lorem</h1>
                    <p>
                      Lorem Ipsum is simply dummy text of the printing and
                      typesetting industry. Lorem Ipsum has been the industry's
                      standard dummy text ever since the 1500s, when an u Lorem
                      Ipsum is simply dummy text of the printing and typesetting
                      industry. Lorem Ipsum has been the industry's standard
                      dummy text ever since the 1500s, when an u
                    </p>
                    <div className="Userfeedback d-flex flex-row">
                      <span>
                        <img src="./images/conversation.png" alt="" />
                        100
                      </span>
                      <span className="ms-auto">
                        <img src="./images/send.png" alt="" />
                      </span>
                    </div>
                  </div>
                </a>
              </div>

              <div className="article  d-flex align-items-center row">
                <a href="/">
                  <div className=" col-md-6 col-12 article-img">
                    <div>
                      <img
                        src="./1c4e27dcfbe370a7f4cd4b5243d88bc2.jpg"
                        alt=""
                        className="img-fluid"
                      />
                    </div>
                  </div>
                  <div className="article-text col-6 ms-0 ms-md-5">
                    <span>19 jan 2023</span>
                    <h1>What is Lorem</h1>
                    <p>
                      Lorem Ipsum is simply dummy text of the printing and
                      typesetting industry. Lorem Ipsum has been the industry's
                      standard dummy text ever since the 1500s, when an u Lorem
                      Ipsum is simply dummy text of the printing and typesetting
                      industry. Lorem Ipsum has been the industry's standard
                      dummy text ever since the 1500s, when an u
                    </p>
                    <div className="Userfeedback d-flex flex-row">
                      <span>
                        <img src="./images/conversation.png" alt="" />
                        100
                      </span>
                      <span className="ms-auto">
                        <img src="./images/send.png" alt="" />
                      </span>
                    </div>
                  </div>
                </a>
              </div>
              <div className="article  d-flex align-items-center row">
                <a href="/">
                  <div className=" col-md-6 col-12 article-img">
                    <div>
                      <img
                        src="./1c4e27dcfbe370a7f4cd4b5243d88bc2.jpg"
                        alt=""
                        className="img-fluid"
                      />
                    </div>
                  </div>
                  <div className="article-text col-6 ms-5">
                    <span>19 jan 2023</span>
                    <h1>What is Lorem</h1>
                    <p>
                      Lorem Ipsum is simply dummy text of the printing and
                      typesetting industry. Lorem Ipsum has been the industry's
                      standard dummy text ever since the 1500s, when an u Lorem
                      Ipsum is simply dummy text of the printing and typesetting
                      industry. Lorem Ipsum has been the industry's standard
                      dummy text ever since the 1500s, when an u
                    </p>
                    <div className="Userfeedback d-flex flex-row">
                      <span>
                        <img src="./images/conversation.png" alt="" />
                        100
                      </span>
                      <span className="ms-auto">
                        <img src="./images/send.png" alt="" />
                      </span>
                    </div>
                  </div>
                </a>
              </div>
              <div className="article  d-flex align-items-center row">
                <a href="/">
                  <div className=" col-md-6 col-12 article-img">
                    <div>
                      <img
                        src="./1c4e27dcfbe370a7f4cd4b5243d88bc2.jpg"
                        alt=""
                        className="img-fluid"
                      />
                    </div>
                  </div>
                  <div className="article-text col-6 ms-5">
                    <span>19 jan 2023</span>
                    <h1>What is Lorem</h1>
                    <p>
                      Lorem Ipsum is simply dummy text of the printing and
                      typesetting industry. Lorem Ipsum has been the industry's
                      standard dummy text ever since the 1500s, when an u Lorem
                      Ipsum is simply dummy text of the printing and typesetting
                      industry. Lorem Ipsum has been the industry's standard
                      dummy text ever since the 1500s, when an u
                    </p>
                    <div className="Userfeedback d-flex flex-row">
                      <span>
                        <img src="./images/conversation.png" alt="" />
                        100
                      </span>
                      <span className="ms-auto">
                        <img src="./images/send.png" alt="" />
                      </span>
                    </div>
                  </div>
                </a>
              </div>
            </div>
            <div
              className="col-lg-8 col-md-12 flex-column fade tab-pane "
              id="FITNESS"
            >
              <div className="article  d-flex align-items-center row">
                <a href="/">
                  <div className=" col-md-6 col-12 article-img">
                    <div>
                      <img
                        src="./1c4e27dcfbe370a7f4cd4b5243d88bc2.jpg"
                        alt=""
                        className="img-fluid"
                      />
                    </div>
                  </div>
                  <div className="article-text col-6 ms-5">
                    <span>19 jan 2023</span>
                    <h1>FITNESS</h1>
                    <p>
                      Lorem Ipsum is simply dummy text of the printing and
                      typesetting industry. Lorem Ipsum has been the industry's
                      standard dummy text ever since the 1500s, when an u Lorem
                      Ipsum is simply dummy text of the printing and typesetting
                      industry. Lorem Ipsum has been the industry's standard
                      dummy text ever since the 1500s, when an u
                    </p>
                    <div className="Userfeedback d-flex flex-row">
                      <span>
                        <img src="./images/conversation.png" alt="" />
                        100
                      </span>
                      <span className="ms-auto">
                        <img src="./images/send.png" alt="" />
                      </span>
                    </div>
                  </div>
                </a>
              </div>

              <div className="article  d-flex align-items-center row">
                <a href="/">
                  <div className=" col-md-6 col-12 article-img">
                    <div>
                      <img
                        src="./1c4e27dcfbe370a7f4cd4b5243d88bc2.jpg"
                        alt=""
                        className="img-fluid"
                      />
                    </div>
                  </div>
                  <div className="article-text col-6 ms-5">
                    <span>19 jan 2023</span>
                    <h1>What is Lorem</h1>
                    <p>
                      Lorem Ipsum is simply dummy text of the printing and
                      typesetting industry. Lorem Ipsum has been the industry's
                      standard dummy text ever since the 1500s, when an u Lorem
                      Ipsum is simply dummy text of the printing and typesetting
                      industry. Lorem Ipsum has been the industry's standard
                      dummy text ever since the 1500s, when an u
                    </p>
                    <div className="Userfeedback d-flex flex-row">
                      <span>
                        <img src="./images/conversation.png" alt="" />
                        100
                      </span>
                      <span className="ms-auto">
                        <img src="./images/send.png" alt="" />
                      </span>
                    </div>
                  </div>
                </a>
              </div>

              <div className="article  d-flex align-items-center row">
                <a href="/">
                  <div className=" col-md-6 col-12 article-img">
                    <div>
                      <img
                        src="./1c4e27dcfbe370a7f4cd4b5243d88bc2.jpg"
                        alt=""
                        className="img-fluid"
                      />
                    </div>
                  </div>
                  <div className="article-text col-6 ms-0 ms-md-5">
                    <span>19 jan 2023</span>
                    <h1>What is Lorem</h1>
                    <p>
                      Lorem Ipsum is simply dummy text of the printing and
                      typesetting industry. Lorem Ipsum has been the industry's
                      standard dummy text ever since the 1500s, when an u Lorem
                      Ipsum is simply dummy text of the printing and typesetting
                      industry. Lorem Ipsum has been the industry's standard
                      dummy text ever since the 1500s, when an u
                    </p>
                    <div className="Userfeedback d-flex flex-row">
                      <span>
                        <img src="./images/conversation.png" alt="" />
                        100
                      </span>
                      <span className="ms-auto">
                        <img src="./images/send.png" alt="" />
                      </span>
                    </div>
                  </div>
                </a>
              </div>
              <div className="article  d-flex align-items-center row">
                <a href="/">
                  <div className=" col-md-6 col-12 article-img">
                    <div>
                      <img
                        src="./1c4e27dcfbe370a7f4cd4b5243d88bc2.jpg"
                        alt=""
                        className="img-fluid"
                      />
                    </div>
                  </div>
                  <div className="article-text col-6 ms-5">
                    <span>19 jan 2023</span>
                    <h1>What is Lorem</h1>
                    <p>
                      Lorem Ipsum is simply dummy text of the printing and
                      typesetting industry. Lorem Ipsum has been the industry's
                      standard dummy text ever since the 1500s, when an u Lorem
                      Ipsum is simply dummy text of the printing and typesetting
                      industry. Lorem Ipsum has been the industry's standard
                      dummy text ever since the 1500s, when an u
                    </p>
                    <div className="Userfeedback d-flex flex-row">
                      <span>
                        <img src="./images/conversation.png" alt="" />
                        100
                      </span>
                      <span className="ms-auto">
                        <img src="./images/send.png" alt="" />
                      </span>
                    </div>
                  </div>
                </a>
              </div>
              <div className="article  d-flex align-items-center row">
                <a href="/">
                  <div className=" col-md-6 col-12 article-img">
                    <div>
                      <img
                        src="./1c4e27dcfbe370a7f4cd4b5243d88bc2.jpg"
                        alt=""
                        className="img-fluid"
                      />
                    </div>
                  </div>
                  <div className="article-text col-6 ms-5">
                    <span>19 jan 2023</span>
                    <h1>What is Lorem</h1>
                    <p>
                      Lorem Ipsum is simply dummy text of the printing and
                      typesetting industry. Lorem Ipsum has been the industry's
                      standard dummy text ever since the 1500s, when an u Lorem
                      Ipsum is simply dummy text of the printing and typesetting
                      industry. Lorem Ipsum has been the industry's standard
                      dummy text ever since the 1500s, when an u
                    </p>
                    <div className="Userfeedback d-flex flex-row">
                      <span>
                        <img src="./images/conversation.png" alt="" />
                        100
                      </span>
                      <span className="ms-auto">
                        <img src="./images/send.png" alt="" />
                      </span>
                    </div>
                  </div>
                </a>
              </div>
            </div>
            <div
              className="col-lg-8 col-md-12 flex-column fade tab-pane show "
              id="NUTRITION"
            >
              <div className="article  d-flex align-items-center row">
                <a href="/">
                  <div className=" col-md-6 col-12 article-img">
                    <div>
                      <img
                        src="./1c4e27dcfbe370a7f4cd4b5243d88bc2.jpg"
                        alt=""
                        className="img-fluid"
                      />
                    </div>
                  </div>
                  <div className="article-text col-6 ms-5">
                    <span>19 jan 2023</span>
                    <h1>NUTRITION</h1>
                    <p>
                      Lorem Ipsum is simply dummy text of the printing and
                      typesetting industry. Lorem Ipsum has been the industry's
                      standard dummy text ever since the 1500s, when an u Lorem
                      Ipsum is simply dummy text of the printing and typesetting
                      industry. Lorem Ipsum has been the industry's standard
                      dummy text ever since the 1500s, when an u
                    </p>
                    <div className="Userfeedback d-flex flex-row">
                      <span>
                        <img src="./images/conversation.png" alt="" />
                        100
                      </span>
                      <span className="ms-auto">
                        <img src="./images/send.png" alt="" />
                      </span>
                    </div>
                  </div>
                </a>
              </div>

              <div className="article  d-flex align-items-center row">
                <a href="/">
                  <div className=" col-md-6 col-12 article-img">
                    <div>
                      <img
                        src="./1c4e27dcfbe370a7f4cd4b5243d88bc2.jpg"
                        alt=""
                        className="img-fluid"
                      />
                    </div>
                  </div>
                  <div className="article-text col-6 ms-5">
                    <span>19 jan 2023</span>
                    <h1>What is Lorem</h1>
                    <p>
                      Lorem Ipsum is simply dummy text of the printing and
                      typesetting industry. Lorem Ipsum has been the industry's
                      standard dummy text ever since the 1500s, when an u Lorem
                      Ipsum is simply dummy text of the printing and typesetting
                      industry. Lorem Ipsum has been the industry's standard
                      dummy text ever since the 1500s, when an u
                    </p>
                    <div className="Userfeedback d-flex flex-row">
                      <span>
                        <img src="./images/conversation.png" alt="" />
                        100
                      </span>
                      <span className="ms-auto">
                        <img src="./images/send.png" alt="" />
                      </span>
                    </div>
                  </div>
                </a>
              </div>

              <div className="article  d-flex align-items-center row">
                <a href="/">
                  <div className=" col-md-6 col-12 article-img">
                    <div>
                      <img
                        src="./1c4e27dcfbe370a7f4cd4b5243d88bc2.jpg"
                        alt=""
                        className="img-fluid"
                      />
                    </div>
                  </div>
                  <div className="article-text col-6 ms-0 ms-md-5">
                    <span>19 jan 2023</span>
                    <h1>What is Lorem</h1>
                    <p>
                      Lorem Ipsum is simply dummy text of the printing and
                      typesetting industry. Lorem Ipsum has been the industry's
                      standard dummy text ever since the 1500s, when an u Lorem
                      Ipsum is simply dummy text of the printing and typesetting
                      industry. Lorem Ipsum has been the industry's standard
                      dummy text ever since the 1500s, when an u
                    </p>
                    <div className="Userfeedback d-flex flex-row">
                      <span>
                        <img src="./images/conversation.png" alt="" />
                        100
                      </span>
                      <span className="ms-auto">
                        <img src="./images/send.png" alt="" />
                      </span>
                    </div>
                  </div>
                </a>
              </div>
              <div className="article  d-flex align-items-center row">
                <a href="/">
                  <div className=" col-md-6 col-12 article-img">
                    <div>
                      <img
                        src="./1c4e27dcfbe370a7f4cd4b5243d88bc2.jpg"
                        alt=""
                        className="img-fluid"
                      />
                    </div>
                  </div>
                  <div className="article-text col-6 ms-5">
                    <span>19 jan 2023</span>
                    <h1>What is Lorem</h1>
                    <p>
                      Lorem Ipsum is simply dummy text of the printing and
                      typesetting industry. Lorem Ipsum has been the industry's
                      standard dummy text ever since the 1500s, when an u Lorem
                      Ipsum is simply dummy text of the printing and typesetting
                      industry. Lorem Ipsum has been the industry's standard
                      dummy text ever since the 1500s, when an u
                    </p>
                    <div className="Userfeedback d-flex flex-row">
                      <span>
                        <img src="./images/conversation.png" alt="" />
                        100
                      </span>
                      <span className="ms-auto">
                        <img src="./images/send.png" alt="" />
                      </span>
                    </div>
                  </div>
                </a>
              </div>
              <div className="article  d-flex align-items-center row">
                <a href="/">
                  <div className=" col-md-6 col-12 article-img">
                    <div>
                      <img
                        src="./1c4e27dcfbe370a7f4cd4b5243d88bc2.jpg"
                        alt=""
                        className="img-fluid"
                      />
                    </div>
                  </div>
                  <div className="article-text col-6 ms-5">
                    <span>19 jan 2023</span>
                    <h1>What is Lorem</h1>
                    <p>
                      Lorem Ipsum is simply dummy text of the printing and
                      typesetting industry. Lorem Ipsum has been the industry's
                      standard dummy text ever since the 1500s, when an u Lorem
                      Ipsum is simply dummy text of the printing and typesetting
                      industry. Lorem Ipsum has been the industry's standard
                      dummy text ever since the 1500s, when an u
                    </p>
                    <div className="Userfeedback d-flex flex-row">
                      <span>
                        <img src="./images/conversation.png" alt="" />
                        100
                      </span>
                      <span className="ms-auto">
                        <img src="./images/send.png" alt="" />
                      </span>
                    </div>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Blog;
