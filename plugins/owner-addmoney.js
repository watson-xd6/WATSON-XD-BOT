let handler = async (m, { conn, command, text, args }) => {
    if (!text) throw 'Berapa Money?'
    let who
    if (m.isGroup) who = m.mentionedJid[0]
    else who = m.chat
    if (!who) throw 'Tag??'
    let users = global.db.data.users
    users[who].money += 1000
    conn.reply(m.chat, 'Sukses', m)
}
handler.help = ['addmoney']
handler.tags = ['owner']
handler.command = /^addmoney(user)?$/i
handler.rowner = true

export default handler