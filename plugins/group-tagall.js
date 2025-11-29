import { generateWAMessageFromContent } from '@adiwajshing/baileys'

let handler = async (m, { conn, text, participants }) => {
    // Get all group members except the bot itself
    let users = participants.map(u => u.id).filter(v => v !== conn.user.jid)

    if (text || m.quoted?.text) {
        // Compose the message showing the text and tagging all members
        m.reply(`Message content: _*${text ? `${text}*_\n` : ''}\n\n\n┌─「 Tag All 」\n` +
            users.map(v => '│◦❒ @' + v.replace(/@.+/, '')).join`\n` +
            '\n└────', null, { mentions: users })

        // Decode all participant JIDs
        let usersDecode = participants.map(u => conn.decodeJid(u.id))
        let q = m.quoted ? m.quoted : m
        let c = m.quoted ? m.quoted : m.msg

        // Modify the message with mentions
        const msg = conn.cMod(m.chat,
            generateWAMessageFromContent(m.chat, {
                [c.toJSON ? q.mtype : 'extendedTextMessage']: c.toJSON ? q.toJSON() : { text: c || '' }
            }, { quoted: m, userJid: conn.user.jid }),
            text || q.text, conn.user.jid, { mentions: usersDecode }
        )

        await conn.relayMessage(m.chat, msg.message, { messageId: msg.key.id })
    } else {
        m.reply("Reply to a message or type the text you want to tag everyone with.")
    }
}

handler.help = ['tagall']
handler.tags = ['group']
handler.command = ['tagall']
handler.admin = true
handler.group = true

export default handler