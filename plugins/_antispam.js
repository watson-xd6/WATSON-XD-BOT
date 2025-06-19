export async function all(m) {
  if (!m.message) return;
  // Inisialisasi objek spam
  this.spam = this.spam || {};

  const sender = m.sender;
  // Waktu sekarang dalam detik
  const now = Math.floor(Date.now() / 1000);

  // Ambil data spam user atau buat baru
  let userSpam = this.spam[sender] || { count: 0, lastspam: now };

  // Jika interval < 5 detik, tambah hitungan; kalau >=5 detik, reset ke 1
  if (now - userSpam.lastspam < 5) {
    userSpam.count += 1;
  } else {
    userSpam.count = 1;
  }
  userSpam.lastspam = now;
  this.spam[sender] = userSpam;

  // Kalau sudah lebih dari 5 pesan dalam 5 detik → warn
  if (userSpam.count > 5) {
    // Tambah warn di database
    const users = global.db.data.users;
    users[sender].warn = (users[sender].warn || 0) + 1;

    // Kirim teks warning sebagai reply
    await this.sendMessage(
      m.chat,
      { text: '🚨 Jangan spam, beri jeda beberapa detik!' },
      { quoted: m }
    );

    // Reset hitungan spam supaya tidak terus-terusan spam
    userSpam.count = 0;
    this.spam[sender] = userSpam;
  }
  
  return true;
}

// Jika masih butuh handler default (opsional)
let handler = async (m, { conn }) => {};
export default handler;