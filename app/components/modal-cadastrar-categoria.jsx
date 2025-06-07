'use client'
import 'bootstrap/dist/css/bootstrap.min.css'
import { useState } from 'react'

export const ModalCadastrarCategoria = ({ onClose }) => {
  const [nome, setNome] = useState('')
  const [valor, setValor] = useState('')
  const [erro, setErro] = useState(null)
  const [sucesso, setSucesso] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setErro(null)
    setSucesso(false)

    try {
      // TODO: Implementar API de cadastro
      setSucesso(true)
      setTimeout(() => {
        window.location.reload()
      }, 1500)
    } catch (err) {
      setErro(err.message || 'Erro de conexão com o servidor.')
    }
  }

  return (
    <div>
      <div className="cadastro-modal">
        <h2>Cadastrar Categoria</h2>
        <form onSubmit={handleSubmit}>
          {erro && <p style={{ color: 'red' }}>{erro}</p>}
          {sucesso && <p style={{ color: 'green' }}>Categoria cadastrada com sucesso!</p>}

          <label htmlFor="nome">Nome:</label>
          <input
            type="text"
            id="nome"
            required
            value={nome}
            onChange={e => setNome(e.target.value)}
          />

          <label htmlFor="valor">Valor:</label>
          <input
            type="number"
            id="valor"
            required
            min="0"
            value={valor}
            onChange={e => setValor(e.target.value)}
          />

          <button type="submit" className="cadastro-btn">Cadastrar</button>
        </form>
      </div>
      <div className="blur-background" onClick={onClose}></div>
    </div>
  )
}
