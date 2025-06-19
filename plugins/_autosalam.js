let handler = async (m, { conn }) => {
  conn.sendMessage(m.chat, {
    audio: { url: 'https://files.catbox.moe/xp3p6p.mp3' },
    mimetype: 'audio/mp4',
    ptt: true
  }, { quoted: m });
};

handler.customPrefix = /^(ass?ala?mu'?alaikum( warahmatullahi wabarakatuh)?|asalamualaikum)$/i;
handler.command = new RegExp(); // agar bisa jalan pakai customPrefix
export default handler;