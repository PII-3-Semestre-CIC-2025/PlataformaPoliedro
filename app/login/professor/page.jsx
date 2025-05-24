'use client'
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';
import { ModalCadastro } from '@/app/components/modal-cadastro';

const LoginProfPage = () => {
    const [showCadastroModal, setShowCadastroModal] = useState(false);
    return(
        <>
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
                
                <button type="button" className="cadastro-btn" onClick={() => setShowCadastroModal(true)}>Cadastre-se</button>
            </section>

            <div className="pattern-section d-none d-lg-block col-lg-6"  />
        </div>

        {showCadastroModal && (
                <ModalCadastro onClose={() => setShowCadastroModal(false)} />
        )}

        </>
    );
}

export default LoginProfPage;