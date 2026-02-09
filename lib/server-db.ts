import fs from 'fs'
import path from 'path'
import { getStore } from '@netlify/blobs'

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

// Initial Data Utility
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

// Data Handlers (ASYNC)
export const getDb = async () => {
    // Use Netlify Blobs only if on Netlify
    if (process.env.NETLIFY) {
        try {
            const store = getStore('ep-database')
            let data = await store.get('db', { type: 'json' })
            if (!data) {
                await store.setJSON('db', INITIAL_DATA)
                return INITIAL_DATA
            }
            return data
        } catch (error) {
            console.error('Netlify Blobs error, falling back to local storage:', error)
            // Fall through to local file system if Blobs fail
        }
    }

    // Local Development (File System)
    const DB_FILE = path.join(process.cwd(), 'data', 'database.json')
    if (!fs.existsSync(DB_FILE)) {
        const dataDir = path.join(process.cwd(), 'data')
        if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir)
        fs.writeFileSync(DB_FILE, JSON.stringify(INITIAL_DATA, null, 2))
        return INITIAL_DATA
    }
    const data = fs.readFileSync(DB_FILE, 'utf-8')
    return JSON.parse(data)
}

export const saveDb = async (data: any) => {
    if (process.env.NETLIFY) {
        try {
            const store = getStore('ep-database')
            await store.setJSON('db', data)
            return
        } catch (error) {
            console.error('Netlify Blobs save error, falling back to local storage:', error)
            // Fall through to local file system if Blobs fail
        }
    }

    const DB_FILE = path.join(process.cwd(), 'data', 'database.json')
    fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2))
}

export const getUserByUsername = async (username: string): Promise<User | undefined> => {
    const db = await getDb()
    return db.users.find((u: any) => u.username === username)
}

export const getAllUsers = async (): Promise<User[]> => {
    const db = await getDb()
    return db.users
}

export const registerUser = async (username: string, passwordHash: string) => {
    const db = await getDb()
    // Manual check to avoid race conditions if many register at once
    if (db.users.find((u: any) => u.username === username)) return null

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
    db.users.push(newUser)
    await saveDb(db)
    return newUser
}

export const toggleUserBan = async (username: string) => {
    const db = await getDb()
    const userIndex = db.users.findIndex((u: any) => u.username === username)
    if (userIndex === -1) return false

    db.users[userIndex].isBanned = !db.users[userIndex].isBanned
    await saveDb(db)
    return db.users[userIndex].isBanned
}

export const updateLastSeen = async (username: string) => {
    const db = await getDb()
    const userIndex = db.users.findIndex((u: any) => u.username === username)
    if (userIndex === -1) return false

    db.users[userIndex].lastSeen = Date.now()
    await saveDb(db)
    return true
}

export const updateUserNetwork = async (username: string, data: { ip: string, city: string, country: string, countryCode: string }) => {
    const db = await getDb()
    const userIndex = db.users.findIndex((u: any) => u.username === username)
    if (userIndex === -1) return false

    db.users[userIndex].ipAddress = data.ip
    db.users[userIndex].city = data.city
    db.users[userIndex].country = data.country
    db.users[userIndex].countryCode = data.countryCode
    await saveDb(db)
    return true
}

export const updateUserProgress = async (username: string, levelId: number) => {
    const db = await getDb()
    const userIndex = db.users.findIndex((u: any) => u.username === username)
    if (userIndex === -1) return false

    if (!db.users[userIndex].solvedLevels.includes(levelId)) {
        db.users[userIndex].solvedLevels.push(levelId)
        await saveDb(db)
    }
    return true
}

export const getChallenge = async (id: number) => {
    const db = await getDb()
    return db.challenges.find((c: any) => c.id === id)
}
