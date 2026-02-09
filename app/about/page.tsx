'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'

export default function AboutPage() {
    return (
        <main className="min-h-screen p-4 md:p-8">
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <div className="flex items-center justify-between mb-12">
                    <Link href="/">
                        <motion.button
                            whileHover={{ x: -5 }}
                            className="text-cyan-400 hover:text-cyan-300 flex items-center gap-2"
                        >
                            <span>←</span> <span>Back to Home</span>
                        </motion.button>
                    </Link>

                    <Link href="/">
                        <motion.h1
                            whileHover={{ scale: 1.05 }}
                            className="text-2xl md:text-3xl font-bold tracking-wider text-glow cursor-pointer"
                        >
                            [ NULLROOM ]
                        </motion.h1>
                    </Link>
                </div>

                {/* Content */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="cyber-border bg-black/50 backdrop-blur-sm rounded-lg overflow-hidden"
                >
                    {/* Terminal header */}
                    <div className="flex items-center gap-2 px-6 py-4 border-b border-cyan-500/30 bg-black/30">
                        <div className="w-3 h-3 rounded-full bg-red-500"></div>
                        <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                        <div className="w-3 h-3 rounded-full bg-green-500"></div>
                        <span className="ml-4 text-cyan-500/70 text-sm">about.txt</span>
                    </div>

                    {/* Content */}
                    <div className="p-8 space-y-8">
                        <div>
                            <h2 className="text-2xl font-bold text-cyan-400 mb-4">What is NULLROOM?</h2>
                            <p className="text-green-400 leading-relaxed">
                                NULLROOM is a cybersecurity challenge platform designed for ethical hackers,
                                security enthusiasts, and anyone interested in learning about web security,
                                cryptography, and exploitation techniques in a safe, legal environment.
                            </p>
                        </div>

                        <div>
                            <h2 className="text-2xl font-bold text-cyan-400 mb-4">How It Works</h2>
                            <div className="space-y-4 text-green-400">
                                <div className="flex gap-4">
                                    <span className="text-purple-400 font-bold">01.</span>
                                    <p>
                                        <span className="text-cyan-400 font-bold">Register</span> - Create your
                                        account and join the community of hackers
                                    </p>
                                </div>
                                <div className="flex gap-4">
                                    <span className="text-purple-400 font-bold">02.</span>
                                    <p>
                                        <span className="text-cyan-400 font-bold">Choose Challenges</span> - Select
                                        from various difficulty levels and categories
                                    </p>
                                </div>
                                <div className="flex gap-4">
                                    <span className="text-purple-400 font-bold">03.</span>
                                    <p>
                                        <span className="text-cyan-400 font-bold">Solve & Learn</span> - Find
                                        vulnerabilities, exploit them, and capture the flag
                                    </p>
                                </div>
                                <div className="flex gap-4">
                                    <span className="text-purple-400 font-bold">04.</span>
                                    <p>
                                        <span className="text-cyan-400 font-bold">Climb the Ranks</span> - Earn
                                        points, badges, and compete on the leaderboard
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div>
                            <h2 className="text-2xl font-bold text-cyan-400 mb-4">Challenge Categories</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="border border-cyan-500/30 rounded p-4">
                                    <h3 className="text-purple-400 font-bold mb-2">🌐 Web Security</h3>
                                    <p className="text-green-400/70 text-sm">
                                        XSS, SQL Injection, CSRF, and more web vulnerabilities
                                    </p>
                                </div>
                                <div className="border border-cyan-500/30 rounded p-4">
                                    <h3 className="text-purple-400 font-bold mb-2">🔐 Cryptography</h3>
                                    <p className="text-green-400/70 text-sm">
                                        Encryption, hashing, and cryptographic challenges
                                    </p>
                                </div>
                                <div className="border border-cyan-500/30 rounded p-4">
                                    <h3 className="text-purple-400 font-bold mb-2">💾 Binary Exploitation</h3>
                                    <p className="text-green-400/70 text-sm">
                                        Buffer overflows, reverse engineering, and binary analysis
                                    </p>
                                </div>
                                <div className="border border-cyan-500/30 rounded p-4">
                                    <h3 className="text-purple-400 font-bold mb-2">🗄️ Database Security</h3>
                                    <p className="text-green-400/70 text-sm">
                                        SQL injection, NoSQL attacks, and database exploitation
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div>
                            <h2 className="text-2xl font-bold text-cyan-400 mb-4">Rules & Ethics</h2>
                            <div className="space-y-2 text-green-400">
                                <p>• All challenges are designed for educational purposes only</p>
                                <p>• Do not attempt to hack the platform itself</p>
                                <p>• Respect other users and the community</p>
                                <p>• Share knowledge, but don't spoil solutions for others</p>
                                <p>• Use your skills ethically and responsibly</p>
                            </div>
                        </div>

                        <div className="pt-6 border-t border-cyan-500/20">
                            <Link href="/login">
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="w-full px-8 py-4 bg-cyan-500/20 border border-cyan-500 text-cyan-400 rounded hover:bg-cyan-500/30 transition-all hover:shadow-[0_0_20px_rgba(6,182,212,0.5)]"
                                >
                                    [ START YOUR JOURNEY ]
                                </motion.button>
                            </Link>
                        </div>
                    </div>
                </motion.div>

                {/* Footer info */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="mt-8 text-center text-cyan-500/50 text-sm"
                >
                    <p>// Breach. Learn. Conquer.</p>
                    <p className="mt-2">// NULLROOM © 2024 - All rights reserved</p>
                </motion.div>
            </div>
        </main>
    )
}
