'use client'
import { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@/styles/menu-aluno.css';
import '@/styles/aluno/consultar-pontuacao.css';
import { buscarMediasPorTurma } from '@/lib/client/notasService';
import { Header } from '../../components/header-aluno';

export default function ConsultarPontuacaoPage() {
    const [dadosAluno, setDadosAluno] = useState(null);
    const [posicaoAluno, setPosicaoAluno] = useState(null);
    const [conquistasRecentes, setConquistasRecentes] = useState([]);
    const [carregando, setCarregando] = useState(true);
    const [erro, setErro] = useState(null);

    useEffect(() => {
        carregarDadosAluno();
    }, []);

    const carregarDadosAluno = async () => {
        try {
            setCarregando(true);
            setErro(null);

            const resMe = await fetch('/api/me');
            if (!resMe.ok) throw new Error('Não autenticado');
            const me = await resMe.json();
            const ra = me.ra;

            const resPontos = await fetch(`/api/alunos/${ra}`);
            if (!resPontos.ok) throw new Error('Erro ao buscar pontos');
            const aluno = await resPontos.json();

            setDadosAluno({
                RA: me.ra,
                nome: me.nome,
                total_pontos: aluno.total_pontos ?? 0,
            });

            const resTurma = await fetch(`/api/turmas?ra=${ra}`);
            if (!resTurma.ok) throw new Error('Turma não encontrada');
            const turmaData = await resTurma.json();
            const codigoTurma = turmaData.codigo_turma;
            if (!codigoTurma) throw new Error('Turma não encontrada');

            const resRanking = await fetch(`/api/alunos?codigo_turma=${codigoTurma}`);
            if (!resRanking.ok) throw new Error('Erro ao buscar ranking');
            const rankingData = await resRanking.json();

            const medias = await buscarMediasPorTurma(codigoTurma);
            const mediasMap = {};
            medias.forEach(m => {
                const ra = (m.RA || m.ra || '').toString().trim();
                mediasMap[ra] = m.media_ponderada;
            });

            console.log('mediasMap', mediasMap);
            console.log('rankingData antes do score', rankingData);

            rankingData.forEach(a => {
                const ra = (a.RA || a.ra || '').toString().trim();
                const media = mediasMap[ra] ?? 0;
                a.media_ponderada = media;
                a._score = media + ((a.total_pontos ?? 0) / 15);
            });

            console.log('rankingData depois do score', rankingData);
            rankingData.sort((a, b) => b._score - a._score);

            const posicao = rankingData.findIndex(a => a.RA === ra);
            setPosicaoAluno(posicao !== -1 ? posicao + 1 : null);

            const resConquistas = await fetch(`/api/pontuacoes?RA_aluno=${ra}&performance=true&order=created_at.desc`);
            if (!resConquistas.ok) throw new Error('Erro ao buscar conquistas');
            const conquistas = await resConquistas.json();
            setConquistasRecentes(conquistas);

        } catch (error) {
            console.error(error);
            setErro(error.message);
            setDadosAluno(null);
            setPosicaoAluno(null);
            setConquistasRecentes([]);
        } finally {
            setCarregando(false);
        }
    };

    const formatarData = (dataString) => {
        const data = new Date(dataString);
        return data.toLocaleDateString('pt-BR', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const getCorPosicao = (posicao) => {
        if (posicao === 1) return 'ouro';
        if (posicao === 2) return 'prata';
        if (posicao === 3) return 'bronze';
        return '';
    };

    if (carregando) {
        return (
            <div className="consultar-pontuacao">
                <div className="loading-container">
                    <div className="spinner-border" role="status"></div>
                    <span>Carregando...</span>
                </div>
            </div>
        );
    }

    if (erro) {
        return (
            <div className="consultar-pontuacao">
                <div className="erro-container">
                    <div className="erro-content">
                        <h2>Erro ao carregar dados</h2>
                        <p>{erro}</p>
                        <button className="btn-tentar-novamente" onClick={carregarDadosAluno}>
                            Tentar Novamente
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="consultar-pontuacao">
            <Header />
            <main className="main-content">
                <div className="container-fluid px-4">
                    <div className="secao-stats">
                        <h1 className="titulo-pagina">Minha Pontuação</h1>
                        <div className="cards-stats">
                            <div className="card-stat ranking">
                                <div className="card-header">
                                    <img src="/images/IconeRanking.png" alt="Ranking" className="card-icon" />
                                    <h3>Minha Posição</h3>
                                </div>
                                <div className="card-content">
                                    <div className={`posicao ${getCorPosicao(posicaoAluno)}`}>
                                        {posicaoAluno ? `${posicaoAluno}º` : '-'}
                                    </div>
                                </div>
                            </div>
                            <div className="card-stat pontos">
                                <div className="card-header">
                                    <div className="icon-trophy">🏆</div>
                                    <h3>Pontos Totais</h3>
                                </div>
                                <div className="card-content">
                                    <div className="pontos-total">
                                        {dadosAluno?.total_pontos || 0}
                                    </div>
                                </div>
                            </div>
                            <div className="card-stat estudante">
                                <div className="card-header">
                                    <div className="icon-student">👤</div>
                                    <h3>Dados do Aluno</h3>
                                </div>
                                <div className="card-content">
                                    <div className="nome-aluno">
                                        {dadosAluno?.nome}
                                    </div>
                                    <p className="ra-aluno">RA: {dadosAluno?.RA}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="secao-conquistas">
                        <h2 className="titulo-secao">
                            <div className="icon-conquest">🏅</div>
                            Conquistas Recentes
                        </h2>
                        {conquistasRecentes.length > 0 ? (
                            <div className="lista-conquistas">
                                {conquistasRecentes.map((conquista) => (
                                    <div key={conquista.id} className="card-conquista">
                                        <div className="conquista-icone">
                                            <div className="medal-icon">🥇</div>
                                        </div>
                                        <div className="conquista-info">
                                            <h4 className="conquista-titulo">
                                                {conquista.categorias?.nome}
                                            </h4>
                                            <span className="conquista-data">
                                                {formatarData(conquista.created_at)}
                                            </span>
                                        </div>
                                        <div className="conquista-pontos">
                                            <span className="pontos-ganhos">
                                                +{conquista.categorias?.valor} pts
                                            </span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="empty-state">
                                <div className="empty-icon">📊</div>
                                <h3>Nenhuma conquista ainda</h3>
                                <p>Suas conquistas aparecerão aqui quando você começar a pontuar!</p>
                            </div>
                        )}
                    </div>
                </div>
            </main>
        </div>
    );
}