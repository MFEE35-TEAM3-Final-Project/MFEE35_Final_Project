import React from "react";
import ReactDOM from "react-dom/client";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import App from "./App";

import { BrowserRouter } from "react-router-dom";

const root = ReactDOM.createRoot(document.querySelector("#root"));
root.render(
  // <BrowserRouter>
  //   <App />
  // </BrowserRouter>

  // React.StrictMode 嚴格模式是給開發者專用，會提示某些潛在危險
  // <React.StrictMode>
  <BrowserRouter>
    <App />
  </BrowserRouter>
  // </React.StrictMode>
);
