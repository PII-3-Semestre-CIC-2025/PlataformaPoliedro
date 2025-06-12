import { NextResponse } from 'next/server';
import { jwtVerify } from 'jose';
import bcrypt from 'bcrypt';
import { supabase } from '@/lib/supabaseAdmin';

const secret = new TextEncoder().encode(process.env.JWT_SECRET);

export async function POST(request) {
  const { token, novaSenha } = await request.json();

  try {
    const { payload } = await jwtVerify(token, secret);
    const senhaHash = await bcrypt.hash(novaSenha, 10);

    if (payload.tipo === 'aluno') {
      const { error } = await supabase
        .from('alunos')
        .update({ senha: senhaHash })
        .eq('RA', payload.id);
      if (error) throw error;
    } else if (payload.tipo === 'professor') {
      const { error } = await supabase
        .from('professores')
        .update({ senha: senhaHash })
        .eq('id', payload.id);
      if (error) throw error;
    } else {
      return NextResponse.json({ error: 'Tipo de usuário inválido.' }, { status: 400 });
    }

    return NextResponse.json({ message: 'Senha redefinida com sucesso!' });
  } catch (err) {
    return NextResponse.json({ error: 'Token inválido ou expirado.' }, { status: 400 });
  }
}