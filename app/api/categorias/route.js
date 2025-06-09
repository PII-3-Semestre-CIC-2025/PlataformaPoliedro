import { buscarCategoriasPorEtapa } from '@/lib/categoriasService.js';
import { criarCategoria } from '@/lib/admin/categoriasAdminService.js';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const etapa = searchParams.get('etapa');
  try {
    const data = await buscarCategoriasPorEtapa(etapa);
    return new Response(JSON.stringify(data), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const data = await criarCategoria(body);
    return new Response(JSON.stringify(data), { status: 201 });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}