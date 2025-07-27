import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";

const App = () => (
  <BrowserRouter>
    <Navbar />
    <Routes>
      <Route path="/" element={<Home />} />
      {/* Placeholder routes */}
      <Route path="/pro" element={<div>Pro Page</div>} />
      <Route path="/login" element={<div>Login Page</div>} />
    </Routes>
  </BrowserRouter>
);

export default App;
