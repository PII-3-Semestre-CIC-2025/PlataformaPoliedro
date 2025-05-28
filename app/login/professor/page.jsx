'use client'
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';
import { ModalCadastro } from '@/app/components/modal-cadastro';
import { useRouter } from 'next/navigation'


const LoginProfPage = () => {
    const [showCadastroModal, setShowCadastroModal] = useState(false);
    const [email, setEmail] = useState('')
    const [senha, setSenha] = useState('')
    const [erro, setErro] = useState(null)
    const [sucesso, setSucesso] = useState(false)
    const router = useRouter()

    return(
        <>
        <div className="split-container">
            <section className="login-box white-section">
                <h2>Login</h2>
                <form className="login-form"
                    onSubmit={async (e) => {
                        e.preventDefault()
                        setErro(null)
                        setSucesso(false)

                        try {
                            const response = await fetch('/api/auth/login-prof', {
                                method: 'POST',
                                headers: {
                                    'Content-Type': 'application/json',
                                },
                                body: JSON.stringify({ email, senha }),
                            })

                            const data = await response.json()

                            if (!response.ok) {
                                throw new Error(data.error || 'Erro ao realizar login. Tente novamente mais tarde.')
                            } else {
                                setSucesso(true)
                                setTimeout(() => router.push('/etapa'), 2000)
                            }
                        }
                        catch (err) {
                            setErro(err.message || 'Erro de conexão com o servidor.')
                        }
                    }}>
                    {erro && <p style={{ color: 'red' }}>{erro}</p>}
                    {sucesso && <p style={{ color: 'green' }}>Login realizado com sucesso!</p>}
                    <div className="form-group">
                        <label>E-mail:</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            autoComplete="email"
                            autoFocus
                            placeholder='Ex.: joao@p4ed.com.br'
                            //pattern=".+@p4ed\.com\.br"
                            //title="Use seu e-mail institucional que termina com @p4ed.com.br"
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
                            autoComplete="current-password"
                            placeholder='Digite sua senha'
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