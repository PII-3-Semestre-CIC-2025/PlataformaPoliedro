'use client'
import 'bootstrap/dist/css/bootstrap.min.css'
import '@/styles/header.css' 

export const Header = () => {
  return (
    <header className="header-prof">
        <div className="container-fluid">
            <div className="row">
                <div className="col-3">
                    <img src="/images/logo-cubo.png" alt="Logo" className="logo" />
                </div>
                <div className="col-8 turma-info">
                    <span className="turma-atual">Turma Atual: 7ª A </span>
                    <span className="prof-atual">Professor: Leonardo Nogueira</span>
                </div>
                <div className="col-1">
                    <a href="/" className="logout-btn">
                        <img src="/images/IconLogout.png" alt="Logout" />
                    </a>
                </div>
            </div>
        </div>
    </header>
  )
}