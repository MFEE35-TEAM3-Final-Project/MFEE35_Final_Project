import React from "react";
import { Routes, Route } from "react-router-dom";

import StorePage from "./pages/StorePage";
import GoodsPage from "./pages/GoodsPage";
import ShoppingcartPage from "./pages/ShoppingcartPage";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/store" element={<StorePage />} />
        <Route path="/goods" element={<GoodsPage />} />
        <Route path="/cart" element={<ShoppingcartPage />} />
      </Routes>
      {/* <Footer /> */}
    </div>
  );
}

export default App;
