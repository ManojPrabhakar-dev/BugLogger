import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Auth from "./components/Auth/Auth";
import HomeScreen from "./pages/HomeScreen";

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Auth />} />
      <Route path="/home" element={<HomeScreen />} />
    </Routes>
  </BrowserRouter>
);

export default App;
