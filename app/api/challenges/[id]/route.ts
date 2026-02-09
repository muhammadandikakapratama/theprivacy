import { NextResponse } from 'next/server'
import { getChallenge, getUserByUsername } from '@/lib/server-db'
import { cookies } from 'next/headers'

export async function GET(
    req: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params
    const levelId = parseInt(id)

    // Auth Check
    const cookieStore = await cookies()
    const session = cookieStore.get('user_session')

    if (!session) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const user = await getUserByUsername(session.value)
    if (!user) return NextResponse.json({ error: 'User not found' }, { status: 404 })

    // Progression Check
    if (levelId > 10 && !user.solvedLevels.includes(levelId - 1)) {
        return NextResponse.json({ error: 'Level is locked' }, { status: 403 })
    }

    const challenge = await getChallenge(levelId)

    if (!challenge) {
        return NextResponse.json({ error: 'Challenge not found' }, { status: 404 })
    }

    // NEVER return the flag to the client!
    const { flag, ...safeChallenge } = challenge
    return NextResponse.json(safeChallenge)
}
