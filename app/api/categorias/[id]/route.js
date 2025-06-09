import { editarCategoria, excluirCategoria } from '@/lib/admin/categoriasAdminService.js';

export async function PUT(request, { params }) {
  try {
    const id = params.id;
    const body = await request.json();
    const data = await editarCategoria(id, body);
    return new Response(JSON.stringify(data), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  try {
    const id = params.id;
    await excluirCategoria(id);
    return new Response(null, { status: 204 });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}