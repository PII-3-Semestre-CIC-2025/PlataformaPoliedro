import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Header } from "@/app/components/header";

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
                        <div className="menuBtn bgAlunos">
                            <i className="fas fa-graduation-cap"></i> Alunos
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="menuBtn bgPontuacao">
                            <i className="fas fa-award"></i> Pontuação
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="menuBtn bgRanking">
                            <i className="fas fa-list-ol"></i> Ranking
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="menuBtn bgAvaliacoes">
                            <i className="fas fa-clipboard-list"></i> Avaliações
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="menuBtn bgRelatorios">
                            <i className="fas fa-file-alt"></i> Relatórios
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="menuBtn bgCategorias">
                            <i className="fas fa-cog"></i> Categorias
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}


export default DashboardProf;