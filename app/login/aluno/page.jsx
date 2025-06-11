'use client'
import { useState } from 'react';
import { useRouter } from 'next/navigation';


const LoginAlunoPage = () => {
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

                        try {
                            const response = await fetch('/api/auth/login-aluno', {
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
                                router.push('/menu-aluno')
                            }
                        } catch (err) {
                            setErro(err.message || 'Erro de conexão com o servidor.')
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
                
            </section>

            <div className="pattern-section d-none d-lg-block col-lg-6"  />
        </div>

        </>
    );
}

export default LoginAlunoPage;