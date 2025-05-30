'use client'
import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useState } from 'react';
import { buscarTurmasPorEtapa } from '@/lib/turmasService.js';
import { useRouter } from 'next/navigation';
import { ModalCriarTurma } from '@/app/components/modal-criar-turma';


const Turmas = () => {
    const [opcoes, setOpcoes] = useState([]);
    const [turma, setTurma] = useState('nenhum');
    const [showModal, setShowModal] = useState(false);
    const router = useRouter();

    useEffect(() => {
        async function fetchTurmas() {
            try {
                const idEtapa = localStorage.getItem('etapaSelecionada');
                if (!idEtapa) return;
                const data = await buscarTurmasPorEtapa(idEtapa);
                setOpcoes(data);
            } catch (error) {
                console.error('Erro ao buscar turmas:', error);
                alert('Erro ao carregar as turmas. Tente novamente mais tarde.');
            }
        }
        fetchTurmas();
    }, []);

    const handleChange = (e) => {
        setTurma(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (turma !== 'nenhum') {
            localStorage.setItem('turmaSelecionada', turma);
            document.body.style.cursor = 'wait';
            router.push('/dashboard-prof');
        }
    };

    return(
        <div className="split-container">
            <section className="login-box white-section">
                <h2>Turmas</h2>
                <form className="etapa-form" onSubmit={handleSubmit}>
                    <select
                        name="turma"
                        className="dropdown"
                        value={turma}
                        onChange={handleChange}
                        required
                    >
                        <option value="nenhum" disabled hidden>Selecione uma turma</option>
                        {opcoes.map(opcao => (
                            <option key={opcao.codigo} value={opcao.codigo}>{opcao.codigo}</option>
                        ))}
                    </select>
                    <button className="cadastro-btn" type="submit">Entrar</button>
                    <button
                      className="criar-turma"
                      type="button"
                      onClick={() => setShowModal(true)}
                    >
                      Adicionar Turma
                    </button>
                </form>
            </section>
            <div className="pattern-section d-none d-lg-block col-lg-6"  />
            {showModal && (
              <ModalCriarTurma onClose={() => setShowModal(false)} />
            )}
        </div>
    );
}

export default Turmas;