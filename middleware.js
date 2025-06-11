import { NextResponse } from 'next/server'
import { jwtVerify } from 'jose'

const secret = new TextEncoder().encode(process.env.JWT_SECRET)

const rotasPublicas = [
    '/login', 
    '/login/professor', 
    '/login/aluno',
    '/favicon.ico', 
    '/_next', 
    '/styles', 
    '/images',
    '/api'
]
const rotasProfessor = ['/etapa', '/turmas', '/dashboard-prof']
const rotasAluno = ['/menu-aluno']

export async function middleware(request) {
    if (rotasPublicas.some((path) => request.nextUrl.pathname.startsWith(path))) {
        return NextResponse.next()
    }

    const token = request.cookies.get('auth_token')?.value
    
    if (!token) {
        return NextResponse.redirect(new URL('/login', request.url))
    }
    
    try {
        const { payload } = await jwtVerify(token, secret)

        if (
            rotasProfessor.some((rota) => request.nextUrl.pathname.startsWith(rota)) &&
            payload.tipo !== 'professor'
        ) {
            return NextResponse.redirect(new URL('/login/professor', request.url))
        }

        if (
            rotasAluno.some((rota) => request.nextUrl.pathname.startsWith(rota)) &&
            payload.tipo !== 'aluno'
        ) {
            return NextResponse.redirect(new URL('/login/aluno', request.url))
        }

        return NextResponse.next()
    } catch (err) {
        console.error('Erro ao verificar token:', err)
        return NextResponse.redirect(new URL('/login', request.url))
    }
}