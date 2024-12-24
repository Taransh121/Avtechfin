import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import { Home } from './pages/Home';
import { Dash } from './pages/Dash';


// App component
export default function App() {
  return (
    <div className="">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dash" element={<Dash />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
