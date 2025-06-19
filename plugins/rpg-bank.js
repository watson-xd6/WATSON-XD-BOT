import fs from "fs"
let handler = async (m, { conn }) => {
    const who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender
    const user = global.db.data.users[who]
    if (typeof user === 'undefined') return m.reply(`User ${who} not in database`)

    // Menggunakan global.owner sesuai yang Anda beri
    const isMods = global.owner.filter(([number, _, isDeveloper]) => number && isDeveloper).map(([number]) => number).map(v => v.replace(/[^0-9]/g, '') + '@s.whatsapp.net').includes(who)
    const isOwner = m.fromMe || isMods || [conn.decodeJid(global.conn.user.id), ...global.owner.filter(([number, _, isDeveloper]) => number && !isDeveloper).map(([number]) => number)].map(v => v.replace(/[^0-9]/g, '') + '@s.whatsapp.net').includes(who)
    const isPrems =  isOwner || new Date() - user.premiumTime < 0

    const caption = `
▧「 *BANK INFO* 」
│ Name: ${user.registered ? user.name : conn.getName(m.sender)}
│ Status: ${isMods ? 'Developer' : isOwner ? 'Owner' : isPrems ? 'Premium User' : user.level > 999 ? 'Elite User' : 'Free User'}
│ Registered: ${user.registered ? 'Yes' : 'No'}
│ 
│ Atm: ${user.atm > 0 ? 'Level ' + toRupiah(user.atm) : '✖️'}
│ Bank: ${toRupiah(user.bank)} / ${toRupiah(user.fullatm)}
│ Money: ${toRupiah(user.money)}
│ Chip: ${toRupiah(user.chip)}
│ Robo: ${user.robo > 0 ? 'Level ' + user.robo : '✖️'}
└────···
`.trim()

    const thumbnail = 'https://files.catbox.moe/c67nx0.jpg' // URL gambar yang baru
    await conn.sendFile(m.chat, thumbnail, 'BANK INFO', caption, m)
}
handler.help = ['bank']
handler.tags = ['rpg']
handler.command = /^(bank)$/i
handler.register = true
handler.group = true
handler.rpg = true
export default handler

const toRupiah = number => parseInt(number).toLocaleString().replace(/,/gi, ".")