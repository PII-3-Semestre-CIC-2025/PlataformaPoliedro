'use client'
import 'bootstrap/dist/css/bootstrap.min.css';
import '@/styles/menu-aluno.css';
import '@/styles/botao-seleciona-categoria.css';
import '@/styles/aluno/consultar-notas.css';

import { Header } from '../../components/header-aluno';
import { useEffect, useState } from 'react';
import { buscarNotasAluno } from '@/lib/client/notasService';

export default function ConsultarNotasPage() {
    const [disciplinaSelecionada, setDisciplinaSelecionada] = useState('');
    const [notasPorDisciplina, setNotasPorDisciplina] = useState({});
    const [disciplinas, setDisciplinas] = useState([]);
    const [erro, setErro] = useState(null);

    useEffect(() => {
        buscarNotasAluno()
            .then(notas => {
                setNotasPorDisciplina(notas);
                setDisciplinas(Object.keys(notas));
            })
            .catch(e => setErro(e.message));
    }, []);

    const handleDisciplinaChange = (e) => {
        setDisciplinaSelecionada(e.target.value);
    };

    const getNotasDisciplina = () => {
        if (!disciplinaSelecionada) return [];
        return notasPorDisciplina[disciplinaSelecionada] || [];
    };

    return (
        <div className="consultar-notas">            
        <Header />
            <main className="main-content">
                <div className="container-fluid px-4">                    
                    {/* Dropdown de seleção de disciplina */}
                    <div className="disciplina-selector-container">
                        <select 
                            className="botao-seleciona-categoria"
                            value={disciplinaSelecionada}
                            onChange={handleDisciplinaChange}
                        >
                            <option value="">Selecionar Disciplina:</option>
                            {disciplinas.map((disciplina) => (
                                <option key={disciplina} value={disciplina}>
                                    {disciplina}
                                </option>
                            ))}
                        </select>
                    </div>                    
                    {/* Seção de notas - só aparece quando disciplina for selecionada */}
                    {disciplinaSelecionada && (
                        <div className="notas-section">
                            <h2 className="notas-title">
                                Notas de {disciplinaSelecionada}
                            </h2>
                            <div className="table-responsive">
                                <table className="table-notas">
                                    <thead>
                                        <tr>
                                            <th>Avaliações</th>
                                            <th>Notas</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {getNotasDisciplina().length > 0 ? (
                                            getNotasDisciplina().map((item, index) => (
                                                <tr key={index}>
                                                    <td>{item.avaliacao}</td>
                                                    <td>
                                                        <span className={`nota ${item.nota === 0 ? 'nota-zero' : ''}`}>
                                                            {item.nota}
                                                        </span>
                                                    </td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td colSpan="2" className="empty-state">
                                                    Nenhuma avaliação encontrada para esta disciplina
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
}