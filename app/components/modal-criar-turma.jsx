'use client'
import 'bootstrap/dist/css/bootstrap.min.css'
import { useState, useEffect } from 'react'
import { buscarEtapas } from '@/lib/client/etapasService.js'

export const ModalCriarTurma = ({ onClose }) => {
  const [etapa, setEtapa] = useState('1');
  const [codigo, setCodigo] = useState('');
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
      const response = await fetch('/api/turmas', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ etapa, codigo }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Erro ao cadastrar turma.');
      } else {
        setSucesso(true);
        setTimeout(() => {
          window.location.reload();
        }, 2000);
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
            {opcoes.map((opcao, idx) => (
              <option key={opcao.id ?? opcao.nome_etapa ?? idx} value={opcao.id}>
                {opcao.nome_etapa}
              </option>
            ))}
          </select>

          <label htmlFor="codigo">Código:</label>
          <input
            type="text"
            id="codigo"
            placeholder='Ex.: 5A'
            required
            value={codigo}
            onChange={(e) => setCodigo(e.target.value)}
          />

          <button type="submit" className="cadastro-btn">Confirmar</button>
        </form>
      </div>
      <div className="blur-background" onClick={onClose}></div>
    </div>
  );
}
