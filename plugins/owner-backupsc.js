// owner-autoupdate.js
import { exec } from "child_process";
import path from "path";

let handler = async (m, { conn, isOwner, isROwner }) => {
    if (!isOwner && !isROwner) {
        return conn.sendMessage(
            m.chat,
            { text: "*ONLY OWNER* • This command is only for the bot owner." },
            { quoted: m }
        );
    }

    await conn.sendMessage(
        m.chat,
        { text: "🔄 Checking for updates from GitHub..." },
        { quoted: m }
    );

    // Path to your bot folder
    const botPath = path.resolve(__dirname, ".."); // adjust if needed

    exec("git pull origin main", { cwd: botPath }, (error, stdout, stderr) => {
        if (error) {
            conn.sendMessage(
                m.chat,
                { text: "❌ Update failed:\n" + stderr },
                { quoted: m }
            );
            console.error("[AUTO-UPDATE] git pull error:", error);
            return;
        }

        conn.sendMessage(
            m.chat,
            { text: "✅ Update successful!\n" + stdout + "\n♻️ Restarting bot..." },
            { quoted: m }
        );

        // Restart the bot using PM2
        exec("pm2 restart watson-xd-bot", { cwd: botPath }, (err, out, errOut) => {
            if (err) {
                console.error("[AUTO-RESTART] PM2 restart error:", err);
                conn.sendMessage(
                    m.chat,
                    { text: "⚠️ Bot updated but failed to restart automatically.\nPlease restart manually." },
                    { quoted: m }
                );
                return;
            }
            console.log("[AUTO-RESTART] Bot restarted successfully via PM2.");
        });
    });
};

handler.help = ["updatebot"];
handler.tags = ["owner"];
handler.command = ["updatebot", "update"];

export default handler;