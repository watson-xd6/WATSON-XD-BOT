let handler = async (m, { conn, usedPrefix, command }) => {
    // Get the quoted message or the message itself
    let q = m.quoted ? m.quoted : m
    let mime = (q.msg || q).mimetype || ''

    if (/image/.test(mime)) {
        // Download the image
        let img = await q.download()
        if (!img) throw 'Image not found!'

        // Update the group profile picture
        await conn.updateProfilePicture(m.chat, img)
        m.reply('✅ Group profile picture updated successfully.')
    } else {
        throw `Send or reply to an image with the caption *${usedPrefix + command}*`
    }
}

handler.help = ['setpp']
handler.tags = ['group']
handler.command = /^setpp$/i

// Only works in groups
handler.group = true
handler.admin = true
handler.botAdmin = true

export default handler