import { editarAluno, excluirAluno } from '@/lib/admin/alunosAdminService.js';

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