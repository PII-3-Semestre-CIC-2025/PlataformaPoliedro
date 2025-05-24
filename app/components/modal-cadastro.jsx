'use client'
import 'bootstrap/dist/css/bootstrap.min.css'
import { useState } from 'react'
import { supabase } from '@/lib/supabaseClient'

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
      const { error: signUpError } = await supabase.auth.signUp({
        email,
        password: senha,
      })

      if (signUpError) throw new Error('Erro no cadastro: ' + signUpError.message)

      const { error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password: senha,
      })

      if (signInError) throw new Error('Erro ao autenticar após cadastro: ' + signInError.message)

      const { data: session } = await supabase.auth.getSession()
      const uid = session.session?.user?.id
      if (!uid) throw new Error('auth.uid() não está disponível')

      const { error: insertError } = await supabase.from('professores').insert([
        {
          email,
          user_id: uid,
        },
      ])

      if (insertError) throw new Error('Erro ao salvar na tabela professores: ' + insertError.message)

      setSucesso(true)
      setTimeout(() => onClose(), 2000)

    } catch (err) {
      setErro(err.message)
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
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label htmlFor="senha">Senha:</label>
          <input
            type="password"
            id="senha"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            required
          />

          <label htmlFor="confirmar">Confirmar Senha:</label>
          <input
            type="password"
            id="confirmar"
            value={confirmarSenha}
            onChange={(e) => setConfirmarSenha(e.target.value)}
            required
          />

          <button type="submit" className="cadastro-btn">Confirmar</button>
        </form>
      </div>
      <div className="blur-background" onClick={onClose}></div>
    </div>
  )
}
