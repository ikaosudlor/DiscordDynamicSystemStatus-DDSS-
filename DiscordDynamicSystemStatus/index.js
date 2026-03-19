const si = require('systeminformation');
const fetch = require('node-fetch');
const fs = require('fs');
const path = require('path');

// --- 1. โหลดการตั้งค่า ---
let config;
try {
    config = JSON.parse(fs.readFileSync(path.join(__dirname, 'config.json'), 'utf8'));
} catch (err) {
    console.error("❌ ไม่พบไฟล์ config.json หรือไฟล์เสีย!");
    process.exit(1);
}

const { token, interval_ms } = config;

// --- 2. ฟังก์ชันอัปเดตสถานะ ---
async function updateStatus() {
    try {
        const cpu = await si.currentLoad();
        const mem = await si.mem();
        
        const cpuUsage = Math.round(cpu.currentLoad);
        const ramUsage = Math.round((mem.active / mem.total) * 100);
        const statusText = `📊 CPU: ${cpuUsage}% | RAM: ${ramUsage}%`;

        const res = await fetch('https://discord.com/api/v9/users/@me/settings', {
            method: 'PATCH',
            headers: { 'Authorization': token, 'Content-Type': 'application/json' },
            body: JSON.stringify({ custom_status: { text: statusText, emoji_name: "📊" } })
        });

        if (res.ok) {
            console.log(`✅ [${new Date().toLocaleTimeString()}] Status updated: ${statusText}`);
        } else {
            console.log(`❌ Error: ${res.statusText}`);
        }
    } catch (e) { console.error("⚠️ System Error:", e.message); }
}

console.log("🚀 Program Started! Press Ctrl+C to stop.");
updateStatus();
setInterval(updateStatus, interval_ms);
