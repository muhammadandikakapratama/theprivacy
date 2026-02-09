import { NextResponse } from 'next/server'
import { registerUser, getUserByUsername } from '@/lib/server-db'

export async function POST(req: Request) {
    try {
        const { username, password } = await req.json()

        if (!username || !password) {
            return NextResponse.json({ error: 'Missing fields' }, { status: 400 })
        }

        if (await getUserByUsername(username)) {
            return NextResponse.json({ error: 'Username already exists' }, { status: 400 })
        }

        // In a real app, use bcrypt to hash. Here we use plaintext for simplicity of simulation.
        const user = await registerUser(username, password)

        if (!user) {
            return NextResponse.json({ error: 'Registration failed' }, { status: 500 })
        }

        const response = NextResponse.json({ success: true, message: 'User registered' })
        response.cookies.set('user_session', username, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            maxAge: 60 * 60 * 24, // 1 day
            path: '/'
        })

        return response
    } catch (e) {
        return NextResponse.json({ error: 'Server error' }, { status: 500 })
    }
}
