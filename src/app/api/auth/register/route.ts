import { NextRequest, NextResponse } from 'next/server'
import { registerUser } from '@/lib/mockAuth'

export async function POST(request: NextRequest) {
  try {
    const { fullName, email, whatsapp, birthDate, password } = await request.json()

    if (!fullName || !email || !whatsapp || !birthDate || !password) {
      return NextResponse.json(
        { error: 'Todos os campos são obrigatórios' },
        { status: 400 }
      )
    }

    const { user, token } = await registerUser({
      fullName,
      email,
      whatsapp,
      birthDate,
      password
    })

    const response = NextResponse.json({ user })
    
    // Set HTTP-only cookie
    response.cookies.set('auth-token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 // 24 hours
    })

    return response
  } catch (error: any) {
    console.error('Register error:', error)
    return NextResponse.json(
      { error: error.message || 'Erro interno do servidor' },
      { status: 500 }
    )
  }
}