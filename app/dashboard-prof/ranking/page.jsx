'use client'
import 'bootstrap/dist/css/bootstrap.min.css';
import '@/styles/alunos-prof.css';
import '@/styles/ranking.css';
import '@/styles/ordenador-ranking.css';
import { useState, useEffect, useCallback } from 'react';
import { Header } from '@/app/components/header-prof';
import { buscarAlunosPorTurma } from '@/lib/client/alunosService';
import { buscarMediasPorTurma } from '@/lib/client/notasService';

export default function RankingPage() {
    const [ordenacao, setOrdenacao] = useState('Posição Decrescente');
    const [alunos, setAlunos] = useState([]);
    const [erro, setErro] = useState(null);

    const fetchAlunos = useCallback(async () => {
        try {
            const turmaSelecionada = localStorage.getItem('turmaSelecionada');
            if (!turmaSelecionada) {
                setErro('Nenhuma turma selecionada.');
                setAlunos([]);
                return;
            }
            const alunosData = await buscarAlunosPorTurma(turmaSelecionada);
            const mediasData = await buscarMediasPorTurma(turmaSelecionada);

            // mapa RA -> média
            const mediasMap = {};
            mediasData.forEach(m => {
                mediasMap[m.ra] = m.media_ponderada;
            });

            const alunosFormatados = alunosData.map((rel, idx) => ({
                id: idx + 1,
                nome: rel.alunos.nome,
                pontos: rel.alunos.total_pontos ?? 0,
                ra: rel.alunos.RA,
                media: mediasMap[rel.alunos.RA] ?? null
            }));

            const ranking = [...alunosFormatados]
                .sort((a, b) => (b.media ?? 0) - (a.media ?? 0))
                .map((aluno, idx) => ({
                    ...aluno,
                    posicao: idx + 1
                }));

            const alunosComRanking = alunosFormatados.map(aluno => {
                const pos = ranking.find(r => r.id === aluno.id)?.posicao ?? '-';
                return { ...aluno, posicao: pos };
            });
            setAlunos(alunosComRanking);
            setErro(null);
        } catch (error) {
            setErro('Erro ao buscar ranking: ' + error.message);
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

    const ordenarAlunos = (criterio) => {
        setOrdenacao(criterio);
        let alunosOrdenados = [...alunos];
        switch (criterio) {
            case 'Posição Crescente':
                alunosOrdenados.sort((a, b) => a.posicao - b.posicao);
                break;
            case 'Posição Decrescente':
                alunosOrdenados.sort((a, b) => b.posicao - a.posicao);
                break;
            case 'Ordem Alfabética A-Z':
                alunosOrdenados.sort((a, b) => a.nome.localeCompare(b.nome));
                break;
            case 'Ordem Alfabética Z-A':
                alunosOrdenados.sort((a, b) => b.nome.localeCompare(a.nome));
                break;
            case 'Pontos Crescentes':
                alunosOrdenados.sort((a, b) => a.pontos - b.pontos);
                break;
            case 'Pontos Decrescentes':
                alunosOrdenados.sort((a, b) => b.pontos - a.pontos);
                break;
            case 'Média Crescente':
                alunosOrdenados.sort((a, b) => (a.media ?? 0) - (b.media ?? 0));
                break;
            case 'Média Decrescente':
                alunosOrdenados.sort((a, b) => (b.media ?? 0) - (a.media ?? 0));
                break;
        }
        setAlunos(alunosOrdenados);
    };

    return (
        <div className="pagina-pontuar">
            <Header />
            <main className="container-fluid px-4">
                <select
                    className="botao-ordenacao"
                    value={ordenacao}
                    onChange={(e) => ordenarAlunos(e.target.value)}
                >
                    <option value="Posição Decrescente">Posição (Maior-Menor)</option>
                    <option value="Posição Crescente">Posição (Menor-Maior)</option>
                    <option value="Ordem Alfabética A-Z">Nome (A-Z)</option>
                    <option value="Ordem Alfabética Z-A">Nome (Z-A)</option>
                    <option value="Pontos Decrescentes">Pontos (Maior-Menor)</option>
                    <option value="Pontos Crescentes">Pontos (Menor-Maior)</option>
                    <option value="Média Decrescente">Média (Maior-Menor)</option>
                    <option value="Média Crescente">Média (Menor-Maior)</option>
                </select>

                <div className="table-responsive">
                    <table className="tabela-ranking">
                        <thead>
                            <tr>
                                <th>Posição</th>
                                <th>Aluno</th>
                                <th>Pontos Totais</th>
                                <th>Média Geral</th>
                            </tr>
                        </thead>
                        <tbody>
                            {alunos.map((aluno) => (
                                <tr key={aluno.id}>
                                    <td>{aluno.posicao}º</td>
                                    <td>{aluno.nome}</td>
                                    <td>{aluno.pontos}</td>
                                    <td>{aluno.media !== null ? aluno.media.toFixed(1) : '-'}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </main>
        </div>
    );
}