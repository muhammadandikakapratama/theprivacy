import { NextResponse } from 'next/server'
import { getUserByUsername } from '@/lib/server-db'
import { cookies, headers } from 'next/headers'

export async function GET() {
    const cookieStore = await cookies()
    const session = cookieStore.get('user_session')

    if (!session) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { updateLastSeen, updateUserNetwork } = await import('@/lib/server-db')
    await updateLastSeen(session.value)

    // Detect IP and Location real-time
    try {
        const headerList = await headers()
        const forwarded = headerList.get('x-forwarded-for')
        const ip = forwarded ? forwarded.split(',')[0] : '127.0.0.1'

        // Only fetch if not localhost for efficiency
        if (ip !== '127.0.0.1' && ip !== '::1' && !ip.startsWith('192.168.') && !ip.startsWith('10.')) {
            const geoRes = await fetch(`http://ip-api.com/json/${ip}`)
            const geoData = await geoRes.json()
            if (geoData.status === 'success') {
                await updateUserNetwork(session.value, {
                    ip: geoData.query,
                    city: geoData.city,
                    country: geoData.country,
                    countryCode: geoData.countryCode
                })
            }
        }
    } catch (err) {
        console.error('Geo detect failed', err)
    }

    const user = await getUserByUsername(session.value)
    if (!user) return NextResponse.json({ error: 'User not found' }, { status: 404 })

    if (user.isBanned) {
        const res = NextResponse.json({ error: 'Banned' }, { status: 403 })
        res.cookies.delete('user_session') // Force logout
        return res
    }

    return NextResponse.json({
        username: user.username,
        solvedLevels: user.solvedLevels,
        isBanned: user.isBanned
    })
}
