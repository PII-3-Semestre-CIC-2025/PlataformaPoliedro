import { supabase } from './supabaseAdmin.js';

export async function excluirAluno(ra) {
  const { error } = await supabase
    .from('alunos')
    .delete()
    .eq('RA', ra);

  if (error) throw error;
}