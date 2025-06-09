'use client'
import 'bootstrap/dist/css/bootstrap.min.css'
import '@/styles/header.css' 
import { useEffect, useState } from 'react';
import { buscarTurmasPorEtapa } from '@/lib/turmasService.js';
import { buscarEtapas } from '@/lib/etapasService.js';

export const Header = () => {
  const [etapaAtual, setEtapaAtual] = useState('');
  const [turmaAtual, setTurmaAtual] = useState('');
  const [etapas, setEtapas] = useState([]);
  const [turmas, setTurmas] = useState([]);

  useEffect(() => {
    async function carregarEtapas() {
      const etapasData = await buscarEtapas();
      const nomesEtapas = etapasData.map(e => e.nome_etapa);
      setEtapas(nomesEtapas);

      const etapaSalva = localStorage.getItem('etapaSelecionada');
      if (etapaSalva && nomesEtapas.includes(etapaSalva)) {
        setEtapaAtual(etapaSalva);
      } else if (nomesEtapas.length > 0) {
        setEtapaAtual(nomesEtapas[0]);
        localStorage.setItem('etapaSelecionada', nomesEtapas[0]);
      } else {
        setEtapaAtual('');
      }
    }
    carregarEtapas();
  }, []);

  useEffect(() => {
    async function carregarTurmas() {
      if (etapaAtual) {
        try {
          const turmasData = await buscarTurmasPorEtapa(etapaAtual);
          const codigosTurmas = turmasData.map(t => t.codigo);
          setTurmas(codigosTurmas);

          const turmaSalva = localStorage.getItem('turmaSelecionada');
          if (turmaSalva && codigosTurmas.includes(turmaSalva)) {
            setTurmaAtual(turmaSalva);
          } else if (codigosTurmas.length > 0) {
            setTurmaAtual(codigosTurmas[0]);
            localStorage.setItem('turmaSelecionada', codigosTurmas[0]);
          } else {
            setTurmaAtual('');
          }
        } catch {}
      } else {
        setTurmas([]);
        setTurmaAtual('');
      }
    }
    carregarTurmas();
  }, [etapaAtual]);

  const handleEtapaChange = (e) => {
    const novaEtapa = e.target.value;
    setEtapaAtual(novaEtapa);
    localStorage.setItem('etapaSelecionada', novaEtapa);
    setTurmaAtual('');
    localStorage.removeItem('turmaSelecionada');
    window.location.reload();
  };

  const handleTurmaChange = (e) => {
    const novaTurma = e.target.value;
    setTurmaAtual(novaTurma);
    localStorage.setItem('turmaSelecionada', novaTurma);
    window.location.reload();
  };

  return (
    <header className="header-prof">
      <div className="container-fluid">
        <div className="row">
          <div className="col-3">
            <a href="/dashboard-prof/" className="logo-link">
              <img src="/images/logo-cubo.png" alt="Logo" className="logo" />
            </a>
          </div>
          <div className="col-8 turma-info" style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>            <div className="label-select-group">
              <select
                id="etapaDropdown"
                value={etapaAtual}
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
                value={turmaAtual}
                onChange={handleTurmaChange}
                className="form-select"
                disabled={!etapaAtual}
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