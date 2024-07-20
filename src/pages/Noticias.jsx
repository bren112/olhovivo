import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { supabase } from '../supabase/supabase';
import './Noticias.css';

function Noticias() {
  const [noticias, setNoticias] = useState([]);
  const [mostrarTextoCompleto, setMostrarTextoCompleto] = useState({});
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedEstilo, setSelectedEstilo] = useState(''); // Estado para o estilo selecionado
  const { noticiaId } = useParams();

  useEffect(() => {
    fetchNoticias();
  }, []);

  const fetchNoticias = async () => {
    try {
      const { data, error } = await supabase.from('noticias').select('*');
      if (error) {
        throw error;
      }
      // Ordenando as notícias pela data de publicação em ordem decrescente
      const sortedNoticias = data.sort((a, b) => new Date(b.data_publicacao) - new Date(a.data_publicacao));
      setNoticias(sortedNoticias);
    } catch (error) {
      console.error('Erro ao buscar notícias:', error.message);
    }
  };

  const handleToggleTextoCompleto = (id) => {
    setMostrarTextoCompleto((prevState) => ({
      ...prevState,
      [id]: !prevState[id],
    }));
  };

  const handleVerMenos = (id) => {
    setMostrarTextoCompleto((prevState) => ({
      ...prevState,
      [id]: false,
    }));
  };

  const handleSearch = () => {
    const normalizedSearchTerm = searchTerm.trim().toLowerCase();
    const foundNoticia = noticias.find((noticia) => noticia.titulo.toLowerCase().includes(normalizedSearchTerm));
    if (foundNoticia) {
      const element = document.getElementById(`noticia-${foundNoticia.id}`);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    } else {
      alert('Notícia não encontrada.');
    }
  };

  // Filtrando notícias pelo estilo selecionado
  const filteredNoticias = selectedEstilo
    ? noticias.filter((noticia) => noticia.estilo && noticia.estilo.toLowerCase() === selectedEstilo.toLowerCase())
    : noticias;

  return (
    <>
      <br />
      <div className='procurar'>
        <div className='filtrar'>
      <div className="filter">
          <select id='select' value={selectedEstilo} onChange={(e) => setSelectedEstilo(e.target.value)}>
            <option value="" id='todos'>Todos os estilos</option>
            <option value="Esporte" id='green'>Esporte</option>
          
            <option value="noticia" id='cultura'>Notícia</option>
           
          </select>
        </div>
        </div>

        <div className="search">
          <input
            id='input'
            type="text"
            placeholder="Pesquisar por título..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button className="btn2" onClick={handleSearch}>
            <svg className='lupa' xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor"  viewBox="0 0 16 16">
              <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0"/>
            </svg>
          </button>
        </div>
   
      </div>
      <br />
      <div className="noticias-container">
        <h2 id='title'>De olho nas Notícias!</h2>
        <br />
        <div>
          {filteredNoticias.map((noticia) => (
            <div key={noticia.id} id={`noticia-${noticia.id}`} className="noticia">
              <h3 id='titulo' className={noticia.id === parseInt(noticiaId) ? 'selected' : ''}>{noticia.titulo}</h3>
              <br />
              <div className="img">
                <img src={noticia.imagem} alt={noticia.titulo} className="imagem-noticia" srcSet={noticia.srcSet} />
              </div>
              <p>{noticia.resumo}</p>
              {mostrarTextoCompleto[noticia.id] ? (
                <div>
                  <p>{noticia.texto}</p>
                  <p>Estilo: {noticia.estilo}</p>
                  <p>Data de Publicação: {new Date(noticia.data_publicacao).toLocaleString()}</p>
                  <button className='btn' onClick={() => handleVerMenos(noticia.id)}>Menos</button>
                </div>
              ) : (
                <button className='btn' onClick={() => handleToggleTextoCompleto(noticia.id)}>Ver mais</button>
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Noticias;
