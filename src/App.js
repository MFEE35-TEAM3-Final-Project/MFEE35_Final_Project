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
      <div style={{ marginTop: "200px" }}>
        <Routes>
          <Route path="/" element={<Homepage />} />
        </Routes>
      </div>
      {/* <Footer /> */}
    </div>
  );
}

export default App;
