'use client'
import 'bootstrap/dist/css/bootstrap.min.css';
import '@/styles/alunos-prof.css';
import '@/styles/botao-add-aluno.css';
import { useState, useEffect } from 'react';
import { Header } from '@/app/components/header';
import { ModalEditarCategoria } from '@/app/components/modal-editar-categoria';
import { ModalCadastrarCategoria } from '@/app/components/modal-cadastrar-categoria';

export default function PontuacaoPage() {
    const [categorias, setCategorias] = useState([]);
    const [erro, setErro] = useState(null);
    const [categoriaParaEditar, setCategoriaParaEditar] = useState(null);
    const [abrirModalCadastrar, setAbrirModalCadastrar] = useState(false);    useEffect(() => {
        // TODO: Implementar busca de categorias
        setCategorias([
            { id: 1, categorias: 'Participação', valor: 10 },
            { id: 2, categorias: 'Atividade Extra', valor: 5 },
            { id: 3, categorias: 'Desafio', valor: 15 }
        ]);
    }, []);    const handleEdit = (categoria) => {
        setCategoriaParaEditar(categoria);
    };

    const handleSaveEdit = (categoriaAtualizada) => {
        setCategorias(categorias.map(cat => 
            cat.id === categoriaAtualizada.id ? categoriaAtualizada : cat
        ));
        setCategoriaParaEditar(null);
    };

    const handleDelete = async (id) => {
        if (window.confirm('Tem certeza que deseja excluir esta categoria?')) {
            try {
                // TODO: Implementar API de exclusão
                setCategorias(categorias.filter(cat => cat.id !== id));
            } catch (error) {
                setErro('Erro ao excluir categoria: ' + error.message);
            }
        }
    };

    return (
        <div className="alunos-prof">
            <Header />
            <main className="container-fluid px-4">
                {erro && <div className="alert alert-danger" role="alert">{erro}</div>}
                <div className="table-responsive">
                    <table className="table-alunos">                        <thead>
                            <tr>
                                <th>Categorias</th>
                                <th>Valor</th>
                                <th>Ações</th>
                            </tr>
                        </thead>                        <tbody>{categorias.map((categoria) => (
                            <tr key={categoria.id}>
                                <td>{categoria.categorias}</td>
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
                        ))}</tbody>
                    </table>
                </div>                <button
                    className="botao-add-aluno"
                    onClick={() => setAbrirModalCadastrar(true)}
                >
                    +Adicionar Categoria
                </button>            </main>

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