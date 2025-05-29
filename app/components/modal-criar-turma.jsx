'use client'
import 'bootstrap/dist/css/bootstrap.min.css'
import { useState, useEffect } from 'react'
import { buscarEtapas } from '@/lib/etapasService.js'

export const ModalCriarTurma = ({ onClose }) => {
  const [etapa, setEtapa] = useState('1');
  const [codigo, setCodigo] = useState('');
  const [nome, setNome] = useState('');
  const [erro, setErro] = useState(null);
  const [sucesso, setSucesso] = useState(false);
  const [opcoes, setOpcoes] = useState([]);

  useEffect(() => {
    async function fetchEtapas() {
      try {
        const data = await buscarEtapas();
        setOpcoes(data);
      } catch (error) {
        setErro('Erro ao carregar etapas.');
      }
    }
    fetchEtapas();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErro(null);
    setSucesso(false);

    try {
      const response = await fetch('/api/turmas/cadastrar', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ etapa, codigo, nome }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Erro ao cadastrar turma.');
      } else {
        setSucesso(true);
        setTimeout(() => onClose(), 2000);
      }
    } catch (err) {
      setErro(err.message || 'Erro de conexão com o servidor.');
    }
  };

  return (
    <div>
      <div className="cadastro-modal">
        <h2>Criar Turma</h2>
        <form onSubmit={handleSubmit}>
          {erro && <p style={{ color: 'red' }}>{erro}</p>}
          {sucesso && <p style={{ color: 'green' }}>Turma cadastrada com sucesso!</p>}

          <label htmlFor="etapa">Etapa:</label>
          <select
            name="etapa"
            className="dropdown-cadastro-turmas "
            value={etapa}
            onChange={e => setEtapa(e.target.value)}
            required
          >
            <option value="" disabled hidden></option>
            {opcoes.map(opcao => (
              <option key={opcao.id} value={opcao.id}>{opcao.nome_etapa}</option>
            ))}
          </select>

          <label htmlFor="codigo">Código:</label>
          <input
            type="text"
            id="codigo"
            required
            value={codigo}
            onChange={(e) => setCodigo(e.target.value)}
          />

          <label htmlFor="nome">Nome:</label>
          <input
            type="text"
            id="nome"
            required
            value={nome}
            onChange={(e) => setNome(e.target.value)}
          />

          <button type="submit" className="cadastro-btn">Confirmar</button>
        </form>
      </div>
      <div className="blur-background" onClick={onClose}></div>
    </div>
  );
}
