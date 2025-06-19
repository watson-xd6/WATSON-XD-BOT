import fs from 'fs';

let pendapatan = [];
const filePath = './lib/pendapatan.json';

const tanggal = (ms) => {
  const date = new Date(ms);
  return date.toLocaleDateString('id-ID', {
    day: '2-digit', month: '2-digit', year: 'numeric'
  });
};

const toRupiah = (angka) => {
  return parseInt(angka).toLocaleString('id-ID', { style: 'currency', currency: 'IDR' }).replace(',00', '');
};

if (fs.existsSync(filePath)) {
  pendapatan = JSON.parse(fs.readFileSync(filePath));
}

const handler = async (m, { text }) => {
  if (!text || !text.includes('|')) {
    return m.reply(`
*Format Salah!*

Contoh :
*.addpendapatan* nama produk|harga
`);
  }

  const [produk, harga] = text.split('|').map(v => v.trim());

  if (!produk || !harga || isNaN(harga)) {
    return m.reply(`
*Format Salah!*

Pastikan format seperti ini:
.addpendapatan nama produk|harga

Contoh :
*.addpendapatan* Kopi Hitam|10000
`);
  }

  const obj = {
    produk,
    harga,
    tanggal: tanggal(Date.now())
  };

  pendapatan.push(obj);
  fs.writeFileSync(filePath, JSON.stringify(pendapatan, null, 2));

  const teks = `
*Berhasil menambah pendapatan ✅*

📅 *Tanggal:* ${obj.tanggal}
📦 *Produk:* ${produk}
💰 *Harga:* ${toRupiah(harga)}
`.trim();

  m.reply(teks);
};

handler.help = ['addpendapatan <nama>|<harga>'];
handler.tags = ['owner'];
handler.command = /^addpendapatan$/i;
handler.owner = true;

export default handler;