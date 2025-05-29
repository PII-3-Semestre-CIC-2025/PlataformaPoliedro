import 'bootstrap/dist/css/bootstrap.min.css';
import './menu-aluno.css';
const MenuAluno = () => {
    return (
        <div className='menu-aluno'>
            <header className="header-prof">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-3">
                            <img src="images/logo-cubo.png" alt="Logo" className="logo" />
                        </div>
                        <div className="col-8 turma-info">
                            <span className="turma-atual">Turma: 7ª A </span>
                            <span className="prof-atual">Aluno: Leonardo Nogueira</span>
                        </div>
                        <div className="col-1">
                            <a href="index.html" className="logout-btn">↻</a>
                        </div>
                    </div>
                </div>
            </header>

            <body>
                <div className="container-menu-aluno">
                    <div className='row'>
                        <div className='col-md-4'>
                            <div className='menu-aluno-btn'>
                                <div>
                                    <button className='btn-notas'>
                                        <img src="images/Icone Notas.png" alt="botao-notas" />
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className='col-md-4'>
                            <div className='menu-aluno-btn'>
                                <div>
                                    <button className='btn-ranking'>
                                        <img src="images/IconeRanking.png" alt="botao-ranking" />
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className='col-md-4'>
                            <div className='menu-aluno-btn'>
                                <div>
                                    <button className='btn-conquistas'>
                                        <img src="images/IconeMinhasConquistas.png" alt="botao-conquistas" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </body>
        </div>
    );
}

export default MenuAluno;