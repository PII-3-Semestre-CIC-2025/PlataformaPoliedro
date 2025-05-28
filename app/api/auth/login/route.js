import { autenticarProfessor } from '@/lib/professoresService'

export async function POST(request) {
    try {
        const { email, senha } = await request.json()
        if (!email || !senha) {
            return new Response(JSON.stringify({ error: 'Por favor, preencha todos os campos.' }), { status: 400 })
        }

        const professor = await autenticarProfessor(email, senha)
        // TODO: TOKENS AUTH

        return new Response(JSON.stringify({ message: 'Login realizado com sucesso.', professor }), { status: 200 })
    } catch (error) {
        return new Response(JSON.stringify({ error: error.message }), { status: 401 })
    }
}