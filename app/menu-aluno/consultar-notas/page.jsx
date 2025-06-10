'use client'
import 'bootstrap/dist/css/bootstrap.min.css';
import '@/styles/menu-aluno.css';
import '@/styles/botao-seleciona-categoria.css';
import '@/styles/aluno/consultar-notas.css';
import { useState } from 'react';

export default function ConsultarNotasPage() {
    const [disciplinaSelecionada, setDisciplinaSelecionada] = useState('');

    // Disciplinas disponíveis (hardcoded por enquanto)
    const disciplinas = [
        'História',
        'Matemática',
        'Português',
        'Ciências',
        'Geografia',
        'Inglês',
        'Educação Física',
        'Artes',
        'Algoritmos'
    ];

    // Dados das notas por disciplina (mock data)
    const notasPorDisciplina = {
        'História': [
            { avaliacao: 'Prova I História', nota: 9.8 },
            { avaliacao: 'Prova II História', nota: 9.5 },
            { avaliacao: 'Trabalho em Grupo', nota: 8.5 }
        ],
        'Matemática': [
            { avaliacao: 'Prova I Matemática', nota: 8.0 },
            { avaliacao: 'Prova II Matemática', nota: 7.5 },
            { avaliacao: 'Lista de Exercícios', nota: 9.0 }
        ],
        'Algoritmos': [
            { avaliacao: 'Prova de Algoritmos', nota: 0 },
            { avaliacao: 'Prova de Algoritmos', nota: 0 },
            { avaliacao: 'Prova de Algoritmos', nota: 0 }
        ],
        'Português': [
            { avaliacao: 'Redação', nota: 8.5 },
            { avaliacao: 'Interpretação de Texto', nota: 9.0 }
        ],
        'Ciências': [
            { avaliacao: 'Prova de Biologia', nota: 7.8 },
            { avaliacao: 'Experimento Laboratório', nota: 9.2 }
        ]
    };

    const handleDisciplinaChange = (e) => {
        setDisciplinaSelecionada(e.target.value);
    };

    const getNotasDisciplina = () => {
        if (!disciplinaSelecionada) return [];
        return notasPorDisciplina[disciplinaSelecionada] || [];
    };

    return (
        <div className="consultar-notas">            <header className="header-aluno">
                <div className="container-fluid">
                    <div className="row align-items-center">
                        <div className="col-6">
                            <a href="/menu-aluno" className="logo-link">
                                <img src="/images/logo-cubo.png" alt="Logo - Voltar" className="logo" />
                            </a>
                        </div>
                        <div className="col-6 d-flex justify-content-end">
                            <a href="/login/aluno" className="logout-btn">
                                <img src="/images/IconLogout.png" alt="Sair" />
                            </a>
                        </div>
                    </div>
                </div>
            </header>

            <main className="main-content">
                <div className="container-fluid px-4">                    {/* Dropdown de seleção de disciplina */}
                    <div className="disciplina-selector-container">
                        <select 
                            className="botao-seleciona-categoria"
                            value={disciplinaSelecionada}
                            onChange={handleDisciplinaChange}
                        >
                            <option value="">Selecionar Disciplina:</option>
                            {disciplinas.map((disciplina) => (
                                <option key={disciplina} value={disciplina}>
                                    {disciplina}
                                </option>
                            ))}
                        </select>
                    </div>                    {/* Seção de notas - só aparece quando disciplina for selecionada */}
                    {disciplinaSelecionada && (
                        <div className="notas-section">
                            <h2 className="notas-title">
                                Notas de {disciplinaSelecionada}
                            </h2>
                            <div className="table-responsive">
                                <table className="table-notas">
                                    <thead>
                                        <tr>
                                            <th>Avaliações</th>
                                            <th>Notas</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {getNotasDisciplina().length > 0 ? (
                                            getNotasDisciplina().map((item, index) => (
                                                <tr key={index}>
                                                    <td>{item.avaliacao}</td>
                                                    <td>
                                                        <span className={`nota ${item.nota === 0 ? 'nota-zero' : ''}`}>
                                                            {item.nota}
                                                        </span>
                                                    </td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td colSpan="2" className="empty-state">
                                                    Nenhuma avaliação encontrada para esta disciplina
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
}