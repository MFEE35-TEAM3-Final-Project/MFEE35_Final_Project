import React, { useState, useEffect } from "react";
import { FaUser, FaShoppingCart, FaCaretRight } from "react-icons/fa";
import "../styles/Nav.css";
import axios from "axios";
function Nav() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState();
  useEffect(() => {
    const jwtToken =
      "JWT eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI3MjcxMjQyMzU0IiwiZW1haWwiOiJ0ZXN0MDUxNkB0ZXN0LmNvbSIsImV4cCI6MTY5MzAyMzA4MzgwMywiaWF0IjoxNjg0MzgzMDgzfQ.EnY2PeAYegAmAJCI-C7VP0vflHaTkkLwM1CPunjbRFY";

    axios.defaults.headers.common["Authorization"] = jwtToken;
    axios
      .post(`${process.env.REACT_APP_API_URL}/api/user/check`)
      .then((res) => {
        console.log(res.data);
        setIsAuthenticated(true);
        setUsername(res.data.user.username);
        localStorage.setItem("username", res.data.user.username);
      })
      .catch((err) => {
        setIsAuthenticated(false);
      });
  });
  // const isAuthenticated = localStorage.getItem("token") !== null;
  const email = localStorage.getItem("email");
  const handleLogout = () => {
    localStorage.removeItem("token");
    document.cookie = "jwtToken=; expires=Thu, 01 Jan 1970 00:00:01 GMT;";
    window.location.reload();
  };
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav role="navigation">
      <div id="menuToggle" onClick={handleMenuToggle}>
        <input type="checkbox" checked={isMenuOpen} readOnly />
        <span></span>
        <span></span>
        <span></span>
        <ul id="menu" className={isMenuOpen ? "open" : ""}>
          <li id="home-logo">
            <a href="/">LOGO</a>
          </li>

          {isAuthenticated ? (
            <li className="d-flex">
              <a href="/MemberHomePage">
                <FaUser className="me-2" />
                {username}
              </a>
              <a className=" ms-auto logout" href="#" onClick={handleLogout}>
                登出
              </a>
            </li>
          ) : (
            <li>
              <a href="/LoginPage">
                <FaUser className="me-2" />
                登入
              </a>
            </li>
          )}

          <a href="/cart">
            <li>
              <FaShoppingCart className="me-2" />
              購物車
            </li>
          </a>

          <a href="/calculator">
            <li className="me-auto" style={{ position: "relative" }}>
              計算機
              <FaCaretRight
                aria-hidden="true"
                style={{ position: "absolute", right: 0, top: "50%" }}
              />
            </li>
          </a>
          <a href="/Blog">
            <li className="me-auto" style={{ position: "relative" }}>
              部落格
              <FaCaretRight
                aria-hidden="true"
                style={{ position: "absolute", right: 0, top: "50%" }}
              />
            </li>
          </a>
          <a href="/store">
            <li className="me-auto" style={{ position: "relative" }}>
              商城
              <FaCaretRight
                aria-hidden="true"
                style={{ position: "absolute", right: 0, top: "50%" }}
              />
            </li>
          </a>
          <li></li>
        </ul>
      </div>
    </nav>
  );
}

export default Nav;
