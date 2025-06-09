'use client'
import { useState } from 'react';
import { Header } from '@/app/components/header';
import '@/styles/avaliacoes/avaliacoes.css';
import '@/styles/avaliacoes/botao-selectaluno-avaliacoes.css';
import '@/styles/avaliacoes/botao-atribuir-nota.css';
import '@/styles/avaliacoes/botao-add-avaliacao.css';
import '@/styles/avaliacoes/modal-adicionar-avaliacao.css';
import '@/styles/avaliacoes/modal-gerenciar-avaliacoes.css';
import { ModalAdicionarAvaliacao } from '@/app/components/modal-adicionar-avaliacao';
import { ModalAtribuirNota } from '@/app/components/modal-atribuir-nota';
import { ModalGerenciarAvaliacoes } from '@/app/components/modal-gerenciar-avaliacoes';

export default function AvaliacoesPage() {
    const [alunoSelecionado, setAlunoSelecionado] = useState('');
    const [modalAddAvaliacaoAberto, setModalAddAvaliacaoAberto] = useState(false);
    const [modalNotaAberto, setModalNotaAberto] = useState(false);
    const [modalGerenciarAberto, setModalGerenciarAberto] = useState(false);
    
    // Lista de avaliações disponíveis para atribuir notas
    const [avaliacoesDisponiveis, setAvaliacoesDisponiveis] = useState([
        { id: 1, nome: 'Prova I História', peso: 20 },
        { id: 2, nome: 'Prova II Matemática', peso: 40 },
        { id: 3, nome: 'Trabalho em Grupo II', peso: 10 }
    ]);

    // Notas dos alunos em cada avaliação
    const [notasAlunos, setNotasAlunos] = useState({
        'Henrique Nalin': [
            { avaliacaoId: 1, nota: 9.8 },
            { avaliacaoId: 2, nota: 8.0 }
        ],
        'Vitor Porto': [
            { avaliacaoId: 1, nota: 7.5 }
        ]
    });
    
    const [alunos] = useState([
        'Henrique Nalin',
        'Vitor Porto',
        'Leonardo Belo',
        'Lyssa Okawa',
        'Breno Augusto',
        'Leticia Carvalho',
        'Bruno Nogueira',
        'Mateo Cortez'
    ]);

    const handleEditarAvaliacao = (avaliacaoAtualizada) => {
        setAvaliacoesDisponiveis(avaliacoes => 
            avaliacoes.map(av => 
                av.id === avaliacaoAtualizada.id ? avaliacaoAtualizada : av
            )
        );
    };

    const handleExcluirAvaliacao = (id) => {
        // Verificar se a avaliação está em uso
        const avaliacaoEmUso = Object.values(notasAlunos).some(notas =>
            notas.some(nota => nota.avaliacaoId === id)
        );

        if (avaliacaoEmUso) {
            alert('Não é possível excluir uma avaliação que já possui notas atribuídas.');
            return;
        }

        setAvaliacoesDisponiveis(avaliacoes => 
            avaliacoes.filter(av => av.id !== id)
        );
    };

    const handleAdicionarAvaliacao = (novaAvaliacao) => {
        setAvaliacoesDisponiveis(avaliacoes => [...avaliacoes, novaAvaliacao]);
    };

    const handleAtribuirNota = (novaNota) => {
        if (!alunoSelecionado) return;

        setNotasAlunos(prevNotas => ({
            ...prevNotas,
            [alunoSelecionado]: [
                ...(prevNotas[alunoSelecionado] || []),
                novaNota
            ]
        }));
    };

    const handleExcluirNota = (avaliacaoId) => {
        if (!alunoSelecionado) return;

        setNotasAlunos(prevNotas => ({
            ...prevNotas,
            [alunoSelecionado]: prevNotas[alunoSelecionado].filter(
                nota => nota.avaliacaoId !== avaliacaoId
            )
        }));
    };

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
                                        <option key={aluno} value={aluno}>
                                            {aluno}
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
                        <h2 className="titulo-notas">Notas de {alunoSelecionado}</h2>
                        <div className="table-responsive">
                            <table className="tabela-avaliacoes">
                                <thead>
                                    <tr>
                                        <th>Avaliação</th>
                                        <th>Nota (0-10)</th>
                                        <th>Peso</th>
                                        <th>Ações</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {notasAlunos[alunoSelecionado]?.map((nota) => {
                                        const avaliacao = avaliacoesDisponiveis.find(a => a.id === nota.avaliacaoId);
                                        if (!avaliacao) return null;
                                        
                                        return (
                                            <tr key={avaliacao.id}>
                                                <td>{avaliacao.nome}</td>
                                                <td>{nota.nota.toFixed(1)}</td>
                                                <td>{avaliacao.peso}%</td>
                                                <td>
                                                    <button
                                                        className="botao-excluir"
                                                        onClick={() => handleExcluirNota(nota.avaliacaoId)}
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