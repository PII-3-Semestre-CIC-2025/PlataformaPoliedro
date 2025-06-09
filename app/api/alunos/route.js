import { cadastrarAluno } from '@/lib/admin/alunosAdminService.js';
import bcrypt from 'bcrypt';

export async function POST(request) {
  try {
    const { nome, matricula, turma } = await request.json();
    if (!nome || !matricula || !turma) {
      return new Response(JSON.stringify({ error: 'Preencha todos os campos.' }), { status: 400 });
    }

    const senhaHash = await bcrypt.hash(matricula, 10);
    const email = `${matricula}@email.test`;

    await cadastrarAluno(nome, matricula, turma, email, senhaHash);
    return new Response(JSON.stringify({ message: 'Aluno cadastrado com sucesso.' }), { status: 201 });

  } catch (error) {
    console.error('Erro ao cadastrar aluno:', error);
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}