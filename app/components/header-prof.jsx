'use client'
import 'bootstrap/dist/css/bootstrap.min.css'
import '@/styles/header-globals.css'
import '@/styles/header-prof.css'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { buscarTurmasPorEtapa } from '@/lib/client/turmasService.js'
import { buscarEtapas } from '@/lib/client/etapasService.js'
import { ModalCriarTurma } from './modal-criar-turma'

export const Header = () => {
  const [etapas, setEtapas] = useState([])
  const [turmas, setTurmas] = useState([])
  const [etapaSelecionada, setEtapaSelecionada] = useState('')
  const [turmaSelecionada, setTurmaSelecionada] = useState('')
  const [carregando, setCarregando] = useState(true)
  const [menuAberto, setMenuAberto] = useState(false)
  const [showModalCriarTurma, setShowModalCriarTurma] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const etapaSalva = localStorage.getItem('etapaSelecionada') || ''
    const turmaSalva = localStorage.getItem('turmaSelecionada') || ''
    setEtapaSelecionada(etapaSalva)
    setTurmaSelecionada(turmaSalva)
    setCarregando(false)
  }, [])

  useEffect(() => {
    if (etapaSelecionada) localStorage.setItem('etapaSelecionada', etapaSelecionada)
  }, [etapaSelecionada])
  useEffect(() => {
    if (turmaSelecionada) localStorage.setItem('turmaSelecionada', turmaSelecionada)
  }, [turmaSelecionada])

  useEffect(() => {
    async function carregarEtapas() {
      const etapasData = await buscarEtapas()
      const nomesEtapas = etapasData.map(e => e.nome_etapa)
      setEtapas(nomesEtapas)
      if (etapaSelecionada && nomesEtapas.includes(etapaSelecionada)) {
        setEtapaSelecionada(etapaSelecionada)
      } else if (nomesEtapas.length > 0) {
        setEtapaSelecionada(nomesEtapas[0])
      } else {
        setEtapaSelecionada('')
      }
    }
    if (!carregando) carregarEtapas()
  }, [carregando])

  useEffect(() => {
    async function carregarTurmas() {
      if (etapaSelecionada) {
        try {
          const turmasData = await buscarTurmasPorEtapa(etapaSelecionada)
          const codigosTurmas = turmasData.map(t => t.codigo).sort((a, b) => a.localeCompare(b))
          setTurmas(codigosTurmas)
          if (turmaSelecionada && codigosTurmas.includes(turmaSelecionada)) {
            setTurmaSelecionada(turmaSelecionada)
          } else if (codigosTurmas.length > 0) {
            setTurmaSelecionada(codigosTurmas[0])
            localStorage.setItem('turmaSelecionada', codigosTurmas[0])
            window.dispatchEvent(new Event('etapaOuTurmaAtualizada'))
          } else {
            setTurmaSelecionada('')
            localStorage.setItem('turmaSelecionada', '')
            window.dispatchEvent(new Event('etapaOuTurmaAtualizada'))
          }
        } catch {}
      } else {
        setTurmas([])
        setTurmaSelecionada('')
        localStorage.setItem('turmaSelecionada', '')
        window.dispatchEvent(new Event('etapaOuTurmaAtualizada'))
      }
    }
    if (!carregando) carregarTurmas()
  }, [etapaSelecionada, carregando])

  const handleEtapaChange = (e) => {
    const novaEtapa = e.target.value
    setEtapaSelecionada(novaEtapa)
    setTurmaSelecionada('')
    localStorage.setItem('etapaSelecionada', novaEtapa)
    localStorage.setItem('turmaSelecionada', '')
  }
  const handleTurmaChange = (e) => {
    const novaTurma = e.target.value
    setTurmaSelecionada(novaTurma)
    localStorage.setItem('turmaSelecionada', novaTurma)
    window.dispatchEvent(new Event('etapaOuTurmaAtualizada'))
  }

  const handleLogout = async (e) => {
    e.preventDefault()
    await fetch('/api/auth/logout')
    router.push('/login')
  }

  const toggleMenu = () => setMenuAberto(!menuAberto)

  if (carregando) return <header className="header-base header-prof" style={{ minHeight: 100 }}></header>
  return (
    <>
      {/* Header Desktop */}
      <header className="header-base header-prof">
        <div className="container-fluid desktop-only">
          <div className="row align-items-center">
            <div className="col-3 d-flex align-items-center">
              <a href="/dashboard-prof/" className="logo-link">
                <img src="/images/logo-cubo.png" alt="Logo" className="logo" />
              </a>
            </div>
            <div className="col-6 d-flex align-items-center justify-content-center gap-2">
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
              <select
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
              <button
                className="btn-adicionar-turma"
                onClick={() => setShowModalCriarTurma(true)}
                title="Adicionar Nova Turma"
              >
                + Adicionar Turma
              </button>
            </div>
            <div className="col-3 d-flex justify-content-end align-items-center">
              <a href="#" className="logout-btn" onClick={handleLogout}>
                <img src="/images/IconLogout.png" alt="Logout" />
              </a>
            </div>
          </div>
        </div>

        {/* Header Mobile */}
        <div className="container-fluid mobile-only">
          <div className="row align-items-center" style={{ width: "100%" }}>
            <div className="col-3">
              <a href="/dashboard-prof/" className="logo-link">
                <img src="/images/logo-cubo.png" alt="Logo" className="logo" />
              </a>
            </div>
            <div className="col-8"></div>
            <div className="col-1 header-controls">
              <button
                className="menu-toggle"
                onClick={toggleMenu}
                aria-label="Toggle menu"
              >
                <span></span>
                <span></span>
                <span></span>
              </button>
              <a href="#" className="logout-btn" onClick={handleLogout}>
                <img src="/images/IconLogout.png" alt="Logout" />
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <div className={`mobile-navbar ${menuAberto ? 'active' : ''}`}>
        <div className="mobile-menu-content">
          <div className="mobile-select-group">
            <label>Etapa:</label>
            <select
              value={etapaSelecionada}
              onChange={handleEtapaChange}
              className="form-select mobile-select"
            >
              <option value="" disabled hidden>Selecione uma etapa</option>
              {etapas.map(etapa => (
                <option key={etapa} value={etapa}>{etapa}</option>
              ))}
            </select>
          </div>
          <div className="mobile-select-group">
            <label>Turma:</label>
            <select
              value={turmaSelecionada}
              onChange={handleTurmaChange}
              className="form-select mobile-select"
              disabled={!etapaSelecionada}
            >
              <option value="" disabled hidden>Selecione uma turma</option>
              {turmas.map(turma => (
                <option key={turma} value={turma}>{turma}</option>
              ))}
            </select>
          </div>
          <div className="mobile-select-group">
            <button
              className="btn-adicionar-turma-mobile"
              onClick={() => setShowModalCriarTurma(true)}
            >
              + Adicionar Turma
            </button>
          </div>
          <div className="mobile-select-group">
            <a href="#" className="mobile-logout-btn" onClick={handleLogout}>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                <path fillRule="evenodd" d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0v2z"/>
                <path fillRule="evenodd" d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3z"/>
              </svg>
              Sair
            </a>
          </div>
        </div>
      </div>
      {menuAberto && <div className="menu-overlay" onClick={toggleMenu}></div>}

      {showModalCriarTurma && (
        <ModalCriarTurma onClose={() => setShowModalCriarTurma(false)} />
      )}
    </>
  )
}