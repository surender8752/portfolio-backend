import { spawn } from 'child_process';
import fs from 'fs';

const child = spawn('node', ['server.js'], { stdio: 'pipe' });

let log = '';

child.stdout.on('data', (data) => {
    log += `STDOUT: ${data.toString()}\n`;
});

child.stderr.on('data', (data) => {
    log += `STDERR: ${data.toString()}\n`;
});

child.on('close', (code) => {
    log += `Exited with code ${code}\n`;
    fs.writeFileSync('boot_log.txt', log, 'utf8');
    console.log('Log written to boot_log.txt');
});
