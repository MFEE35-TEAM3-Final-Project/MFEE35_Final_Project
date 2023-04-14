import axios from "axios";
import React, { useEffect, useState, useRef, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";

const UserProfiles = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const loggedInRef = useRef(loggedIn);
  const setLoggedInCallback = useCallback(
    (value) => {
      console.log("login call");
      loggedInRef.current = value;
      setLoggedIn(value);
    },
    [setLoggedIn]
  );

  const navigate = useNavigate();
  useEffect(() => {
    if (!loggedInRef.current) {
      const jwtToken = document.cookie.replace(
        /(?:(?:^|.*;\s*)jwtToken\s*=\s*([^;]*).*$)|^.*$/,
        "$1"
      );

      axios.defaults.headers.common["Authorization"] = jwtToken;
      axios
        .get(`${process.env.REACT_APP_API_URL}/api/user/check`)
        .then((res) => {
          console.log(res);
          console.log(res.data);
          setLoggedInCallback(true);
        })
        .catch((err) => {
          console.log(err);
          console.log(err.response.data);
          setLoggedInCallback(false);
          navigate("/login", { replace: true });
        });
    }
  }, [loggedInRef, setLoggedInCallback, navigate]);

  return (
    <div>
      <div className="fs-1 text-danger">這是個人資料編輯頁2222222</div>
      <Link className="btn btn-success" to="/user/selfies">
        /user/selfies
      </Link>
    </div>
  );
};

export default UserProfiles;
