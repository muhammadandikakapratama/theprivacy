'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function RegisterPage() {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const router = useRouter()

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault()
        setError('')
        setIsLoading(true)

        try {
            const res = await fetch('/api/auth/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password })
            })
            const data = await res.json()

            if (res.ok) {
                router.push('/dashboard')
            } else {
                setError(data.error || 'Registration failed')
            }
        } catch (err) {
            setError('System error. Please try again later.')
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="min-h-screen bg-[#008080] flex items-center justify-center font-mono p-4">
            <div className="bg-[#c0c0c0] border-2 border-white border-r-gray-800 border-b-gray-800 p-1 w-[400px] shadow-[10px_10px_30px_rgba(0,0,0,0.5)]">
                {/* WINDOW HEADER */}
                <div className="bg-gradient-to-r from-[#000080] to-[#0808a8] text-white text-[14px] px-2 py-1 font-bold flex justify-between items-center mb-1 select-none">
                    <div className="flex items-center gap-2">
                        <span>📝</span>
                        <span className="tracking-wider uppercase">NEW_RECRUIT_REGISTRATION.exe</span>
                    </div>
                </div>

                <div className="p-6 space-y-6">
                    <div className="text-center text-blue-900">
                        <h1 className="text-2xl font-black uppercase italic">Enlist Now</h1>
                        <p className="text-[10px] mt-2 font-bold text-gray-600 uppercase">
                            Create your identity for the Natas Wargames.
                        </p>
                    </div>

                    <form onSubmit={handleRegister} className="space-y-4">
                        <div className="space-y-1">
                            <label className="text-xs font-bold uppercase">Choose Username:</label>
                            <input
                                type="text"
                                className="w-full border-2 border-gray-800 border-t-white border-l-white bg-white p-2 outline-none focus:bg-yellow-50 font-bold"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                minLength={3}
                                required
                            />
                        </div>
                        <div className="space-y-1">
                            <label className="text-xs font-bold uppercase">Password:</label>
                            <input
                                type="password"
                                className="w-full border-2 border-gray-800 border-t-white border-l-white bg-white p-2 outline-none focus:bg-yellow-50 font-bold"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                minLength={6}
                                required
                            />
                        </div>

                        {error && (
                            <div className="bg-red-600 text-white p-2 text-xs font-bold text-center border-2 border-black animate-pulse uppercase">
                                ERROR: {error}
                            </div>
                        )}

                        <button
                            disabled={isLoading}
                            className="w-full classic-btn py-4 text-xl font-black uppercase shadow-[4px_4px_0px_rgba(0,0,0,1)] active:shadow-none active:translate-x-1 active:translate-y-1"
                        >
                            {isLoading ? 'ENROLLING...' : '[ REGISTER_ID ]'}
                        </button>
                    </form>

                    <div className="text-center pt-4 border-t border-gray-400">
                        <p className="text-xs font-bold">Already have an ID?</p>
                        <Link href="/login" className="text-blue-800 underline font-black uppercase text-sm hover:text-red-600 transition-colors">
                            &gt;&gt; RETURN TO LOGIN &lt;&lt;
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}
