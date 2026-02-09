
const http = require('http');

const TARGET_URL = 'http://localhost:3000/api/auth/login';
const CONCURRENT_REQUESTS = 50; // Jumlah serangan per kloter
const TOTAL_ROUNDS = 100; // Jumlah kloter

console.log('--- INITIATING LOCAL STRESS TEST (DDoS SIMULATION) ---');
console.log(`Target: ${TARGET_URL}`);
console.log(`Volume: ${CONCURRENT_REQUESTS * TOTAL_ROUNDS} requests`);

let success = 0;
let errors = 0;
let completed = 0;

async function sendRequest() {
    return new Promise((resolve) => {
        const req = http.request(TARGET_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' }
        }, (res) => {
            if (res.statusCode === 200 || res.statusCode === 401) success++;
            else errors++;
            resolve();
        });

        req.on('error', () => {
            errors++;
            resolve();
        });

        // Kirim data sampah untuk membebani parsing server
        req.write(JSON.stringify({ username: 'bot_' + Math.random(), password: 'wrong_password' }));
        req.end();
    });
}

async function startAttack() {
    const startTime = Date.now();

    for (let i = 0; i < TOTAL_ROUNDS; i++) {
        const batch = [];
        for (let j = 0; j < CONCURRENT_REQUESTS; j++) {
            batch.push(sendRequest());
        }
        await Promise.all(batch);
        completed += CONCURRENT_REQUESTS;
        console.log(`[PROGRESS] Sent: ${completed} requests... (Errors: ${errors})`);
    }

    const duration = (Date.now() - startTime) / 1000;
    console.log('\n--- ATTACK REPORT ---');
    console.log(`Total Requests: ${completed}`);
    console.log(`Duration: ${duration}s`);
    console.log(`Speed: ${(completed / duration).toFixed(2)} req/sec`);
    console.log(`Status: ${errors > 0 ? 'SERVER STRUGGLING / CRASHED' : 'SERVER HELD THE LINE'}`);
}

startAttack();
