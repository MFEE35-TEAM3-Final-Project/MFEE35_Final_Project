import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "../../styles/member/favoritelist.css";

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
      var jwtToken = document.cookie.split('=')[1].trim();
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/user/favorite`, {
        headers: {
          Authorization: jwtToken
        }
      });
      setData(response.data.message);
      setHasFetched(true);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };



  const handleDelete = async (productId) => {
    try {
      var jwtToken = document.cookie.split('=')[1].trim();

      const data = await axios.delete(`${process.env.REACT_APP_API_URL}/api/user/favorite`, {
        headers: {
          Authorization: jwtToken
        },
        data: { productid: productId }
      });
      setData(prevData => prevData.filter(item => item.productid !== productId));
      const message = data.data.message;
      toast.success(message);
    }  catch (error) {
      console.log(error.response.data.message)
      toast.error(error.response.data.message)
    }
  };

  const handleAdd = async (productId) => {
    try {
      var jwtToken = document.cookie.split('=')[1].trim();
  
      const data = await axios.post(`${process.env.REACT_APP_API_URL}/api/user/cart/add`, {
        productid: productId,
        quantity: "1"
      }, {
        headers: {
          Authorization: jwtToken
        }
      });
      const message = data.data.message;
      toast.success(message);
     
    } catch (error) {
      console.log(error.response.data.message)
      toast.error(error.response.data.message)
    }
  };

  return (
    <div>
      <ToastContainer />
      <h2>會員追蹤清單</h2>
      {error ? (
        <p>{error}</p>
      ) : (
        data.length > 0 ? (
          data.map(item => (
            <div key={item.id} className='favorite_list'>
              <div className="image">
                <img src={item.image} alt="Product Image" />
              </div>
              <div className="info">
                <p>商品名稱: {item.name}</p>
                <p>商品描述: {item.description}</p>
                <p>價格: ${item.productid}</p>
                <div className="buttons">
                  <button onClick={() => handleDelete(item.productid)}>刪除</button>
                  <button onClick={() => handleAdd(item.productid)}>加入購物車</button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className='favorite_nolist'><p>追蹤清單內沒有東西</p></div>
        )
      )}
    </div>
  );
}

export default Favorite;
