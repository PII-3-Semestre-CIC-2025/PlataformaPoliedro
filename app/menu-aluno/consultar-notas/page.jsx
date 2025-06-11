'use client'
import 'bootstrap/dist/css/bootstrap.min.css';
import '@/styles/menu-aluno.css';
import '@/styles/botao-seleciona-categoria.css';
import '@/styles/aluno/consultar-notas.css';
import { Header } from '../../components/header-aluno';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';

export default function ConsultarNotasPage() {
    const [disciplinaSelecionada, setDisciplinaSelecionada] = useState('TODAS');
    const [notasPorDisciplina, setNotasPorDisciplina] = useState({});
    const [disciplinas, setDisciplinas] = useState([]);
    const [erro, setErro] = useState(null);

    useEffect(() => {
        async function carregarDados() {
            try {
                const res = await fetch('/api/me');
                if (!res.ok) return;
                const user = await res.json();
                if (user.tipo !== 'aluno') return;
                const ra = user.ra;

                const { data: turmasAluno } = await supabase
                    .from('alunos_turmas')
                    .select('codigo_turma')
                    .eq('RA_aluno', ra);
                if (!turmasAluno || turmasAluno.length === 0) return;
                const codigoTurma = turmasAluno[0].codigo_turma;

                const { data: avaliacoes } = await supabase
                    .from('avaliacoes')
                    .select('id, nome, disciplina, peso')
                    .eq('codigo_turma', codigoTurma);

                const { data: notas } = await supabase
                    .from('notas')
                    .select('id, id_avaliacao, nota')
                    .eq('RA_aluno', ra);

                const notasPorDisciplina = {};
                avaliacoes.forEach(avaliacao => {
                    if (!notasPorDisciplina[avaliacao.disciplina]) {
                        notasPorDisciplina[avaliacao.disciplina] = [];
                    }
                    const notaObj = notas.find(n => n.id_avaliacao === avaliacao.id);
                    notasPorDisciplina[avaliacao.disciplina].push({
                        avaliacao: avaliacao.nome,
                        nota: notaObj ? notaObj.nota : null,
                        peso: avaliacao.peso
                    });
                });

                const disciplinasOrdenadas = Object.keys(notasPorDisciplina).sort();
                setDisciplinas(['TODAS', ...disciplinasOrdenadas]);
                setNotasPorDisciplina(notasPorDisciplina);
            } catch (e) {
                setErro('Erro ao carregar dados');
            }
        }

        carregarDados();
    }, []);

    const handleDisciplinaChange = (e) => {
        setDisciplinaSelecionada(e.target.value);
    };

    const getNotasDisciplina = () => {
        if (disciplinaSelecionada === 'TODAS') {

            return Object.entries(notasPorDisciplina)
                .sort(([a], [b]) => a.localeCompare(b))
                .flatMap(([disciplina, notas]) =>
                    notas.map(item => ({
                        ...item,
                        disciplina
                    }))
                );
        }
        if (!disciplinaSelecionada) return [];
        return (notasPorDisciplina[disciplinaSelecionada] || []).map(item => ({
            ...item,
            disciplina: disciplinaSelecionada
        }));
    };

    return (
        <div className="consultar-notas">
            <Header />
            <main className="main-content">
                <div className="container-fluid px-4">
                    {/* Dropdown de seleção de disciplina */}
                    <div className="disciplina-selector-container">
                        <select
                            className="botao-seleciona-categoria"
                            value={disciplinaSelecionada}
                            onChange={handleDisciplinaChange}
                        >
                            {disciplinas.map((disciplina) => (
                                <option key={disciplina} value={disciplina}>
                                    {disciplina === 'TODAS' ? 'Todas as Disciplinas' : disciplina}
                                </option>
                            ))}
                        </select>
                    </div>
                    {/* Seção de notas */}
                    {disciplinaSelecionada && (
                        <div className="notas-section">
                            <h2 className="notas-title">
                                {disciplinaSelecionada === 'TODAS'
                                    ? 'Notas de Todas as Disciplinas'
                                    : `Notas de ${disciplinaSelecionada}`}
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
                                                    <td>
                                                        {disciplinaSelecionada === 'TODAS'
                                                            ? `(${item.disciplina}) - ${item.avaliacao}`
                                                            : item.avaliacao}
                                                    </td>
                                                    <td>
                                                            <span className={`nota ${item.nota !== null && item.nota < 6 ? 'nota-zero' : ''}`}>
                                                            {item.nota !== null && item.nota !== undefined ? item.nota : '—'}
                                                        </span>
                                                    </td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td colSpan={2} className="empty-state">
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