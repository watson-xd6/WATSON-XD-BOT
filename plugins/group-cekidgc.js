const { proto } = (await import('@adiwajshing/baileys')).default;

let handler = async (m, { conn, groupMetadata }) => {
  const teks = `
══════════════════
💬 *INFO GROUP* 💬
══════════════════

📝 *Nama Grup* : ${groupMetadata.subject}
🔖 *ID Grup* : ${groupMetadata.id}
👥 *Jumlah Anggota* : ${groupMetadata.participants.length}
  `.trim();

  const msg = {
    interactiveMessage: proto.Message.InteractiveMessage.create({
      body: proto.Message.InteractiveMessage.Body.create({
        text: teks
      }),
      footer: proto.Message.InteractiveMessage.Footer.create({
        text: "Tekan tombol untuk menyalin ID Grup."
      }),
      nativeFlowMessage: proto.Message.InteractiveMessage.NativeFlowMessage.create({
        buttons: [
          {
            name: "cta_copy",
            buttonParamsJson: JSON.stringify({
              display_text: "Salin ID Grup",
              copy_code: groupMetadata.id
            })
          }
        ]
      })
    })
  };

  await conn.relayMessage(m.chat, msg, { messageId: m.key.id });
};

handler.help = ['cekidgc'];
handler.tags = ['group'];
handler.command = /^(cekidgc|idgc|gcid)$/i;
handler.group = true;

export default handler;