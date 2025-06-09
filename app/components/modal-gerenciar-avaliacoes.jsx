'use client'

export function ModalGerenciarAvaliacoes({ isOpen, onClose, avaliacoes, onEdit, onDelete }) {
    if (!isOpen) return null;

    const handleSubmit = (e, avaliacao) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const avaliacaoAtualizada = {
            ...avaliacao,
            nome: formData.get('nome'),
            peso: parseInt(formData.get('peso'))
        };
        onEdit(avaliacaoAtualizada);
    };

    return (
        <>
            <div className="blur-background" onClick={onClose}></div>
            <div className="cadastro-modal gerenciar-modal">
                <h2>Gerenciar Avaliações</h2>
                <div className="lista-avaliacoes">
                    {avaliacoes.map(avaliacao => (
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
                            </div>                            <div className="acoes">
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
                                    onClick={() => onDelete(avaliacao.id)}
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
                    ))}
                </div>
                <button onClick={onClose} className="botao-fechar">
                    Fechar
                </button>
            </div>
        </>
    );
}
