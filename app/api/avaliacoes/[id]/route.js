import { supabase } from '@/lib/supabaseClient';

export async function PUT(req, { params }) {
    const body = await req.json();
    const { data, error } = await supabase
        .from('avaliacoes')
        .update(body)
        .eq('id', params.id)
        .select()
        .single();
    if (error) return new Response(JSON.stringify({ error: error.message }), { status: 400 });
    return new Response(JSON.stringify(data), { status: 200 });
}

export async function DELETE(req, { params }) {
    const { error } = await supabase
        .from('avaliacoes')
        .delete()
        .eq('id', params.id);
    if (error) return new Response(JSON.stringify({ error: error.message }), { status: 400 });
    return new Response(null, { status: 204 });
}