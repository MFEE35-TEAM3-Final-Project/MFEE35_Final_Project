import axios from "axios";

const jwtToken = document.cookie.replace(
  /(?:(?:^|.*;\s*)jwtToken\s*\=\s*([^;]*).*$)|^.*$/,
  "$1"
);
axios.defaults.baseURL = process.env.REACT_APP_API_URL;
axios.defaults.headers.common["Authorization"] = jwtToken;
axios.defaults.headers.post["Content-Type"] = "application/json";

export default axios;
