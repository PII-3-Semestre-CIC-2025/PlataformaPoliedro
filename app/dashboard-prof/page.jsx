import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Header } from "@/app/components/header";
import Link from 'next/link';

const DashboardProf = () => {
    return (
        <div className="professor-dashboard">
            <Header />
            <br /><br />
            <div className="container caixa-informacao">
                <div className="row">
                    <div className="col-12 info-box">
                        <span className="total-alunos">Total de Alunos: 30</span>
                        <span className="media-turma">Média da Turma: 8.9</span>
                        <span className="aluno-destaque">Aluno Destaque: Vitor Porto (195 PoliPoints)</span>
                    </div>
                </div>
            </div>

            <div className="container py4">
                <div className="row menuRow">
                    <div className="col-md-4">
                        <Link href="/dashboard-prof/alunos" className="menuBtn bgAlunos">
                            <i className="fas fa-graduation-cap"></i> Alunos
                        </Link>
                    </div>                    <div className="col-md-4">
                        <Link href="/dashboard-prof/pontuar" className="menuBtn bgPontuacao">
                            <i className="fas fa-award"></i> Pontuação
                        </Link>
                    </div>                    <div className="col-md-4">
                        <Link href="/dashboard-prof/ranking" className="menuBtn bgRanking">
                            <i className="fas fa-list-ol"></i> Ranking
                        </Link>
                    </div>                    <div className="col-md-4">
                        <Link href="/dashboard-prof/avaliacoes" className="menuBtn bgAvaliacoes">
                            <i className="fas fa-clipboard-list"></i> Avaliações
                        </Link>
                    </div><div className="col-md-4">
                        <Link href="/relatorio" className="menuBtn bgRelatorios">
                            <i className="fas fa-file-alt"></i> Relatórios
                        </Link>
                    </div><div className="col-md-4">
                        <Link href="/dashboard-prof/pontuacao" className="menuBtn bgCategorias">
                            <i className="fas fa-cog"></i> Categorias
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}


export default DashboardProf;