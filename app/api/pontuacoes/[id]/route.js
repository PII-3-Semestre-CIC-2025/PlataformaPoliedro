import { supabase } from '@/lib/supabaseClient.js';

export async function PUT(request, { params }) {
    try {
        const id = params.id;
        const { performance } = await request.json();

        if (!performance) {
            return new Response(JSON.stringify({ error: 'Performance não informada.' }), { status: 400 });
        }

        const { error } = await supabase
            .from('pontuacoes')
            .update({ performance })
            .eq('id', id);

        if (error) {
            return new Response(JSON.stringify({ error: error.message }), { status: 500 });
        }

        return new Response(JSON.stringify({ message: 'Pontuação atualizada.' }), { status: 200 });
    } catch (err) {
        return new Response(JSON.stringify({ error: 'Erro inesperado no servidor.' }), { status: 500 });
    }
}