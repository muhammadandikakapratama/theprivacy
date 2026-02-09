import { NextResponse } from 'next/server'
import { getAllUsers } from '@/lib/server-db'

export async function GET() {
    try {
        const users = await getAllUsers()
        const now = Date.now()
        const fiveMinutes = 5 * 60 * 1000

        // Count users active in last 5 minutes
        const onlineCount = users.filter(u =>
            u.lastSeen && (now - u.lastSeen) < fiveMinutes
        ).length

        return NextResponse.json({
            online: onlineCount,
            total: users.length
        })
    } catch (error) {
        return NextResponse.json({
            online: 0,
            total: 0
        }, { status: 500 })
    }
}
