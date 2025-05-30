"use client"
import { createClient } from '@supabase/supabase-js'
import jsPDF from 'jspdf'
import 'jspdf-autotable'
import { Header } from "@/app/components/header";
import '@/styles/relatorio.css';
import { useState } from 'react';
import { ModalEditarAluno } from '@/app/components/modal-editar-aluno';
// Inicialize o Supabase
const supabaseUrl = 'https://pcauhgurzvskmktpxhgp.supabase.co'
const supabaseKey = '<eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBjYXVoZ3VyenZza21rdHB4aGdwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDgwOTI0NTksImV4cCI6MjA2MzY2ODQ1OX0.J19RUc9uG5WZQr4NSxTLI-Eadqd2tcqhkK-8IXyYjiQ>'
const supabase = createClient(supabaseUrl, supabaseKey)

// Buscar os dados da tabela
const fetchData = async () => {
  const { data, error } = await supabase
    .from('Tabela Aluno')
    .select('*')

  if (error) {
    console.error('Erro ao buscar dados:', error)
    return []
  }

  return data
}

const gerarPDF = async () => {
  const dados = await fetchData()

  const doc = new jsPDF()

  // Cabeçalho
  doc.setFontSize(16)
  doc.text('Relatório de Dados', 10, 10)

  // Dados da tabela (ajuste conforme seus campos)
  const colunas = ['ID', 'Nome', 'Email']
  const linhas = dados.map(item => [item.id, item.nome, item.email])

  // Tabela com autoTable
  doc.autoTable({
    startY: 20,
    head: [colunas],
    body: linhas,
  })

  doc.save('relatorio.pdf')
}

// Componente React principal da página
export default function RelatorioPage() {
  const [alunos, setAlunos] = useState([
    { id: 1, nome: 'Henrique Nalin', matricula: '24.01883-0', turma: 'Turma 1 Sub 2' },
    { id: 2, nome: 'Luiza Gomes', matricula: '25.00533-2', turma: 'Turma 1 Sub 2' },
    { id: 3, nome: 'Leonardo Belo', matricula: '24.00000-0', turma: 'Turma 1 Sub 2' },
    { id: 4, nome: 'Leticia Carvalho', matricula: '24.00000-1', turma: 'Turma 1 Sub 2' },
    { id: 5, nome: 'Bruno Nogueira', matricula: '24.00000-2', turma: 'Turma 1 Sub 2' },
    { id: 6, nome: 'Breno Augusto', matricula: '24.00000-3', turma: 'Turma 1 Sub 2' },
    { id: 7, nome: 'Mateo Cortez', matricula: '24.00000-4', turma: 'Turma 1 Sub 2' },
    { id: 8, nome: 'Vitor Porto', matricula: '24.00000-5', turma: 'Turma 1 Sub 2' },
    { id: 9, nome: 'Lyssa Okawa', matricula: '24.00000-6', turma: 'Turma 1 Sub 2' }
  ]);
  const [erro, setErro] = useState(null);
  const [alunoParaEditar, setAlunoParaEditar] = useState(null);

  const handleEdit = (aluno) => {
    setAlunoParaEditar(aluno);
  };

  const handleSaveEdit = (alunoAtualizado) => {
    setAlunos(alunos.map(aluno =>
      aluno.id === alunoAtualizado.id ? alunoAtualizado : aluno
    ));
    setAlunoParaEditar(null);
  };

  return (
    <div className="pagina-relatorio">
      <Header />
      <div className="alunos-prof">
        <main className="container-fluid px-4">
          {erro && <div className="alert alert-danger" role="alert">{erro}</div>}
          <div className="table-responsive">
            <table className="table-alunos">
              <thead>
                <tr>
                  <th>Nome</th>
                  <th>Matrícula</th>
                  <th>Turma</th>
                  <th>Ações</th>
                </tr>
              </thead>
              <tbody>
                {alunos.map((aluno) => (
                  <tr key={aluno.id}>
                    <td>{aluno.nome}</td>
                    <td>{aluno.matricula}</td>
                    <td>{aluno.turma}</td>
                    <td>
                      <div className="acoes">
                        <div className='container-fluid botao'>
                          <button className='btn-relatorio' onClick={gerarPDF}>Gerar Relatório PDF</button>
                        </div>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </main>
        {alunoParaEditar && (
          <ModalEditarAluno
            aluno={alunoParaEditar}
            onClose={() => setAlunoParaEditar(null)}
            onSave={handleSaveEdit}
          />
        )}
      </div>
    </div>
  );
}