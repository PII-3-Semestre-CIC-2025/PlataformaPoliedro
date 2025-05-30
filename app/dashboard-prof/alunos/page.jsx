'use client'
import 'bootstrap/dist/css/bootstrap.min.css';
import '@/styles/alunos-prof.css';
import { useState } from 'react';
import { ModalEditarAluno } from '@/app/components/modal-editar-aluno';
import { Header } from '@/app/components/header';

export default function AlunosProf() {
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

    const handleDelete = async (id) => {
        if (window.confirm('Tem certeza que deseja excluir este aluno?')) {
            setAlunos(alunos.filter(aluno => aluno.id !== id));
        }
    };

    return (
        <div className="alunos-prof">
            <Header />
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
                                        <div className="acoes">                                            <button
                                                className="edit-btn"
                                                onClick={() => handleEdit(aluno)}
                                            >
                                                Editar
                                            </button>
                                            <button
                                                onClick={() => handleDelete(aluno.id)}
                                                className="delete-btn"
                                            >
                                                <img src="/images/Icon Deletar.png" alt="Deletar" className="trash-icon" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>                </div>
            </main>

            {alunoParaEditar && (
                <ModalEditarAluno
                    aluno={alunoParaEditar}
                    onClose={() => setAlunoParaEditar(null)}
                    onSave={handleSaveEdit}
                />
            )}
        </div>
    );
}