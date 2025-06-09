import { supabase } from '@/lib/supabaseAdmin.js';

export async function POST(request, context) {
  const { id: ra } = await context.params;
  const { data, error } = await supabase.rpc('atualizar_total_pontos', { ra_aluno: ra });
  console.log('RPC data:', data, 'error:', error);
  if (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
  return new Response(JSON.stringify({ message: 'Total de pontos atualizado.' }), { status: 200 });
}