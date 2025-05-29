'use client'
import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useState } from 'react';
import { buscarEtapas } from '@/lib/etapasService.js';
import { useRouter } from 'next/navigation';

const Etapa = () => {
    const [opcoes, setOpcoes] = useState([]);
    const [etapa, setEtapa] = useState('nenhum');
    const router = useRouter();

    useEffect(() => {
        async function fetchEtapas() {
            try {
                const data = await buscarEtapas();
                setOpcoes(data);
            } catch (error) {
                console.error('Erro ao buscar etapas:', error);
                alert('Erro ao carregar as etapas. Tente novamente mais tarde.');
            }
        }
        fetchEtapas();
    }, []);

    const handleChange = (e) => {
        setEtapa(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (etapa !== 'nenhum') {
            localStorage.setItem('etapaSelecionada', etapa);
            router.push('/turmas');
        }
    };

    return(
        <div className="split-container">
            <section className="login-box white-section">
                <h2>Etapa</h2>
                <form className="etapa-form" onSubmit={handleSubmit}>
                    <select
                        name="etapa"
                        className="dropdown"
                        value={etapa}
                        onChange={handleChange}
                        required
                    >
                        <option value="nenhum" disabled hidden>Selecione uma etapa</option>
                        {opcoes.map(opcao => (
                            <option key={opcao.id} value={opcao.id}>{opcao.nome_etapa}</option>
                        ))}
                    </select>
                    <button className="cadastro-btn" type="submit">Confirmar</button>
                </form>
            </section>
            <div className="pattern-section d-none d-lg-block col-lg-6"  />
        </div>
    );
}

export default Etapa;