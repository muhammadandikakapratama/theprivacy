import { MongoClient, Db, Collection } from 'mongodb'

// Types
export type User = {
    username: string
    passwordHash: string
    solvedLevels: number[]
    isBanned?: boolean
    lastSeen?: number
    country?: string
    countryCode?: string
    city?: string
    ipAddress?: string
}

export type Challenge = {
    id: number
    name: string
    category: string
    difficulty: string
    points: number
    description: string
    flag: string
}

// MongoDB connection
let client: MongoClient | null = null
let db: Db | null = null

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/wargame'
const DB_NAME = 'wargame'

async function connectDB() {
    if (db) return db

    if (!client) {
        client = new MongoClient(MONGODB_URI)
        await client.connect()
    }

    db = client.db(DB_NAME)
    return db
}

// Initial challenges data
const INITIAL_CHALLENGES = [
    {
        id: 10,
        name: 'Natas Level 0',
        category: 'Wargame',
        difficulty: 'Easy',
        points: 50,
        description: 'Welcome to the Wargame! Peek at the guts of the page to find the password!',
        flag: 'gt7uJ6as6SMvSBa367BrSvl7bi8Bsc6s'
    },
    {
        id: 11,
        name: 'Natas Level 1',
        category: 'Wargame',
        difficulty: 'Easy',
        points: 75,
        description: 'Right-click and shortcuts are blocked! Can you still find the password in the source code?',
        flag: 'ZluruAthQ6ueS98An2Nf69Dxl9YuxA16'
    },
    {
        id: 12,
        name: 'Natas Level 2',
        category: 'Wargame',
        difficulty: 'Easy',
        points: 100,
        description: 'There are files hidden in /files/ directory. Can you find the secret file?',
        flag: 'sFyviHpg6th9yW3OTL0fsi23mo6Sifp6'
    },
    {
        id: 13,
        name: 'Natas Level 3',
        category: 'Wargame',
        difficulty: 'Medium',
        points: 150,
        description: 'Check robots.txt for hidden paths!',
        flag: 'Z92bk7Y79ve78Asd6789Asd789QwErTy'
    }
]

// Initialize database with challenges
async function initializeDB() {
    const database = await connectDB()
    const challenges = database.collection('challenges')

    const count = await challenges.countDocuments()
    if (count === 0) {
        await challenges.insertMany(INITIAL_CHALLENGES)
    }
}

// User functions
export const getUserByUsername = async (username: string): Promise<User | null> => {
    const database = await connectDB()
    const users = database.collection<User>('users')
    return await users.findOne({ username })
}

export const getAllUsers = async (): Promise<User[]> => {
    const database = await connectDB()
    const users = database.collection<User>('users')
    return await users.find({}).toArray()
}

export const registerUser = async (username: string, passwordHash: string): Promise<User | null> => {
    const database = await connectDB()
    const users = database.collection<User>('users')

    const existing = await users.findOne({ username })
    if (existing) return null

    const newUser: User = {
        username,
        passwordHash,
        solvedLevels: [],
        isBanned: false,
        lastSeen: Date.now(),
        country: 'Detecting...',
        countryCode: '??',
        city: 'Detecting...',
        ipAddress: '0.0.0.0'
    }

    await users.insertOne(newUser as any)
    return newUser
}

export const toggleUserBan = async (username: string): Promise<boolean> => {
    const database = await connectDB()
    const users = database.collection<User>('users')

    const user = await users.findOne({ username })
    if (!user) return false

    const newBanStatus = !user.isBanned
    await users.updateOne({ username }, { $set: { isBanned: newBanStatus } })
    return newBanStatus
}

export const updateLastSeen = async (username: string): Promise<boolean> => {
    const database = await connectDB()
    const users = database.collection<User>('users')

    const result = await users.updateOne(
        { username },
        { $set: { lastSeen: Date.now() } }
    )
    return result.modifiedCount > 0
}

export const updateUserNetwork = async (
    username: string,
    data: { ip: string; city: string; country: string; countryCode: string }
): Promise<boolean> => {
    const database = await connectDB()
    const users = database.collection<User>('users')

    const result = await users.updateOne(
        { username },
        {
            $set: {
                ipAddress: data.ip,
                city: data.city,
                country: data.country,
                countryCode: data.countryCode
            }
        }
    )
    return result.modifiedCount > 0
}

export const updateUserProgress = async (username: string, levelId: number): Promise<boolean> => {
    const database = await connectDB()
    const users = database.collection<User>('users')

    const user = await users.findOne({ username })
    if (!user) return false

    if (!user.solvedLevels.includes(levelId)) {
        await users.updateOne(
            { username },
            { $push: { solvedLevels: levelId } as any }
        )
    }
    return true
}

export const getChallenge = async (id: number): Promise<Challenge | null> => {
    const database = await connectDB()
    await initializeDB()
    const challenges = database.collection<Challenge>('challenges')
    return await challenges.findOne({ id })
}

// Legacy compatibility
export const getDb = async () => {
    const database = await connectDB()
    await initializeDB()
    return {
        users: await getAllUsers(),
        challenges: await database.collection('challenges').find({}).toArray()
    }
}

export const saveDb = async (data: any) => {
    // Not needed with MongoDB, kept for compatibility
    return true
}
