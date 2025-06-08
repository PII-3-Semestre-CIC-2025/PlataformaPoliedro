'use client'

export function ModalAtribuirNota({ isOpen, onClose, onConfirm, avaliacoesDisponiveis, alunoSelecionado, notasExistentes }) {
    if (!isOpen) return null;

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const novaNota = {
            avaliacaoId: parseInt(formData.get('avaliacao')),
            nota: parseFloat(formData.get('nota'))
        };
        onConfirm(novaNota);
        onClose();
    };

    // Filtra avaliações que ainda não foram atribuídas ao aluno
    const avaliacoesDisponiveisParaAtribuir = avaliacoesDisponiveis.filter(avaliacao => 
        !notasExistentes.some(nota => nota.avaliacaoId === avaliacao.id)
    );

    return (
        <>
            <div className="blur-background" onClick={onClose}></div>
            <div className="cadastro-modal">
                <h2>Atribuir Nota para {alunoSelecionado}</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="avaliacao">Avaliação</label>
                        <select
                            id="avaliacao"
                            name="avaliacao"
                            required
                        >
                            <option value="">Selecione uma avaliação</option>
                            {avaliacoesDisponiveisParaAtribuir.map(avaliacao => (
                                <option key={avaliacao.id} value={avaliacao.id}>
                                    {avaliacao.nome} (Peso: {avaliacao.peso}%)
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
