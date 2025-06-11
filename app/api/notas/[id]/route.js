import { supabase } from '@/lib/supabaseClient';

export async function DELETE(req, context) {
    const { params } = context;
    const id = params?.id;
    const { error } = await supabase
        .from('notas')
        .delete()
        .eq('id', id);
    if (error) return new Response(JSON.stringify({ error: error.message }), { status: 400 });
    return new Response(null, { status: 204 });
}