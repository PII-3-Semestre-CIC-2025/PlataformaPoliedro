import { supabase } from '@/lib/supabaseClient.js';

export async function POST(request) {
    try {
        const { id_categoria, RA_aluno, performance } = await request.json();

        if (!id_categoria || !RA_aluno) {
            return new Response(JSON.stringify({ error: 'Dados incompletos.' }), { status: 400 });
        }

        const { data: existente, error: erroBusca } = await supabase
            .from('pontuacoes')
            .select('id')
            .eq('id_categoria', id_categoria)
            .eq('RA_aluno', RA_aluno)
            .single();

        if (erroBusca && erroBusca.code !== 'PGRST116') {
            console.error('Erro ao buscar pontuação:', erroBusca);
            return new Response(JSON.stringify({ error: erroBusca.message }), { status: 500 });
        }

        let result;
        if (existente) {
            const { error } = await supabase
                .from('pontuacoes')
                .update({ performance })
                .eq('id', existente.id);
            if (error) {
                console.error('Erro ao atualizar pontuação:', error);
                return new Response(JSON.stringify({ error: error.message }), { status: 500 });
            }
            result = { message: 'Pontuação atualizada.' };
        } else {
            const { error } = await supabase
                .from('pontuacoes')
                .insert({ id_categoria, RA_aluno, performance });
            if (error) {
                console.error('Erro ao criar pontuação:', error);
                return new Response(JSON.stringify({ error: error.message }), { status: 500 });
            }
            result = { message: 'Pontuação criada.' };
        }

        return new Response(JSON.stringify(result), { status: 200 });
    } catch (err) {
        console.error('Erro inesperado:', err);
        return new Response(JSON.stringify({ error: 'Erro inesperado no servidor.' }), { status: 500 });
    }
}