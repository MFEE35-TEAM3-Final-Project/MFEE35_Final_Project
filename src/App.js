import React from "react";
import { Routes, Route } from "react-router-dom";
import Nav from "./components/Nav";
// import Footer from "./components/Footer";
import Homepage from "./pages/Homepage";
import "./styles/all.css";

function App() {
  return (
    <div className="App">
      <Nav />
      <Routes>
        <Route path="/" element={<Homepage />} />
      </Routes>
      {/* <Footer /> */}
    </div>
  );
}

export default App;
