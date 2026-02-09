import { NextResponse } from 'next/server'
import { updateUserNetwork } from '@/lib/server-db'
import { cookies } from 'next/headers'

export async function POST(req: Request) {
    try {
        const cookieStore = await cookies()
        const session = cookieStore.get('user_session')

        if (!session) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
        }

        const data = await req.json()

        // Data format from client: { ip, city, country, country_code }
        await updateUserNetwork(session.value, {
            ip: data.ip,
            city: data.city,
            country: data.country_name || data.country,
            countryCode: data.country_code || data.countryCode
        })

        return NextResponse.json({ success: true })
    } catch (e) {
        return NextResponse.json({ error: 'Failed to update network data' }, { status: 500 })
    }
}
