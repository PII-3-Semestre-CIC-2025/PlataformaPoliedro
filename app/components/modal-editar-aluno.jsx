'use client'
import { useState } from 'react'
import '../../styles/alunos-prof.css'

export const ModalEditarAluno = ({ aluno, onClose, onSave }) => {
  const [nome, setNome] = useState(aluno.nome)
  const [matricula, setMatricula] = useState(aluno.matricula)
  const [turma, setTurma] = useState(aluno.turma)
  const [erro, setErro] = useState(null)
  const [sucesso, setSucesso] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErro(null);
    setSucesso(false);

    try {
      const res = await fetch(`/api/alunos/${matricula}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nome,
          turma
        })
      });
      const result = await res.json();
      if (!res.ok) throw new Error(result.error || 'Erro ao atualizar aluno');
      setSucesso(true);
      setTimeout(() => {
        onSave({
          ...aluno,
          nome,
          matricula,
          turma
        });
        window.location.reload();
      }, 500);
    } catch (err) {
      setErro('Erro ao atualizar aluno.');
    }
  }

  return (
    <div>
      <div className="cadastro-modal">
        <h2>Editar Aluno</h2>
        <form onSubmit={handleSubmit}>
          {erro && <p style={{ color: 'red' }}>{erro}</p>}
          {sucesso && <p style={{ color: 'green' }}>Aluno atualizado com sucesso!</p>}

          <label htmlFor="nome">Nome:</label>
          <input
            type="text"
            id="nome"
            required
            value={nome}
            onChange={(e) => setNome(e.target.value)}
          />

          <label htmlFor="matricula">Matrícula:</label>
          <input
            type="text"
            id="matricula"
            required
            value={matricula}
            onChange={(e) => setMatricula(e.target.value)}
          />

          <label htmlFor="turma">Turma:</label>
          <input
            type="text"
            id="turma"
            required
            value={turma}
            onChange={(e) => setTurma(e.target.value)}
          />

          <button type="submit" className="cadastro-btn">Salvar</button>
        </form>
      </div>
      <div className="blur-background" onClick={onClose}></div>
    </div>
  )
}