import 'bootstrap/dist/css/bootstrap.min.css';

const LoginProfPage = () => {
    return(
        <div className="split-container">
            <section className="login-box white-section">
                <h2>Login</h2>
                <form className="login-form">
                    <div className="form-group">
                        <label>E-mail:</label>
                        <input type="email" id="email" name="email" required />
                    </div>

                    <div className="form-group">
                        <label>Senha:</label>
                        <input type="password" id="senha" name="senha" required />
                    </div>

                    <button type="submit" className="submit-button">Entrar</button>
                </form>
                <a href="#" className="forgot-password">Esqueceu a senha?</a>
                
                <div className="divider"></div>
                
                <a href="cadastro.html">
                    <button type="button" className="cadastro-btn">Cadastre-se</button>
                </a>
            </section>

            <div className="pattern-section d-none d-lg-block col-lg-6"  />
        </div>
    );
}

export default LoginProfPage;