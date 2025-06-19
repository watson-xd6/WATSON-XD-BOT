let handler = async (m, { conn, text, usedPrefix, command }) => {
    const deleteMessage = { delete: { remoteJid: m.key.remoteJid, fromMe: false, id: m.key.id, participant: [m.sender] } };
    await conn.sendMessage(m.chat, deleteMessage);
    conn.sendMessage(m.chat, {text: `
jangan toxic woy hp ku di cek in mama 😤`},{quoted: m})
    }
    
handler.customPrefix = /^(kontol|bangsat|memek|pepek|ppk|tai|anj|anjing|ajg|jembot|jembut|asu|cok|jancok|tempek)$/i
handler.command = new RegExp
export default handler