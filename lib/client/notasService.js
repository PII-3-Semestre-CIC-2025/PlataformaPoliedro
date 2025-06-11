import { supabase } from '../supabaseClient.js';

export async function buscarNotasPorTurma(turma) {
    const { data, error } = await supabase
        .from('notas')
        .select('id, RA_aluno, id_avaliacao, nota')
        .in('RA_aluno', 
            (await supabase.from('alunos_turmas').select('RA_aluno').eq('codigo_turma', turma)).data.map(a => a.RA_aluno)
        );
    if (error) throw error;
    return data;
}