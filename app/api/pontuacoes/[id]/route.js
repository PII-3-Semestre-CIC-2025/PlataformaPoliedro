import { supabase } from '@/lib/supabaseClient.js';

export async function PUT(request, context) {
    const params = await context.params;
    const id = params.id;
    try {
        const { performance } = await request.json();

        if (performance === undefined) {
            return new Response(JSON.stringify({ error: 'Performance não informada.' }), { status: 400 });
        }

        const { data, error } = await supabase
            .from('pontuacoes')
            .update({ performance })
            .eq('id', id)
            .select();

        if (error) {
            return new Response(JSON.stringify({ error: error.message }), { status: 500 });
        }

        if (!data || data.length === 0) {
            return new Response(JSON.stringify({ error: 'Pontuação não encontrada.' }), { status: 404 });
        }

        return new Response(JSON.stringify({ message: 'Pontuação atualizada.' }), { status: 200 });
    } catch (err) {
        return new Response(JSON.stringify({ error: 'Erro inesperado no servidor.' }), { status: 500 });
    }
}

export async function DELETE(request, context) {
    const { id } = await context.params;
    const { error } = await supabase
        .from('pontuacoes')
        .delete()
        .eq('id', id);

    if (error) {
        return new Response(JSON.stringify({ error: error.message }), { status: 500 });
    }
    return new Response(null, { status: 204 });
}