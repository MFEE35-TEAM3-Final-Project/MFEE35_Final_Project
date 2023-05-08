import React, { useState, useEffect } from "react";
import Banner from "../components/Banner";

import axios from "axios";

const Homepage = () => {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/api/users`)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div>
      <Banner />
      <div>
        <form action="submit">sdfsdf</form>
        <h1>Lorem ipsum, dolor sit amet consectetur adipisicing sdfsbbgbgsdffdsfelit. Aliquam molestiae laudantium velit cumque illum, consectetur expedita in rerum soluta id aut distinctio quidem debitis enim dignissimos sint ducimus aliquid nam.
          
        </h1>
      </div>
    </div>
  );
};

export default Homepage;
