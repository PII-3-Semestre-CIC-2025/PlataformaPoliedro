'use client'
import 'bootstrap/dist/css/bootstrap.min.css';
import '@/styles/pontuar.css';
import '@/styles/botao-seleciona-categoria.css';
import { useState } from 'react';
import { Header } from '@/app/components/header';

export default function PontuarPage() {    const [categoriaAtual, setCategoriaAtual] = useState('Selecionar Categoria:');
    const [alunos, setAlunos] = useState([
        { id: 1, nome: 'Henrique Nalin', pontos: 0 },
        { id: 2, nome: 'Luiza Gomes', pontos: 0 },
        { id: 3, nome: 'Leonardo Belo', pontos: 0 },
        { id: 4, nome: 'Leticia Carvalho', pontos: 0 },
        { id: 5, nome: 'Bruno Nogueira', pontos: 0 },
        { id: 6, nome: 'Breno Augusto', pontos: 0 },
        { id: 7, nome: 'Mateo Cortez', pontos: 0 },
        { id: 8, nome: 'Vitor Porto', pontos: 0 },
        { id: 9, nome: 'Lyssa Okawa', pontos: 0 }
    ]);
    
    const [categorias] = useState([
        { id: 1, nome: 'Participação', valor: 10 },
        { id: 2, nome: 'Atividade Extra', valor: 5 },
        { id: 3, nome: 'Desafio', valor: 15 },
        { id: 4, nome: 'Pontualidade', valor: 15 },
        { id: 5, nome: 'Capricho', valor: 15 },
        { id: 6, nome: 'Respeito', valor: 15 }
    ]);    const [mensagem, setMensagem] = useState(null);

    const mostrarMensagem = (texto) => {
        setMensagem(texto);
        setTimeout(() => setMensagem(null), 2000); // Mensagem some após 2 segundos
    };

    const handleAdicionar = (alunoId) => {
        if (categoriaAtual === 'Selecionar Categoria:') {
            alert('Por favor, selecione uma categoria primeiro');
            return;
        }
        
        const categoria = categorias.find(c => c.nome === categoriaAtual);
        if (!categoria) return;

        const aluno = alunos.find(a => a.id === alunoId);
        mostrarMensagem(`${categoria.valor} PoliPoints de ${categoria.nome} foram atribuídos a ${aluno.nome}`);
        
        // TODO: Implementar chamada à API para salvar os pontos
    };

    const handleSubtrair = (alunoId) => {
        if (categoriaAtual === 'Selecionar Categoria:') {
            alert('Por favor, selecione uma categoria primeiro');
            return;
        }

        const categoria = categorias.find(c => c.nome === categoriaAtual);
        if (!categoria) return;

        const aluno = alunos.find(a => a.id === alunoId);
        mostrarMensagem(`${categoria.valor} PoliPoints de ${categoria.nome} foram removidos de ${aluno.nome}`);
        
        // TODO: Implementar chamada à API para salvar os pontos
    };    return (
        <div className="pagina-pontuar">
            {mensagem && (
                <div className="mensagem-popup">
                    {mensagem}
                </div>
            )}
            <Header />
            <main className="container-fluid px-4">
                <select 
                    className="botao-seleciona-categoria"
                    value={categoriaAtual}
                    onChange={(e) => setCategoriaAtual(e.target.value)}
                >
                    <option value="Selecionar Categoria:" disabled>
                        Selecionar Categoria:
                    </option>
                    {categorias.map(categoria => (
                        <option key={categoria.id} value={categoria.nome}>
                            {categoria.nome}
                        </option>
                    ))}
                </select>

                <div className="table-responsive">
                    <table className="tabela-pontuar">
                        <thead>
                            <tr>
                                <th>Nome</th>
                                <th>Valor da categoria</th>
                                <th>Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                            {alunos.map((aluno) => (
                                <tr key={aluno.id}>
                                <td>{aluno.nome}</td>
                                <td className="valor-categoria">
                                    {categoriaAtual !== 'Selecionar Categoria:'
                                        ? `${categorias.find(c => c.nome === categoriaAtual)?.valor} PoliPoints`
                                        : '-'
                                    }
                                </td>
                                <td>
                                    <div className="acoes">
                                            <button
                                                className="botao-mais"
                                                onClick={() => handleAdicionar(aluno.id)}
                                            >
                                                +
                                            </button>
                                            <button
                                                className="botao-menos"
                                                onClick={() => handleSubtrair(aluno.id)}
                                            >
                                                -
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>                    </table>
                </div>
            </main>
        </div>
    );
}