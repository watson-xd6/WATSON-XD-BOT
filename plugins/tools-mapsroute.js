let handler = async (m, { conn, args }) => {
  if (args.length < 1) return m.reply('Masukkan format: .mapsroute <dari>;<ke>\nContoh: .mapsroute Jakarta;Bandung');

  const [from, to] = args.join(' ').split(';').map(v => v.trim());
  if (!from || !to) return m.reply('Format salah. Gunakan tanda titik koma (;) untuk memisahkan.\nContoh: .mapsroute Jakarta;Bandung');

  try {
    const res = await fetch(`https://fastrestapis.fasturl.cloud/search/gmaps?from=${encodeURIComponent(from)}&to=${encodeURIComponent(to)}&language=id`);
    const json = await res.json();

    if (json.status !== 200) throw 'Gagal mengambil data rute.';

    const teks = `
══════════════════
📍 *RUTE GOOGLE MAPS*
══════════════════

🛫 Dari: ${from}
🛬 Ke: ${to}
🌐 Link: ${json.result.mapUrl}
    `.trim();

    await conn.sendMessage(m.chat, { text: teks }, { quoted: m });
  } catch (e) {
    console.error(e);
    m.reply('Terjadi kesalahan. Coba lagi nanti.');
  }
};

handler.help = ['mapsroute <dari>;<ke>'];
handler.tags = ['tools'];
handler.command = /^mapsroute$/i;

export default handler;