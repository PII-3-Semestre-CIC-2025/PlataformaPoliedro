import { supabase } from '@/lib/supabaseClient';
    
export async function GET(req) {
    const { searchParams } = new URL(req.url);
    const codigoTurma = searchParams.get('turma');

    if (codigoTurma) {
        // Busca notas por turma
        const { data: alunosTurma, error: errorAlunos } = await supabase
            .from('alunos_turmas')
            .select('RA_aluno')
            .eq('codigo_turma', codigoTurma);

        if (errorAlunos) {
            return new Response(JSON.stringify({ error: errorAlunos.message }), { status: 500 });
        }

        const raList = alunosTurma.map(a => a.RA_aluno);

        const { data, error } = await supabase
            .from('notas')
            .select('id, RA_aluno, id_avaliacao, nota')
            .in('RA_aluno', raList);

        if (error) {
            return new Response(JSON.stringify({ error: error.message }), { status: 500 });
        }
        return new Response(JSON.stringify(data), { status: 200 });
    } else {
        // Busca notas do aluno logado
        const authHeader = req.headers.get('authorization');
        if (!authHeader) {
            return new Response(JSON.stringify({ error: 'Não autenticado.' }), { status: 401 });
        }
        const token = authHeader.replace('Bearer ', '');

        let ra;
        try {
            const { jwtVerify } = await import('jose');
            const { payload } = await jwtVerify(token, new TextEncoder().encode(process.env.JWT_SECRET));
            ra = payload.sub;
        } catch (e) {
            return new Response(JSON.stringify({ error: 'Token inválido.' }), { status: 401 });
        }

        const { data, error } = await supabase
            .from('notas')
            .select('nota, avaliacao:avaliacoes(nome, disciplina)')
            .eq('RA_aluno', ra);

        if (error) {
            return new Response(JSON.stringify({ error: error.message }), { status: 500 });
        }

        // Agrupa por disciplina
        const notasPorDisciplina = {};
        data.forEach(({ nota, avaliacao }) => {
            if (!avaliacao) return;
            const { disciplina, nome } = avaliacao;
            if (!notasPorDisciplina[disciplina]) notasPorDisciplina[disciplina] = [];
            notasPorDisciplina[disciplina].push({ avaliacao: nome, nota });
        });

        return new Response(JSON.stringify(notasPorDisciplina), { status: 200 });
    }
}

export async function POST(req) {
    const body = await req.json();
    const { data, error } = await supabase
        .from('notas')
        .insert([body])
        .select()
        .single();
    if (error) return new Response(JSON.stringify({ error: error.message }), { status: 400 });
    return new Response(JSON.stringify(data), { status: 201 });
}