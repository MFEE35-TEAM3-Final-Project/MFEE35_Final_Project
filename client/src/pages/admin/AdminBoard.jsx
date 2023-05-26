import { useState, useEffect } from "react";
import { Outlet, Navigate } from "react-router-dom";
import axios from "axios";

const AdminBoard = () => {
  const [authenticated, setAuthenticated] = useState(true);

  useEffect(() => {
    checkToken();
  }, []);

  function checkToken() {
    const jwtToken = document.cookie.replace(
      /(?:(?:^|.*;\s*)jwtToken\s*\=\s*([^;]*).*$)|^.*$/,
      "$1"
    );
    axios.defaults.headers.common["Authorization"] = jwtToken;
    axios
      .post(`${process.env.REACT_APP_API_URL}/api/admin/check`)
      .then((res) => {
        console.log(res);
        setAuthenticated(true);
        return res.data;
      })
      .catch((err) => {
        console.error(err);
        setAuthenticated(false);
      });
  }

  return (
    <>
      {authenticated === null ? (
        <div>Loading...</div>
      ) : authenticated ? (
        <>
          <Outlet />
        </>
      ) : (
        <Navigate to="/admin/login" replace />
      )}
    </>
  );
};
export default AdminBoard;
