// In-memory database for Vercel (serverless compatible)
let db: any = null

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

// Initial Data
const INITIAL_DATA = {
    users: [],
    challenges: [
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
}

// Database handlers
export const getDb = async () => {
    if (!db) {
        db = JSON.parse(JSON.stringify(INITIAL_DATA))
    }
    return db
}

export const saveDb = async (data: any) => {
    db = data
}

export const getUserByUsername = async (username: string): Promise<User | undefined> => {
    const database = await getDb()
    return database.users.find((u: any) => u.username === username)
}

export const getAllUsers = async (): Promise<User[]> => {
    const database = await getDb()
    return database.users
}

export const registerUser = async (username: string, passwordHash: string) => {
    const database = await getDb()
    if (database.users.find((u: any) => u.username === username)) return null

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
    database.users.push(newUser)
    await saveDb(database)
    return newUser
}

export const toggleUserBan = async (username: string) => {
    const database = await getDb()
    const userIndex = database.users.findIndex((u: any) => u.username === username)
    if (userIndex === -1) return false

    database.users[userIndex].isBanned = !database.users[userIndex].isBanned
    await saveDb(database)
    return database.users[userIndex].isBanned
}

export const updateLastSeen = async (username: string) => {
    const database = await getDb()
    const userIndex = database.users.findIndex((u: any) => u.username === username)
    if (userIndex === -1) return false

    database.users[userIndex].lastSeen = Date.now()
    await saveDb(database)
    return true
}

export const updateUserNetwork = async (username: string, data: { ip: string, city: string, country: string, countryCode: string }) => {
    const database = await getDb()
    const userIndex = database.users.findIndex((u: any) => u.username === username)
    if (userIndex === -1) return false

    database.users[userIndex].ipAddress = data.ip
    database.users[userIndex].city = data.city
    database.users[userIndex].country = data.country
    database.users[userIndex].countryCode = data.countryCode
    await saveDb(database)
    return true
}

export const updateUserProgress = async (username: string, levelId: number) => {
    const database = await getDb()
    const userIndex = database.users.findIndex((u: any) => u.username === username)
    if (userIndex === -1) return false

    if (!database.users[userIndex].solvedLevels.includes(levelId)) {
        database.users[userIndex].solvedLevels.push(levelId)
        await saveDb(database)
    }
    return true
}

export const getChallenge = async (id: number) => {
    const database = await getDb()
    return database.challenges.find((c: any) => c.id === id)
}
