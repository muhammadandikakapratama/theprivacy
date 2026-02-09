'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'

const topPlayers = [
    { rank: 1, username: 'CyberNinja', score: 5420, badges: 8 },
    { rank: 2, username: 'GhostProtocol', score: 4850, badges: 6 },
    { rank: 3, username: 'PixelHacker', score: 4200, badges: 7 },
    { rank: 4, username: 'CodeBreaker', score: 3950, badges: 5 },
    { rank: 5, username: 'NullPointer', score: 3450, badges: 4 },
]

export default function LeaderboardPage() {
    return (
        <main className="min-h-screen bg-yellow-100 p-4 md:p-8 font-serif">
            <div className="max-w-4xl mx-auto space-y-8">

                {/* Header */}
                <div className="flex items-center justify-between border-b-4 border-black pb-6">
                    <Link href="/dashboard">
                        <motion.button whileHover={{ x: -10 }} className="brutal-btn bg-white uppercase italic text-sm">
                            ← DASHBOARD
                        </motion.button>
                    </Link>
                    <h1 className="text-4xl font-black uppercase italic tracking-tighter">HIGH SCORES</h1>
                </div>

                {/* Podium / Top Rank */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-end mb-12">
                    {/* Rank 2 */}
                    <motion.div initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="order-2 md:order-1 h-64 brutal-card bg-blue-300 flex flex-col justify-end p-6 text-center">
                        <div className="text-5xl font-black mb-2">2</div>
                        <div className="font-black uppercase italic truncate">{topPlayers[1].username}</div>
                        <div className="text-sm font-bold uppercase">{topPlayers[1].score} PTS</div>
                    </motion.div>
                    {/* Rank 1 */}
                    <motion.div initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.2 }} className="order-1 md:order-2 h-80 brutal-card bg-yellow-400 flex flex-col justify-end p-6 text-center transform scale-110 relative z-10">
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white border-4 border-black p-4 text-4xl">👑</div>
                        <div className="text-7xl font-black mb-2">1</div>
                        <div className="font-black uppercase italic truncate">{topPlayers[0].username}</div>
                        <div className="text-lg font-black uppercase">{topPlayers[0].score} PTS</div>
                    </motion.div>
                    {/* Rank 3 */}
                    <motion.div initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.1 }} className="order-3 h-56 brutal-card bg-red-400 flex flex-col justify-end p-6 text-center">
                        <div className="text-4xl font-black mb-2">3</div>
                        <div className="font-black uppercase italic truncate">{topPlayers[2].username}</div>
                        <div className="text-sm font-bold uppercase">{topPlayers[2].score} PTS</div>
                    </motion.div>
                </div>

                {/* Table */}
                <div className="brutal-card bg-white overflow-hidden p-0">
                    <div className="bg-black text-white p-4 font-black uppercase tracking-widest text-sm flex justify-between">
                        <span>Rank // Username</span>
                        <span>Score Protocol</span>
                    </div>
                    <div className="divide-y-4 divide-black">
                        {topPlayers.map((player, i) => (
                            <motion.div
                                key={player.rank}
                                initial={{ x: -20, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                transition={{ delay: i * 0.1 }}
                                className={`p-6 flex items-center justify-between hover:bg-gray-50 transition-colors ${player.rank === 1 ? 'bg-yellow-50' : ''}`}
                            >
                                <div className="flex items-center gap-6">
                                    <span className="text-3xl font-black italic w-8">#{player.rank}</span>
                                    <span className="font-black uppercase italic text-xl tracking-tighter">{player.username}</span>
                                </div>
                                <div className="text-right">
                                    <div className="text-2xl font-black italic">{player.score.toLocaleString()}</div>
                                    <div className="text-[10px] font-bold uppercase opacity-50 tracking-widest">{player.badges} BADGES COLLECTED</div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>

                <div className="text-center pt-8">
                    <p className="font-black uppercase italic opacity-30 text-xs">
                        Records updated every 60 seconds // Last sync: Just now
                    </p>
                </div>
            </div>
        </main>
    )
}
