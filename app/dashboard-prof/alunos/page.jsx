'use client'
import 'bootstrap/dist/css/bootstrap.min.css';
import '@/styles/alunos-prof.css';
import '@/styles/botao-add-aluno.css';
import { useState, useEffect, useCallback } from 'react';
import { ModalEditarAluno } from '@/app/components/modal-editar-aluno';
import { ModalCadastrarAluno } from '@/app/components/modal-cadastrar-aluno';
import { Header } from '@/app/components/header-prof';
import { buscarAlunosPorTurma } from '@/lib/client/alunosService';

export default function AlunosProf() {
    const [alunos, setAlunos] = useState([]);
    const [erro, setErro] = useState(null);
    const [alunoParaEditar, setAlunoParaEditar] = useState(null);
    const [abrirModalCadastrar, setAbrirModalCadastrar] = useState(false);

    const fetchAlunos = useCallback(async () => {
        try {
            const turmaSelecionada = localStorage.getItem('turmaSelecionada');
            if (!turmaSelecionada) {
                setErro('Nenhuma turma selecionada.');
                setAlunos([]);
                return;
            }
            const alunosData = await buscarAlunosPorTurma(turmaSelecionada);
            setAlunos(alunosData.map((rel, idx) => ({
                id: idx + 1,
                nome: rel.alunos.nome,
                matricula: rel.alunos.RA,
                turma: turmaSelecionada
            })));
            setErro(null);
        } catch (error) {
            setErro('Erro ao buscar alunos: ' + error.message);
        }
    }, []);

    useEffect(() => {
        fetchAlunos();
        window.addEventListener('etapaOuTurmaAtualizada', fetchAlunos);
        window.addEventListener('storage', fetchAlunos);
        window.addEventListener('focus', fetchAlunos);
        return () => {
            window.removeEventListener('etapaOuTurmaAtualizada', fetchAlunos);
            window.removeEventListener('storage', fetchAlunos);
            window.removeEventListener('focus', fetchAlunos);
        };
    }, [fetchAlunos]);

    const handleEdit = (aluno) => {
        setAlunoParaEditar(aluno);
    };

    const handleSaveEdit = (alunoAtualizado) => {
        setAlunos(alunos.map(aluno => 
            aluno.id === alunoAtualizado.id ? alunoAtualizado : aluno
        ));
        setAlunoParaEditar(null);
    };

    const handleDelete = async (matricula) => {
        if (window.confirm('Tem certeza que deseja excluir este aluno?')) {
            try {
                const res = await fetch(`/api/alunos/${matricula}`, {
                    method: 'DELETE',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ ra: matricula })
                });
                const result = await res.json();
                if (!res.ok) throw new Error(result.error || 'Erro ao excluir aluno');
                setAlunos(alunos.filter(aluno => aluno.matricula !== matricula));
            } catch (error) {
                setErro('Erro ao excluir aluno: ' + error.message);
            }
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
                        <tbody>{alunos
                        .slice()
                        .sort((a,b) => a.nome.localeCompare(b.nome, 'pt-BR'))
                        .map((aluno) => (
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
                                            onClick={() => handleDelete(aluno.matricula)}
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
                <button
                    className="botao-add-aluno"
                    onClick={() => setAbrirModalCadastrar(true)}
                >
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

            {abrirModalCadastrar && (
                <ModalCadastrarAluno
                    onClose={() => setAbrirModalCadastrar(false)}
                />
            )}
        </div>
    );
}