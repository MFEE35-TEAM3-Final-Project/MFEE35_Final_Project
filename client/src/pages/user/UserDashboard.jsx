import React, { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import axios from "axios";

const UserDashboard = (props) => {
  console.log("here come user dashboard >:-");
  const [loggedIn, setLoggedIn] = useState(false);

  const navigate = useNavigate();
  useEffect(() => {
    if (!loggedIn) {
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
          setLoggedIn(true);
        })
        .catch((err) => {
          console.log(props);
          console.log(err);
          console.log(err.response.data);
          setLoggedIn(false);
          navigate("/login", { replace: true });
        });
    }
  }, [loggedIn, navigate]);

  return (
    <>
      <h2 className="text-white">This is Dashboard</h2>
      Rouet
      <Outlet />
    </>
  );
};

export default UserDashboard;
