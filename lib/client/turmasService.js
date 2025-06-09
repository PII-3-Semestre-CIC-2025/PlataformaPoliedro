import { supabase } from '../supabaseClient.js'

export async function buscarTurmasPorEtapa(nome_etapa) {
    const { data, error } = await supabase
        .from('etapas_turmas')
        .select('turmas(codigo)')
        .eq('nome_etapa', nome_etapa);
    if (error) throw error;
    return data.map(rel => rel.turmas);
}