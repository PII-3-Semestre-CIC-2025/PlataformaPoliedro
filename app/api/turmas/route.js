import { supabase } from '@/lib/supabaseAdmin.js';

export async function POST(request) {
  try {
    const { etapa, codigo } = await request.json();
    if (!etapa || !codigo) {
      return new Response(JSON.stringify({ error: 'Preencha todos os campos.' }), { status: 400 });
    }

    const { data, error } = await supabase
      .from('turmas')
      .insert({ codigo })
      .select();

    if (error) {
      if (error.code === '23505' || error.message.includes('duplicate key value')) {
        return new Response(JSON.stringify({ error: 'Já existe uma turma com esse código.' }), { status: 409 });
      }
      throw error;
    }
    
    if (!data || data.length === 0) {
      return new Response(JSON.stringify({ error: 'Erro ao inserir turma.' }), { status: 500 });
    }

    const { error: errorEtapa } = await supabase
      .from('etapas_turmas')
      .insert({ codigo_turma: codigo, nome_etapa: etapa });

    if (errorEtapa) throw errorEtapa;

    return new Response(JSON.stringify({ message: 'Turma cadastrada com sucesso.' }), { status: 201 });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const ra = searchParams.get('ra');
  if (!ra) {
    return new Response(JSON.stringify({ error: 'RA não informado.' }), { status: 400 });
  }

  const { data, error } = await supabase
    .from('alunos_turmas')
    .select('codigo_turma')
    .eq('RA_aluno', ra)
    .single();

  if (error || !data) {
    return new Response(JSON.stringify({ error: 'Turma não encontrada.' }), { status: 404 });
  }

  return new Response(JSON.stringify({ codigo_turma: data.codigo_turma }), { status: 200 });
}