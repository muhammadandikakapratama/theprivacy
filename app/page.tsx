'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function LandingPage() {
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const router = useRouter()

    useEffect(() => {
        fetch('/api/auth/me')
            .then(res => {
                if (res.ok) setIsLoggedIn(true)
            })
            .catch(() => { })
    }, [])

    return (
        <main className="min-h-screen bg-[#c0c0c0] flex flex-col items-center justify-center p-4 font-mono">
            {/* RETRO WINDOW */}
            <div className="bg-[#c0c0c0] border-2 border-white border-r-gray-800 border-b-gray-800 p-1 max-w-2xl w-full shadow-[15px_15px_60px_rgba(0,0,0,0.4)]">

                {/* TITLE BAR */}
                <div className="bg-gradient-to-r from-[#000080] to-[#0808a8] text-white text-[14px] px-2 py-1 font-bold flex justify-between items-center mb-1">
                    <div className="flex items-center gap-2">
                        <span>🌎</span>
                        <span className="tracking-wider">NATAS_ENTRY_GATEWAY_v1.0.exe</span>
                    </div>
                </div>

                <div className="bg-white border-2 border-gray-800 border-t-white border-l-white p-8 space-y-8 text-center">

                    <h1 className="text-4xl md:text-5xl comic-title font-black text-blue-900 border-b-4 border-dashed border-gray-200 pb-6 uppercase italic">
                        FUN RIDDLES <br />
                        <span className="text-red-600 text-2xl">X-TREME EDITION</span>
                    </h1>

                    <div className="flex justify-center pointer-events-none">
                        <motion.div
                            animate={{ rotate: [0, 10, -10, 0] }}
                            transition={{ duration: 4, repeat: Infinity }}
                            className="text-9xl"
                        >
                            🔐
                        </motion.div>
                    </div>

                    <div className="space-y-4 max-w-md mx-auto">
                        <p className="text-lg font-black italic text-gray-800 leading-tight">
                            "The #1 Backend-Powered Simulator for Security Enthusiasts!"
                        </p>
                        <p className="text-xs font-bold text-gray-500 uppercase tracking-tighter">
                            Warning: Your progress is now persistently recorded on our mainframe. <br />
                            No guest access allowed. Identity verification required.
                        </p>
                    </div>

                    <div className="flex flex-col items-center gap-4 py-8 border-t-2 border-gray-100">
                        {isLoggedIn ? (
                            <Link href="/dashboard" className="w-full">
                                <button className="w-full classic-btn bg-green-600 text-white px-12 py-6 text-3xl font-black shadow-[8px_8px_0px_rgba(0,0,0,1)] hover:bg-green-700 animate-pulse transition-all">
                                    [ CONTINUE MISSION ]
                                </button>
                            </Link>
                        ) : (
                            <div className="flex flex-col gap-4 w-full">
                                <Link href="/login" className="w-full">
                                    <button className="w-full classic-btn bg-red-600 text-white px-12 py-6 text-3xl font-black shadow-[8px_8px_0px_rgba(0,0,0,1)] hover:bg-black active:shadow-none active:translate-x-1 active:translate-y-1 transition-all">
                                        [ INITIATE BOOTUP ]
                                    </button>
                                </Link>
                                <div className="text-[10px] font-bold text-gray-400">
                                    Awaiting authentication handshake...
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                <div className="bg-[#c0c0c0] p-2 flex justify-between items-center text-[9px] font-bold text-gray-600 uppercase">
                    <span>Build: 2026.02.09.v2</span>
                    <span className="animate-pulse text-green-700">● SERVER_ONLINE</span>
                    <span>Verified by Antigravity OS</span>
                </div>
            </div>

            <footer className="mt-8 text-[9px] font-bold text-center opacity-40 uppercase space-y-1 text-gray-700">
                <p>Running on High-Performance JSON-DB Engine</p>
                <p>Persistent Lore & Mission Tracking Activated</p>
            </footer>

            {/* DECORATIVE ELEMENTS */}
            <div className="fixed top-10 left-10 text-4xl opacity-10 pointer-events-none">⭐</div>
            <div className="fixed bottom-10 right-10 text-4xl opacity-10 pointer-events-none">⭐</div>
        </main>
    )
}
