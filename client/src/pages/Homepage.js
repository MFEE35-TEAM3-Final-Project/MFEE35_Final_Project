import React, { useState, useEffect } from "react";
import Banner from "../components/Banner";
import Upload from "../components/Upload";
import axios from "axios";

const Homepage = () => {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:3333/api/users")
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
        <Upload />
      </div>
    </div>
  );
};

export default Homepage;
