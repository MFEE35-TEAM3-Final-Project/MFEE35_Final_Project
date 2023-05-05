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
        <h1>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Omnis, totam
          quae enim magni pariatur aspernatur assumenda excepturi. Nam
          fugiatsfsdfsfss ipsum temporibus exercitationemdsfsfsfd quas illum,
          deserunt assumenda neque voluptas, nulla esse!
        </h1>

        <div>slddfkjd</div>
      </div>
    </div>
  );
};

export default Homepage;
