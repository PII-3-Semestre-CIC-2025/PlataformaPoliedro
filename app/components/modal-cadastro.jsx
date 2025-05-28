'use client'
import 'bootstrap/dist/css/bootstrap.min.css'
import { useState } from 'react'

export const ModalCadastro = ({ onClose }) => {
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const [confirmarSenha, setConfirmarSenha] = useState('')
  const [erro, setErro] = useState(null)
  const [sucesso, setSucesso] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setErro(null)
    setSucesso(false)

    if (senha !== confirmarSenha) {
      setErro('As senhas não coincidem.')
      return
    }

    try {
      const response = await fetch('/api/auth/cadastro', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, senha }),
      })

      const data = await response.json()

      if(!response.ok) {
        throw new Error(data.error || 'Erro ao realizar cadastro. Tente novamente mais tarde.')
      } else {
        setSucesso(true);
        setTimeout(() => onClose(), 2000);
      }
    } catch (err) {
      setErro(err.message || 'Erro de conexão com o servidor.')
    }
  }

  return (
    <div>
      <div className="cadastro-modal">
        <h2>Cadastro</h2>
        <form onSubmit={handleSubmit}>
          {erro && <p style={{ color: 'red' }}>{erro}</p>}
          {sucesso && <p style={{ color: 'green' }}>Cadastro realizado com sucesso!</p>}

          <label htmlFor="email">E-mail Institucional:</label>
          <input
            type="email"
            id="email"
            placeholder='Ex.: joao@p4ed.com.br'
            //pattern=".+@p4ed\.com\.br"
            //title="Use seu e-mail institucional que termina com @p4ed.com.br"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <label htmlFor="senha">Senha:</label>
          <input
            type="password"
            id="senha"
            placeholder='Mínimo 8 caracteres'
            minLength="8"
            required
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
          />

          <label htmlFor="confirmar">Confirmar Senha:</label>
          <input
            type="password"
            id="confirmar"
            placeholder="Repita a senha"
            minLength="8"
            required
            value={confirmarSenha}
            onChange={(e) => setConfirmarSenha(e.target.value)}
          />

          <button type="submit" className="cadastro-btn">Confirmar</button>
        </form>
      </div>
      <div className="blur-background" onClick={onClose}></div>
    </div>
  )
}
