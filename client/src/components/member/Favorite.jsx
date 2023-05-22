import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../../styles/member/favoritelist.css";
import MemberHeader from "./MemberHeader";
import Cookies from "js-cookie";

function Favorite() {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [hasFetched, setHasFetched] = useState(false);

  useEffect(() => {
    if (!hasFetched) {
      fetchFavoriteList();
    }
  }, [hasFetched]);

  const fetchFavoriteList = async () => {
    try {
      var jwtToken = Cookies.get("jwtToken");
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/user/favorite`,
        {
          headers: {
            Authorization: jwtToken,
          },
        }
      );
      setData(response.data.message);
      console.log(response.data.message);
      setHasFetched(true);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const handleDelete = async (productId) => {
    try {
      var jwtToken = Cookies.get("jwtToken");

      const data = await axios.delete(
        `${process.env.REACT_APP_API_URL}/api/user/favorite`,
        {
          headers: {
            Authorization: jwtToken,
          },
          data: { productid: productId },
        }
      );
      setData((prevData) =>
        prevData.filter((item) => item.productid !== productId)
      );
      const message = data.data.message;
      toast.success(message);
    } catch (error) {
      console.log(error.response.data.message);
      toast.error(error.response.data.message);
    }
  };

  const handleAdd = async (productId) => {
    try {
      var jwtToken = Cookies.get("jwtToken");

      const data = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/user/cart/add`,
        {
          productid: productId,
          quantity: "1",
        },
        {
          headers: {
            Authorization: jwtToken,
          },
        }
      );
      const message = data.data.message;
      toast.success(message);
    } catch (error) {
      console.log(error.response.data.message);
      toast.error(error.response.data.message);
    }
  };

  return (
    <div>
      <MemberHeader />
      <ToastContainer />
      <h2 className="head">會員追蹤清單</h2>
      {error ? (
        <p>{error}</p>
      ) : data.length > 0 ? (
        data.map((item) => (
          <div key={item.id} >
            <a className="favorite_list">
              <div className="image">
                <img src={item.image[0]} alt="Product Image" />
              </div>
              <div className="info">
                <h1 className="productname"> {item.name}</h1>
                <p> {item.description}</p>
                <p> ${item.price}</p>
                <div className="buttons">
                  <button onClick={() => handleDelete(item.productid)}>
                    刪除
                  </button>
                  <button onClick={() => handleAdd(item.productid)}>
                    加入購物車
                  </button>
                </div>
              </div>
            </a>
          </div>
        ))
      ) : (
        <div className="favorite_nolist">
          <p>追蹤清單內沒有東西</p>
        </div>
      )
      }
    </div >
  );
}

export default Favorite;
