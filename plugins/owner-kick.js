// Code by Xnuvers007
// https://github.com/Xnuvers007/

import { areJidsSameUser } from '@adiwajshing/baileys'

let handler = async (m, { conn, participants, isAdmin }) => {
    if (!isAdmin) return m.reply('This command can only be used by group admins')

    if (!m.mentionedJid || m.mentionedJid.length === 0) {
        return m.reply('Please mention at least one user to kick')
    }

    let users = m.mentionedJid.filter(u => !areJidsSameUser(u, conn.user.id))
    let kickedUser = []

    for (let user of users) {
        let member = participants.find(v => areJidsSameUser(v.id, user))
        if (user.endsWith('@s.whatsapp.net') && !(member?.admin)) {
            try {
                await conn.groupParticipantsUpdate(m.chat, [user], "remove")
                kickedUser.push(user)
            } catch (e) {
                console.error(`Failed to kick ${user}:`, e)
            }
            await delay(1000) // 1 second delay
        }
    }

    if (kickedUser.length) {
        m.reply(`Successfully kicked:\n${kickedUser.map(u => '@' + u.split('@')[0]).join('\n')}`, null, { mentions: kickedUser })
    } else {
        m.reply('No users were kicked')
    }
}

handler.help = ['kick @user']
handler.tags = ['group']
handler.command = /^(kick)$/i

handler.owner = false
handler.group = true
handler.botAdmin = true
handler.admin = true // Only group admins can use this command

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

export default handler