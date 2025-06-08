import { supabase } from '@/lib/supabaseClient.js';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const etapa = searchParams.get('etapa');
  const { data, error } = await supabase
    .from('categorias')
    .select('*')
    .eq('nome_etapa', etapa);
  if (error) return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  return new Response(JSON.stringify(data), { status: 200 });
}