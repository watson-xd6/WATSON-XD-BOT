let handler = async (m, { conn }) => {
    try {
        let who = m.mentionedJid && m.mentionedJid.length > 0 ? m.mentionedJid[0] : m.sender

        let pp
        try {
            pp = await conn.profilePictureUrl(who, 'image')
        } catch {
            pp = 'https://files.catbox.moe/ifx2y7.png'
        }

        let caption = `Foto profil @${who.split`@`[0]}`
        await conn.sendFile(m.chat, pp, 'profile.jpg', caption, m, null, { mentions: [who] })
    } catch (e) {
        console.error(e)
        m.reply("Tidak dapat mengambil foto profil.")
    }
}

handler.help = ['getprofile']
handler.tags = ['tools']
handler.command = /^(get(pp|profile))$/i
handler.group = true

export default handler