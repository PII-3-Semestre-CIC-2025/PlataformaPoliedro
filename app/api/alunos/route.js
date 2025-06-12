import { cadastrarAluno } from '@/lib/admin/alunosAdminService.js';
import { buscarAlunosPorTurma } from '@/lib/client/alunosService.js';

export async function POST(request) {
  try {
    const { nome, matricula, turma } = await request.json();
    if (!nome || !matricula || !turma) {
      return new Response(JSON.stringify({ error: 'Preencha todos os campos.' }), { status: 400 });
    }

    const nomeFormatado = String(nome).trim().toLowerCase();
    const matriculaFormatada = String(matricula).trim().toLowerCase();

    await cadastrarAluno(nomeFormatado, matriculaFormatada, turma);

    return new Response(JSON.stringify({ message: 'Aluno cadastrado com sucesso.' }), { status: 201 });

  } catch (error) {
    console.error('Erro ao cadastrar aluno:', error);
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}

export async function GET(request) {
    const { searchParams } = new URL(request.url);
    const codigo_turma = searchParams.get('codigo_turma');
    if (!codigo_turma) {
        return new Response(JSON.stringify({ error: 'Código da turma não informado.' }), { status: 400 });
    }
    try {
        const alunosTurma = await buscarAlunosPorTurma(codigo_turma);
        const lista = alunosTurma.map(item => item.alunos);
        return new Response(JSON.stringify(lista), { status: 200 });
    } catch (error) {
        return new Response(JSON.stringify({ error: error.message }), { status: 500 });
    }
}
