import React from "react";
import ReactDOM from "react-dom/client";

import allReducers from "./service/redux/reducers";
import { Provider } from "react-redux";
import { createStore } from "redux";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import App from "./App";

import { BrowserRouter } from "react-router-dom";

const myStore = createStore(
  allReducers,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

const root = ReactDOM.createRoot(document.querySelector("#root"));
root.render(
  <Provider store={myStore}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);
