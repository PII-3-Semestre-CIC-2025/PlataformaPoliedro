'use client'

export function ModalAdicionarAvaliacao({ isOpen, onClose, onConfirm }) {
    if (!isOpen) return null;    // Lista de disciplinas disponíveis
    const disciplinas = [
        'Matemática',
        'Português',
        'História',
        'Geografia',
        'Ciências',
        'Física',
        'Química',
        'Biologia',
        'Inglês',
        'Educação Física',
        'Arte',
        'Filosofia',
        'Sociologia',
        'Literatura'
    ];

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const avaliacao = {
            id: Date.now(), // Gerando um ID único
            disciplina: formData.get('disciplina'),
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
                <h2>Adicionar Avaliação</h2>                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="disciplina">Disciplina</label>
                        <select
                            id="disciplina"
                            name="disciplina"
                            required
                            className="form-select"
                        >
                            <option value="" disabled selected>
                                Selecione uma disciplina
                            </option>
                            {disciplinas.map((disciplina, index) => (
                                <option key={index} value={disciplina}>
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
