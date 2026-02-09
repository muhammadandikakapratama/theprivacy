'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

const LEVELS = [
    { id: 10, name: 'Level 0: Peek at Guts' },
    { id: 11, name: 'Level 1: Keyboard Lock' },
    { id: 12, name: 'Level 2: Folder Leak' },
    { id: 13, name: 'Level 3: Robot Traps' },
    { id: 14, name: 'Level 4: Origin Spoof' },
    { id: 15, name: 'Level 5: Cookie Jar' },
    { id: 16, name: 'Level 6: Secret Files' },
    { id: 17, name: 'Level 7: Path Voyager' },
]

export default function DashboardPage() {
    const [onlineUsers, setOnlineUsers] = useState(12)
    const [user, setUser] = useState<{ username: string, solvedLevels: number[] } | null>(null)
    const [isLoading, setIsLoading] = useState(true)
    const router = useRouter()

    useEffect(() => {
        const interval = setInterval(() => {
            setOnlineUsers(prev => prev + (Math.random() > 0.5 ? 1 : -1))
        }, 5000)

        // Fetch user progress and detect real IP
        const fetchUser = async () => {
            try {
                const res = await fetch('/api/auth/me')
                if (!res.ok) {
                    router.push('/login')
                    return
                }
                const data = await res.json()
                setUser(data)

                // REAL-TIME IP DETECTION (Client Side Pulse)
                try {
                    console.log('--- SYSTEM OVERLORD: INITIATING NETWORK TRACE ---')
                    let geoRes = await fetch('https://ipapi.co/json/')
                    let geoData = await geoRes.json()

                    if (!geoData.ip) {
                        // Fallback to second provider
                        geoRes = await fetch('https://ip-api.com/json/')
                        geoData = await geoRes.json()
                    }

                    if (geoData.ip || geoData.query) {
                        const payload = {
                            ip: geoData.ip || geoData.query,
                            city: geoData.city,
                            country: geoData.country_name || geoData.country,
                            countryCode: geoData.country_code || geoData.countryCode || geoData.country
                        }

                        await fetch('/api/auth/report-network', {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify(payload)
                        });
                        console.log('--- SYSTEM OVERLORD: NETWORK TRACE COMPLETE ---', payload.ip)
                    }
                } catch (geoErr) {
                    console.error('Failed to detect public IP', geoErr)
                }

            } catch (err) {
                console.error('Failed to fetch user')
            } finally {
                setIsLoading(false)
            }
        }

        fetchUser()
        return () => clearInterval(interval)
    }, [router])

    const isLevelAccessible = (levelId: number) => {
        if (levelId === 10) return true
        const prevLevelId = levelId - 1
        return user?.solvedLevels.includes(prevLevelId) || false
    }

    if (isLoading) {
        return (
            <div className="min-h-screen bg-white flex flex-col items-center justify-center font-black uppercase italic">
                <div className="text-4xl animate-bounce">Loading...</div>
                <div className="text-xs">Connecting to Secure Database</div>
            </div>
        )
    }

    return (
        <div className="max-w-4xl mx-auto bg-white border border-black p-4 mt-8">
            {/* AMATEUR HEADER */}
            <header className="text-center border-b border-black pb-4 mb-6">
                <h1 className="text-4xl comic-title text-black">
                    FUN RIDDLES!
                </h1>
                <p className="text-sm font-bold">A collection of homemade amateur riddles</p>
                <div className="mt-2 flex items-center justify-center gap-4">
                    <div className="bg-black text-white px-4 py-1 text-xs font-bold uppercase italic shadow-[4px_4px_0px_rgba(255,0,0,1)]">
                        Logged in as: {user?.username}
                    </div>
                    <button
                        onClick={async () => {
                            await fetch('/api/auth/logout', { method: 'POST' });
                            router.push('/login');
                        }}
                        className="text-[10px] bg-red-600 text-white font-bold px-2 py-0.5 border border-black hover:bg-black transition-all"
                    >
                        [ LOGOUT ]
                    </button>
                </div>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {/* LEFT SIDEBAR - AMATEUR STYLE */}
                <aside className="border border-black p-2 space-y-4 h-fit">
                    <div className="bg-black text-white p-1 text-xs font-bold text-center">NAVIGATION</div>
                    <ul className="text-sm space-y-2 font-bold">
                        <li><Link href="/" className="classic-link">Home Page</Link></li>
                        <li><a href="#" className="classic-link">How to Play</a></li>
                        <li><Link href="/leaderboard" className="classic-link">High Scores</Link></li>
                        <li><a href="#" className="classic-link">Discussion Forum</a></li>
                        <li><button onClick={async () => { await fetch('/api/auth/logout', { method: 'POST' }); router.push('/login'); }} className="classic-link text-red-600">LOGOUT</button></li>
                    </ul>

                    <div className="border-t border-black pt-4 text-center">
                        <p className="text-xs uppercase font-bold">Users Online:</p>
                        <div className="font-mono text-2xl border border-black mt-1 bg-gray-100">
                            {onlineUsers}
                        </div>
                    </div>

                    <div className="text-center pt-4 text-2xl">
                        <span>🚧</span>
                    </div>
                </aside>

                {/* MAIN CONTENT */}
                <section className="md:col-span-3 border border-black p-4">
                    <div className="bg-gray-200 p-1 mb-4 text-center font-bold italic text-sm border-b border-black">
                        Last updated on: Feb 09, 2001
                    </div>

                    <div className="text-center space-y-4">
                        <h2 className="text-xl font-bold uppercase underline">Test Your Intelligence!</h2>
                        <p className="text-sm">Please select a category of riddles you want to guess:</p>

                        <div className="flex flex-col gap-4 mt-4">
                            <Link href="/challenge/10">
                                <button className="w-full classic-btn bg-red-600 text-white font-black py-8 hover:bg-red-700 text-2xl uppercase italic">
                                    [ CLICK HERE TO START NATAS LEVEL 0 ]
                                </button>
                            </Link>

                            <div className="p-4 border border-black bg-gray-50 text-sm">
                                <p className="font-bold mb-2 underline uppercase">List of Available Levels:</p>
                                <div className="space-y-2">
                                    {LEVELS.map((level) => {
                                        const accessible = isLevelAccessible(level.id)
                                        const solved = user?.solvedLevels.includes(level.id)

                                        return (
                                            <div key={level.id} className="flex items-center justify-between border-b border-black/10 pb-1">
                                                <div className="flex items-center gap-2">
                                                    <span className="text-xs">{solved ? '✅' : accessible ? '🔓' : '🔒'}</span>
                                                    {accessible ? (
                                                        <Link href={`/challenge/${level.id}`} className="classic-link font-bold">
                                                            {level.name}
                                                        </Link>
                                                    ) : (
                                                        <span className="text-gray-400 font-bold italic line-through decoration-black">
                                                            {level.name}
                                                        </span>
                                                    )}
                                                </div>
                                                {solved && <span className="text-[10px] bg-green-100 px-1 border border-black font-black uppercase">SOLVED</span>}
                                                {!accessible && <span className="text-[10px] text-red-600 font-black italic">LOCKED</span>}
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>
                        </div>

                        <div className="mt-8 border-t border-black pt-4">
                            <p className="comic-title text-2xl font-bold text-blue-800 animate-pulse">Good Luck!</p>
                        </div>
                    </div>

                    {/* AMATEUR NEWS */}
                    <div className="mt-8 border border-black p-2 bg-[#ffffcc]">
                        <div className="font-bold text-xs mb-1">LATEST ANNOUNCEMENTS:</div>
                        <div className="marquee-box">
                            <div className="marquee-text font-bold text-xs uppercase">
                                *** NEW UPDATE: Backend system now active! Your mission is being recorded... *** &nbsp;&nbsp;&nbsp;
                                *** Welcome {user?.username} to the Natas Simulation ***
                            </div>
                        </div>
                    </div>
                </section>
            </div>

            {/* FOOTER */}
            <footer className="mt-6 border-t border-black pt-4 text-center">
                <div className="text-xs font-bold space-x-4 mb-2">
                    <a href="#" className="classic-link">About Us</a>
                    <a href="#" className="classic-link">Contact Us</a>
                    <a href="#" className="classic-link">Guestbook</a>
                </div>
                <p className="text-[10px] font-bold opacity-60">
                    This site was created by Regandev (c) 2000-2001
                </p>
                <div className="mt-2 opacity-30 text-xs text-center">
                    🔒 Protected Sector
                </div>
            </footer>
        </div>
    )
}
