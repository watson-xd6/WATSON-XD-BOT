import fetch from 'node-fetch';

const handler = async (m, { args, usedPrefix, command, conn }) => {
  if (!args[0]) {
    return m.reply(`Masukkan URL MediaFire!\n\nContoh:\n${usedPrefix + command} https://www.mediafire.com/file/xxxxxxxx`);
  }

  try {
    await m.reply('Sebentar cuy, lagi diproses...');

    const res = await fetch(`https://www.velyn.biz.id/api/downloader/mediafire?url=${encodeURIComponent(args[0])}`);
    if (!res.ok) throw 'Gagal menghubungi server.';

    const json = await res.json();
    if (!json.status || !json.data) throw 'Gagal mengambil data dari MediaFire.';

    const { title, url, size } = json.data;

    const caption = `
━━━〔 *MEDIAFIRE DOWNLOADER* 〕━━━
📁 *Nama File:* ${title}
📦 *Ukuran:* ${size}
🔗 *Link Asli:* ${args[0]}
`.trim();

    await m.reply(caption);

    await conn.sendMessage(m.chat, {
      document: { url },
      fileName: title.replace(/\.[^/.]+$/, '') + '.zip',
      mimetype: 'application/zip'
    }, { quoted: m });

  } catch (e) {
    console.error(e);
    m.reply(typeof e === 'string' ? e : 'Terjadi kesalahan saat memproses permintaan.');
  }
};

handler.help = ['mediafire <url>', 'mf <url>'];
handler.tags = ['downloader'];
handler.command = /^mediafire|mf$/i;

export default handler;