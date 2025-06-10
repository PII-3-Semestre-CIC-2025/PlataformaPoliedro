'use client'
import 'bootstrap/dist/css/bootstrap.min.css';
import '@/styles/pontuacao.css';
import '@/styles/botao-seleciona-categoria.css';
import { useState, useEffect, useMemo, useCallback } from 'react';
import { Header } from '@/app/components/header';
import { buscarAlunosPorTurma } from '@/lib/client/alunosService';
import { buscarCategoriasPorEtapa } from '@/lib/client/categoriasService';
import { buscarPontuacoes} from '@/lib/client/pontuacoesService';

export default function PontuarPage() {    
    const [categoriaAtual, setCategoriaAtual] = useState('Selecionar Categoria:');    
    const [alunos, setAlunos] = useState([]);
    const [categorias, setCategorias] = useState([]);    
    const [mensagem, setMensagem] = useState(null);
    const [fade, setFade] = useState(false);
    const [pontuacoes, setPontuacoes] = useState([]);
    
    const [etapaSelecionada, setEtapaSelecionada] = useState('');
    const [turmaSelecionada, setTurmaSelecionada] = useState('');

    useEffect(() => {
        function atualizarSelecoes() {
            setEtapaSelecionada(localStorage.getItem('etapaSelecionada') || '');
            setTurmaSelecionada(localStorage.getItem('turmaSelecionada') || '');
        }
        atualizarSelecoes();
        window.addEventListener('etapaOuTurmaAtualizada', atualizarSelecoes);
        window.addEventListener('storage', atualizarSelecoes);
        window.addEventListener('focus', atualizarSelecoes);
        return () => {
            window.removeEventListener('etapaOuTurmaAtualizada', atualizarSelecoes);
            window.removeEventListener('storage', atualizarSelecoes);
            window.removeEventListener('focus', atualizarSelecoes);
        };
    }, []);

    // Buscar alunos
    useEffect(() => {
        if (!turmaSelecionada) return;
        buscarAlunosPorTurma(turmaSelecionada).then(alunosData => {
            setAlunos(alunosData.map((rel, idx) => ({
                id: idx + 1,
                nome: rel.alunos.nome,
                matricula: rel.alunos.RA,
                turma: turmaSelecionada
            })));
        });
    }, [turmaSelecionada]);

    // Buscar categorias
    useEffect(() => {
        if (!etapaSelecionada) return;
        buscarCategoriasPorEtapa(etapaSelecionada).then(setCategorias);
    }, [etapaSelecionada]);

    // Buscar pontuacoes (+ e -)
    useEffect(() => {
        async function fetchPontuacoes() {
            if (!turmaSelecionada || categorias.length === 0) return;
            const idsCategorias = categorias.map(c => c.id);
            const data = await buscarPontuacoes(turmaSelecionada, idsCategorias);
            setPontuacoes(data);
        }
        fetchPontuacoes();
    }, [turmaSelecionada, categorias]);

    const mostrarMensagem = (texto) => {
        setMensagem(texto);
        setFade(false);
        setTimeout(() => setFade(true), 1800); // inicia fade após 1.8s
        setTimeout(() => setMensagem(null), 2000); // remove após 2s
    };

    const categoriaSelecionada = useMemo(
        () => categorias.find(c => c.nome === categoriaAtual),
        [categorias, categoriaAtual]
    );

    const handleAdicionar = async (alunoId) => {
        try {
            if (!categoriaSelecionada) return;
            const aluno = alunos.find(a => a.id === alunoId);

            const res = await fetch('/api/pontuacoes', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    id_categoria: categoriaSelecionada.id,
                    RA_aluno: aluno.matricula,
                    performance: true
                })
            });

            if (res.status === 201) {
                setPontuacoes((pontuacoesAntigas) => {
                    const outros = pontuacoesAntigas.filter(
                        p => !(p.RA_aluno === aluno.matricula && p.id_categoria === categoriaSelecionada.id)
                    );
                    return [
                        ...outros,
                        {
                            id: undefined,
                            id_categoria: categoriaSelecionada.id,
                            RA_aluno: aluno.matricula,
                            performance: true
                        }
                    ];
                });
                mostrarMensagem(`O desempenho de ${aluno.nome} em ${categoriaSelecionada.nome} foi salvo como POSITIVO(+).`);
            } else if (res.status === 409) {
                const { id } = await res.json();
                await fetch(`/api/pontuacoes/${id}`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ performance: true })
                });
                setPontuacoes((pontuacoesAntigas) => {
                    const outros = pontuacoesAntigas.filter(
                        p => !(p.RA_aluno === aluno.matricula && p.id_categoria === categoriaSelecionada.id)
                    );
                    return [
                        ...outros,
                        {
                            id,
                            id_categoria: categoriaSelecionada.id,
                            RA_aluno: aluno.matricula,
                            performance: true
                        }
                    ];
                });
                mostrarMensagem(`O desempenho de ${aluno.nome} em ${categoriaSelecionada.nome} foi atualizado para POSITIVO(+).`);
            } else {
                // Só loga erro se não for 409
                console.error('Erro inesperado:', res.status);
            }
        } catch (e) {
            // Só loga erro se não for 409
        }
    };

    const handleSubtrair = async (alunoId) => {
        if (categoriaAtual === 'Selecionar Categoria:') {
            alert('Por favor, selecione uma categoria primeiro');
            return;
        }
        const categoria = categorias.find(c => c.nome === categoriaAtual);
        if (!categoria) return;
        const aluno = alunos.find(a => a.id === alunoId);

        const res = await fetch('/api/pontuacoes', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                id_categoria: categoria.id,
                RA_aluno: aluno.matricula,
                performance: false
            })
        });

        if (res.status === 201) {
            setPontuacoes((pontuacoesAntigas) => {
                const outros = pontuacoesAntigas.filter(
                    p => !(p.RA_aluno === aluno.matricula && p.id_categoria === categoria.id)
                );
                const pontuacaoExistente = pontuacoesAntigas.find(
                    p => p.RA_aluno === aluno.matricula && p.id_categoria === categoria.id
                );
                return [
                    ...outros,
                    {
                        id: pontuacaoExistente?.id ?? id,
                        id_categoria: categoria.id,
                        RA_aluno: aluno.matricula,
                        performance: false
                    }
                ];
            });

            mostrarMensagem(`O desempenho de ${aluno.nome} em ${categoria.nome} foi salvo como NEGATIVO(-).`);
        } else if (res.status === 409) {
            // Já existe em pontuacoes, então atualiza:
            const { id } = await res.json();
            await fetch(`/api/pontuacoes/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ performance: false })
            });
            setPontuacoes((pontuacoesAntigas) => {
                const outros = pontuacoesAntigas.filter(
                    p => !(p.RA_aluno === aluno.matricula && p.id_categoria === categoria.id)
                );
                return [...outros, { id_categoria: categoria.id, RA_aluno: aluno.matricula, performance: false }];
            });
            mostrarMensagem(`O desempenho de ${aluno.nome} em ${categoria.nome} foi atualizado para NEGATIVO(-).`);
        }
        await fetch(`/api/alunos/${aluno.matricula}/atualizar-total`, { method: 'POST' });
    };    

    const handleRemover = async (alunoId) => {
        if (!categoriaSelecionada) return;
        const aluno = alunos.find(a => a.id === alunoId);
        const pontuacao = pontuacoes.find(
            p => String(p.RA_aluno) === String(aluno.matricula) && Number(p.id_categoria) === Number(categoriaSelecionada.id)
        );
        if (!pontuacao) return;

        await fetch(`/api/pontuacoes/${pontuacao.id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ performance: null }) // performance NULL = NEUTRA
        });

        setPontuacoes((pontuacoesAntigas) =>
            pontuacoesAntigas.map(p =>
                p.id === pontuacao.id
                    ? { ...p, performance: null }
                    : p
            )
        );
        mostrarMensagem(`Desempenho de ${aluno.nome} em ${categoriaSelecionada.nome} foi atualizado para NEUTRO.`);

        await fetch(`/api/alunos/${aluno.matricula}/atualizar-total`, { method: 'POST' });
    };

    // pegar performance do aluno
    function getPerformance(RA_aluno, id_categoria) {
        const pontuacao = pontuacoes.find(
            p => String(p.RA_aluno) === String(RA_aluno) && Number(p.id_categoria) === Number(id_categoria)
        );
        return pontuacao ? pontuacao.performance : null;
    }

    useEffect(() => {
        if (fade) {
            const timer = setTimeout(() => {
                setFade(false);
                setMensagem(null);
            }, 2000);
            return () => clearTimeout(timer);
        }
    }, [fade]);

    return (
        <div className="pagina-pontuar">
            {mensagem && (
                <div className={`mensagem-popup${fade ? ' fade-out' : ''}`}>
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
                            {alunos
                            .slice()
                            .sort((a,b) => a.nome.localeCompare(b.nome, 'pt-BR')) //ordem alfabetica
                            .map((aluno) => {
                                const categoria = categorias.find(c => c.nome === categoriaAtual);
                                const perf = categoria ? getPerformance(aluno.matricula, categoria.id) : null;
                                return (
                                    <tr key={aluno.id}>
                                        <td>{aluno.nome}</td>
                                        <td className="valor-categoria">
                                            {categoriaAtual !== 'Selecionar Categoria:'
                                                ? `${categoria?.valor ?? '-'} PoliPoints`
                                                : '-'
                                            }
                                        </td>
                                        <td>
                                            <div className="acoes">
                                                <button
                                                    className={`botao-mais${perf === true ? ' ativo' : ''}`}
                                                    onClick={() => perf === true ? handleRemover(aluno.id) : handleAdicionar(aluno.id)}
                                                >
                                                    +
                                                </button>
                                                <button
                                                    className={`botao-menos${perf === false ? ' ativo' : ''}`}
                                                    onClick={() => perf === false ? handleRemover(aluno.id) : handleSubtrair(aluno.id)}
                                                >
                                                    -
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>                   
                    </table>
                </div>
            </main>
        </div>
    );
}