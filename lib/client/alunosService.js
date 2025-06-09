import { supabase } from '../supabaseClient.js'

export async function buscarAlunosPorTurma(codigo_turma) {
    const { data, error } = await supabase
        .from('alunos_turmas')
        .select('alunos(RA, nome, total_pontos)')
        .eq('codigo_turma', codigo_turma);
    if (error) throw error;
    return data;
}