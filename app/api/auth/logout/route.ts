import { NextResponse } from 'next/server'

export async function POST() {
    const response = NextResponse.json({
        success: true,
        message: 'Logged out successfully'
    })

    // Delete session token
    response.cookies.delete('user_session')

    return response
}
