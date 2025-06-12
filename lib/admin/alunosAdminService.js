import { supabase } from '../supabaseAdmin.js';

export async function excluirAluno(ra) {
  const { error } = await supabase
    .from('alunos')
    .delete()
    .eq('RA', ra);

  if (error) throw error;
}

export async function editarAluno(ra, nome, turma) {
  const { error: errorAluno } = await supabase
    .from('alunos')
    .update({ nome })
    .eq('RA', ra);

  if (errorAluno) throw errorAluno;

  const { error: errorDelete } = await supabase
    .from('alunos_turmas')
    .delete()
    .eq('RA_aluno', ra);

  if (errorDelete) throw errorDelete;

  const { error: insertError } = await supabase
    .from('alunos_turmas')
    .insert({ RA_aluno: ra, codigo_turma: turma });

  if (insertError) throw insertError;
}

export async function cadastrarAluno(nome, ra, turma) {
  const { error: errorAluno } = await supabase
    .from('alunos')
    .insert({ nome, RA: ra });

  if (errorAluno && !errorAluno.message.includes('duplicate')) throw errorAluno;
  
  const { error: errorTurma } = await supabase
    .from('alunos_turmas')
    .insert({ RA_aluno: ra, codigo_turma: turma });

  if (errorTurma && !errorTurma.message.includes('duplicate')) throw errorTurma;
}