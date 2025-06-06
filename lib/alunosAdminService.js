import { supabase } from './supabaseAdmin.js';

export async function excluirAluno(ra) {
  const { error } = await supabase
    .from('alunos')
    .delete()
    .eq('RA', ra);

  if (error) throw error;
}

export async function editarAluno(ra, nome, turma) {
  const { error } = await supabase
    .from('alunos')
    .update({ nome })
    .eq('RA', ra);

  if (error) throw error;

  const { error: errorDelete } = await supabase
    .from('alunos_turmas')
    .delete()
    .eq('RA_aluno', ra);

  if (errorDelete) throw errorDelete;

  const { error: insertError } = await supabase
    .from('alunos_turmas')
    .insert({ RA_aluno: ra, codigo_turma: turma });

  if (insertError && !insertError.message.includes('duplicate')) throw insertError;
}