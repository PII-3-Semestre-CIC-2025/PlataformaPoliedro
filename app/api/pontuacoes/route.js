import { supabase } from '@/lib/supabaseClient.js';

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