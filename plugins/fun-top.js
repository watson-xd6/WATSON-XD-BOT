let handler = async (m, { groupMetadata, command, usedPrefix, text }) => {
    if (!text) return m.reply(`Contoh:\n${usedPrefix + command} pengcoli`)
    let ps = groupMetadata.participants.map(v => v.id)
    let a = ps.getRandom()
    let b = ps.getRandom()
    let c = ps.getRandom()
    let d = ps.getRandom()
    let e = ps.getRandom()
    let f = ps.getRandom()
    let g = ps.getRandom()
    let h = ps.getRandom()
    let i = ps.getRandom()
    let j = ps.getRandom()
    let x = `${pickRandom(['😨', '😅', '😂', '😳', '😎', '🥵', '😱', '🐦', '🙄', '🐤', '🗿', '🐦', '🤨', '🥴', '😐', '👆', '😔', '👀', '👎'])}`
    let top = `*${x} Top 10 ${text} ${x}*

*1. @${a.split('@')[0]}*
*2. @${b.split('@')[0]}*
*3. @${c.split('@')[0]}*
*4. @${d.split('@')[0]}*
*5. @${e.split('@')[0]}*
*6. @${f.split('@')[0]}*
*7. @${g.split('@')[0]}*
*8. @${h.split('@')[0]}*
*9. @${i.split('@')[0]}*
*10. @${j.split('@')[0]}*`.trim()
    
    m.reply(top, null, { mentions: [a, b, c, d, e, f, g, h, i, j] })
}
handler.help = ['top']
handler.tags = ['fun']
handler.command = /^top$/i
handler.group = true
export default handler

function pickRandom(list) {
    return list[Math.floor(Math.random() * list.length)]
}