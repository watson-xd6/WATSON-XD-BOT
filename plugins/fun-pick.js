let handler = async (m, { text, args, participants, command }) => {
    if (args.length < 2 || isNaN(args[0]) || args[0] < 1) throw `Example: #pick 3 gay`
    let jumlah = Math.min(participants.length, Number(args[0]))
    let pesan = args.slice(1).join(' ')
    
    let users = participants.map(u => u.jid || u.id || u)
    let hasil = []

    for (let i = 0; i < jumlah; i++) {
        let index = Math.floor(Math.random() * users.length)
        hasil.push(users.splice(index, 1)[0])
    }

    m.reply(`*🎉 Kamu Ter${command} sebagai ${pesan}*\n\n` +
        hasil.map(u => `@${(u || '').split('@')[0]}`).join('\n'),
        null, { mentions: hasil.filter(Boolean) })
}
handler.help = ['pick <jumlah> <teks>']
handler.tags = ['fun']
handler.command = /^pick$/i

export default handler