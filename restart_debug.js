import { execSync, spawn } from 'child_process';
import fs from 'fs';

const logFile = 'restart_log.txt';
const log = (msg) => {
    const text = `[${new Date().toISOString()}] ${msg}\n`;
    fs.appendFileSync(logFile, text);
    console.log(msg);
};

fs.writeFileSync(logFile, 'Starting Restart Sequence...\n');

try {
    log('Finding process on port 5000...');
    const result = execSync('netstat -ano | findstr :5000').toString();
    const lines = result.trim().split('\n');
    for (const line of lines) {
        const parts = line.trim().split(/\s+/);
        const pid = parts[parts.length - 1];
        if (pid && !isNaN(pid) && pid !== '0') {
            log(`Found PID ${pid} on port 5000. Killing it...`);
            try {
                execSync(`taskkill /F /PID ${pid}`);
                log(`Successfully killed PID ${pid}`);
            } catch (e) {
                log(`Failed to kill PID ${pid}: ${e.message}`);
            }
        }
    }
} catch (e) {
    log('No process found on port 5000 or error during netstat.');
}

log('Starting server.js...');
const child = spawn('node', ['server.js'], {
    detached: true,
    stdio: 'ignore'
});

child.unref();
log(`Server started in background (PID: ${child.pid}).`);
process.exit(0);
