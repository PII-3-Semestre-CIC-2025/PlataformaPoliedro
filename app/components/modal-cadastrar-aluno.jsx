'use client'
import 'bootstrap/dist/css/bootstrap.min.css'
import { useState, useEffect } from 'react'
import { buscarTurmasPorEtapa } from '@/lib/turmasService'

export const ModalCadastrarAluno = ({ onClose }) => {
  const [nome, setNome] = useState('')
  const [matricula, setMatricula] = useState('')
  const [turma, setTurma] = useState('')
  const [erro, setErro] = useState(null)
  const [sucesso, setSucesso] = useState(false)
  const [turmas, setTurmas] = useState([])
  const [carregandoTurmas, setCarregandoTurmas] = useState(true)

  useEffect(() => {
    const etapaSelecionada = localStorage.getItem('etapaSelecionada') || ''
    const turmaSelecionada = localStorage.getItem('turmaSelecionada') || ''
    setTurma(turmaSelecionada)

    if (etapaSelecionada) {
      buscarTurmasPorEtapa(etapaSelecionada)
        .then((turmas) => {
          setTurmas(turmas)
          setCarregandoTurmas(false)
        })
        .catch(() => {
          setErro('Erro ao carregar turmas.')
          setCarregandoTurmas(false)
        })
    } else {
      setCarregandoTurmas(false)
    }
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setErro(null)
    setSucesso(false)

    try {
      const response = await fetch('/api/alunos/cadastrar', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nome, matricula, turma }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Erro ao cadastrar aluno.')
      } else {
        setSucesso(true)
        setTimeout(() => {
          window.location.reload()
        }, 1500)
      }
    } catch (err) {
      setErro(err.message || 'Erro de conexão com o servidor.')
    }
  }

  return (
    <div>
      <div className="cadastro-modal">
        <h2>Cadastrar Aluno</h2>
        <form onSubmit={handleSubmit}>
          {erro && <p style={{ color: 'red' }}>{erro}</p>}
          {sucesso && <p style={{ color: 'green' }}>Aluno cadastrado com sucesso!</p>}

          <label htmlFor="nome">Nome:</label>
          <input
            type="text"
            id="nome"
            required
            value={nome}
            onChange={e => setNome(e.target.value)}
          />

          <label htmlFor="matricula">Matrícula:</label>
          <input
            type="text"
            id="matricula"
            required
            value={matricula}
            onChange={e => setMatricula(e.target.value)}
          />

          <label htmlFor="turma">Turma:</label>
          {carregandoTurmas ? (
            <p>Carregando turmas...</p>
          ) : (
            <select
              id="turma"
              required
              value={turma}
              onChange={e => setTurma(e.target.value)}
              className="dropdown-cadastro-turmas"
            >
              <option value="">Selecione a turma</option>
              {turmas.map((t) => (
                <option key={t.codigo} value={t.codigo}>
                  {t.codigo}
                </option>
              ))}
            </select>
          )}

          <button type="submit" className="cadastro-btn">Cadastrar</button>
        </form>
      </div>
      <div className="blur-background" onClick={onClose}></div>
    </div>
  )
}