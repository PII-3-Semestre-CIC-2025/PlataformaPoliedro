'use client'
import 'bootstrap/dist/css/bootstrap.min.css';
import '@/styles/menu-aluno.css';
import '@/styles/aluno/consultar-pontuacao.css';
import { useState, useEffect } from 'react';

import { Header } from '../../components/header-aluno';

export default function ConsultarPontuacaoPage() {
    const [dadosAluno, setDadosAluno] = useState(null);
    const [ranking, setRanking] = useState([]);
    const [posicaoAluno, setPosicaoAluno] = useState(null);
    const [conquistasRecentes, setConquistasRecentes] = useState([]);
    const [carregando, setCarregando] = useState(true);
    const [erro, setErro] = useState(null);

    useEffect(() => {
        carregarDadosAluno();
    }, []);    const carregarDadosAluno = async () => {
        try {
            setCarregando(true);
            setErro(null);

            // Simular carregamento
            await new Promise(resolve => setTimeout(resolve, 1500));

            // Dados mockados do aluno logado
            const alunoMock = {
                RA: '24.01883-0',
                nome: 'João Silva Santos',
                total_pontos: 85,
                email: 'joao.silva@email.com'
            };

            setDadosAluno(alunoMock);

            // Carregar dados mockados
            carregarRankingMock(alunoMock.RA);
            carregarConquistasMock();

        } catch (error) {
            setErro(error.message);
            console.error('Erro ao carregar dados:', error);
        } finally {
            setCarregando(false);
        }
    };    const carregarRankingMock = (raAluno) => {
        // Dados mockados do ranking da turma
        const rankingMock = [
            { RA: '24.01001-1', nome: 'Maria Silva', total_pontos: 95, posicao: 1 },
            { RA: '24.01002-2', nome: 'Pedro Santos', total_pontos: 88, posicao: 2 },
            { RA: '24.01883-0', nome: 'João Silva Santos', total_pontos: 85, posicao: 3 },
            { RA: '24.01004-4', nome: 'Ana Costa', total_pontos: 82, posicao: 4 },
            { RA: '24.01005-5', nome: 'Carlos Oliveira', total_pontos: 78, posicao: 5 },
            { RA: '24.01006-6', nome: 'Lucia Mendes', total_pontos: 75, posicao: 6 },
            { RA: '24.01007-7', nome: 'Rafael Lima', total_pontos: 72, posicao: 7 },
            { RA: '24.01008-8', nome: 'Beatriz Alves', total_pontos: 69, posicao: 8 },
            { RA: '24.01009-9', nome: 'Diego Ferreira', total_pontos: 65, posicao: 9 },
            { RA: '24.01010-0', nome: 'Camila Rocha', total_pontos: 62, posicao: 10 },
            { RA: '24.01011-1', nome: 'Gabriel Souza', total_pontos: 58, posicao: 11 },
            { RA: '24.01012-2', nome: 'Juliana Castro', total_pontos: 55, posicao: 12 }
        ];

        setRanking(rankingMock);

        // Encontrar posição do aluno atual
        const posicao = rankingMock.findIndex(aluno => aluno.RA === raAluno);
        setPosicaoAluno(posicao !== -1 ? posicao + 1 : null);
    };    const carregarConquistasMock = () => {
        // Dados mockados de conquistas recentes
        const conquistasMock = [
            {
                id: 1,
                performance: 95,
                created_at: '2024-12-15T10:30:00Z',
                categorias: {
                    nome: 'Participação em Aula',
                    valor: 10
                }
            },
            {
                id: 2,
                performance: 88,
                created_at: '2024-12-14T14:20:00Z',
                categorias: {
                    nome: 'Trabalho em Grupo',
                    valor: 15
                }
            },
            {
                id: 3,
                performance: 100,
                created_at: '2024-12-13T09:15:00Z',
                categorias: {
                    nome: 'Prova Matemática',
                    valor: 20
                }
            },
            {
                id: 4,
                performance: 92,
                created_at: '2024-12-12T11:45:00Z',
                categorias: {
                    nome: 'Exercícios de Casa',
                    valor: 8
                }
            },
            {
                id: 5,
                performance: 85,
                created_at: '2024-12-11T16:30:00Z',
                categorias: {
                    nome: 'Apresentação Oral',
                    valor: 12
                }
            }
        ];

        setConquistasRecentes(conquistasMock);
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
        return 'normal';
    };    if (carregando) {
        return (
            <div className="consultar-pontuacao">
                <Header />
                <div className="loading-container">
                    <div className="loading-spinner"></div>
                    <p>Carregando dados...</p>
                </div>
            </div>
        );
    }    if (erro) {
        return (
            <div className="consultar-pontuacao">
                <header className="header-aluno">
                    <div className="container-fluid">
                        <div className="row align-items-center">
                            <div className="col-6">
                                <img src="/images/logo-cubo.png" alt="Logo" className="logo" />
                            </div>
                            <div className="col-6 d-flex justify-content-end">
                                <a href="/login/aluno" className="logout-btn">
                                    <img src="/images/IconLogout.png" alt="Sair" />
                                </a>
                            </div>
                        </div>
                    </div>
                </header>
                <div className="erro-container">
                    <div className="erro-content">
                        <h2>Erro ao carregar dados</h2>
                        <p>{erro}</p>
                        <button 
                            className="btn-tentar-novamente"
                            onClick={carregarDadosAluno}
                        >
                            Tentar Novamente
                        </button>
                    </div>
                </div>
            </div>
        );
    }    return (        <div className="consultar-pontuacao">
            <header className="header-aluno">
                <div className="container-fluid">
                    <div className="row align-items-center">
                        <div className="col-6">
                            <a href="/menu-aluno" className="logo-link">
                                <img src="/images/logo-cubo.png" alt="Logo" className="logo" />
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
                <div className="container-fluid px-4">
                    
                    {/* Seção de Estatísticas do Aluno */}
                    <div className="secao-stats">
                        <h1 className="titulo-pagina">Minha Pontuação</h1>
                        
                        <div className="cards-stats">                            <div className="card-stat ranking">
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
                    </div>                    {/* Seção de Conquistas Recentes */}
                    <div className="secao-conquistas">
                        <h2 className="titulo-secao">
                            <div className="icon-conquest">🏅</div>
                            Conquistas Recentes
                        </h2>
                        
                        {conquistasRecentes.length > 0 ? (
                            <div className="lista-conquistas">
                                {conquistasRecentes.map((conquista, index) => (                                    <div key={conquista.id} className="card-conquista">
                                        <div className="conquista-icone">
                                            <div className="medal-icon">🥇</div>
                                        </div>
                                        <div className="conquista-info">
                                            <h4 className="conquista-titulo">
                                                {conquista.categorias?.nome}
                                            </h4>
                                        </div>
                                        <div className="conquista-pontos">
                                            <span className="pontos-ganhos">
                                                +{conquista.categorias?.valor} pts
                                            </span>
                                        </div>
                                    </div>
                                ))}
                            </div>                        ) : (
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