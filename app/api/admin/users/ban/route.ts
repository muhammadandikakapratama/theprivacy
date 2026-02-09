import { NextResponse } from 'next/server'
import { toggleUserBan } from '@/lib/server-db'
import { cookies } from 'next/headers'

export async function POST(req: Request) {
    try {
        const { username } = await req.json()
        const cookieStore = await cookies()
        const session = cookieStore.get('user_session')

        // Admin Auth Check
        if (!session || session.value.toLowerCase() !== 'admin') {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 403 })
        }

        if (!username || username.toLowerCase() === 'admin') {
            return NextResponse.json({ error: 'Invalid operation' }, { status: 400 })
        }

        const isBanned = await toggleUserBan(username)
        return NextResponse.json({ success: true, isBanned })
    } catch (e) {
        return NextResponse.json({ error: 'Server error' }, { status: 500 })
    }
}
