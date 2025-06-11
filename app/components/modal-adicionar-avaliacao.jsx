'use client'
import { useEffect, useState } from 'react';
import { buscarDisciplinasPorEtapa } from '@/lib/client/disciplinasService';

export function ModalAdicionarAvaliacao({ isOpen, onClose, onConfirm }) {
    const [disciplinas, setDisciplinas] = useState([]);

    const atualizarDisciplinas = async () => {
        const etapa = localStorage.getItem('etapaSelecionada');
        if (etapa) {
            const lista = await buscarDisciplinasPorEtapa(etapa);
            setDisciplinas(lista);
        }
    };

    useEffect(() => {
        if (isOpen) {
            atualizarDisciplinas();
        }
        window.addEventListener('etapaOuTurmaAtualizada', atualizarDisciplinas);
        return () => {
            window.removeEventListener('etapaOuTurmaAtualizada', atualizarDisciplinas);
        };
    }, [isOpen]);

    if (!isOpen) return null;

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const turma = localStorage.getItem('turmaSelecionada');
        const avaliacao = {
            disciplina: formData.get('disciplina'),
            nome: formData.get('nome'),
            peso: parseFloat(formData.get('peso')),
            codigo_turma: turma
        };
        await fetch('/api/avaliacoes', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(avaliacao)
        });
        onConfirm(avaliacao);
        onClose();
    };

    return (
        <>
            <div className="blur-background" onClick={onClose}></div>
            <div className="cadastro-modal">
                <h2>Adicionar Avaliação</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="disciplina">Disciplina</label>
                        <select
                            id="disciplina"
                            name="disciplina"
                            required
                            className="form-select"
                            defaultValue=""
                        >
                            <option value="" disabled>
                                Selecione uma disciplina
                            </option>
                            {disciplinas.map((disciplina) => (
                                <option key={disciplina} value={disciplina}>
                                    {disciplina}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="nome">Nome da Avaliação</label>
                        <input
                            type="text"
                            id="nome"
                            name="nome"
                            required
                            placeholder="Ex: Prova de História"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="peso">Peso (%)</label>
                        <input
                            type="number"
                            id="peso"
                            name="peso"
                            min="0"
                            max="100"
                            required
                            placeholder="Ex: 20"
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
