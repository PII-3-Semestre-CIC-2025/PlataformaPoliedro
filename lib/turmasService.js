import { supabase } from './supabaseClient.js'

export async function buscarTurmasPorEtapa(idEtapa) {
    const { data, error } = await supabase
        .from('etapas_turmas')
        .select('turmas(id, código)')
        .eq('id_etapa', idEtapa);
    if (error) throw error;
    return data.map(rel => rel.turmas);
}