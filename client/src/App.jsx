import React from "react";
import { Routes, Route } from "react-router-dom";

import StorePage from "./pages/StorePage";
import GoodsPage from "./pages/GoodsPage";
import ShoppingcartPage from "./pages/ShoppingcartPage";
import LoginPage from "./pages/LoginPage";
import Footer from "./components/footer";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/store" element={<StorePage />} />
        <Route
          path="/goods/:productId/:activityid/:foodId"
          element={<GoodsPage />}
        />
        <Route path="/cart" element={<ShoppingcartPage />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
