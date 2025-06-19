import fetch from 'node-fetch';

let handler = async (m, { conn }) => {
  try {
    let res = await fetch('https://api.lolhuman.xyz/api/cerpen?apikey=LznycxShadow');
    let json = await res.json();

    if (!json || !json.result || !json.result.title || !json.result.cerpen) {
      return m.reply('Gagal mengambil cerpen.');
    }

    let { title, creator, cerpen } = json.result;
    let text = `*${title}*\n\n${cerpen}\n\n_Oleh: ${creator}_`;

    conn.sendMessage(m.chat, {
      text,
      contextInfo: {
        externalAdReply: {
          title: title,
          body: "Cerpen By Zenzz XD",
          thumbnailUrl: 'https://files.catbox.moe/d54qrn.jpg',
          sourceUrl: 'https://lolhuman.xyz',
          mediaType: 1,
          renderLargerThumbnail: true,
          showAdAttribution: true
        }
      }
    }, { quoted: m });
  } catch (e) {
    console.error(e);
    m.reply('Terjadi kesalahan saat mengambil cerpen.');
  }
};

handler.command = /^cerpen$/i;
handler.tags = ['internet'];
handler.help = ['cerpen'];

export default handler;