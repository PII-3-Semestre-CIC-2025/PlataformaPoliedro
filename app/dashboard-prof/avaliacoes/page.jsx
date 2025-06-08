'use client'
import { useState } from 'react';
import { Header } from '@/app/components/header';
import '@/styles/avaliacoes/avaliacoes.css';
import '@/styles/avaliacoes/botao-selectaluno-avaliacoes.css';
import '@/styles/avaliacoes/botao-atribuir-nota.css';
import '@/styles/avaliacoes/botao-add-avaliacao.css';

export default function AvaliacoesPage() {
    const [alunoSelecionado, setAlunoSelecionado] = useState('');
    const [avaliacoes, setAvaliacoes] = useState([
        { id: 1, nome: 'Prova I História', nota: 9.8, peso: 20, data: '08/04/2025' },
        { id: 2, nome: 'Prova II Matemática', nota: 8.0, peso: 40, data: '03/04/2025' },
        { id: 3, nome: 'Trabalho em Grupo II', nota: 7.5, peso: 10, data: '29/04/2025' },
        { id: 4, nome: 'Prova II História', nota: 9.5, peso: 20, data: '05/05/2025' },
        { id: 5, nome: 'Prova de Algoritmos', nota: 0, peso: 50, data: '02/05/2025' }
    ]);
    
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

    const handleExcluirAvaliacao = (id) => {
        setAvaliacoes(avaliacoes.filter(av => av.id !== id));
    };

    return (
        <div className="pagina-avaliacoes">
            <Header />
            <main className="container-fluid px-4">                <div className="secao-controles mb-4">
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
                            >
                                Atribuir Nota
                            </button>
                        </div>
                        <button 
                            className="botao-add-avaliacao"
                        >
                            Adicionar Avaliação +
                        </button>
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
                                        <th>Data</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {avaliacoes.map((avaliacao) => (
                                        <tr key={avaliacao.id}>
                                            <td>{avaliacao.nome}</td>
                                            <td>{avaliacao.nota.toFixed(1)}</td>
                                            <td>{avaliacao.peso}%</td>
                                            <td>{avaliacao.data}</td>
                                            <td>
                                                <button
                                                    className="botao-excluir"
                                                    onClick={() => handleExcluirAvaliacao(avaliacao.id)}
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
                                    ))}
                                </tbody>                        </table>
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
}