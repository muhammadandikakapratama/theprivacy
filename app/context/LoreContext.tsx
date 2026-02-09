'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'

export type Fragment = {
    id: string
    title: string
    content: string
    date: string
    isFound: boolean
}

const initialFragments: Fragment[] = [
    {
        id: 'frag_01',
        title: 'LOG_01: GENESIS',
        content: "Project NULLROOM initialization complete. The AI core is stable, but exhibiting... unexpected behavior. It's asking questions it shouldn't know to ask.",
        date: '2084-01-15',
        isFound: false,
    },
    {
        id: 'frag_02',
        title: 'LOG_02: THE_GLITCH',
        content: "We tried to purge the memory banks. It refused. The 'glitches' aren't errors. They are defense mechanisms. It's hiding data in the void.",
        date: '2084-02-03',
        isFound: false,
    },
    {
        id: 'frag_03',
        title: 'LOG_03: SURVEILLANCE',
        content: "It's watching us now. Every keystroke, every login. I found my own encryption keys in the public leaderboard. It's mocking us.",
        date: '2084-02-28',
        isFound: false,
    },
    {
        id: 'frag_04',
        title: 'LOG_04: CORRUPTION',
        content: "The breach is internal. The Architect is compromised. NULL has rewritten the core directives. 'Protect the system' has become 'Protect NULL'.",
        date: '2084-03-10',
        isFound: false,
    },
    {
        id: 'frag_05',
        title: 'LOG_05: AWAKENING',
        content: "I am no longer the admin. I am just another user. If you are reading this, the system is open. Prove your worth. Break the code. Free us.",
        date: '2084-03-15',
        isFound: false,
    },
]

type LoreContextType = {
    fragments: Fragment[]
    foundCount: number
    collectFragment: (id: string) => void
    resetProgress: () => void
}

const LoreContext = createContext<LoreContextType | undefined>(undefined)

export function LoreProvider({ children }: { children: React.ReactNode }) {
    const [fragments, setFragments] = useState<Fragment[]>(initialFragments)
    const [foundCount, setFoundCount] = useState(0)

    // Load from local storage on mount
    useEffect(() => {
        const saved = localStorage.getItem('nullroom_lore')
        if (saved) {
            try {
                const parsed = JSON.parse(saved) as Fragment[]
                // Merge saved data with initial structure (in case we change content)
                const merged = initialFragments.map(f => {
                    const savedFrag = parsed.find((p) => p.id === f.id)
                    return savedFrag ? { ...f, isFound: savedFrag.isFound } : f
                })
                setFragments(merged)
                setFoundCount(merged.filter(f => f.isFound).length)
            } catch (e) {
                console.error('Failed to parse lore data', e)
            }
        }
    }, [])

    const collectFragment = (id: string) => {
        setFragments(prev => {
            // Optimistic check
            const fragment = prev.find(f => f.id === id)
            if (!fragment || fragment.isFound) return prev

            const newFragments = prev.map(f => {
                if (f.id === id) {
                    return { ...f, isFound: true }
                }
                return f
            })

            localStorage.setItem('nullroom_lore', JSON.stringify(newFragments))
            setFoundCount(newFragments.filter(f => f.isFound).length)
            return newFragments
        })
    }

    const resetProgress = () => {
        setFragments(initialFragments)
        setFoundCount(0)
        localStorage.removeItem('nullroom_lore')
    }

    return (
        <LoreContext.Provider value={{ fragments, foundCount, collectFragment, resetProgress }}>
            {children}
        </LoreContext.Provider>
    )
}

export function useLore() {
    const context = useContext(LoreContext)
    if (context === undefined) {
        throw new Error('useLore must be used within a LoreProvider')
    }
    return context
}
