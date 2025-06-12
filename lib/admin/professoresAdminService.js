import { supabase } from '../supabaseAdmin.js'
import bcrypt from 'bcrypt'

export async function cadastrarProfessor(email, senha) {
    const {data : existente} = await supabase
        .from('professores')
        .select('*')
        .eq('email', email)
        .single()
    if (existente) {
        throw new Error('Este e-mail já está cadastrado.')
    }

    const senhaHash = await bcrypt.hash(senha, 10)

    const { erro } = await supabase
        .from('professores')
        .insert({ email: email, senha: senhaHash})
    if (erro) {
        throw new Error('Erro ao cadastrar professor. Tente novamente mais tarde.')
    }
}

export async function autenticarProfessor(email, senha) {
    const {data : professor} = await supabase
        .from('professores')
        .select('*')
        .eq('email', email)
        .single()
    if (!professor) {
        throw new Error('E-mail ou senha incorretos.')
    }

    const senhaCorreta = await bcrypt.compare(senha, professor.senha)
    if (!senhaCorreta) {
        throw new Error('E-mail ou senha incorretos.')
    }

    return { id: professor.id, email: professor.email, nome: professor.nome }
}

export async function buscarProfessorPorEmail(email) {
  const { data: professor, error } = await supabase
    .from('professores')
    .select('*')
    .eq('email', email)
    .single();

  if (error || !professor) return null;
  return professor;
}
