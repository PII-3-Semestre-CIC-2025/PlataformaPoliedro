'use client'
import { useState } from 'react';
import { useRouter } from 'next/navigation';


const LoginAlunoPage = () => {
    const [nome, setNome] = useState('')
    const [RA, setRA] = useState('')
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
                                body: JSON.stringify({ nome, RA }),
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
                        <label>Nome Completo:</label>
                        <input
                            type="text"
                            id="nome"
                            name="nome"
                            autoComplete="name"
                            autoFocus
                            placeholder='Ex.: Joao Pereira Silva.'
                            required
                            value={nome}
                            onChange={(e) => setNome(e.target.value)}
                        />
                    </div>

                    <div className="form-group">
                        <label>Matrícula:</label>
                        <input
                            type="text"
                            id="ra"
                            name="ra"
                            placeholder='Digite seu número de matrícula.'
                            required
                            value={RA}
                            onChange={(e) => setRA(e.target.value)}
                        />
                    </div>

                    <button type="submit" className="submit-button">Entrar</button>
                </form>
                
            </section>

            <div className="pattern-section d-none d-lg-block col-lg-6"  />
        </div>

        </>
    );
}

export default LoginAlunoPage;