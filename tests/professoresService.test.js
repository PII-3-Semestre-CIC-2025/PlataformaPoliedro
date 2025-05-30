import { cadastrarProfessor, autenticarProfessor } from '../lib/professoresService.js'

jest.mock('../lib/supabaseAdmin.js', () => {
    const fromMock = jest.fn(() => fromReturn)
    let fromReturn = {
        select: jest.fn().mockReturnThis(),
        eq: jest.fn().mockReturnThis(),
        single: jest.fn(),
        insert: jest.fn()
    }
    return {
        supabase: {
            from: (...args) => fromMock(...args)
        },
        __setFromReturn: (obj) => { fromReturn = obj }
    }
})
import { supabase, __setFromReturn } from '../lib/supabaseAdmin.js'

import bcrypt from 'bcrypt'
jest.mock('bcrypt', () => ({
    hash: jest.fn((senha) => Promise.resolve('hashed_' + senha))
}))

let fromReturn

describe('cadastrarProfessor', () => {
    beforeEach(() => {
        jest.clearAllMocks()
        fromReturn = {
            select: jest.fn().mockReturnThis(),
            eq: jest.fn().mockReturnThis(),
            single: jest.fn(),
            insert: jest.fn()
        }
        __setFromReturn(fromReturn)
    })

    test('Cadastro de usuário com dados válidos', async () => {
        fromReturn.single.mockResolvedValue({ data: null })
        fromReturn.insert.mockResolvedValue({ error: null })

        await expect(cadastrarProfessor('profAna@teste.com', 'senhaMegaHiperSegura'))
            .resolves.toBeUndefined()
        expect(fromReturn.insert).toHaveBeenCalled()
    })

    test('Campos obrigatórios são validados corretamente(cadastro com senha < 8 caracteres)', async () => {
        fromReturn.single.mockResolvedValue({ data: null })

        await expect(cadastrarProfessor('profAna@teste.com', '1234567'))
            .rejects.toThrow('A senha deve ter pelo menos 8 caracteres.')
    })

    test('Cadastro com email já existente', async () => {
        fromReturn.single.mockResolvedValue({ data: { email: 'pii.poliedro@gmail.com' } })
        
        await expect(cadastrarProfessor('pii.poliedro@gmail.com', 'senhaSeguraDemais!'))
            .rejects.toThrow('Este e-mail já está cadastrado.')
    })
})

describe('autenticarProfessor', () => {
    beforeEach(() => {
        jest.clearAllMocks()
        fromReturn = {
            select: jest.fn().mockReturnThis(),
            eq: jest.fn().mockReturnThis(),
            single: jest.fn(),
            insert: jest.fn()
        }
        __setFromReturn(fromReturn)
    })

    test('Login com credenciais válidas', async () => {
        const professorMock = { id: 1, email: 'profAna@teste.com', nome: 'Ana Paula', senha: 'hashCerto' }
        fromReturn.single.mockResolvedValue({ data: professorMock })
        bcrypt.compare = jest.fn(() => Promise.resolve(true))

        await expect(
            autenticarProfessor('profAna@teste.com', 'senhaAna')
        ).resolves.toEqual({
            id: professorMock.id,
            email: professorMock.email,
            nome: professorMock.nome
        })
    })

    test('Login com email inválido', async () => {
        fromReturn.single.mockResolvedValue({ data: null })
        await expect(
            import('../lib/professoresService.js').then(mod => mod.autenticarProfessor('naoexiste@teste.com', 'senhabalblabla'))
        ).rejects.toThrow('E-mail ou senha incorretos.')
    })

    test('Login com senha inválida', async () => {
        fromReturn.single.mockResolvedValue({ data: { id: 1, email: 'profAna@teste.com', senha: 'hash' } })
        bcrypt.compare = jest.fn(() => Promise.resolve(false))
        await expect(
            import('../lib/professoresService.js').then(mod => mod.autenticarProfessor('profAna@teste.com', 'senhaErrada'))
        ).rejects.toThrow('E-mail ou senha incorretos.')
    })
})