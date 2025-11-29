const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

let handler = async (m, { conn, command, text, usedPrefix }) => {
  await m.reply("⚠️ WARNING: Initiating system override...");
  await sleep(1000);

  const steps = [
    "█▒▒▒▒▒▒▒▒ 10% - Accessing system files...",
    "██▒▒▒▒▒▒▒ 20% - Breaching firewall...",
    "███▒▒▒▒▒▒ 30% - Extracting user data...",
    "████▒▒▒▒▒ 40% - Injecting tracking scripts...",
    "█████▒▒▒▒ 50% - Locating sensitive files...",
    "██████▒▒▒ 60% - Encrypting logs...",
    "███████▒▒ 70% - Masking digital footprint...",
    "████████▒ 80% - Simulating server hijack...",
    "█████████ 90% - Completing data extraction...",
    "██████████ 100% - System override complete"
  ];

  const randomWarnings = [
    "⚠️ ERROR: Firewall detected unusual activity...",
    "⚠️ WARNING: Connection unstable...",
    "❌ ALERT: Permission denied on /etc/config...",
    "⚠️ ERROR: Temporary server timeout...",
    "⚠️ WARNING: Data packet loss detected..."
  ];

  for (const step of steps) {
    await m.reply(step);
    await sleep(500 + Math.floor(Math.random() * 500)); // Random pause 0.5–1s

    // Occasionally insert a random “warning” message
    if (Math.random() < 0.3) { // 30% chance
      const warning = randomWarnings[Math.floor(Math.random() * randomWarnings.length)];
      await m.reply(warning);
      await sleep(400 + Math.floor(Math.random() * 400));
    }
  }

  await m.reply("💻 Connecting to external server...");
  await sleep(1000 + Math.floor(Math.random() * 500));

  if (Math.random() < 0.5) { // 50% chance of fake error
    await m.reply("⚠️ ERROR: Server response delayed...");
    await sleep(700 + Math.floor(Math.random() * 500));
  }

  await m.reply("📡 Data transfer in progress...");
  await sleep(800 + Math.floor(Math.random() * 600));

  await m.reply("✅ All target data extracted (simulation).");
  await sleep(800);

  if (Math.random() < 0.4) {
    await m.reply("⚠️ WARNING: Suspicious activity detected, masking logs...");
    await sleep(600);
  }

  await m.reply("🧹 Cleaning logs and hiding traces...");
  await sleep(1000 + Math.floor(Math.random() * 500));

  await m.reply("🔒 Hack simulation completed successfully. All actions are virtual.");
  await sleep(1000);
  return await m.reply("💾 Simulation session ended.");
};

handler.help = ["hack", "prankhack"];
handler.tags = ["fun", "main"];
handler.command = ["shockhack", "prankhack", "fakehack"];

export default handler;
