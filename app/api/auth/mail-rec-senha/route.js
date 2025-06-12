import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { SignJWT } from 'jose';
import { buscarAlunoPorEmail } from '@/lib/admin/alunosAdminService';
import { buscarProfessorPorEmail } from '@/lib/admin/professoresAdminService';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const secret = new TextEncoder().encode(process.env.JWT_SECRET);

export async function POST(request) {
  const { email } = await request.json();

  const professor = await buscarProfessorPorEmail(email);

  if (!professor) {
    return NextResponse.json({ error: 'Usuário não encontrado.' }, { status: 404 });
  }

  const tipo = 'professor';
  const id = professor.id;

  // Gerar token JWT com jose
  const token = await new SignJWT({ email, tipo, id })
    .setProtectedHeader({ alg: 'HS256' })
    .setExpirationTime('1h')
    .sign(secret);

  const resetLink = `${process.env.NEXT_PUBLIC_BASE_URL}/redefinir-senha/${token}`;

  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'Recuperação de senha',
    html: `<p>Para redefinir sua senha, clique no link abaixo:</p>
           <a href="${resetLink}">${resetLink}</a>
           <p>Se não foi você, ignore este e-mail.</p>`,
  });

  return NextResponse.json({ message: 'E-mail enviado com sucesso!' });
}