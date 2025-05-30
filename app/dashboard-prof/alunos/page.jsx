'use client'
import 'bootstrap/dist/css/bootstrap.min.css';
import '@/styles/alunos-prof.css';
import '@/styles/botao-add-aluno.css';
import { useState, useEffect } from 'react';
import { ModalEditarAluno } from '@/app/components/modal-editar-aluno';
import { Header } from '@/app/components/header';
import { buscarAlunosPorTurma } from '@/lib/alunosService';

export default function AlunosProf() {
    const [alunos, setAlunos] = useState([]);
    const [erro, setErro] = useState(null);
    const [alunoParaEditar, setAlunoParaEditar] = useState(null);

    useEffect(() => {
        const fetchAlunos = async () => {
            try {
                const turmaSelecionada = localStorage.getItem('turmaSelecionada');
                if (!turmaSelecionada) {
                    setErro('Nenhuma turma selecionada.');
                    return;
                }
                const alunosData = await buscarAlunosPorTurma(turmaSelecionada);
                setAlunos(alunosData.map((rel, idx) => ({
                    id: idx + 1,
                    nome: rel.alunos.nome,
                    matricula: rel.alunos.RA,
                    turma: turmaSelecionada
                })));
            } catch (error) {
                setErro('Erro ao buscar alunos: ' + error.message);
            }
        };
        fetchAlunos();
    }, []);

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
                        <tbody>{alunos.map((aluno) => (
                            <tr key={aluno.id}>
                                <td>{aluno.nome}</td>
                                <td>{aluno.matricula}</td>
                                <td>{aluno.turma}</td>
                                <td>
                                    <div className="acoes">
                                        <button
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
                        ))}</tbody>
                    </table>
                </div>
                <button className="botao-add-aluno">
                    Adicionar Aluno
                </button>
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