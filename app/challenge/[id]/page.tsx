import ChallengeClient from './challenge-client'

export default async function Page({
    params,
}: {
    params: Promise<{ id: string }>
}) {
    const { id } = await params

    return (
        <>
            {/* Level 0: Junk Fill & Decoy */}
            {id === '10' && (
                <div dangerouslySetInnerHTML={{
                    __html: `
                    <!-- 
                      SYSTEM_LOG: [OK]
                      ENCRYPTION_KEY: [NONE]
                      ${Array(50).fill('STILL_NOTHING_HERE_MY_FRIEND...').join('\n                      ')}
                      
                      FLAG_LOCATION: BOTTOM_OF_HELL
                      PASSWORD_FOR_NATAS1: gt7uJ6as6SMvSBa367BrSvl7bi8Bsc6s
                      
                      ${Array(20).fill('GO_AWAY_KIDDIE_HACKER...').join('\n                      ')}
                    -->`
                }} />
            )}

            {/* Level 1: Sneaky Placement */}
            {id === '11' && (
                <div dangerouslySetInnerHTML={{
                    __html: `
                    <script>
                        /* 
                           DEV_NOTE: The server-side script is currently broken.
                           We are using a temporary hardcoded check for natas2.
                           DECODED_VAL: Wmx1cnVBdGhRNnVlUzk4QW4yTmY2OUR4bDlZdXhBMTY=
                           Wait, that's base64 encoded! 
                        */
                    </script>
                    <!-- 
                       DEBUG_INFO_START
                       Target Level: 2
                       Hint: The string above is actually the password for the next level.
                       If you are smart enough to find this, you are smart enough to decode it.
                       DEBUG_INFO_END
                    -->`
                }} />
            )}
            <ChallengeClient id={id} />
        </>
    )
}
