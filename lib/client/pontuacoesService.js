import { supabase } from '../supabaseClient.js';

export async function buscarPontuacoes(turma, categorias) {
    // Busca todos os RAs da turma
    const { data: alunosTurma } = await supabase
        .from('alunos_turmas')
        .select('RA_aluno')
        .eq('codigo_turma', turma);
    const ras = alunosTurma.map(a => a.RA_aluno);

    const { data, error } = await supabase
        .from('pontuacoes')
        .select('*')
        .in('RA_aluno', ras)
        .in('id_categoria', categorias);

    if (error) throw error;
    return data;
}