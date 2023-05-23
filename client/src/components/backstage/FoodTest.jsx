import React, { useState, useEffect } from "react";
import axios from "axios";

const Food = () => {
  const [categories, setCategories] = useState([]);
  const [tempCategory, setTempCategory] = useState("all");
  const [keyword, setKeyword] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showcase, setShowcase] = useState(false);
  const [selected, setSelected] = useState("選擇的食物");

  const searchFood = (category, keyword, qty) => {
    axios
      .get(
        `${process.env.REACT_APP_API_URL}/api/food/search?category=${category}&qty=${qty}&keyword=${keyword}`
      )
      .then((res) => {
        console.log("ressss", res);
        setSuggestions(res.data.suggestions);
      })
      .catch((err) => {
        console.log(err);
        setSuggestions([]);
        setSelected(err.response.data.message);
      });
  };

  //取得 category列表
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/api/food/category=all`)
      .then((res) => {
        // console.log("all categories", res.data.categories);
        setCategories(res.data.categories);
      })
      .catch((error) => console.error(error));
  }, []);
  // 根據input 內容推薦可能項目
  useEffect(() => {
    setShowcase(false);
    let inputTimer = null;
    const delay = 1000;
    if (keyword.trim().length > 0) {
      inputTimer = setTimeout(() => {
        // console.log("query", query);
        searchFood(tempCategory, keyword, 9999);
        setShowcase(true);
      }, delay);
    }
    return () => {
      if (inputTimer) {
        clearTimeout(inputTimer);
      }
    };
  }, [tempCategory, keyword]);

  return (
    <div className=" p-3 bg-primary">
      <h1 className="text-white">search Food~</h1>
      <div className="d-flex">
        <div>
          <select
            name="tempCategory"
            value={tempCategory}
            onChange={(event) => {
              setTempCategory(event.target.value);
            }}
          >
            <option value="all">All</option>
            {categories.map((category, index) => (
              <option key={index} value={category}>
                {category}
              </option>
            ))}
          </select>
          <input
            className="my-3"
            type="text"
            value={keyword}
            onChange={(event) => {
              setKeyword(event.target.value);
            }}
          />
          <button
            className="btn btn-danger"
            onClick={() => {
              searchFood(tempCategory, keyword);
            }}
          >
            search
          </button>
        </div>
        <div className="mx-2 d-flex align-items-center">
          {<div className=" fs-2 text-white">{selected}</div>}
        </div>
      </div>

      <div className="list-group">
        {showcase &&
          suggestions.map((suggestion) => (
            <button
              className="list-group-item list-group-item-action"
              key={suggestion.food_id}
              onClick={() => {
                setSelected(suggestion.food_id + "   " + suggestion.name);
              }}
            >
              {suggestion.name}
            </button>
          ))}
      </div>
    </div>
  );
};

export default Food;
