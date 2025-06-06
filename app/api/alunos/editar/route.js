import { editarAluno } from '@/lib/alunosAdminService.js';

export async function PUT(request) {
  try {
    const { ra, nome, turma } = await request.json();
    if (!ra || !nome || !turma) {
      return new Response(JSON.stringify({ error: 'Dados incompletos.' }), { status: 400 });
    }
    await editarAluno(ra, nome, turma);
    return new Response(JSON.stringify({ message: 'Aluno editado com sucesso.' }), { status: 200 });
  } catch (error) {
    console.error('Erro ao editar aluno:', error);
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}