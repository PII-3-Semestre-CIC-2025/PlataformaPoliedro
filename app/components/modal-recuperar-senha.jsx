'use client'
import { useState } from 'react';

export const ModalRecuperarSenha = ({ onClose }) => {
    const [email, setEmail] = useState('');
    const [erro, setErro] = useState(null);
    const [sucesso, setSucesso] = useState(false);
    const [enviando, setEnviando] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErro(null);
        setSucesso(false);
        setEnviando(true);

        try {
            // TODO: Implementar API de recuperação de senha
            // const response = await fetch('/api/auth/recuperar-senha', {
            //     method: 'POST',
            //     headers: {
            //         'Content-Type': 'application/json',
            //     },
            //     body: JSON.stringify({ email }),
            // });

            // const data = await response.json();

            // if (!response.ok) {
            //     throw new Error(data.error || 'Erro ao enviar e-mail de recuperação.');
            // }

            // Simulação de sucesso por enquanto
            setTimeout(() => {
                setSucesso(true);
                setEnviando(false);
                setTimeout(() => {
                    onClose();
                }, 2000);
            }, 1000);

        } catch (err) {
            setErro(err.message || 'Erro ao enviar e-mail de recuperação.');
            setEnviando(false);
        }
    };

    return (
        <>
            {/* Background blur */}
            <div className="blur-background" onClick={onClose}></div>
            
            {/* Modal */}
            <div className="modal-recuperar-senha">
                <div className="modal-header">
                    <h2>Recuperar Senha</h2>
                    <button className="btn-fechar" onClick={onClose} type="button">
                        ×
                    </button>
                </div>

                <div className="modal-content">
                    <p className="instrucoes">
                        Digite seu e-mail abaixo e enviaremos instruções para redefinir sua senha.
                    </p>

                    <form onSubmit={handleSubmit}>
                        {erro && <p className="mensagem-erro">{erro}</p>}
                        {sucesso && <p className="mensagem-sucesso">E-mail de recuperação enviado com sucesso!</p>}

                        <div className="form-group">
                            <label htmlFor="email-recuperacao">E-mail:</label>
                            <input
                                type="email"
                                id="email-recuperacao"
                                placeholder="Digite seu e-mail"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                disabled={enviando || sucesso}
                            />
                        </div>

                        <div className="modal-acoes">
                            <button
                                type="button"
                                className="btn-cancelar"
                                onClick={onClose}
                                disabled={enviando}
                            >
                                Cancelar
                            </button>
                            <button
                                type="submit"
                                className="btn-enviar"
                                disabled={enviando || sucesso}
                            >
                                {enviando ? 'Enviando...' : 'Enviar Recuperação de Senha'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};
