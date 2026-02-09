import { NextResponse } from 'next/server'
import { getChallenge, updateUserProgress } from '@/lib/server-db'
import { cookies } from 'next/headers'

export async function POST(
    req: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params
    const levelId = parseInt(id)
    const { flag } = await req.json()

    const cookieStore = await cookies()
    const session = cookieStore.get('user_session')

    if (!session) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const challenge = await getChallenge(levelId)
    if (!challenge) {
        return NextResponse.json({ error: 'Challenge not found' }, { status: 404 })
    }

    if (challenge.flag === flag) {
        // Sync progress to server DATABASE
        await updateUserProgress(session.value, levelId)

        return NextResponse.json({
            success: true,
            message: 'Correct!',
            points: challenge.points
        })
    }

    return NextResponse.json({ success: false, message: 'Wrong! Try harder.' })
}
