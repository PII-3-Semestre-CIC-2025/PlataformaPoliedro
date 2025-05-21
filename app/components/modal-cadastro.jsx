import 'bootstrap/dist/css/bootstrap.min.css';

export const ModalCadastro = ({ onClose }) => {
    return(
        <div>
            <div className="cadastro-modal">
                <h2>Cadastro</h2>
                <form onSubmit={(e) => {
                    e.preventDefault();
                    onClose();
                }}>
                    <label htmlFor="email">E-mail Institucional:</label>
                    <input type="email" id="email" name="email" required />

                    <label htmlFor="senha">Senha:</label>
                    <input type="password" id="senha" name="senha" required />

                    <label htmlFor="confirmar">Confirmar Senha:</label>
                    <input type="password" id="confirmar" name="confirmar" required />

                    <button type="submit" className="cadastro-btn">Confirmar</button>
                </form>
            </div>
        <div className="blur-background" onClick={onClose}></div>
        </div>
    );
}