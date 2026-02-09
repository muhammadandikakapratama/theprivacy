import type { Metadata } from 'next'
import './globals.css'
import MusicPlayer from './components/MusicPlayer'

export const metadata: Metadata = {
    title: 'FUN RIDDLES!',
    description: 'Solve the most challenging riddles and security wargames!',
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en">
            <body className="antialiased">
                <MusicPlayer />
                {children}
            </body>
        </html>
    )
}
