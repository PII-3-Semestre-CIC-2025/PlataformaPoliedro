import { supabase } from '../supabaseClient.js';

export async function buscarAvaliacoesPorTurma(turma) {
    const { data, error } = await supabase
        .from('avaliacoes')
        .select('*')
        .eq('codigo_turma', turma);
    if (error) throw error;
    return data;
}