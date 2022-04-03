import React from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import Home from "./container/Home.js";
import Login from "./components/Login.js";
function App() {
  return (
    <Routes>
      <Route path="login" element={<Login />} />
      <Route path="/*" element={<Home />} />
    </Routes>
  );
}

export default App;
