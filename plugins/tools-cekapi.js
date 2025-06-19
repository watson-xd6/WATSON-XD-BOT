import fetch from 'node-fetch';

const handler = async (m, { conn, text }) => {
  if (!text) throw 'Masukkan URL API yang mau dicek.\n\n*Contoh:* .cekapi https://api.example.com/data';

  try {
    let res = await fetch(text);
    let json = await res.json();

    let formatted = JSON.stringify(json, null, 2); // format biar rapi

    await conn.reply(m.chat, '```\n' + formatted + '\n```', m);
  } catch (err) {
    console.error(err);
    await conn.reply(m.chat, `❌ Gagal cek API:\n${err.message}`, m);
  }
};

handler.help = ['cekapi <url>'];
handler.tags = ['tools'];
handler.command = /^cekapi$/i;

export default handler;