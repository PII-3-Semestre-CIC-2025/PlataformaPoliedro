'use client'
import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';

const RecuperarSenhaPage = () => {
    const [senha, setSenha] = useState('');
    const [confirmarSenha, setConfirmarSenha] = useState('');
    const [erro, setErro] = useState(null);
    const [sucesso, setSucesso] = useState(false);
    const [enviando, setEnviando] = useState(false);
    const params = useParams();
    const router = useRouter();
    const token = params.token;

    return (
        <>
        <div className="split-container">
            <section className="login-box white-section">
                <h2>Redefinir Senha</h2>
                <form className="login-form"
                    onSubmit={async (event) => {
                        event.preventDefault();
                        setErro(null);
                        setSucesso(false);
                        setEnviando(true);
                        try {
                            if (senha !== confirmarSenha) throw Error("As senhas não coincidem.");
                            if (!token) throw Error("Token de redefinição não encontrado.");

                            const response = await fetch('/api/auth/redefinir-senha', {
                                method: 'POST',
                                headers: { 'Content-Type': 'application/json' },
                                body: JSON.stringify({ token, novaSenha: senha }),
                            });

                            const data = await response.json();
                            if (!response.ok) throw new Error(data.error || 'Erro ao redefinir senha.');

                            setSucesso(true);
                            setTimeout(() => router.push('/login'), 2000);
                        } catch (err) {
                            setErro(err.message || 'Erro de conexão com o servidor.');
                        } finally {
                            setEnviando(false);
                        }
                    }}>
                    {erro && <p style={{ color: 'red' }}>{erro}</p>}
                    {sucesso && <p style={{ color: 'green' }}>Senha redefinida com sucesso! Redirecionando...</p>}
                    <div className="form-group">
                        <label>Nova Senha:</label>
                        <input
                            type="password"
                            id="senha"
                            name="senha"
                            autoComplete="new-password"
                            autoFocus
                            placeholder='Digite sua nova senha.'
                            minLength="8"
                            value={senha}
                            onChange={(e) => setSenha(e.target.value)}
                            disabled={enviando || sucesso}
                        />
                    </div>

                    <div className="form-group">
                        <label>Confirmar Nova Senha:</label>
                        <input
                            type="password"
                            id="confirmarSenha"
                            name="confirmarSenha"
                            autoComplete="confirm-password"
                            placeholder='Repita a nova senha.'
                            minLength="8"
                            required
                            value={confirmarSenha}
                            onChange={(e) => setConfirmarSenha(e.target.value)}
                            disabled={enviando || sucesso}
                        />
                    </div>

                    <button type="submit" className="submit-button" disabled={enviando || sucesso}>
                        {enviando ? 'Enviando...' : 'Confirmar'}
                    </button>
                </form>
            </section>

            <div className="pattern-section d-none d-lg-block col-lg-6" />
        </div>
        </>
    );
}

export default RecuperarSenhaPage;