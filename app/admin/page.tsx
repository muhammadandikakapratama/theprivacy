'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function AdminPage() {
    const [users, setUsers] = useState<any[]>([])
    const [error, setError] = useState('')
    const [isLoading, setIsLoading] = useState(true)
    const router = useRouter()

    const fetchAdminData = async () => {
        try {
            const res = await fetch('/api/admin/users')
            if (!res.ok) {
                if (res.status === 403) {
                    setError('ACCESS DENIED: You are not an administrator.')
                } else {
                    setError('Failed to connect to the administration server.')
                }
                return
            }
            const data = await res.json()
            setUsers(data)
        } catch (err) {
            setError('Critical connection error.')
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        fetchAdminData()

        // AUTO-REFRESH EVERY 5 SECONDS
        const pollInterval = setInterval(fetchAdminData, 5000)
        return () => clearInterval(pollInterval)
    }, [])

    const getStats = () => {
        const now = Date.now()
        const fiveMin = 5 * 60 * 1000
        const online = users.filter(u => u.lastSeen && (now - u.lastSeen) < fiveMin).length
        return {
            total: users.length,
            online,
            offline: users.length - online
        }
    }

    const stats = getStats()

    if (isLoading) {
        return (
            <div className="min-h-screen bg-black text-[#00ff00] flex flex-col items-center justify-center font-mono">
                <div className="text-4xl animate-pulse">BOOTING ADMIN_CON...</div>
                <div className="mt-4">SCANNING_BIOMETRICS_v2.0</div>
            </div>
        )
    }

    if (error) {
        return (
            <div className="min-h-screen bg-red-900 text-white flex flex-col items-center justify-center p-8 text-center font-mono">
                <h1 className="text-6xl font-black mb-4">STOP! 🚧</h1>
                <p className="text-xl bg-black px-4 py-2 border-2 border-white">{error}</p>

                <div className="mt-8 flex flex-col gap-4">
                    <Link href="/dashboard" className="classic-btn bg-white text-black font-bold py-2 uppercase">
                        Return to Dashboard
                    </Link>

                    <button
                        onClick={async () => {
                            await fetch('/api/auth/logout', { method: 'POST' });
                            router.push('/login');
                        }}
                        className="classic-btn bg-black text-red-500 border-red-500 font-bold py-2 uppercase"
                    >
                        [ Logout / Switch Account ]
                    </button>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-black text-[#00ff00] font-mono p-4 md:p-8">
            {/* ADMIN HEADER */}
            <div className="border-b-4 border-[#00ff00] pb-4 mb-8 flex justify-between items-end">
                <div>
                    <h1 className="text-4xl font-black italic tracking-tighter">
                        SYSTEM OVERLORD v4.20
                    </h1>
                    <p className="text-[10px] bg-[#00ff00] text-black px-1 font-bold inline-block">
                        CENTRAL INTELLIGENCE COMMAND CENTER
                    </p>
                </div>
                <div className="text-right">
                    <Link href="/dashboard" className="text-sm border border-[#00ff00] px-3 py-1 hover:bg-[#00ff00] hover:text-black transition-all">
                        [ EXIT_TO_DASHBOARD ]
                    </Link>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* SYSTEM STATS */}
                <div className="lg:col-span-1 space-y-6">
                    <div className="border border-[#00ff00] p-4 bg-[#00ff00]/5">
                        <h2 className="border-b border-[#00ff00] mb-4 font-black">SYSTEM_STATUS</h2>
                        <ul className="text-xs space-y-2">
                            <li className="flex justify-between">
                                <span>TOTAL_RECRUITS:</span>
                                <span className="font-black text-white">{stats.total}</span>
                            </li>
                            <li className="flex justify-between">
                                <span>ONLINE_NODES:</span>
                                <span className="font-black text-cyan-400">{stats.online}</span>
                            </li>
                            <li className="flex justify-between">
                                <span>OFFLINE_NODES:</span>
                                <span className="font-black text-gray-500">{stats.offline}</span>
                            </li>
                            <li className="flex justify-between">
                                <span>DATABASE:</span>
                                <span className="text-white">ONLINE_v2.1</span>
                            </li>
                            <li className="flex justify-between">
                                <span>ENCRYPTION:</span>
                                <span className="text-yellow-400">VULNERABLE (PLAINTEXT)</span>
                            </li>
                            <li className="flex justify-between">
                                <span>NATAS_MODS:</span>
                                <span className="text-white">ACTIVE (0-7)</span>
                            </li>
                        </ul>
                    </div>

                    <div className="border border-[#00ff00] p-4 bg-red-900/20">
                        <h2 className="border-b border-red-500 mb-4 font-black text-red-500 underline">WARNING_ZONE</h2>
                        <p className="text-[10px] leading-relaxed">
                            Detected 0 intrusion attempts in the last 24 hours.
                            The system is currently exposed.
                            Recommend "Hardening Protocol" immediately.
                        </p>
                    </div>
                </div>

                {/* USER PROGRESS TABLE */}
                <div className="lg:col-span-2 border border-[#00ff00] p-6 shadow-[0_0_20px_rgba(0,255,0,0.1)]">
                    <h2 className="text-xl font-bold mb-6 flex items-center justify-between gap-4">
                        <div className="flex items-center gap-4">
                            <span className="animate-pulse text-red-600">●</span>
                            ACTIVE_RECRUITS_LIST
                        </div>
                        <div className="text-[10px] flex items-center gap-2 opacity-50">
                            <div className="w-1.5 h-1.5 bg-[#00ff00] rounded-full animate-ping"></div>
                            LIVE_POLLING_ACTIVE (5s)
                        </div>
                    </h2>

                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="border-b-2 border-[#00ff00] text-xs uppercase opacity-70">
                                    <th className="pb-2 px-2">ID_IDENTIFIER</th>
                                    <th className="pb-2 px-2">SOURCE_LOC</th>
                                    <th className="pb-2 px-2">ACCESS_KEY</th>
                                    <th className="pb-2 px-2">MISSION_PROGRESS</th>
                                    <th className="pb-2 px-2">RANK_STATUS</th>
                                    <th className="pb-2 px-2 text-right">CONTROLS</th>
                                </tr>
                            </thead>
                            <tbody className="text-sm">
                                {users.map((u, i) => (
                                    <tr key={i} className={`border-b border-[#00ff00]/20 hover:bg-[#00ff00]/10 ${u.isBanned ? 'bg-red-900/10' : ''}`}>
                                        <td className="py-4 px-2 font-black text-white flex items-center gap-2">
                                            <div className={`w-2 h-2 rounded-full ${(Date.now() - (u.lastSeen || 0)) < (5 * 60 * 1000) ? 'bg-cyan-400 animate-pulse' : 'bg-gray-700'}`}></div>
                                            {u.username}
                                            {u.isBanned && <span className="bg-red-600 text-white text-[8px] px-1 animate-pulse">BANNED</span>}
                                        </td>
                                        <td className="py-4 px-2 text-[10px] text-gray-400">
                                            <div className="flex items-center gap-1">
                                                <span className="bg-gray-800 px-1 text-white">{u.countryCode}</span>
                                                <span className="font-bold text-gray-200">{u.city}</span>
                                            </div>
                                            <div className="mt-1 opacity-70">
                                                {u.country} / <span className="text-cyan-600">{u.ipAddress}</span>
                                            </div>
                                        </td>
                                        <td className="py-4 px-2 font-mono text-xs text-yellow-500">
                                            {u.username.toLowerCase() === 'admin' ? '********' : u.password}
                                        </td>
                                        <td className="py-4 px-2">
                                            <div className="flex flex-wrap gap-1">
                                                {u.solvedLevels.length > 0 ? (
                                                    u.solvedLevels.map((lvl: number) => (
                                                        <span key={lvl} className={`text-[9px] px-1 font-bold ${u.isBanned ? 'bg-gray-600 text-gray-300' : 'bg-[#00ff00] text-black'}`}>
                                                            LVL_{lvl - 10}
                                                        </span>
                                                    ))
                                                ) : (
                                                    <span className="text-gray-600 italic">No missions completed.</span>
                                                )}
                                            </div>
                                        </td>
                                        <td className="py-4 px-2 italic text-xs">
                                            {u.isBanned ? 'EXCOMMUNICADO' :
                                                u.solvedLevels.length >= 8 ? 'Master Hack0r' :
                                                    u.solvedLevels.length >= 4 ? 'Elite Apprentice' :
                                                        u.solvedLevels.length > 0 ? 'Fresh Recruit' : 'Silent Observer'}
                                        </td>
                                        <td className="py-4 px-2 text-right">
                                            {u.username.toLowerCase() !== 'admin' && (
                                                <button
                                                    onClick={async (e) => {
                                                        const btn = e.currentTarget;
                                                        btn.disabled = true;
                                                        btn.style.opacity = '0.5';

                                                        const res = await fetch('/api/admin/users/ban', {
                                                            method: 'POST',
                                                            headers: { 'Content-Type': 'application/json' },
                                                            body: JSON.stringify({ username: u.username })
                                                        });

                                                        if (res.ok) {
                                                            const data = await res.json();
                                                            const newUsers = users.map(user =>
                                                                user.username === u.username ? { ...user, isBanned: data.isBanned } : user
                                                            );
                                                            setUsers(newUsers);
                                                        }

                                                        btn.disabled = false;
                                                        btn.style.opacity = '1';
                                                    }}
                                                    className={`text-[10px] font-bold px-2 py-1 border transition-all ${u.isBanned ? 'bg-green-600 text-black border-black hover:bg-green-400' : 'bg-red-600 text-white border-white hover:bg-black'}`}
                                                >
                                                    {u.isBanned ? '[ UNBAN_PLAYER ]' : '[ BAN_PLAYER ]'}
                                                </button>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {/* LIVE FEED SIMULATION */}
            <div className="mt-12 bg-black border-t border-[#00ff00] pt-4 opacity-50 text-[9px] font-mono leading-tight">
                <p>[{new Date().toISOString()}] SYSLOG: Admin accessed the main dashboard.</p>
                <p>[{new Date().toISOString()}] SYSLOG: Refreshing recruit database records...</p>
                <p>[{new Date().toISOString()}] SYSLOG: Security level set to ADVISORY_ORANGE.</p>
            </div>
        </div>
    )
}
