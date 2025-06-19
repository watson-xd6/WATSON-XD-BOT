import fetch from 'node-fetch';

let handler = async (m, { conn, text, usedPrefix, command }) => {
  if (!text) throw `Masukkan teks yang mau di-paste!\n\nContoh:\n${usedPrefix + command} ini adalah contoh pastebin dari bot`;

  const apiKey = '4iXqa681ImN0ykqHeUInKGGAvET6A4u6';
  const apiUrl = 'https://pastebin.com/api/api_post.php';
  const params = new URLSearchParams();
  params.append('api_dev_key', apiKey);
  params.append('api_option', 'paste');
  params.append('api_paste_code', text);

  await m.reply('Tunggu sebentar kak...');

  try {
    const res = await fetch(apiUrl, {
      method: 'POST',
      body: params
    });
    const url = await res.text();

    if (!url.startsWith('http')) throw 'Gagal membuat pastebin!';

    await conn.sendMessage(m.chat, { text: `✅ Paste berhasil dibuat:\n${url}` }, { quoted: m });
  } catch (e) {
    console.error(e);
    m.reply('Terjadi error saat membuat paste. Coba lagi nanti.');
  }
};

handler.command = /^uppastebin$/i;
handler.help = ['uppastebin <teks>'];
handler.tags = ['tools'];

export default handler;