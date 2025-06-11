import { supabase } from '@/lib/supabaseAdmin.js'
import bcrypt from 'bcrypt'
import { SignJWT } from 'jose'

export async function POST(request) {
    const { email: emailDigitado, senha: senhaDigitada } = await request.json()
    
    if (!emailDigitado || !senhaDigitada) {
        return new Response(JSON.stringify({ error: 'Preencha todos os campos.' }), { status: 400 })
    }

    const senha = String(senhaDigitada).trim()
    const email = String(emailDigitado).trim().toLowerCase()

    const { data: aluno } = await supabase
        .from('alunos')
        .select('*')
        .eq('email', email)
        .single()

    if (!aluno) {
        return new Response(JSON.stringify({ error: 'E-mail ou senha incorretos.' }), { status: 401 })
    }

    const senhaCorreta = await bcrypt.compare(senha, aluno.senha)
    if (!senhaCorreta) {
        return new Response(JSON.stringify({ error: 'E-mail ou senha incorretos.' }), { status: 401 })
    }

    const jwt = await new SignJWT({
        sub: aluno.RA,
        tipo: 'aluno',
        email: aluno.email,
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