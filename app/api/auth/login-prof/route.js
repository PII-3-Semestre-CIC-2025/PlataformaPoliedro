import { autenticarProfessor } from '@/lib/admin/professoresAdminService.js'
import { cookies } from 'next/headers'
import { SignJWT } from 'jose'

export async function POST(request) {
    try {
        const { email, senha } = await request.json()
        if (!email || !senha) {
            return new Response(JSON.stringify({ error: 'Por favor, preencha todos os campos.' }), { status: 400 })
        }

        const professor = await autenticarProfessor(email, senha)
        
        const secret = new TextEncoder().encode(process.env.JWT_SECRET)
        const token = await new SignJWT({
          id: professor.id,
          email: professor.email,
          nome: professor.nome,
          tipo: 'professor'
        })
          .setProtectedHeader({ alg: 'HS256' })
          .setExpirationTime('1d')
          .sign(secret)

        const cookiesNavegador = await cookies();
        cookiesNavegador.set('auth_token', token, {
          httpOnly: true,
          secure: true,
          sameSite: 'strict',
          path: '/',
          maxAge: 60 * 60 * 24
        });

        return new Response(JSON.stringify({ message: 'Login realizado com sucesso.', professor }), { status: 200 })
    } catch (error) {
        return new Response(JSON.stringify({ error: error.message }), { status: 401 })
    }
}