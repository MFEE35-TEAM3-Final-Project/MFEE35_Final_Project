import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "../../styles/member/favoritelist.css";
import MemberHeader from './MemberHeader';

function Orders() {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [hasFetched, setHasFetched] = useState(false);

  useEffect(() => {
    if (!hasFetched) {
      fetchOrderlist();
    }
  }, [hasFetched]);

  const fetchOrderlist = async () => {
    try {
      var jwtToken = document.cookie.split('=')[1].trim();
      const data = await axios.get(`${process.env.REACT_APP_API_URL}/api/user/orders`, {
        headers: {
          Authorization: jwtToken
        }
      });
      console.log(data)
      setData(data.data.message);
      setHasFetched(true);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <div>
      {/* <MemberHeader/> */}
      <ToastContainer />
      
    </div>
  );
}

export default Orders;
