import React, { useState } from 'react';
import { FaUser, FaShoppingCart, FaCaretRight, } from 'react-icons/fa';
import axios from 'axios';
function Nav() {
  const [isAuthenticated, setIsAuthenticated] = React.useState(false);

  React.useEffect(() => {
    checkToken();
  }, []);

  const checkToken = () => {
    const jwtToken = document.cookie.replace(
      /(?:(?:^|.*;\s*)jwtToken\s*\=\s*([^;]*).*$)|^.*$/,
      "$1"
    );

    axios
      .get(`${process.env.REACT_APP_API_URL}/api/user/check`, {
        headers: {
          Authorization: jwtToken,
        },
      })
      .then((res) => {
        setIsAuthenticated(true);
      })
      .catch((err) => {
        setIsAuthenticated(false);
      });
  };

  const handleLogout = () => {
    document.cookie = "jwtToken=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;";
    setIsAuthenticated(false);
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
        <ul id="menu" className={isMenuOpen ? 'open' : ''}>
          <li id='home-logo'><a href="/">LOGO</a></li>

          
            {isAuthenticated ? 
            (<li>
              <FaUser className="me-2" onClick={handleLogout}/>登出
            </li>) 
            :(<a href='/login'><li>
              <FaUser className="me-2"  />登入
            </li></a>)}

          


          <a href="#">
            <li>
              <FaShoppingCart className="me-2" />購物車
            </li>
          </a>

          <a href="/calculator">
            <li className="me-auto" style={{ position: 'relative' }}>
              計算機
              <FaCaretRight
                aria-hidden="true"
                style={{ position: 'absolute', right: 0, top: '50%' }}
              />
            </li>
          </a>
          <a href="/Blog">
            <li className="me-auto" style={{ position: 'relative' }}>
              部落格
              <FaCaretRight
                aria-hidden="true"
                style={{ position: 'absolute', right: 0, top: '50%' }}
              />
            </li>
          </a>
          <a href="#">
            <li className="me-auto" style={{ position: 'relative' }}>
              商城
              <FaCaretRight
                aria-hidden="true"
                style={{ position: 'absolute', right: 0, top: '50%' }}
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