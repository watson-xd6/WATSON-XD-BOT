import fs from 'fs';

const path = './lib/sewa.json';

async function checkExpired(conn) {
  if (!fs.existsSync(path)) return;
  let data = JSON.parse(fs.readFileSync(path));
  let now = Date.now();
  let updated = false;

  for (let groupId in data) {
    // Pastikan fitur tersedia
    if (!conn.groupFetchAllParticipating) continue;

    let participants = await conn.groupFetchAllParticipating().catch(() => null);

    // Jika tidak ada data atau bot sudah bukan peserta
    if (!participants || !participants[groupId]) {
      console.log(`[INFO] Grup ${groupId} tidak ditemukan atau bot bukan peserta`);
      delete data[groupId]; // hapus dari data sewa
      updated = true;
      continue;
    }

    // Jika masa sewa sudah habis
    if (data[groupId].expired < now) {
      try {
        const metadata = await conn.groupMetadata(groupId).catch(() => null);
        if (metadata) {
          await conn.sendMessage(groupId, {
            text: '👋 *Bye semua~*\nSewa bot *telah expired!*\nSilakan hubungi *owner* untuk memperpanjang masa sewa.',
          });
          await conn.groupLeave(groupId);
        }
        delete data[groupId];
        updated = true;
      } catch (e) {
        console.log(`[ERROR auto-expire]`, e);
      }
    }
  }

  if (updated) fs.writeFileSync(path, JSON.stringify(data, null, 2));
}

// Loop tiap 30 detik
export default function startAutoExpire(conn) {
  setInterval(() => {
    checkExpired(conn);
  }, 30_000); // 30 detik
}