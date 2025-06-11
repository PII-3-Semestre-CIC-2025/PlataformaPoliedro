'use client'

import { useState, useMemo } from 'react';

export function ModalAtribuirNota({ isOpen, onClose, onConfirm, avaliacoesDisponiveis, alunoSelecionado, nomeAlunoSelecionado, notasExistentes }) {
    const [disciplinaSelecionada, setDisciplinaSelecionada] = useState('');

    const disciplinas = useMemo(() => {
        const set = new Set();
        avaliacoesDisponiveis.forEach(avaliacao => {
            if (avaliacao && avaliacao.disciplina) set.add(avaliacao.disciplina);
        });
        return Array.from(set);
    }, [avaliacoesDisponiveis]);

    const avaliacoesDisponiveisParaAtribuir = useMemo(() => {
        return avaliacoesDisponiveis
            .filter(avaliacao => 
                (!disciplinaSelecionada || avaliacao.disciplina === disciplinaSelecionada) &&
                !notasExistentes.some(nota => nota.id_avaliacao === avaliacao.id)
            );
    }, [avaliacoesDisponiveis, notasExistentes, disciplinaSelecionada]);

    if (!isOpen) return null;

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const novaNota = {
            RA_aluno: alunoSelecionado,
            id_avaliacao: parseInt(formData.get('avaliacao')),
            nota: parseFloat(formData.get('nota'))
        };
        const res = await fetch('/api/notas', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(novaNota)
        });
        if (!res.ok) {
            const erro = await res.json();
            alert('Erro ao salvar nota: ' + erro.error);
            return;
        }
        const notaSalva = await res.json();
        onConfirm(notaSalva);
        onClose();
    };

    return (
        <>
            <div className="blur-background" onClick={onClose}></div>
            <div className="cadastro-modal">
                <h2>Atribuir Nota para {nomeAlunoSelecionado}</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="disciplina">Disciplina</label>
                        <select
                            id="disciplina"
                            name="disciplina"
                            value={disciplinaSelecionada}
                            onChange={e => setDisciplinaSelecionada(e.target.value)}
                            required
                        >
                            <option value="">Selecione uma disciplina</option>
                            {disciplinas.map(disciplina => (
                                <option key={disciplina} value={disciplina}>
                                    {disciplina}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="form-group">
                        <label htmlFor="avaliacao">Avaliação</label>
                        <select
                            id="avaliacao"
                            name="avaliacao"
                            required
                            disabled={!disciplinaSelecionada}
                        >
                            <option value="">Selecione uma avaliação</option>
                            {avaliacoesDisponiveisParaAtribuir
                                .filter(avaliacao => avaliacao && avaliacao.id)
                                .map(avaliacao => (
                                    <option key={avaliacao.id} value={avaliacao.id}>
                                        ({avaliacao.disciplina}) - {avaliacao.nome} (Peso: {avaliacao.peso}%)
                                    </option>
                            ))}
                        </select>
                    </div>

                    <div className="form-group">
                        <label htmlFor="nota">Nota</label>
                        <input
                            type="number"
                            id="nota"
                            name="nota"
                            min="0"
                            max="10"
                            step="0.1"
                            required
                            placeholder="Ex: 8.5"
                        />
                    </div>

                    <button type="submit" className="botao-confirmar">
                        Confirmar
                    </button>
                </form>
            </div>
        </>
    );
}
