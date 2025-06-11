import { supabase } from '@/lib/supabaseAdmin.js';
import { buscarPontuacoes } from '@/lib/client/pontuacoesService.js';

export async function POST(request) {
    try {
        const { id_categoria, RA_aluno, performance } = await request.json();

        if (!id_categoria || !RA_aluno) {
            return new Response(JSON.stringify({ error: 'Dados incompletos.' }), { status: 400 });
        }

        const { data: existente } = await supabase
            .from('pontuacoes')
            .select('id')
            .eq('id_categoria', id_categoria)
            .eq('RA_aluno', RA_aluno)
            .single();

        if (existente) {
            return new Response(JSON.stringify({ error: 'Pontuação já existe.', id: existente.id }), { status: 409 });
        }

        const { error } = await supabase
            .from('pontuacoes')
            .insert({ id_categoria, RA_aluno, performance });

        if (error) {
            return new Response(JSON.stringify({ error: error.message }), { status: 500 });
        }

        return new Response(JSON.stringify({ message: 'Pontuação criada.' }), { status: 201 });
    } catch (err) {
        return new Response(JSON.stringify({ error: 'Erro inesperado no servidor.' }), { status: 500 });
    }
}

export async function GET(request) {
    const { searchParams } = new URL(request.url);
    const ra = searchParams.get('RA_aluno');
    const performance = searchParams.get('performance');
    const codigo_turma = searchParams.get('codigo_turma');
    const idsCategorias = searchParams.getAll('id_categoria');

    if (!ra && !codigo_turma) {
        return new Response(JSON.stringify({ error: 'RA ou código da turma não informado.' }), { status: 400 });
    }

    try {
        let query = supabase
            .from('pontuacoes')
            .select('id, id_categoria, created_at, performance, categorias(nome, valor)')
            .eq('RA_aluno', ra);

        if (performance === 'true') {
            query = query.eq('performance', true);
        }

        if (codigo_turma) {
            query = query.eq('codigo_turma', codigo_turma);
        }

        if (idsCategorias.length > 0) {
            query = query.in('id_categoria', idsCategorias);
        }

        query = query.order('created_at', { ascending: false });

        const { data, error } = await query;

        if (error) {
            return new Response(JSON.stringify({ error: error.message }), { status: 500 });
        }

        return new Response(JSON.stringify(data), { status: 200 });
    } catch (error) {
        return new Response(JSON.stringify({ error: error.message }), { status: 500 });
    }
}