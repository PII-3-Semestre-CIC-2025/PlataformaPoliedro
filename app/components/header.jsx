'use client'
import 'bootstrap/dist/css/bootstrap.min.css'
import '@/styles/header.css' 
import { useEffect, useState } from 'react';
import Link from 'next/link';

export const Header = () => {
  const [turmaAtual, setTurmaAtual] = useState('');

  useEffect(() => {
    const turmaSalva = localStorage.getItem('turmaSelecionada');
    setTurmaAtual(turmaSalva || 'Não selecionada');
  }, []);

  return (
    <header className="header-prof">
        <div className="container-fluid">
            <div className="row">
                <div className="col-3">
                    <a href="/dashboard-prof/" className="logo-link">
                        <img src="/images/logo-cubo.png" alt="Logo" className="logo" />
                    </a>
                </div>
                <div className="col-8 turma-info">
                    <Link href="/etapa" style={{ textDecoration: 'none', color: 'inherit' }}>
                        <span className="turma-atual">Turma Atual: {turmaAtual}</span>
                    </Link>
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