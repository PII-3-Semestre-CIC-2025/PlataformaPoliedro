import { supabase } from '../supabaseClient.js';

export async function buscarPontuacoes(codigo_turma, idsCategorias) {

    const { data: alunosTurma, error: errorAlunos } = await supabase
        .from('alunos_turmas')
        .select('RA_aluno')
        .eq('codigo_turma', codigo_turma);
    
    if (errorAlunos) throw errorAlunos;
    if (!alunosTurma || alunosTurma.length === 0) return [];
    
    const rasAlunos = alunosTurma.map(at => at.RA_aluno);
    
    const { data, error } = await supabase
        .from('pontuacoes')
        .select('*')
        .in('RA_aluno', rasAlunos)
        .in('id_categoria', idsCategorias);
    
    if (error) throw error;
    return data || [];
}
