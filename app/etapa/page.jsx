import 'bootstrap/dist/css/bootstrap.min.css';

const Etapa = () => {
    return(
        <div className="split-container">
            <section className="login-box white-section">
                <h2>Etapa</h2>
                <form className="etapa-form">
                    <select name="etapa" className="dropdown" defaultValue="nenhum" required>
                        <option value="nenhum" disabled hidden>Selecione uma etapa</option>
                        <option value="fund1">Fundamental I</option>
                        <option value="fund2">Fundamental II</option>
                        <option value="medio">Ensino Médio</option>
                    </select>
                    <a href="/turma">
                        <button className="cadastro-btn">Confirmar</button>
                    </a>
                </form>
            </section>
            
            <div className="pattern-section d-none d-lg-block col-lg-6"  />
        </div>
    );
}

export default Etapa;