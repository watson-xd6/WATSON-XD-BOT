import fs from 'fs';

let pendapatan = [];
const filePath = './lib/pendapatan.json';

// Baca data awal kalau file ada
if (fs.existsSync(filePath)) {
  pendapatan = JSON.parse(fs.readFileSync(filePath));
}

const handler = async (m) => {
  pendapatan = [];
  fs.writeFileSync(filePath, JSON.stringify(pendapatan, null, 2));

  m.reply('*✅ Semua data pendapatan berhasil direset.*');
};

handler.help = ['resetpendapatan'];
handler.tags = ['owner'];
handler.command = /^resetpendapatan$/i;
handler.owner = true;

export default handler;