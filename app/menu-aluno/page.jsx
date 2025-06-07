'use client'
import 'bootstrap/dist/css/bootstrap.min.css';
import '@/styles/menu-aluno.css'

export default function MenuAluno() {
    return (
        <div className="menu-aluno">
            <header className="header-aluno">
                <div className="container-fluid">
                    <div className="row align-items-center">
                        <div className="col-6">
                            <img src="/images/logo-cubo.png" alt="Logo" className="logo" />
                        </div>
                        <div className="col-6 d-flex justify-content-end">
                            <a href="/" className="logout-btn">
                                <img src="/images/IconLogout.png" alt="Sair" />
                            </a>
                        </div>
                    </div>
                </div>
            </header>

            <div className="menu-container">
                <a href="#" className="menu-item">
                    <img src="/images/IconeRanking.png" alt="Troféu" className="menu-icon" />
                    <span className="menu-text">CONSULTAR PONTUAÇÃO</span>
                </a>
                <a href="#" className="menu-item">
                    <img src="/images/IconeNotas.png" alt="Notas" className="menu-icon" />
                    <span className="menu-text">CONSULTAR NOTAS</span>
                </a>
            </div>
        </div>
    )
}