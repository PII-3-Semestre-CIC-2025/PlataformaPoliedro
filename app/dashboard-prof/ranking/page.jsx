'use client'
import 'bootstrap/dist/css/bootstrap.min.css';
import '@/styles/ranking.css';
import '@/styles/ordenador-ranking.css';
import { useState, useEffect } from 'react';
import { Header } from '@/app/components/header';

export default function RankingPage() {    
    const [ordenacao, setOrdenacao] = useState('Posição Decrescente');
    const [alunos, setAlunos] = useState([
        { id: 1, nome: 'Henrique Nalin', pontos: 135, posicao: 1 },
        { id: 2, nome: 'Vitor Porto', pontos: 135, posicao: 2 },
        { id: 3, nome: 'Leonardo Belo', pontos: 130, posicao: 3 },
        { id: 4, nome: 'Lyssa Okawa', pontos: 125, posicao: 4 },
        { id: 5, nome: 'Breno Augusto', pontos: 110, posicao: 5 },
        { id: 6, nome: 'Leticia Carvalho', pontos: 105, posicao: 6 },
        { id: 7, nome: 'Gustavo Serripieri', pontos: 100, posicao: 7 },
        { id: 8, nome: 'Bruno Nogueira', pontos: 95, posicao: 8 },
        { id: 9, nome: 'Mateo Cortez', pontos: 0, posicao: 9 }
    ]);

    const ordenarAlunos = (criterio) => {
        setOrdenacao(criterio);
        const alunosOrdenados = [...alunos];
        
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
                alunosOrdenados.sort((a, b) => (a.pontos / 10) - (b.pontos / 10));
                break;
            case 'Média Decrescente':
                alunosOrdenados.sort((a, b) => (b.pontos / 10) - (a.pontos / 10));
                break;
        }
        
        setAlunos(alunosOrdenados);
    };

    // Atualizar posições iniciais baseadas nos pontos
    useEffect(() => {
        const alunosOrdenados = [...alunos]
            .sort((a, b) => b.pontos - a.pontos)
            .map((aluno, index) => ({
                ...aluno,
                posicao: index + 1
            }));
        setAlunos(alunosOrdenados);
    }, []);

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
                                    <td>{(aluno.pontos / 10).toFixed(1)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </main>
        </div>
    );
}