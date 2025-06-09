'use client'
import 'bootstrap/dist/css/bootstrap.min.css';
import '@/styles/categoria.css';
import '@/styles/botao-add-categoria.css';
import { useState, useEffect } from 'react';
import { Header } from '@/app/components/header';
import { ModalEditarCategoria } from '@/app/components/modal-editar-categoria';
import { ModalCadastrarCategoria } from '@/app/components/modal-cadastrar-categoria';

export default function PontuacaoPage() {
    const [categorias, setCategorias] = useState([]);
    const [erro, setErro] = useState(null);
    const [categoriaParaEditar, setCategoriaParaEditar] = useState(null);
    const [abrirModalCadastrar, setAbrirModalCadastrar] = useState(false);

    useEffect(() => {
        async function fetchCategorias() {
            try {
                const etapa = localStorage.getItem('etapaSelecionada') || 'Fundamental II';
                const res = await fetch(`/api/categorias?etapa=${encodeURIComponent(etapa)}`);
                const data = await res.json();
                if (!res.ok) throw new Error(data.error || 'Erro ao buscar categorias');
                setCategorias(data);
            } catch (error) {
                setErro(error.message);
            }
        }
        fetchCategorias();
    }, []);

    const handleEdit = (categoria) => {
        setCategoriaParaEditar(categoria);
    };

    // Atualize a categoria na lista após edição
    const handleSaveEdit = (categoriaAtualizada) => {
        setCategorias(categorias.map(cat =>
            cat.id === categoriaAtualizada.id ? categoriaAtualizada : cat
        ));
        setCategoriaParaEditar(null);
    };

    const handleDelete = async (id) => {
        if (window.confirm('Tem certeza que deseja excluir esta categoria?')) {
            try {
                const res = await fetch(`/api/categorias/${id}`, { method: 'DELETE' });
                if (!res.ok) {
                    const data = await res.json();
                    throw new Error(data.error || 'Erro ao excluir categoria');
                }
                setCategorias(categorias.filter(cat => cat.id !== id));
            } catch (error) {
                setErro('Erro ao excluir categoria: ' + error.message);
            }
        }
    };

    return (
        <div className="pagina-categoria">
            <Header />
            <main className="container-fluid px-4">
                {erro && <div className="alert alert-danger" role="alert">{erro}</div>}
                <div className="table-responsive">
                    <table className="table-categoria">
                        <thead>
                            <tr>
                                <th>Categorias</th>
                                <th>Valor</th>
                                <th>Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                            {categorias.map((categoria) => (
                                <tr key={categoria.id}>
                                    <td>{categoria.nome}</td>
                                    <td>{categoria.valor}</td>
                                    <td>
                                        <div className="acoes">
                                            <button
                                                className="edit-btn"
                                                onClick={() => handleEdit(categoria)}
                                            >
                                                Editar
                                            </button>
                                            <button
                                                onClick={() => handleDelete(categoria.id)}
                                                className="delete-btn"
                                            >
                                                <img src="/images/Icon Deletar.png" alt="Deletar" className="trash-icon" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <button
                    className="botao-add-categoria"
                    onClick={() => setAbrirModalCadastrar(true)}
                >
                    +Adicionar Categoria
                </button>
            </main>

            {categoriaParaEditar && (
                <ModalEditarCategoria
                    categoria={categoriaParaEditar}
                    onClose={() => setCategoriaParaEditar(null)}
                    onSave={handleSaveEdit}
                />
            )}

            {abrirModalCadastrar && (
                <ModalCadastrarCategoria
                    onClose={() => setAbrirModalCadastrar(false)}
                />
            )}
        </div>
    );
}