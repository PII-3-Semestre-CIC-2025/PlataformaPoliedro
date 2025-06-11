'use client'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Header } from '../components/header-aluno';
import '@/styles/menu-aluno.css'

export default function MenuAluno() {
    return (
        <div className="menu-aluno">
            <Header />
            <div className="menu-container">
                <a href="/menu-aluno/consultar-pontuacao" className="menu-item">
                    <img src="/images/IconeRanking.png" alt="Troféu" className="menu-icon" />
                    <span className="menu-text">CONSULTAR PONTUAÇÃO</span>
                </a>
                <a href="/menu-aluno/consultar-notas" className="menu-item">
                    <img src="/images/IconeNotas.png" alt="Notas" className="menu-icon" />
                    <span className="menu-text">CONSULTAR NOTAS</span>
                </a>
            </div>
        </div>
    )
}