'use client'
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';
import { ModalCadastro } from '@/app/components/modal-cadastro';
import { supabase } from '@/lib/supabaseClient'
import { useRouter } from 'next/navigation'


const LoginProfPage = () => {
    const [showCadastroModal, setShowCadastroModal] = useState(false);
    const [email, setEmail] = useState('')
    const [senha, setSenha] = useState('')
    const [erro, setErro] = useState(null)
    const router = useRouter()

    return(
        <>
        <div className="split-container">
            <section className="login-box white-section">
                <h2>Login</h2>
                <form className="login-form"
                    onSubmit={async (event) => {
                        event.preventDefault()
                        setErro(null)

                        const { error } = await supabase.auth.signInWithPassword({
                        email,
                        password: senha,
                        })

                        if (error) {
                        setErro(error.message)
                        } else {
                        router.push('/etapa')
                        }
                    }}>
                    {erro && <p style={{ color: 'red' }}>{erro}</p>}
                    <div className="form-group">
                        <label>E-mail:</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    <div className="form-group">
                        <label>Senha:</label>
                        <input
                            type="password"
                            id="senha"
                            name="senha"
                            required
                            value={senha}
                            onChange={(e) => setSenha(e.target.value)}
                        />
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