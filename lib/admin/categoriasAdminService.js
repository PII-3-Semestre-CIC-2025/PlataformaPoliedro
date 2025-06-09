import { supabase } from '../supabaseAdmin.js';

export async function criarCategoria({ nome_etapa, nome, valor }) {
    const { data, error } = await supabase
        .from('categorias')
        .insert([{ nome_etapa, nome, valor }])
        .select()
        .single();
    if (error) throw error;
    return data;
}

export async function editarCategoria(id, { nome, valor }) {
    const { data, error } = await supabase
        .from('categorias')
        .update({ nome, valor })
        .eq('id', id)
        .select()
        .single();
    if (error) throw error;
    return data;
}

export async function excluirCategoria(id) {
    const { error } = await supabase
        .from('categorias')
        .delete()
        .eq('id', id);
    if (error) throw error;
    return true;
}