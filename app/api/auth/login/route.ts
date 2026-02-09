import { NextResponse } from 'next/server'
import { getUserByUsername } from '@/lib/server-db'

export async function POST(req: Request) {
    try {
        const { username, password } = await req.json()

        const user = await getUserByUsername(username)

        if (!user || user.passwordHash !== password) {
            return NextResponse.json({ error: 'Invalid username or password' }, { status: 401 })
        }

        if (user.isBanned) {
            return NextResponse.json({ error: 'YOUR ACCOUNT HAS BEEN BANNED BY SYSTEM OVERLORD.' }, { status: 403 })
        }

        const response = NextResponse.json({ success: true, message: 'Login successful' })
        response.cookies.set('user_session', username, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax', // Changed from 'strict' for better redirect compatibility
            maxAge: 60 * 60 * 24, // 1 day
            path: '/'
        })

        return response
    } catch (e) {
        return NextResponse.json({ error: 'Server error' }, { status: 500 })
    }
}
