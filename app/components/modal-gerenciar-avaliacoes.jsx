'use client'
import { useEffect, useState } from 'react';
import { buscarDisciplinasPorEtapa } from '@/lib/client/disciplinasService';

export function ModalGerenciarAvaliacoes({ isOpen, onClose, avaliacoes, onEdit, onDelete }) {
    const [disciplinaSelecionada, setDisciplinaSelecionada] = useState('');
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

    const avaliacoesFiltradas = disciplinaSelecionada 
        ? avaliacoes.filter(avaliacao => avaliacao.disciplina === disciplinaSelecionada)
        : [];

    const handleSubmit = async (e, avaliacao) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const body = {
            nome: formData.get('nome'),
            peso: parseFloat(formData.get('peso'))
        };
        const res = await fetch(`/api/avaliacoes/${avaliacao.id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body)
        });
        if (!res.ok) {
            alert('Erro ao atualizar avaliação');
            return;
        }
        const avaliacaoAtualizada = await res.json();
        onEdit(avaliacaoAtualizada);
    };

    const handleDelete = async (id) => {
        await fetch(`/api/avaliacoes/${id}`, { method: 'DELETE' });
        onDelete();
    };

    return (
        <>
            <div className="blur-background" onClick={onClose}></div>
            <div className="cadastro-modal gerenciar-modal">
                <h2>Gerenciar Avaliações</h2>
                <div className="form-group">
                    <label htmlFor="disciplina-select">Selecionar Disciplina</label>
                    <select
                        id="disciplina-select"
                        value={disciplinaSelecionada}
                        onChange={(e) => setDisciplinaSelecionada(e.target.value)}
                        className="form-select"
                    >
                        <option value="">Selecione uma disciplina</option>
                        {disciplinas.map((disciplina) => (
                            <option key={disciplina} value={disciplina}>
                                {disciplina}
                            </option>
                        ))}
                    </select>
                </div>

                {disciplinaSelecionada && (
                    <div className="lista-avaliacoes">
                        {avaliacoesFiltradas.length > 0 ? (
                            avaliacoesFiltradas.map(avaliacao => (
                                <form 
                                    key={avaliacao.id} 
                                    className="avaliacao-item"
                                    onSubmit={(e) => handleSubmit(e, avaliacao)}
                                >
                                    <div className="form-group">
                                        <input
                                            type="text"
                                            name="nome"
                                            defaultValue={avaliacao.nome}
                                            required
                                        />
                                    </div>
                                    <div className="form-group peso-group">
                                        <input
                                            type="number"
                                            name="peso"
                                            defaultValue={avaliacao.peso}
                                            min="0"
                                            max="100"
                                            required
                                        />
                                        <span className="peso-symbol">%</span>
                                    </div>
                                    <div className="acoes">
                                        <button type="submit" className="botao-salvar">
                                            <img 
                                                src="/images/iconcheckbox.png" 
                                                alt="Salvar"
                                                width={35}
                                                height={35}
                                                style={{ filter: 'invert(48%) sepia(79%) saturate(2476%) hue-rotate(86deg) brightness(118%) contrast(119%)' }}
                                            />
                                        </button>
                                        <button 
                                            type="button" 
                                            className="botao-excluir"
                                            onClick={() => handleDelete(avaliacao.id)}
                                        >
                                            <img 
                                                src="/images/Icon Deletar.png" 
                                                alt="Excluir"
                                                width={35}
                                                height={35}
                                            />
                                        </button>
                                    </div>
                                </form>
                            ))
                        ) : (
                            <div className="mensagem-vazia">
                                <p>Nenhuma avaliação encontrada para {disciplinaSelecionada}</p>
                            </div>
                        )}
                    </div>
                )}

                {!disciplinaSelecionada && (
                    <div className="mensagem-inicial">
                        <p>Selecione uma disciplina para ver e gerenciar suas avaliações</p>
                    </div>
                )}

                <button onClick={onClose} className="botao-fechar">
                    Fechar
                </button>
            </div>
        </>
    );
}
