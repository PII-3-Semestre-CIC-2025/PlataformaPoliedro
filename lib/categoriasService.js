import { supabase } from './supabaseClient.js';

export async function buscarCategoriasPorEtapa(nome_etapa) {
    const { data, error } = await supabase
        .from('categorias')
        .select('*')
        .eq('nome_etapa', nome_etapa);
    if (error) throw error;
    return data;
}