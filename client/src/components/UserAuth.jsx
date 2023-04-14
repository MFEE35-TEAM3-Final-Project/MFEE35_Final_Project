import React, { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function userAuth(Component) {
  return function AuthenticatedComponent(props) {
    const navigate = useNavigate();
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
          return res.data;
        })
        .catch((err) => {
          console.log(err);
          return err.response.data;
        });
    }
    return <Component {...props} />;
  };
}

export default userAuth;
