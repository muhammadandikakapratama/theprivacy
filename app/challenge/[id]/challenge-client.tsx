'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

interface ChallengeClientProps {
    id: string
}

type Challenge = {
    id: number
    name: string
    difficulty: string
    category: string
    description: string
}

export default function ChallengeClient({ id }: ChallengeClientProps) {
    const [challenge, setChallenge] = useState<Challenge | null>(null)
    const [loading, setLoading] = useState(true)
    const [input, setInput] = useState('')
    const [output, setOutput] = useState<string[]>([])
    const [isLocked, setIsLocked] = useState(false)
    const [isSolved, setIsSolved] = useState(false)

    // CUSTOM CHALLENGE STATES
    const [isCookieLoggedIn, setIsCookieLoggedIn] = useState(false)
    const [secretInput, setSecretInput] = useState('')
    const [traversalPage, setTraversalPage] = useState('')

    const router = useRouter()

    useEffect(() => {
        // Level 5 Cookie Listener
        const checkCookie = () => {
            if (document.cookie.includes('loggedin=1')) {
                setIsCookieLoggedIn(true)
            } else {
                if (!document.cookie.includes('loggedin=')) {
                    document.cookie = "loggedin=0; path=/;"
                }
                setIsCookieLoggedIn(false)
            }
        }

        // Level 7 URL Param Listener
        const checkParams = () => {
            const params = new URLSearchParams(window.location.search)
            const page = params.get('page')
            if (page) setTraversalPage(page)
        }

        checkCookie()
        checkParams()
        const cookieInterval = setInterval(checkCookie, 2000)

        // Natas Level 1: ADVANCED PROTECTION (Visual Only on Client)
        const blockCtx = (e: MouseEvent) => {
            if (id === '11') {
                e.preventDefault()
                setOutput(prev => [...prev.slice(-15), ' [!!!] SECURITY ALERT: RIGHT-CLICK IS COMPLETELY FORBIDDEN!'])
            }
        }

        const blockKeys = (e: KeyboardEvent) => {
            if (
                e.key === 'F12' ||
                (e.ctrlKey && e.shiftKey && e.key === 'I') ||
                (e.ctrlKey && e.key === 'u') ||
                (e.ctrlKey && e.key === 'U')
            ) {
                e.preventDefault()
                setOutput(prev => [...prev.slice(-15), ' [!!!] CHEAT DETECTION TRIGGERED!'])
                alert("ACCESS DENIED: Developer tools are prohibited!")
            }
        }

        window.addEventListener('contextmenu', blockCtx)
        if (id === '11') window.addEventListener('keydown', blockKeys)

        async function loadChallenge() {
            setLoading(true)
            try {
                // Check user session first
                const meRes = await fetch('/api/auth/me')
                if (!meRes.ok) {
                    router.push('/login')
                    return
                }
                const userData = await meRes.json()

                // REAL-TIME IP DETECTION (Client Side Report)
                try {
                    const geoRes = await fetch('https://ipapi.co/json/')
                    const geoData = await geoRes.json()
                    if (geoData.ip) {
                        fetch('/api/auth/report-network', {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify(geoData)
                        });
                    }
                } catch (e) { }
                if (userData.solvedLevels.includes(Number(id))) {
                    setIsSolved(true)
                }

                const res = await fetch(`/api/challenges/${id}`)
                if (!res.ok) {
                    if (res.status === 403) setIsLocked(true)
                    throw new Error('Access Denied')
                }
                const data = await res.json()
                setChallenge(data)
                setOutput(['System ready...', `CONNECTED: NATAS_ENGINE_v2.0`, `MODE: SERVER_SECURE`, `LOADED: ${data.name}`])
            } catch (err) {
                setOutput(prev => [...prev, 'ERROR: Communication with command center lost.'])
            } finally {
                setLoading(false)
            }
        }
        loadChallenge()

        return () => {
            clearInterval(cookieInterval)
            window.removeEventListener('contextmenu', blockCtx)
            window.removeEventListener('keydown', blockKeys)
        }
    }, [id, router])

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        const cmd = input.trim()
        const secret = secretInput.trim()

        // Special Logic for Level 6 (Secret hunting)
        if (id === '16' && secret) {
            if (secret === "FOXTROT_UNIFORM_CHARLIE_KAPPA") {
                setOutput(prev => [...prev.slice(-15), "Correct secret! The password for natas7 is: YuxA16ZluruAthQ6iX69d678asa90Dxl"])
                return
            } else {
                setOutput(prev => [...prev.slice(-15), "Wrong secret! Access denied."])
                return
            }
        }

        if (!cmd) return
        setOutput(prev => [...prev.slice(-15), `>> ${cmd}`])
        setInput('')

        try {
            const res = await fetch(`/api/challenges/${id}/submit`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ flag: cmd })
            })
            const data = await res.json()

            if (data.success) {
                setOutput(prev => [...prev.slice(-15), '[!!!] ACCESS GRANTED!', `POINTS: +${data.points}`, 'LEVEL SOLVED! NEXT LEVEL UNLOCKED ON SERVER.'])
                setIsSolved(true)
            } else {
                setOutput(prev => [...prev.slice(-15), '[???] INVALID CREDENTIALS! ACCESS DENIED.'])
            }
        } catch (err) {
            setOutput(prev => [...prev.slice(-15), 'System synchronization error...'])
        }
    }

    if (loading) return (
        <div className="min-h-screen bg-black text-[#00ff00] flex flex-col items-center justify-center font-mono animate-pulse">
            <div className="text-xl">Establishing Secure Connection...</div>
            <div className="text-[10px] mt-4">Bypassing proxy... Authenticating session...</div>
        </div>
    )

    if (isLocked) return (
        <main className="min-h-screen bg-white flex items-center justify-center p-4">
            <div className="max-w-md w-full border-4 border-black p-8 bg-black text-white text-center space-y-4 shadow-[10px_10px_0px_rgba(255,0,0,1)]">
                <h1 className="text-4xl font-black uppercase text-red-600">Locked Sector! 🔒</h1>
                <p className="font-bold italic">
                    "Intrusion detected! You are trying to skip levels.
                    Solve the previous mission first, recruit."
                </p>
                <div className="pt-4">
                    <Link href="/dashboard">
                        <button className="classic-btn px-8 py-2 font-black uppercase bg-white text-black">
                            Abort Mission
                        </button>
                    </Link>
                </div>
            </div>
        </main>
    )

    return (
        <main className="min-h-screen bg-white p-4">
            <div className="max-w-4xl mx-auto border border-black p-4 space-y-4">

                {/* SIMPLE HEADER */}
                <div className="flex justify-between items-end border-b border-black pb-2">
                    <div className="flex items-center gap-2">
                        <h1 className="text-xl font-bold uppercase italic">Solving: {challenge?.name || `ID #${id}`}</h1>
                        {isSolved && <span className="bg-green-600 text-white text-[10px] px-2 py-0.5 font-bold animate-pulse">MISSION_SUCCESS</span>}
                    </div>
                    <Link href="/dashboard" className="classic-link text-xs font-bold">[ Abort to Dashboard ]</Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* PUZZLE BOX */}
                    <div className="border border-black p-4 space-y-4 h-fit">
                        <div className="bg-black text-white px-2 py-0.5 text-xs font-bold flex justify-between uppercase">
                            <span>Sector Objective:</span>
                            {id === '15' && <span>SYSTEM_COOKIE: {isCookieLoggedIn ? 'ADMIN' : 'GUEST'}</span>}
                        </div>
                        <div className="p-4 bg-gray-50 border border-black italic font-bold text-center border-dashed relative min-h-[120px] flex items-center justify-center">
                            {/* LEVEL 5 */}
                            {id === '15' ? (
                                isCookieLoggedIn ? (
                                    <div className="text-blue-700 bg-blue-50 p-2 border border-blue-200">
                                        "IDENTIFIED: ADMIN ACCESS GRANTED.<br />
                                        NEXT_LVL_KEY: YuxA16ZluruAthQ6iX69d678asa90Dxl"
                                    </div>
                                ) : (
                                    <div className="text-red-600">
                                        "{challenge?.description}"
                                    </div>
                                )
                            ) : id === '16' ? (
                                /* LEVEL 6 */
                                <div className="space-y-4 w-full">
                                    <p className="text-sm">"{challenge?.description}"</p>
                                    <div className="flex flex-col gap-2">
                                        <input
                                            type="text"
                                            placeholder="Enter Secret Found on Server"
                                            className="border-2 border-black p-2 font-mono text-center text-xs bg-black text-green-400 outline-none"
                                            value={secretInput}
                                            onChange={(e) => setSecretInput(e.target.value)}
                                        />
                                        <button
                                            onClick={handleSubmit}
                                            className="classic-btn py-1 text-[10px] bg-red-600 text-white font-black"
                                        >
                                            REVEAL PASSWORD
                                        </button>
                                    </div>
                                </div>
                            ) : id === '17' ? (
                                /* LEVEL 7 */
                                <div className="w-full text-left font-mono text-xs">
                                    <div className="bg-black text-[#00ff00] p-4 border border-gray-600 shadow-inner">
                                        <p className="mb-2 underline italic text-gray-400">REMOTE_FS_VOYAGER_v1.0</p>
                                        {traversalPage === '/etc/natas_webpass/natas8' ? (
                                            <div className="space-y-1">
                                                <p className="text-white border-b border-white/20 pb-1">Reading: {traversalPage}</p>
                                                <p className="text-yellow-400 mt-2 font-black text-lg">AthQ6iX69d678asa90Dxl9YuxA16Zluru</p>
                                            </div>
                                        ) : (
                                            <div className="text-red-500 italic">
                                                {traversalPage ? `SYSTEM_ERR: Access to file "${traversalPage}" denied.` : 'STDBY: Awaiting file path... (hint: ?page=...)'}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ) : (
                                /* DEFAULT */
                                <p className="text-sm leading-relaxed">"{challenge?.description}"</p>
                            )}

                            {/* LEVEL 0 HIDDEN FLAG */}
                            {id === '10' && (
                                <div style={{ display: 'none' }}>
                                    <span data-secret="gt7uJ6as6SMvSBa367BrSvl7bi8Bsc6s"></span>
                                </div>
                            )}
                        </div>

                        <div className="text-[10px] uppercase font-bold text-gray-400 flex justify-between border-t border-black/10 pt-2">
                            <span>LVL: {challenge?.difficulty} // CAT: {challenge?.category}</span>
                            {id === '17' && <span className="text-red-600">VULN: PATH_TRAVERSAL</span>}
                        </div>

                        <div className="space-y-4">
                            <div className="flex gap-2">
                                {Number(id) > 10 && (
                                    <Link href={`/challenge/${Number(id) - 1}`} className="flex-1">
                                        <button className="w-full classic-btn py-4 text-xs w-full uppercase font-black">{'<<'} Sector {Number(id) - 11}</button>
                                    </Link>
                                )}
                                {Number(id) >= 10 && Number(id) < 17 && (
                                    <Link href={isSolved ? `/challenge/${Number(id) + 1}` : '#'} className={`flex-1 ${!isSolved ? 'cursor-not-allowed opacity-50' : ''}`}>
                                        <button
                                            disabled={!isSolved}
                                            className="w-full classic-btn py-4 text-xs w-full uppercase font-black disabled:hover:bg-gray-200"
                                            onClick={() => !isSolved && alert('You must extract the flag from this sector before proceeding!')}
                                        >
                                            Next Mission {'>>'}
                                        </button>
                                    </Link>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* TERMINAL BOX */}
                    <div className="border-4 border-black flex flex-col h-[400px] bg-black text-[#00ff00] font-mono text-sm p-4 shadow-[inset_0_0_20px_rgba(0,255,0,0.2)]">
                        <div className="flex-1 overflow-y-auto space-y-1 mb-4 scrollbar-thin scrollbar-thumb-green-900 pr-2">
                            <div className="text-[10px] opacity-50 border-b border-[#00ff00]/20 mb-2 pb-1 uppercase italic font-bold">NATAS_OS_v4.20.0 Terminal Interface</div>
                            {output.map((line, i) => (
                                <div key={i} className="leading-tight">{line}</div>
                            ))}
                        </div>
                        <form onSubmit={handleSubmit} className="flex gap-2 border-t-2 border-[#00ff00]/50 pt-3">
                            <span className="animate-pulse">{'>'}</span>
                            <input
                                type="text"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                className="bg-transparent outline-none flex-1 border-none text-[#00ff00] placeholder:text-[#00ff00]/20"
                                placeholder={isSolved ? "MISSION_COMPLETED" : "Awaiting input..."}
                                disabled={isSolved}
                                autoFocus
                                autoComplete="off"
                            />
                        </form>
                    </div>
                </div>

                <div className="text-center pt-4 opacity-30 text-[9px] font-bold uppercase tracking-widest italic">
                    All activities are being logged in the master server database.
                </div>
            </div>
        </main>
    )
}
