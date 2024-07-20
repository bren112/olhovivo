import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import NoticiaResumida from "./NoticiaResumida";
import { supabase } from "../supabase/supabase";
import './home.css';

function Home() {
  const [noticias, setNoticias] = useState([]);
  const [titulos, setTitulos] = useState([]);
  const [colaboradores, setColaboradores] = useState([]); // State for colaboradores

  useEffect(() => {
    fetchNoticias();
    fetchTitulosNoticias();
    fetchColaboradores(); // Fetch colaboradores
  }, []);

  const fetchNoticias = async () => {
    try {
      const { data, error } = await supabase.from("noticias").select("*");
      if (error) {
        throw error;
      }
      setNoticias(data);
    } catch (error) {
      console.error("Erro ao buscar notícias:", error.message);
    }
  };

  const fetchTitulosNoticias = async () => {
    try {
      const { data, error } = await supabase
        .from("noticias")
        .select("id, titulo")
        .order("data_publicacao", { ascending: false });
      if (error) {
        throw error;
      }
      setTitulos(data);
    } catch (error) {
      console.error("Erro ao buscar títulos das notícias:", error.message);
    }
  };

  const fetchColaboradores = async () => {
    try {
      const { data, error } = await supabase.from("colaboradores").select("nome, avatar");
      if (error) {
        throw error;
      }
      setColaboradores(data);
    } catch (error) {
      console.error("Erro ao buscar colaboradores:", error.message);
    }
  };

  return (
    <div className="home-container">
      <div className="subtitulo">
        <p id="sub">
          {titulos.map((noticia, index) => (
            <span key={noticia.id} id="span">
              {index !== 0 && " | "}
              <Link id="span" to={'/noticias'}>{noticia.titulo}</Link>
            </span>
          ))}
        </p>
      </div>
      <br />
      <h2 id="title">Últimas Notícias</h2>
      <br />
      <div className="noticias-resumidas">
        {noticias.map((noticia) => (
          <NoticiaResumida key={noticia.id} noticia={noticia} />
        ))}
      </div>
      <br />
      <h2 id="title">Colaboradores</h2>
      <div className="colaboradores">
        {colaboradores.map((colaborador, index) => (
          <div key={index} className="colaborador">
            <img src={colaborador.avatar} alt={colaborador.nome} className="colaborador-avatar" />
            <p className="colaborador-nome">{colaborador.nome}</p>
          </div>
        ))}
      </div>
      <br />
    </div>
  );
}

export default Home;
