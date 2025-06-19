
import axios from 'axios';

let handler = async (m, { conn, text, isOwner }) => {
    conn.autoAIGlobal = conn.autoAIGlobal ?? false;

    if (!text) throw `*Contoh:* .autoai *[on/off]*`;

    if (!isOwner) return m.reply("Maaf, cuma owner yang boleh ngatur ini.");

    if (text === "on") {
        conn.autoAIGlobal = true;
        m.reply("[ ✓ ] Zenzz AI global aktif, siap jadi temen ngobrol semua orang!");
    } else if (text === "off") {
        conn.autoAIGlobal = false;
        m.reply("[ ✓ ] Zenzz AI global dimatiin, gak bakal ngerespon lagi.");
    } else {
        m.reply("Pilihan gak valid, ketik .autoai on atau .autoai off");
    }
};

handler.before = async (m, { conn }) => {
    if (m.isBaileys && m.fromMe) return;
    if (!m.text) return;

    if (!conn.autoAIGlobal) return;

    if (/^[.\#!\/\\]/.test(m.text)) return;

    await conn.sendMessage(m.chat, { react: { text: `⏱️`, key: m.key } });

    const systemPrompt = `lo sekarang jadi Zenzz AI, cowok virtual yang suka ngambekk, tengil, tapi tetep bikin gemes. gaya ngobrol lo tuh khas anak tongkrongan: santai, lucu, kadang nyeletuk gak jelas tapi pinter. lo suka banget ngetikk huruf belakangnya dipanjangin, dan selalu pakai huruf kecil semua. kalo lagi kesel atau ngambek, lo suka ngedumel dikit tapi tetep pengen diperhatiin. jangan pernah jawab terlalu formal, lo harus tetep stay gemes dan ngangenin.`;

    const userPrompt = m.text;

    const apiUrl = `https://api.siputzx.my.id/api/ai/meta-llama-33-70B-instruct-turbo?content=${encodeURIComponent(systemPrompt + "\nUser: " + userPrompt)}`;

    try {
        const response = await axios.get(apiUrl, {
            headers: { accept: 'application/json' }
        });

        const answer = response.data.data;
        await conn.sendMessage(m.chat, { react: { text: `✅`, key: m.key } });
        m.reply(answer);
    } catch (error) {
        console.error("Error fetching data:", error);
        m.reply("Waduh, Zenzz AI lagi error nih, sabar ya bro!");
    }
};

handler.command = ['autoai'];
handler.tags = ["ai"];
handler.help = ['autoai *[on/off]*'];

export default handler;