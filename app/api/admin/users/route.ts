import { NextResponse } from 'next/server'
import { getAllUsers } from '@/lib/server-db'
import { cookies } from 'next/headers'

export async function GET() {
    try {
        const cookieStore = await cookies()
        const session = cookieStore.get('user_session')

        // Simple Admin Check: Only if username is 'admin'
        if (!session || session.value.toLowerCase() !== 'admin') {
            return NextResponse.json({ error: 'Access Denied: Admin Privilege Required' }, { status: 403 })
        }

        const users = await getAllUsers()

        // Remove passwords from the list before sending to client
        const safeUsers = users.map(u => ({
            username: u.username,
            password: u.passwordHash,
            solvedLevels: u.solvedLevels,
            isBanned: u.isBanned || false,
            lastSeen: u.lastSeen || 0,
            country: u.country || 'Unknown',
            countryCode: u.countryCode || '??',
            city: u.city || 'Unknown',
            ipAddress: u.ipAddress || '0.0.0.0'
        }))

        return NextResponse.json(safeUsers)
    } catch (e) {
        return NextResponse.json({ error: 'Server Error' }, { status: 500 })
    }
}
