import { excluirAluno } from '@/lib/alunosAdminService.js';

export async function DELETE(request) {
  try {
    const { ra } = await request.json();

    if (!ra) {
      return new Response(JSON.stringify({ error: 'RA não informado.' }), { status: 400 });
    }

    await excluirAluno(ra);
    return new Response(JSON.stringify({ message: 'Aluno removido com sucesso.' }), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}