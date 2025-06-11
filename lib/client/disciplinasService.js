import { supabase } from '../supabaseClient.js';

export async function buscarDisciplinasPorEtapa(nome_etapa) {
    const { data, error } = await supabase
        .from('disciplinas_etapas')
        .select('nome_disciplina')
        .eq('nome_etapa', nome_etapa);
    if (error) throw error;
    // Retorna apenas os nomes das disciplinas
    return data.map(d => d.nome_disciplina);
}