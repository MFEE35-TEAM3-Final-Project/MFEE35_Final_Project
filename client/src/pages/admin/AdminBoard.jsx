import { useState, useEffect } from "react";
import { Outlet, Navigate } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { adminLogin, adminLogout } from "../../service/redux/action";

const AdminBoard = () => {
  const dispatch = useDispatch();
  const [isAuthenticated, setIsAuthenticated] = useState(true);

  useEffect(() => {
    const checkToken = async () => {
      const jwtToken = document.cookie.replace(
        /(?:(?:^|.*;\s*)jwtToken\s*\=\s*([^;]*).*$)|^.*$/,
        "$1"
      );
      axios.defaults.headers.common["Authorization"] = jwtToken;
      try {
        const response = await axios.post(
          `${process.env.REACT_APP_API_URL}/api/admin/check`
        );
        if (response.data.success) {
          console.log(response);
          const adminData = response.data.admin;
          dispatch(adminLogin(adminData));
          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(false);
        }
      } catch (error) {
        console.error(error);
        setIsAuthenticated(false);
      }
    };

    checkToken();
  }, [dispatch]);

  return (
    <div>
      {isAuthenticated ? <Outlet /> : <Navigate to="/admin/login" replace />}
    </div>
  );
};

export default AdminBoard;
