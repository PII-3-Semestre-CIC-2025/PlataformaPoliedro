export async function GET() {
  return new Response(null, {
    status: 302,
    headers: {
      'Set-Cookie': 'auth_token=; Path=/; HttpOnly; Max-Age=0; SameSite=Lax',
      'Location': '/login'
    }
  })
}