import React, { useState, useEffect } from 'react';
import { supabase } from '../supabase/supabase';
import './Adm.css'; // Importando o arquivo CSS de estilos

function Adm() {
  const [noticias, setNoticias] = useState([]);
  const [novoTitulo, setNovoTitulo] = useState('');
  const [novoResumo, setNovoResumo] = useState('');
  const [novoTexto, setNovoTexto] = useState('');
  const [novoImagem, setNovoImagem] = useState('');
  const [novoEstilo, setNovoEstilo] = useState('Esporte'); // Valor padrão como 'Esporte'
  const [colaboradores, setColaboradores] = useState([]); // Estado para colaboradores
  const [novoNome, setNovoNome] = useState('');
  const [novoAvatar, setNovoAvatar] = useState('');

  useEffect(() => {
    fetchNoticias();
    fetchColaboradores();
  }, []);

  const fetchNoticias = async () => {
    try {
      const { data, error } = await supabase.from('noticias').select('*');
      if (error) {
        throw error;
      }
      setNoticias(data);
    } catch (error) {
      console.error('Erro ao buscar notícias:', error.message);
    }
  };

  const fetchColaboradores = async () => {
    try {
      const { data, error } = await supabase.from('colaboradores').select('*');
      if (error) {
        throw error;
      }
      setColaboradores(data);
    } catch (error) {
      console.error('Erro ao buscar colaboradores:', error.message);
    }
  };

  const handleSubmitNoticia = async (event) => {
    event.preventDefault();
    try {
      const { data, error } = await supabase.from('noticias').insert([
        {
          titulo: novoTitulo,
          resumo: novoResumo,
          texto: novoTexto,
          imagem: novoImagem,
          estilo: novoEstilo,
          data_publicacao: new Date().toISOString(),
        },
      ]);
      if (error) {
        throw error;
      }
      console.log('Notícia inserida com sucesso:', data);
      setNovoTitulo('');
      setNovoResumo('');
      setNovoTexto('');
      setNovoImagem('');
      setNovoEstilo('Esporte');
      fetchNoticias();
    } catch (error) {
      console.error('Erro ao inserir notícia:', error.message);
    }
  };

  const handleExcluirNoticia = async (id) => {
    if (window.confirm('Tem certeza que quer excluir esta notícia?')) {
      try {
        const { data, error } = await supabase.from('noticias').delete().eq('id', id);
        if (error) {
          throw error;
        }
        console.log('Notícia excluída com sucesso:', data);
        fetchNoticias();
      } catch (error) {
        console.error('Erro ao excluir notícia:', error.message);
      }
    }
  };

  const handleSubmitColaborador = async (event) => {
    event.preventDefault();
    try {
      const { data, error } = await supabase.from('colaboradores').insert([
        {
          nome: novoNome,
          avatar: novoAvatar,
        },
      ]);
      if (error) {
        throw error;
      }
      console.log('Colaborador inserido com sucesso:', data);
      setNovoNome('');
      setNovoAvatar('');
      fetchColaboradores();
    } catch (error) {
      console.error('Erro ao inserir colaborador:', error.message);
    }
  };

  const handleExcluirColaborador = async (id) => {
    if (window.confirm('Tem certeza que quer excluir este colaborador?')) {
      try {
        const { data, error } = await supabase.from('colaboradores').delete().eq('id', id);
        if (error) {
          throw error;
        }
        console.log('Colaborador excluído com sucesso:', data);
        fetchColaboradores();
      } catch (error) {
        console.error('Erro ao excluir colaborador:', error.message);
      }
    }
  };

  return (
    <div className="admin-container">
      <h2>Área Administrativa</h2>
      <br />
      <div className="form-container">
        <form onSubmit={handleSubmitNoticia}>
          <h3>Inserir Nova Notícia</h3>
          <br />
          <input
            type="text"
            placeholder="Título"
            value={novoTitulo}
            onChange={(e) => setNovoTitulo(e.target.value)}
            required
          />
          <br />
          <textarea
            placeholder="Resumo"
            value={novoResumo}
            onChange={(e) => setNovoResumo(e.target.value)}
            required
          />
          <br />
          <textarea
            placeholder="Texto Completo"
            value={novoTexto}
            onChange={(e) => setNovoTexto(e.target.value)}
            required
          />
          <br />
          <input
            type="url"
            placeholder="URL da Imagem"
            value={novoImagem}
            onChange={(e) => setNovoImagem(e.target.value)}
            required
          />
          <br />
          <select
            value={novoEstilo}
            onChange={(e) => setNovoEstilo(e.target.value)}
            required
          >
            <option value="Esporte">Esporte</option>
            <option value="Variedades">Variedades</option>
            <option value="Noticia">Notícia</option>
          </select>
          <br />
          <br />
          <button type="submit">Enviar Notícia</button>
        </form>
      </div>

      <h3>Notícias Cadastradas</h3>
      <br />
      <ul className="news-list">
        {noticias.map((noticia) => (
          <li key={noticia.id}>
            {noticia.titulo}{' '}
            <button onClick={() => handleExcluirNoticia(noticia.id)}>Excluir</button>
          </li>
        ))}
      </ul>
      
      <div className="form-container">
        <form onSubmit={handleSubmitColaborador}>
          <h3>Adicionar Colaborador</h3>
          <br />
          <input
            type="text"
            placeholder="Nome"
            value={novoNome}
            onChange={(e) => setNovoNome(e.target.value)}
            required
          />
          <br />
          <input
            type="url"
            placeholder="URL do Avatar"
            value={novoAvatar}
            onChange={(e) => setNovoAvatar(e.target.value)}
            required
          />
          <br />
          <br />
          <button type="submit">Adicionar Colaborador</button>
        </form>
      </div>

      <h3>Colaboradores Cadastrados</h3>
      <br />
      <ul className="colaboradores-list">
        {colaboradores.map((colaborador) => (
          <li key={colaborador.id}>
            <img src={colaborador.avatar} alt={colaborador.nome} className="colaborador-avatar" />
            {colaborador.nome}{' '}
            <button onClick={() => handleExcluirColaborador(colaborador.id)} id='ex'>Excluir</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Adm;
