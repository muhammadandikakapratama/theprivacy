'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function WelcomePage() {
    const [textIndex, setTextIndex] = useState(0)
    const [isFinished, setIsFinished] = useState(false)

    const messages = [
        "WELCOME, NEWCOMER!",
        "HERE, LOGIC IS YOUR WEAPON.",
        "IMAGINATION IS YOUR KEY.",
        "ARE YOU READY TO BECOME A CHAMPION?",
    ]

    useEffect(() => {
        if (textIndex < messages.length) {
            const timer = setTimeout(() => {
                setTextIndex(prev => prev + 1)
            }, 1800)
            return () => clearTimeout(timer)
        } else {
            setIsFinished(true)
        }
    }, [textIndex])

    const handleStart = () => {
        window.location.href = '/dashboard'
    }

    return (
        <main className="min-h-screen bg-white flex flex-col items-center justify-center p-4">

            <div className="max-w-2xl w-full border-2 border-black p-1 bg-gray-100">
                <div className="bg-black text-white p-1 text-center font-bold text-xs uppercase tracking-widest">
                    System Opening Message v1.0
                </div>

                <div className="bg-white border border-black m-1 p-8 md:p-16 text-center space-y-8">

                    <div className="flex justify-center mb-6">
                        <div className="text-4xl">🔑</div>
                    </div>

                    <div className="min-h-[100px] flex items-center justify-center">
                        <AnimatePresence mode="wait">
                            {textIndex < messages.length ? (
                                <motion.h2
                                    key={textIndex}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    className="text-xl md:text-3xl font-bold uppercase italic text-black leading-tight"
                                >
                                    {messages[textIndex]}
                                </motion.h2>
                            ) : (
                                <motion.h2
                                    initial={{ scale: 0.9 }}
                                    animate={{ scale: 1 }}
                                    className="text-2xl md:text-4xl font-black comic-title text-blue-800"
                                >
                                    LET'S GET STARTED!
                                </motion.h2>
                            )}
                        </AnimatePresence>
                    </div>

                    {isFinished && (
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="pt-8 border-t border-black space-y-4"
                        >
                            <button
                                onClick={handleStart}
                                className="classic-btn w-full py-4 text-xl tracking-tighter"
                            >
                                CLICK HERE TO ENTER THE GAME
                            </button>
                            <p className="text-[10px] font-bold uppercase opacity-60">
                                Ensure your internet connection is stable (Dial-up is allowed)
                            </p>
                        </motion.div>
                    )}
                </div>

                <div className="bg-gray-200 p-1 text-[8px] font-bold text-center uppercase tracking-widest">
                    (c) Fun Riddles - 2001
                </div>
            </div>

            <div className="mt-8 opacity-20 text-center grayscale text-xl">
                <span>🛡️</span>
            </div>
        </main>
    )
}
