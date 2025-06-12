import { editarAluno, excluirAluno } from '@/lib/admin/alunosAdminService.js';
import { supabase } from '@/lib/supabaseAdmin.js';

export async function DELETE(request, context) {
  const { id: ra } = await context.params;
  if (!ra) {
    return new Response(JSON.stringify({ error: 'RA não informado.' }), { status: 400 });
  }
  try {
    await excluirAluno(ra);
    return new Response(JSON.stringify({ message: 'Aluno removido com sucesso.' }), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}

export async function PUT(request, context) {
  const { id: ra } = await context.params;
  const { nome, turma } = await request.json();
  if (!ra || !nome || !turma) {
    return new Response(JSON.stringify({ error: 'Dados incompletos.' }), { status: 400 });
  }
  try {
    await editarAluno(ra, nome, turma);
    return new Response(JSON.stringify({ message: 'Aluno editado com sucesso.' }), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}

export async function GET(request, context) {
  const { id: ra } = await context.params;
  if (!ra) {
    return new Response(JSON.stringify({ error: 'RA não informado.' }), { status: 400 });
  }

  const { data: aluno, error } = await supabase
    .from('alunos')
    .select('RA, nome, total_pontos')
    .eq('RA', ra)
    .single();

  if (error || !aluno) {
    return new Response(JSON.stringify({ error: 'Aluno não encontrado.' }), { status: 404 });
  }

  return new Response(JSON.stringify(aluno), { status: 200 });
}