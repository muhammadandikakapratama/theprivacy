'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function MusicPlayer() {
    const [isPlaying, setIsPlaying] = useState(false)
    const [hasInteracted, setHasInteracted] = useState(false)
    const [currentLyricIndex, setCurrentLyricIndex] = useState(0)

    // THE PROVIDE VIDEO ID: yHFMLEblKuY
    const videoId = 'yHFMLEblKuY'

    const lyrics = [
        "It's getting late in the day...",
        "I can hear the engine start...",
        "Everything is changing...",
        "I'm just trying to keep my head up...",
        "Let it happen, let it happen...",
        "It's gonna feel so good...",
        "Just let it happen...",
        "All this running around...",
        "Trying to find some peace of mind...",
        "Maybe I was wrong...",
        "Baby, let it happen...",
        "If my world is spinning out of control...",
        "I'll just let it happen..."
    ]

    const handlePlay = () => {
        setIsPlaying(true)
        setHasInteracted(true)
    }

    // Cycle lyrics every 4 seconds when playing
    useEffect(() => {
        let interval: any;
        if (isPlaying) {
            interval = setInterval(() => {
                setCurrentLyricIndex((prev) => (prev + 1) % lyrics.length)
            }, 4000)
        }
        return () => clearInterval(interval)
    }, [isPlaying, lyrics.length])

    return (
        <div className="fixed bottom-4 right-4 z-[9999]">
            {!hasInteracted ? (
                <div className="flex flex-col items-end gap-1">
                    <button
                        onClick={handlePlay}
                        className="classic-btn bg-red-600 text-white border-2 border-black px-4 py-2 text-xs font-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:bg-black hover:translate-x-[-1px] hover:translate-y-[-1px] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition-all animate-pulse"
                    >
                        [ ▶ PLAY AUDIO ]
                    </button>
                    <div className="bg-yellow-300 border border-black text-[8px] font-bold px-1 py-0.5 shadow-[1px_1px_0px_0px_rgba(0,0,0,1)]">
                        &larr; AKTIFKAN BACKSOUND
                    </div>
                </div>
            ) : (
                <div className="bg-[#c0c0c0] border-2 border-white border-r-gray-800 border-b-gray-800 p-1 w-[320px] shadow-[10px_10px_30px_rgba(0,0,0,0.5)]">
                    {/* WINAMP STYLE HEADER */}
                    <div className="bg-gradient-to-r from-[#000080] to-[#0808a8] text-white text-[12px] px-2 py-1 font-bold flex justify-between items-center mb-1 select-none">
                        <div className="flex items-center gap-2">
                            <span className="animate-bounce">📻</span>
                            <span className="tracking-widest uppercase">NATAS AUDIO ENGINE v1.1</span>
                        </div>
                        <button
                            onClick={() => { setIsPlaying(false); setHasInteracted(false); }}
                            className="bg-gray-300 text-black border border-white px-1 hover:bg-red-600 hover:text-white leading-none font-bold"
                        >
                            X
                        </button>
                    </div>

                    {/* INTERFACE AREA */}
                    <div className="bg-black p-4 border-2 border-gray-600 relative overflow-hidden">
                        {/* THE SCANLINES EFFECT */}
                        <div className="absolute inset-0 pointer-events-none opacity-20 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] z-10 bg-[length:100%_2px,3px_100%]"></div>

                        <div className="relative z-20">
                            {/* TITLE SCROLL */}
                            <div className="text-[#00ff00] font-mono text-[9px] uppercase mb-1 text-center border-b border-[#00ff00]/30 pb-1">
                                <motion.div
                                    animate={{ x: isPlaying ? [300, -350] : 0 }}
                                    transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
                                    className="whitespace-nowrap"
                                >
                                    {isPlaying ? 'TAME IMPALA - LET IT HAPPEN (OFFICIAL AUDIO) ... ' : '--- STANDBY MODE ---'}
                                </motion.div>
                            </div>

                            {/* LYRICS DISPLAY AREA */}
                            <div className="h-10 flex items-center justify-center text-center overflow-hidden mb-2">
                                <AnimatePresence mode="wait">
                                    <motion.div
                                        key={currentLyricIndex}
                                        initial={{ opacity: 0, scale: 0.8 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 1.2 }}
                                        transition={{ duration: 0.5 }}
                                        className="text-white font-mono text-[10px] italic font-bold tracking-tight uppercase px-4"
                                    >
                                        {isPlaying ? lyrics[currentLyricIndex] : "--- Awaiting Signal ---"}
                                    </motion.div>
                                </AnimatePresence>
                            </div>

                            {/* VISUALIZER */}
                            <div className="flex justify-center items-end gap-1.5 h-12 mb-4">
                                {[0.8, 0.4, 1.0, 0.6, 0.9, 0.3, 0.7, 0.5, 0.8, 0.4, 0.9, 0.2].map((h, i) => (
                                    <motion.div
                                        key={i}
                                        animate={{ height: isPlaying ? [`${h * 100}%`, `${(1 - h) * 100}%`, `${h * 100}%`] : '10%' }}
                                        transition={{ duration: 0.3 + (i * 0.05), repeat: Infinity, ease: "easeInOut" }}
                                        className="w-2.5 bg-[#00ff00] shadow-[0_0_10px_#00ff00] border-t border-white/30"
                                    />
                                ))}
                            </div>

                            <div className="flex justify-between items-center mt-2 px-2">
                                <span className="text-[#00ff00] font-mono text-[9px]">{isPlaying ? 'BPM: 125' : '---'}</span>
                                <button
                                    onClick={() => setIsPlaying(!isPlaying)}
                                    className="bg-gray-400 border-2 border-white border-r-gray-800 border-b-gray-800 px-6 py-1 text-[11px] font-black uppercase hover:bg-gray-300 active:translate-y-[2px]"
                                >
                                    {isPlaying ? 'PAUSE' : 'RESUME'}
                                </button>
                                <span className="text-[#00ff00] font-mono text-[9px]">v.2025</span>
                            </div>
                        </div>
                    </div>

                    <div className="bg-[#c0c0c0] p-1 text-[9px] font-bold text-gray-700 text-center uppercase tracking-tighter italic">
                        Providing official vibes for your challenge...
                    </div>

                    {/* HIDDEN YOUTUBE IFRAME */}
                    <div className="absolute pointer-events-none w-0 h-0 opacity-0 overflow-hidden -top-999">
                        {isPlaying && (
                            <iframe
                                width="300"
                                height="300"
                                src={`https://www.youtube.com/embed/${videoId}?autoplay=1&loop=1&playlist=${videoId}&enablejsapi=1&mute=0&controls=0&modestbranding=1`}
                                title="Background Music Engine"
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            ></iframe>
                        )}
                    </div>
                </div>
            )}
        </div>
    )
}
