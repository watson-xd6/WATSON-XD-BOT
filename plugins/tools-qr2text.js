import fetch from 'node-fetch';

let handler = async (m, { conn, args, usedPrefix, command }) => {
  if (!args[0]) throw `Masukkan URL gambar QR!\n\nContoh:\n${usedPrefix + command} https://i.supa.codes/cAYuat`;

  const url = args[0];
  const api = `https://api.siputzx.my.id/api/tools/qr2text?url=${encodeURIComponent(url)}`;

  try {
    const res = await fetch(api);
    const json = await res.json();

    if (!json.data || !json.data.text) throw 'Gagal membaca QR code!';

    await conn.sendMessage(m.chat, { text: `*Hasil QR:*\n${json.data.text}` }, { quoted: m });
  } catch (e) {
    console.error(e);
    m.reply('Terjadi error saat membaca QR code. Coba lagi nanti.');
  }
};

handler.command = /^qr2text$/i;
handler.help = ['qr2text <url gambar qr>'];
handler.tags = ['tools'];

export default handler;