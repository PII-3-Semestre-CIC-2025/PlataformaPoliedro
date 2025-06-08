'use client'

export function ModalAdicionarAvaliacao({ isOpen, onClose, onConfirm }) {
    if (!isOpen) return null;    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const avaliacao = {
            id: Date.now(), // Gerando um ID único
            nome: formData.get('nome'),
            peso: parseInt(formData.get('peso'))
        };
        onConfirm(avaliacao);
        onClose();
    };

    return (
        <>
            <div className="blur-background" onClick={onClose}></div>
            <div className="cadastro-modal">
                <h2>Adicionar Avaliação</h2>
                <form onSubmit={handleSubmit}>                    <div className="form-group">
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
