import fetch from 'node-fetch';

let handler = async (m, { conn, text, command }) => {
  try {
    const res = await fetch(`https://api.lolhuman.xyz/api/ceritahoror?apikey=LznycxShadow`);
    const data = await res.json();

    if (data.status !== 200) {
      throw 'Gagal mengambil data dari API.';
    }

    const { title, thumbnail, desc, story } = data.result;
    const teks = `*${title}*\n\n${desc.trim()}\n\n${story.trim()}`;

    await conn.sendMessage(m.chat, {
      text: teks,
      contextInfo: {
        externalAdReply: {
          title: title,
          body: 'Cerita Horor - Zenzz XD',
          thumbnailUrl: thumbnail,
          sourceUrl: 'https://lolhuman.xyz',
          mediaType: 1,
          renderLargerThumbnail: true,
          showAdAttribution: true
        }
      }
    }, { quoted: m });

  } catch (e) {
    console.error(e);
    m.reply('Maaf, terjadi kesalahan saat mengambil cerita horor.');
  }
};

handler.help = ['ceritahoror'];
handler.tags = ['internet'];
handler.command = ['ceritahoror'];

export default handler;