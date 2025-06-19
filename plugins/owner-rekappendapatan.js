import fs from 'fs';

const filePath = './lib/pendapatan.json';

// Fungsi format rupiah
const toRupiah = (angka) => {
  return parseInt(angka).toLocaleString('id-ID', { style: 'currency', currency: 'IDR' }).replace(',00', '');
};

const handler = async (m) => {
  let pendapatan = [];
  if (fs.existsSync(filePath)) {
    pendapatan = JSON.parse(fs.readFileSync(filePath));
  }

  if (pendapatan.length < 1) {
    return m.reply('Tidak ada pendapatan');
  }

  let teks = `\n*📊 Rekap Pendapatan :*\n`;
  let total = 0;

  for (let i of pendapatan) {
    total += Number(i.harga);
    teks += `\n*📅 Tanggal :* ${i.tanggal}
*📦 Produk :* ${i.produk}
*💰 Harga :* ${toRupiah(i.harga)}\n`;
  }

  teks += `\n*Total Pendapatan :* ${toRupiah(total)}\n`;

  return m.reply(teks);
};

handler.help = ['rekappendapatan', 'rekapendapatan', 'pendapatan'];
handler.tags = ['owner'];
handler.command = /^(rekappendapatan|rekapendapatan|pendapatan)$/i;
handler.owner = true;

export default handler;