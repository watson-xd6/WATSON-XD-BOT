import fs from 'fs';
import mime from 'mime-types';

const handler = async (m, { text, conn, qmsg, quoted, mime: qMime }) => {
  if (!text) return m.reply('Contoh: .jpm Teksnya');

  let mediaPath;
  if (/image/.test(qMime)) {
    mediaPath = await conn.downloadAndSaveMediaMessage(qmsg);
  }

  const allGroups = await conn.groupFetchAllParticipating();
  const groupIds = Object.keys(allGroups);
  let successCount = 0;

  const messageContent = mediaPath
    ? { image: fs.readFileSync(mediaPath), caption: text }
    : { text };

  const senderChat = m.chat;

  await m.reply(`Memproses ${mediaPath ? 'JPM teks & foto' : 'JPM teks'} ke ${groupIds.length} grup...`);

  for (const groupId of groupIds) {
    try {
      await conn.sendMessage(groupId, messageContent, { quoted: quoted });
      successCount++;
    } catch (err) {
      console.error(`Gagal kirim ke grup ${groupId}:`, err);
    }

    await new Promise((resolve) => setTimeout(resolve, 5000)); // Delay antar grup
  }

  if (mediaPath) fs.unlinkSync(mediaPath);

  await conn.sendMessage(senderChat, {
    text: `JPM ${mediaPath ? 'teks & foto' : 'teks'} berhasil dikirim ke ${successCount} grup.`,
  }, { quoted: m });
};

handler.help = ['jpm <teks>'];
handler.tags = ['store'];
handler.command = /^jpm$/i;
handler.owner = true;

export default handler;