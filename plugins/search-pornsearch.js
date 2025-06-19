const handler = async (m, { text, command }) => {
  if (!text) return m.reply(`Contoh penggunaan:\n.${command} Mia Khalifa`);

  try {
    const res = await fetch(`https://www.velyn.biz.id/api/search/pornsearch?query=${encodeURIComponent(text)}`);
    const json = await res.json();

    if (!json.status || !json.data || !Array.isArray(json.data)) {
      return m.reply('Gagal mengambil data atau tidak ada hasil ditemukan.');
    }

    const hasil = json.data
      .filter(v => v.url !== 'No URL')
      .slice(0, 5)
      .map((v, i) => {
        return `Judul: ${v.title !== 'No title found' ? v.title : 'Tanpa judul'}\nDurasi: ${v.duration}\nLink: ${v.url}`;
      }).join('\n\n');

    m.reply(`Hasil pencarian untuk: ${text}\n\n${hasil}`);
  } catch (e) {
    console.error(e);
    m.reply('Terjadi kesalahan saat mengambil data.');
  }
};

handler.command = ['pornsearch'];
handler.help = ['pornsearch <query>'];
handler.tags = ['search'];
handler.premium = true;

export default handler;