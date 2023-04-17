import React, { useState } from "react";

import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Collapse from "react-bootstrap/Collapse";
import { Link } from "react-router-dom";

function HomepageNav() {
  const [openSlide, setOpenSlide] = useState(false);

  return (
    <header id="header">
      <Nav className="navbar navbar-expand-lg  p-0">
        <div className="w-100">
          <div className="nav_head">
            <a
              className="navbar-brand me-auto me-lg-0 col-lg-1 ps-lg-4"
              href="/"
            >
              <img src={"/img/Kessoku_Band_Logo.svg"} alt="" />
            </a>
            <div className="d-none d-lg-flex justify-content-lg-around col-lg-11">
              <div className="nav-item">
                <Link to="/register" className="nav-link">
                  REGISTER
                </Link>
              </div>
              <div className="nav-item">
                <Link to="/login" className="nav-link">
                  LOGIN
                </Link>
              </div>
              <div className="nav-item">
                <Link to="/user/profile" className="nav-link">
                  PROFILE
                </Link>
              </div>

              <div className="nav-item">
                <a href="https://bocchi.rocks/" className="nav-link">
                  BOCCHI OFFICIAL
                </a>
              </div>
            </div>

            <button
              onClick={() => setOpenSlide(!openSlide)}
              className="nav_btn_cus d-lg-none"
              id="select_btn"
              type="button"
              aria-expanded={openSlide}
            >
              <span></span>
              <span></span>
              <span></span>
            </button>
          </div>

          <Collapse in={openSlide} className="nav_body " id="slide_selects">
            <div className="slide_selects_nav">
              <div className="nav-item">
                <Link to="/register" className="nav-link">
                  REGISTER
                </Link>
              </div>
              <div className="nav-item">
                <Link to="/login" className="nav-link">
                  LOGIN
                </Link>
              </div>
              <div className="nav-item">
                <Link to="/user/profile" className="nav-link">
                  PROFILE
                </Link>
              </div>

              <div className="nav-item">
                <a href="https://bocchi.rocks/" className="nav-link">
                  BOCCHI OFFICIAL
                </a>
              </div>
            </div>
          </Collapse>
        </div>
      </Nav>
    </header>
  );
}

export default HomepageNav;
