/*
📌 Nama Fitur: Teks ke QR Code
🏷️ Type : Plugin ESM
🔗 Sumber : https://apizell.web.id
✍️ Convert By ZenzXD
*/

import fetch from 'node-fetch';

const handler = async (m, { conn, text, usedPrefix, command }) => {
  if (!text) {
    return m.reply(`Masukkan teks yang mau dibuat QR!\nContoh: ${usedPrefix + command} zenzganteng`);
  }

  try {
    const api = `https://apizell.web.id/tools/teks2qr?q=${encodeURIComponent(text)}`;
    await conn.sendMessage(m.chat, {
      image: { url: api },
      caption: `✅ QR Code berhasil dibuat untuk:\n\n${text}`
    }, { quoted: m });
  } catch (err) {
    console.error(err);
    m.reply('❌ Gagal membuat QR Code. Coba lagi nanti.');
  }
};

handler.help = ['teksqr <teks>'];
handler.tags = ['tools'];
handler.command = /^teksqr|qrteks$/i;
handler.premium = false;
handler.limit = false;

export default handler;