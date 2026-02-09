import { NextResponse } from 'next/server'
import { MongoClient } from 'mongodb'

export async function GET() {
    const MONGODB_URI = process.env.MONGODB_URI

    if (!MONGODB_URI) {
        return NextResponse.json({ error: 'MongoDB not configured' }, { status: 500 })
    }

    const client = new MongoClient(MONGODB_URI)

    try {
        await client.connect()
        const db = client.db('wargame')
        const users = db.collection('users')

        // Check if admin already exists
        const existing = await users.findOne({ username: 'admin' })
        if (existing) {
            return NextResponse.json({
                message: 'Admin already exists',
                username: 'admin',
                note: 'Use existing admin account'
            })
        }

        // Create admin user
        const adminUser = {
            username: 'admin',
            passwordHash: 'admin123', // Simple password for demo
            solvedLevels: [10, 11, 12, 13],
            isBanned: false,
            lastSeen: Date.now(),
            country: 'Indonesia',
            countryCode: 'ID',
            city: 'Jakarta',
            ipAddress: '127.0.0.1'
        }

        await users.insertOne(adminUser)

        return NextResponse.json({
            success: true,
            message: 'Admin user created successfully!',
            credentials: {
                username: 'admin',
                password: 'admin123'
            },
            warning: 'Change password after first login!'
        })

    } catch (error: any) {
        return NextResponse.json({
            error: 'Failed to create admin',
            details: error.message
        }, { status: 500 })
    } finally {
        await client.close()
    }
}
