'use client'
import 'bootstrap/dist/css/bootstrap.min.css'
import '@/styles/header.css' 
import { useEffect, useState } from 'react';
import { buscarTurmasPorEtapa } from '@/lib/client/turmasService.js';
import { buscarEtapas } from '@/lib/client/etapasService.js';

export const Header = () => {
  const [etapas, setEtapas] = useState([]);
  const [turmas, setTurmas] = useState([]);
  const [etapaSelecionada, setEtapaSelecionada] = useState('');
  const [turmaSelecionada, setTurmaSelecionada] = useState('');
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    const etapaSalva = localStorage.getItem('etapaSelecionada') || '';
    const turmaSalva = localStorage.getItem('turmaSelecionada') || '';
    setEtapaSelecionada(etapaSalva);
    setTurmaSelecionada(turmaSalva);
    setCarregando(false);
  }, []);

  useEffect(() => {
    if (etapaSelecionada) localStorage.setItem('etapaSelecionada', etapaSelecionada);
  }, [etapaSelecionada]);
  useEffect(() => {
    if (turmaSelecionada) localStorage.setItem('turmaSelecionada', turmaSelecionada);
  }, [turmaSelecionada]);

  useEffect(() => {
    async function carregarEtapas() {
      const etapasData = await buscarEtapas();
      const nomesEtapas = etapasData.map(e => e.nome_etapa);
      setEtapas(nomesEtapas);

      if (etapaSelecionada && nomesEtapas.includes(etapaSelecionada)) {
        setEtapaSelecionada(etapaSelecionada);
      } else if (nomesEtapas.length > 0) {
        setEtapaSelecionada(nomesEtapas[0]);
      } else {
        setEtapaSelecionada('');
      }
    }
    if (!carregando) carregarEtapas();
  }, [carregando]);

  useEffect(() => {
    async function carregarTurmas() {
      if (etapaSelecionada) {
        try {
          const turmasData = await buscarTurmasPorEtapa(etapaSelecionada);
          const codigosTurmas = turmasData.map(t => t.codigo);
          setTurmas(codigosTurmas);

          if (turmaSelecionada && codigosTurmas.includes(turmaSelecionada)) {
            setTurmaSelecionada(turmaSelecionada);
          } else if (codigosTurmas.length > 0) {
            setTurmaSelecionada(codigosTurmas[0]);
          } else {
            setTurmaSelecionada('');
          }
        } catch {}
      } else {
        setTurmas([]);
        setTurmaSelecionada('');
      }
    }
    if (!carregando) carregarTurmas();
  }, [etapaSelecionada, carregando]);

  const handleEtapaChange = (e) => {
    const novaEtapa = e.target.value;
    setEtapaSelecionada(novaEtapa);
    setTurmaSelecionada('');
    localStorage.setItem('etapaSelecionada', novaEtapa);
    localStorage.setItem('turmaSelecionada', '');
    window.dispatchEvent(new Event('etapaOuTurmaAtualizada'));
  };

  const handleTurmaChange = (e) => {
    const novaTurma = e.target.value;
    setTurmaSelecionada(novaTurma);
    localStorage.setItem('turmaSelecionada', novaTurma);
    window.dispatchEvent(new Event('etapaOuTurmaAtualizada'));
  };

  if (carregando) return null;

  return (
    <header className="header-prof">
      <div className="container-fluid">
        <div className="row">
          <div className="col-3">
            <a href="/dashboard-prof/" className="logo-link">
              <img src="/images/logo-cubo.png" alt="Logo" className="logo" />
            </a>
          </div>
          <div className="col-8 turma-info" style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>            
            <div className="label-select-group">
              <select
                id="etapaDropdown"
                value={etapaSelecionada}
                onChange={handleEtapaChange}
                className="form-select"
              >
                <option value="" disabled hidden>Etapa</option>
                {etapas.map(etapa => (
                  <option key={etapa} value={etapa}>Etapa: {etapa}</option>
                ))}
              </select>
            </div>
            <div className="label-select-group">              <select
                id="turmaDropdown"
                value={turmaSelecionada}
                onChange={handleTurmaChange}
                className="form-select"
                disabled={!etapaSelecionada}
              >
                <option value="" disabled hidden>Turma</option>
                {turmas.map(turma => (
                  <option key={turma} value={turma}>Turma: {turma}</option>
                ))}
              </select>
            </div>
          </div>
          <div className="col-1">
            <a href="/" className="logout-btn">
              <img src="/images/IconLogout.png" alt="Logout" />
            </a>
          </div>
        </div>
      </div>
    </header>
  )
}