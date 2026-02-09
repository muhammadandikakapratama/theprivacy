// Script to create admin user in MongoDB
import { MongoClient } from 'mongodb'

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/wargame'
const DB_NAME = 'wargame'

async function createAdmin() {
    const client = new MongoClient(MONGODB_URI)

    try {
        await client.connect()
        console.log('✅ Connected to MongoDB')

        const db = client.db(DB_NAME)
        const users = db.collection('users')

        // Check if admin already exists
        const existing = await users.findOne({ username: 'admin' })
        if (existing) {
            console.log('⚠️  Admin user already exists!')
            return
        }

        // Create admin user
        const adminUser = {
            username: 'admin',
            passwordHash: 'admin123', // Change this password!
            solvedLevels: [10, 11, 12, 13], // All levels solved
            isBanned: false,
            lastSeen: Date.now(),
            country: 'Indonesia',
            countryCode: 'ID',
            city: 'Jakarta',
            ipAddress: '127.0.0.1'
        }

        await users.insertOne(adminUser)
        console.log('🎉 Admin user created successfully!')
        console.log('   Username: admin')
        console.log('   Password: admin123')
        console.log('⚠️  CHANGE THE PASSWORD AFTER FIRST LOGIN!')

    } catch (error) {
        console.error('❌ Error:', error)
    } finally {
        await client.close()
    }
}

createAdmin()
