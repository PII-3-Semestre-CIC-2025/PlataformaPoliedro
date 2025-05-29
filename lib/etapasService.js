import { supabase } from './supabaseClient.js'

export async function buscarEtapas() {
    const { data, error } = await supabase
        .from('etapas')
        .select('id, nome_etapa');
    if (error) throw error;
    return data;
}