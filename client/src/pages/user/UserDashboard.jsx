import { useState, useEffect } from "react";
import { Outlet, Navigate } from "react-router-dom";
import axios from "axios";

const UserDashboard = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);

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
      .get(`${process.env.REACT_APP_API_URL}/api/user/check`)
      .then((res) => {
        console.log(res);
        setIsAuthenticated(true);
        return res.data;
      })
      .catch((err) => {
        console.log(err);
        setIsAuthenticated(false);
        return err.response.data;
      });
  }

  return (
    <>
      {isAuthenticated === null ? (
        <div>Loading...</div>
      ) : isAuthenticated ? (
        <>
          <h2 className="text-white">THis DashBoard</h2>
          <Outlet />
        </>
      ) : (
        <Navigate to="/login" replace />
      )}
    </>
  );
};
export default UserDashboard;
