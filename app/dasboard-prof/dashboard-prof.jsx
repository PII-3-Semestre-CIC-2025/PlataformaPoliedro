import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import styles from './dashboard-prof.module.css';

export default function DashboardProf() {
    return (
        <div className="professor-dashboard">
            <header className="dashboard-header-prof">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-3">
                            <img src="img/logo-cubo.png" alt="Logo" className="logo" />
                        </div>
                        <div className="col-8 turma-info">
                            <span className="turma-atual">Turma Atual: 7ª A </span>
                            <span className="prof-atual">Professor: Leonardo Nogueira</span>
                        </div>
                        <div className="col-1">
                            <a href="index.html" className="logout-btn">↻</a>
                        </div>
                    </div>
                </div>
            </header>

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

            <div className={`container ${styles.py4}`}>
                <div className={`row ${styles.menuRow}`}>
                    <div className="col-md-4">
                        <div className={`${styles.menuBtn} ${styles.bgAlunos}`}>
                            <i className="fas fa-graduation-cap"></i> Alunos
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className={`${styles.menuBtn} ${styles.bgPontuacao}`}>
                            <i className="fas fa-award"></i> Pontuação
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className={`${styles.menuBtn} ${styles.bgRanking}`}>
                            <i className="fas fa-list-ol"></i> Ranking
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className={`${styles.menuBtn} ${styles.bgAvaliacoes}`}>
                            <i className="fas fa-clipboard-list"></i> Avaliações
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className={`${styles.menuBtn} ${styles.bgRelatorios}`}>
                            <i className="fas fa-file-alt"></i> Relatórios
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className={`${styles.menuBtn} ${styles.bgConfiguracao}`}>
                            <i className="fas fa-cog"></i> Configuração
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}