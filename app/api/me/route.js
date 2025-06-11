import { jwtVerify } from 'jose';

export async function GET(request) {
    const cookie = request.headers.get('cookie') || '';
    const match = cookie.match(/auth_token=([^;]+)/);
    if (!match) {
        return new Response(JSON.stringify({ error: 'Não autenticado' }), { status: 401 });
    }
    const token = match[1];
    try {
        const { payload } = await jwtVerify(token, new TextEncoder().encode(process.env.JWT_SECRET));
        if (payload.tipo === 'aluno') {
            return new Response(JSON.stringify({
                tipo: 'aluno',
                ra: payload.sub,
                nome: payload.nome,
                email: payload.emailna
            }), { status: 200 });
        } else if (payload.tipo === 'professor') {
            return new Response(JSON.stringify({
                tipo: 'professor',
                id: payload.id,
                nome: payload.nome,
                email: payload.email
            }), { status: 200 });
        } else {
            return new Response(JSON.stringify({ error: 'Tipo de usuário desconhecido' }), { status: 400 });
        }
    } catch {
        return new Response(JSON.stringify({ error: 'Token inválido' }), { status: 401 });
    }
}