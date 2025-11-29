// WATSON-XD BOT STARTER
import yargs from 'yargs';
import cfonts from 'cfonts';
import { fileURLToPath } from 'url';
import { join, dirname } from 'path';
import { createRequire } from 'module';
import { createInterface } from 'readline';
import { setupMaster, fork } from 'cluster';
import { watchFile, unwatchFile } from 'fs';
import axios from 'axios';

// ⭐ ADD EXPRESS FOR RENDER PORT
import express from "express";

const { say } = cfonts;
const rl = createInterface(process.stdin, process.stdout);
const __dirname = dirname(fileURLToPath(import.meta.url));
const require = createRequire(__dirname);
const { author, name } = require(join(__dirname, './package.json'));

let isRunning = false;
let crashCount = 0;

// 🎨 Animated Banner
say('WATSON-XD BOT', {
  font: 'block',
  align: 'center',
  colors: ['cyan', 'green'],
  gradient: ['red', 'magenta'],
  transitionGradient: true
});
say(`Watson the King @${author.name || author}`, { 
  font: 'console',
  align: 'center',
  colors: ['yellow']
});

console.log('💬 Starting WATSON-XD BOT...');
console.log(`📦 Bot Name: ${name}`);
console.log(`👑 Author: ${author.name || author}`);
console.log(`🌍 Node Version: ${process.version}`);
console.log(`📂 Working Directory: ${__dirname}`);

// Start the bot process
function start(file) {
  if (isRunning) return;
  isRunning = true;

  const args = [join(__dirname, file), ...process.argv.slice(2)];
  setupMaster({ exec: args[0], args: args.slice(1) });
  const p = fork();

  p.on('message', async data => {
    console.log('[✅ MESSAGE RECEIVED]', data);
    switch (data) {
      case 'reset':
        p.kill();
        isRunning = false;
        start(file);
        break;
      case 'uptime':
        p.send(process.uptime());
        break;
      case 'status':
        console.log(`📊 Bot Status: Running | Worker PID: ${p.pid}`);
        break;
      case 'memory':
        console.log('💾 Memory Usage:', process.memoryUsage());
        break;
      case 'stop':
        console.log('🛑 Stopping bot...');
        p.kill();
        process.exit(0);
      default:
        console.warn('[⚠️ UNRECOGNIZED MESSAGE]', data);
    }
  });

  p.on('exit', (_, code) => {
    isRunning = false;
    crashCount++;
    const delay = Math.min(crashCount * 1000, 10000);
    console.error(`[❗] Worker exited with code: ${code}. Restarting in ${delay/1000}s...`);
    setTimeout(() => start(file), delay);

    watchFile(args[0], () => {
      unwatchFile(args[0]);
      console.log('🔄 File change detected. Restarting bot...');
      start(file);
    });
  });

  let opts = yargs(process.argv.slice(2)).exitProcess(false).parse();

  if (!opts['test']) {
    if (!rl.listenerCount()) {
      rl.on('line', line => {
        p.emit('message', line.trim());
      });
    }
  }

  checkUpdate();
}

// 🔔 Auto-update check
async function checkUpdate() {
  try {
    const { data } = await axios.get('https://api.github.com/repos/watson-xd6/WATSON-XD-BOT/commits/main');
    const latestHash = data.sha;
    console.log(`🔔 Latest GitHub Commit: ${latestHash}`);
  } catch (e) {
    console.error('❌ Update check failed:', e.message);
  }
}

// Start the bot
start('main.js');


// ⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐
// ⭐ FIX FOR RENDER: OPEN A PORT ⭐
// ⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐

const app = express();
const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send("✅ WATSON-XD-BOT is running successfully on Render!");
});

app.listen(PORT, () => {
  console.log(`🌐 Render Web Server Running on PORT ${PORT}`);
});
