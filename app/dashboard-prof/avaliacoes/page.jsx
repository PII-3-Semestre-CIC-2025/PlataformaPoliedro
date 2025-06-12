'use client'
import { useState, useEffect, useCallback } from 'react';
import { Header } from '@/app/components/header-prof';
import '@/styles/avaliacoes/avaliacoes.css';
import '@/styles/avaliacoes/botao-selectaluno-avaliacoes.css';
import '@/styles/avaliacoes/botao-atribuir-nota.css';
import '@/styles/avaliacoes/botao-add-avaliacao.css';
import '@/styles/avaliacoes/modal-adicionar-avaliacao.css';
import '@/styles/avaliacoes/modal-gerenciar-avaliacoes.css';
import { ModalAdicionarAvaliacao } from '@/app/components/modal-adicionar-avaliacao';
import { ModalAtribuirNota } from '@/app/components/modal-atribuir-nota';
import { ModalGerenciarAvaliacoes } from '@/app/components/modal-gerenciar-avaliacoes';
import { buscarAlunosPorTurma } from '@/lib/client/alunosService';
import { buscarNotasPorTurma } from '@/lib/client/notasService';
import { buscarAvaliacoesPorTurma } from '@/lib/client/avaliacoesService';

export default function AvaliacoesPage() {
    const [alunoSelecionado, setAlunoSelecionado] = useState('');
    const [modalAddAvaliacaoAberto, setModalAddAvaliacaoAberto] = useState(false);
    const [modalNotaAberto, setModalNotaAberto] = useState(false);
    const [modalGerenciarAberto, setModalGerenciarAberto] = useState(false);

    const [avaliacoesDisponiveis, setAvaliacoesDisponiveis] = useState([]);
    const [notasAlunos, setNotasAlunos] = useState({});
    
    const [alunos, setAlunos] = useState([]);
    const [turmaSelecionada, setTurmaSelecionada] = useState('');

    useEffect(() => {
        setAlunoSelecionado('');
    }, [turmaSelecionada]);

    const fetchAll = useCallback(async () => {
        const turma = localStorage.getItem('turmaSelecionada');
        setTurmaSelecionada(turma || '');
        if (!turma) {
            setAlunos([]);
            setNotasAlunos({});
            setAvaliacoesDisponiveis([]);
            return;
        }
        const [alunosData, notas, avaliacoes] = await Promise.all([
            buscarAlunosPorTurma(turma),
            buscarNotasPorTurma(turma),
            buscarAvaliacoesPorTurma(turma)
        ]);
        setAlunos(alunosData.map(rel => ({ ra: rel.alunos.RA, nome: rel.alunos.nome })));
        const agrupadas = {};
        notas.forEach(nota => {
            if (!agrupadas[nota.RA_aluno]) agrupadas[nota.RA_aluno] = [];
            agrupadas[nota.RA_aluno].push({
                id_avaliacao: nota.id_avaliacao,
                nota: nota.nota,
                id: nota.id
            });
        });
        setNotasAlunos(agrupadas);
        setAvaliacoesDisponiveis(avaliacoes);
    }, []);

    useEffect(() => {
        fetchAll();
        window.addEventListener('etapaOuTurmaAtualizada', fetchAll);
        window.addEventListener('storage', fetchAll);
        window.addEventListener('focus', fetchAll);
        return () => {
            window.removeEventListener('etapaOuTurmaAtualizada', fetchAll);
            window.removeEventListener('storage', fetchAll);
            window.removeEventListener('focus', fetchAll);
        };
    }, [fetchAll]);

    const handleEditarAvaliacao = (avaliacaoAtualizada) => {
        setAvaliacoesDisponiveis(avaliacoes => 
            avaliacoes.map(av => 
                av.id === avaliacaoAtualizada.id ? avaliacaoAtualizada : av
            )
        );
        alert('A avaliação foi atualizada com sucesso.');
    };

    const handleExcluirAvaliacao = (id) => {
        alert('A avaliação e todas as notas relacionadas foram excluídas com sucesso.');

        setAvaliacoesDisponiveis(avaliacoes => 
            avaliacoes.filter(av => av.id !== id)
        );
    };

    const handleAdicionarAvaliacao = async (novaAvaliacao) => {
        setAvaliacoesDisponiveis(avaliacoes => [...avaliacoes, novaAvaliacao]);
        const turma = localStorage.getItem('turmaSelecionada');
        if (turma) {
            const avaliacoes = await buscarAvaliacoesPorTurma(turma);
            setAvaliacoesDisponiveis(avaliacoes);
        }

        if (modalNotaAberto) {
            setModalNotaAberto(false);
            setTimeout(() => setModalNotaAberto(true), 0);
        }
    };

    const handleAtribuirNota = async (notaSalva) => {
        await atualizarNotas();
    };

    const handleExcluirNota = async (id_avaliacao) => {
        if (!alunoSelecionado) return;
        const notaParaExcluir = (notasAlunos[alunoSelecionado] || []).find(
            nota => nota.id_avaliacao === id_avaliacao
        );
        if (!notaParaExcluir) return;
        await fetch(`/api/notas/${notaParaExcluir.id}`, { method: 'DELETE' });
        await atualizarNotas();
    };

    async function atualizarNotas() {
        const turma = localStorage.getItem('turmaSelecionada');
        if (!turma) return;
        const notas = await buscarNotasPorTurma(turma);
        const agrupadas = {};
        notas.forEach(nota => {
            if (!agrupadas[nota.RA_aluno]) agrupadas[nota.RA_aluno] = [];
            agrupadas[nota.RA_aluno].push({
                id_avaliacao: nota.id_avaliacao,
                nota: nota.nota,
                id: nota.id
            });
        });
        setNotasAlunos(agrupadas);
    }

    return (
        <div className="pagina-avaliacoes">
            <Header />
            <main className="container-fluid px-4">
                <div className="secao-controles mb-4">
                    <div className="controles-avaliacoes">
                        <div className="controles-esquerda" style={{ display: 'flex', gap: '20px' }}>
                            <div className="select-container">
                                <select
                                    className="botao-selectaluno-avaliacoes"
                                    value={alunoSelecionado}
                                    onChange={(e) => setAlunoSelecionado(e.target.value)}
                                >
                                    <option value="">Selecionar Aluno</option>
                                    {alunos.map((aluno) => (
                                        <option key={aluno.ra} value={aluno.ra}>
                                            {aluno.nome}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <button 
                                className="botao-atribuir-nota"
                                disabled={!alunoSelecionado}
                                onClick={() => setModalNotaAberto(true)}
                            >
                                Atribuir Nota
                            </button>
                        </div>
                        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                            <button 
                                className="botao-add-avaliacao"
                                onClick={() => setModalAddAvaliacaoAberto(true)}
                            >
                                Adicionar Avaliação
                            </button>
                            <button
                                className="botao-configuracoes"
                                onClick={() => setModalGerenciarAberto(true)}
                            > 
                            <img 
                                src="/images/iconsettings.png"
                                alt="Configurações"
                                width={40}
                                height={40}
                                style={{ filter: 'brightness(0) saturate(100%) invert(27%) sepia(88%) saturate(1361%) hue-rotate(189deg) brightness(97%) contrast(89%)' }}
                            />
                            </button>
                        </div>
                    </div>
                </div>

                {alunoSelecionado && (
                    <div className="secao-notas">
                        <h2 className="titulo-notas">
                            Notas de {alunos.find(a => a.ra === alunoSelecionado)?.nome || ''}
                        </h2>
                        <div className="table-responsive">                            
                            <table className="tabela-avaliacoes">
                                <thead>
                                    <tr>
                                        <th>Disciplina</th>
                                        <th>Avaliação</th>
                                        <th>Nota (0-10)</th>
                                        <th>Peso</th>
                                        <th>Ações</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {notasAlunos[alunoSelecionado]
                                        ?.filter(nota => nota && typeof nota.id_avaliacao !== 'undefined')
                                        .slice()
                                        .sort((a, b) => {
                                            const avA = avaliacoesDisponiveis.find(av => av.id === a.id_avaliacao);
                                            const avB = avaliacoesDisponiveis.find(av => av.id === b.id_avaliacao);
                                            if (!avA || !avB) return 0;
                                            return avA.disciplina.localeCompare(avB.disciplina, 'pt-BR', { sensitivity: 'base' });
                                        })
                                        .map((nota) => {
                                            const avaliacao = avaliacoesDisponiveis.find(a => a.id === nota.id_avaliacao);
                                            if (!avaliacao) return null;

                                            return (
                                                <tr key={`${avaliacao.id}-${nota.id}`}>
                                                    <td><span className="disciplina-badge">{avaliacao.disciplina}</span></td>
                                                    <td>{avaliacao.nome}</td>
                                                    <td>{nota.nota.toFixed(1)}</td>
                                                    <td>{avaliacao.peso}%</td>
                                                    <td>
                                                        <button
                                                            className="botao-excluir"
                                                            onClick={() => handleExcluirNota(nota.id_avaliacao)}
                                                        >
                                                            <img 
                                                                src="/images/Icon Deletar.png" 
                                                                alt="Excluir"
                                                                width={20}
                                                                height={20}
                                                            />
                                                        </button>
                                                    </td>
                                                </tr>
                                            );
                                        })}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}

                <ModalAdicionarAvaliacao 
                    isOpen={modalAddAvaliacaoAberto}
                    onClose={() => setModalAddAvaliacaoAberto(false)}
                    onConfirm={handleAdicionarAvaliacao}
                />

                <ModalAtribuirNota
                    isOpen={modalNotaAberto}
                    onClose={() => setModalNotaAberto(false)}
                    onConfirm={handleAtribuirNota}
                    avaliacoesDisponiveis={avaliacoesDisponiveis}
                    alunoSelecionado={alunoSelecionado}
                    nomeAlunoSelecionado={alunos.find(a => a.ra === alunoSelecionado)?.nome || ''}
                    notasExistentes={notasAlunos[alunoSelecionado] || []}
                />

                <ModalGerenciarAvaliacoes
                    isOpen={modalGerenciarAberto}
                    onClose={() => setModalGerenciarAberto(false)}
                    avaliacoes={avaliacoesDisponiveis}
                    onEdit={handleEditarAvaliacao}
                    onDelete={handleExcluirAvaliacao}
                />
            </main>
        </div>
    );
}