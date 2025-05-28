import { supabase } from './db.js'
import bcrypt from 'bcrypt'

export async function cadastrarProfessor(nome, email, senha) {
    const {data : existente} = await supabase
        .from('professores')
        .select('*')
        .eq('email', email)
        .single()
    if (existente) {
        throw new Error('Este e-mail já está cadastrado.')
    }

    if (senha.length < 8) {
        throw new Error('A senha deve ter pelo menos 8 caracteres.')
    }

    const senhaHash = await bcrypt.hash(senha, 10)

    const { erro } = await supabase
        .from('professores')
        .insert({ nome: nome, email: email, senha: senhaHash})
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
