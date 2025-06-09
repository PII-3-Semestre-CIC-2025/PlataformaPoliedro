'use client'
import { useState } from 'react'
import '@/styles/alunos-prof.css'

export const ModalEditarCategoria = ({ categoria, onClose, onSave }) => {
  const [nome, setNome] = useState(categoria.nome)
  const [valor, setValor] = useState(categoria.valor)
  const [erro, setErro] = useState(null)
  const [sucesso, setSucesso] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErro(null);
    setSucesso(false);

    try {
      const res = await fetch(`/api/categorias/${categoria.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nome: nome,
          valor: parseInt(valor)
        })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Erro ao atualizar categoria.');

      setSucesso(true);
      setTimeout(() => {
        onSave(data);
      }, 500);
    } catch (err) {
      setErro('Erro ao atualizar categoria.');
    }
  }

  return (
    <div>
      <div className="cadastro-modal">
        <h2>Editar Categoria</h2>
        <form onSubmit={handleSubmit}>
          {erro && <p style={{ color: 'red' }}>{erro}</p>}
          {sucesso && <p style={{ color: 'green' }}>Categoria atualizada com sucesso!</p>}

          <label htmlFor="nome">Nome:</label>
          <input
            type="text"
            id="nome"
            required
            value={nome}
            onChange={(e) => setNome(e.target.value)}
          />

          <label htmlFor="valor">Valor:</label>
          <input
            type="number"
            id="valor"
            required
            min="0"
            value={valor}
            onChange={(e) => setValor(e.target.value)}
          />

          <button type="submit" className="cadastro-btn">Salvar</button>
        </form>
      </div>
      <div className="blur-background" onClick={onClose}></div>
    </div>
  )
}
