import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { supabase } from '../supabase/supabase';
import './DetalhesNoticia.css';

function DetalhesNoticia() {
  const { noticiaId } = useParams();
  const [noticia, setNoticia] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNoticia = async () => {
      setLoading(true);
      try {
        const { data, error } = await supabase
          .from('noticias')
          .select('*')
          .eq('id', noticiaId)
          .single();

        if (error) throw error;

        setNoticia(data);
      } catch (error) {
        console.error('Erro ao buscar notícia:', error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchNoticia();
  }, [noticiaId]);

  if (loading) {
    return <div>Carregando...</div>;
  }

  if (!noticia) {
    return <div>Notícia não encontrada.</div>;
  }

  return (
    <div className="detalhes-noticia">
      <h1 className="titulo-noticia">{noticia.titulo}</h1>
      <img src={noticia.imagem} alt={noticia.titulo} className="imagem-noticia-detalhes" />
      <p className="data-publicacao">
        Publicada em: {new Date(noticia.data_publicacao).toLocaleDateString()}
      </p>
      <p className="texto-noticia">{noticia.texto}</p>
      <Link to="/noticias" className="voltar-link">Voltar para Notícias</Link>
    </div>
  );
}

export default DetalhesNoticia;
