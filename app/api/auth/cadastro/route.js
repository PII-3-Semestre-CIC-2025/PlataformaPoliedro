import { cadastrarProfessor } from "@/lib/professoresService";

export async function POST(request) {
    try {
        const { email, senha } = await request.json();
        if (!email || !senha) {
            return new Response(JSON.stringify({ error: 'Por favor, preencha todos os campos.' }), { status: 400 });
        }

        await cadastrarProfessor(email, senha);
        return new Response(JSON.stringify({ message: 'Cadastro realizado com sucesso.' }), { status: 201 });
    } catch (error) {
        console.error('Erro ao cadastrar professor:', error);
        return new Response(JSON.stringify({ error: error.message }), { status: 500 });
    }
}