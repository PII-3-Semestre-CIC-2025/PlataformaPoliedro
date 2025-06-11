import { supabase } from '@/lib/supabaseClient';

export async function POST(req) {
    const body = await req.json();
    const { data, error } = await supabase
        .from('notas')
        .insert([body])
        .select()
        .single();
    if (error) return new Response(JSON.stringify({ error: error.message }), { status: 400 });
    return new Response(JSON.stringify(data), { status: 201 });
}