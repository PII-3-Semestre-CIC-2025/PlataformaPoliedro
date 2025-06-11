import { supabase } from '../supabaseClient.js';

export async function buscarNotasPorTurma(codigoTurma) {
    const { data, error } = await supabase
        .from('notas')
        .select('id, RA_aluno, id_avaliacao, nota')
        .in('RA_aluno', 
            (await supabase.from('alunos_turmas').select('RA_aluno').eq('codigo_turma', codigoTurma)).data.map(a => a.RA_aluno)
        );
    if (error) throw error;
    return data;
}

export async function buscarMediasPorTurma(codigoTurma) {
    const { data, error } = await supabase
        .rpc('buscar_medias_por_turma', { codigo_turma_param: codigoTurma });
    if (error) throw error;
    return data;
}