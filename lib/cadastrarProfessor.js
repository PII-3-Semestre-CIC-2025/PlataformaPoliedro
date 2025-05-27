import { supabase } from '@/lib/supabaseClient'

export async function cadastrarProfessor({ email, senha }) {

  const { data, error: signUpError } = await supabase.auth.signUp({
    email,
    password: senha,
  })

  if (signUpError) {
    throw new Error('Erro ao cadastrar usuário: ' + signUpError.message)
  }

  const userId = data?.user?.id
  if (!userId) throw new Error('Usuário criado, mas ID não retornado.')

    
    console.log('userId retornado pelo signUp:', userId)

    const session = await supabase.auth.getSession()
    console.log('auth.uid() do usuário logado:', session.data.session?.user?.id)


  const { error: insertError } = await supabase.from('professores').insert([
    {
      email,
      user_id: userId,
    },
  ])

  if (insertError) {
    throw new Error('Erro ao adicionar na tabela professores: ' + insertError.message)
  }

  return true
}
