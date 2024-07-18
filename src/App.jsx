import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/navbar";
import Home from "./pages/Home";
import Noticias from "./pages/Noticias";
import Contatos from "./pages/Contatos";

function App() {
  return (
    <BrowserRouter>
      <div>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/noticias" element={<Noticias />} />
          <Route path="/contatos" element={<Contatos />} />
         
          
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
