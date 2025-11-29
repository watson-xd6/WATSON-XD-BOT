let handler = async (m, { conn, participants, usedPrefix, command }) => {

    let kickte = `✳️ Correct use of the command\n*${usedPrefix + command}* @tag\n\n*${usedPrefix + command}* 𝗥𝗲𝗺𝗼𝘃𝗲 + 𝗗𝗲𝗹𝗲𝘁𝗲 𝗠𝗦𝗚 + 𝗕𝗹𝗼𝗰𝗸 𝗗𝗠 🚫`

    if (!m.mentionedJid[0] && !m.quoted) return m.reply(kickte, m.chat, { mentions: conn.parseMention(kickte) }) 
    let user = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted.sender
    let owr = m.chat.split`-`[0]

    try {
        let delet = m.message.extendedTextMessage.contextInfo.participant
        let bang = m.message.extendedTextMessage.contextInfo.stanzaId
        await conn.sendMessage(m.chat, { delete: { remoteJid: m.chat, fromMe: false, id: bang, participant: delet }})
    } catch {
        await conn.sendMessage(m.chat, { delete: m.quoted.vM.key })
    }

    await conn.groupParticipantsUpdate(m.chat, [user], 'remove');
    await conn.updateBlockStatus(user, 'block');

    m.reply(`🚷 𝗧𝗮𝗿𝗴𝗲𝘁 𝗘𝗹𝗶𝗺𝗶𝗻𝗮𝘁𝗲𝗱 ❌\n📤 𝗠𝗲𝘀𝘀𝗮𝗴𝗲 𝗗𝗲𝗹𝗲𝘁𝗲𝗱\n🛑 𝗕𝗹𝗼𝗰𝗸𝗲𝗱 𝗶𝗻 𝗗𝗠\n\n𝙈𝙞𝙨𝙨𝙞𝙤𝙣 𝘾𝙤𝙢𝙥𝙡𝙚𝙩𝙚 ✅`);
}

handler.help = ['kick3 @user', 'kkk @user']
handler.tags = ['group']
handler.command = ['kick3', 'ko', 'k3', 'kkk'] 
handler.admin = true
handler.group = true

export default handler;