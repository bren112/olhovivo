import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/navbar";
import Home from "./pages/Home";
import Noticias from "./pages/Noticias";
import Contatos from "./pages/Contatos";
import DetalhesNoticia from "./pages/DetalhesNoticia"; // Importe o componente de detalhes

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
          <Route path="/noticias/:noticiaId" element={<DetalhesNoticia />} /> {/* Rota para detalhes da notícia */}
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
