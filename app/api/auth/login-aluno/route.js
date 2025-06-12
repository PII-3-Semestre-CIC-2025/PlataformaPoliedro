import { supabase } from '@/lib/supabaseAdmin.js'
import { SignJWT } from 'jose'

export async function POST(request) {
    const { RA: raDigitado, nome: nomeDigitado } = await request.json()
    
    if (!raDigitado || !nomeDigitado) {
        return new Response(JSON.stringify({ error: 'Preencha todos os campos.' }), { status: 400 })
    }

    const nome = String(nomeDigitado).trim().toLowerCase()
    const RA = String(raDigitado).trim()

    const { data: aluno } = await supabase
        .from('alunos')
        .select('*')
        .eq('RA', RA)
        .single()

    if (!aluno) {
        return new Response(JSON.stringify({ error: 'RA ou nome incorretos.' }), { status: 401 })
    }

    if (String(aluno.nome).trim().toLowerCase() != nome) {
        return new Response(JSON.stringify({ error: 'RA ou nome incorretos.' }), { status: 401 })
    }

    const jwt = await new SignJWT({
        sub: aluno.RA,
        tipo: 'aluno',
        nome: aluno.nome
    })
        .setProtectedHeader({ alg: 'HS256' })
        .setExpirationTime('7d')
        .sign(new TextEncoder().encode(process.env.JWT_SECRET))

    return new Response(JSON.stringify({ message: 'Login realizado com sucesso.' }), {
        status: 200,
        headers: {
            'Set-Cookie': `auth_token=${jwt}; Path=/; HttpOnly; SameSite=Lax; Max-Age=604800`
        }
    })
}