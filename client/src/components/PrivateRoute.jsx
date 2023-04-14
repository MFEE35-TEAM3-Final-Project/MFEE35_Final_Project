import React, { useEffect, useState } from "react";
import { Navigate, Outlet, Route } from "react-router-dom";
import axios from "axios";

const PrivateRoute = ({ ...rest }) => {
  console.log("come private");
  const [user, setUser] = useState("");
  useEffect(() => {
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
        setUser(res.data);
      })
      .catch((err) => {
        console.log(err);
        console.log(err.response.data);
      });
  }, []);

  // 依照「是否授權」來判定使用者是否能前往該頁面
  return <>{!user ? <Navigate to="/login" replace /> : <Route {...rest} />}</>;
};

export default PrivateRoute;
