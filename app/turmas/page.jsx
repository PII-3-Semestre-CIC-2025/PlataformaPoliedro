import 'bootstrap/dist/css/bootstrap.min.css';

const Turmas = () => {
    return(
        <div className="split-container">
            <section className="login-box white-section">
                <h2>Turmas</h2>
                <form className="etapa-form">
                    <select name="etapa" className="dropdown" defaultValue="nenhum" required>
                        <option value="nenhum" disabled hidden>Selecione uma turma</option>
                        <option value="turma1">Turma I</option>
                        <option value="turma2">Turma II</option>
                        <option value="turma3">Turma III</option>
                        <option value="turma4">Turma IV</option>
                    </select>
                    <a href="/turma">
                        <button className="cadastro-btn">Entrar</button>
                    </a>

                    <a href="/turma">
                    <button className="criar-turma">Adicionar Turma</button>
                    </a>
                    
                </form>
            </section>
            
            <div className="pattern-section d-none d-lg-block col-lg-6"  />
        </div>
    );
}

export default Turmas;