let handler = async (m, { conn, text, usedPrefix, command }) => {
    if (!text) throw `If you find an error message, report it using this command.\n\nExample:\n${usedPrefix + command} Good afternoon owner, I found an error like this <copy/tag the error message>`
    
    if (text.length < 10) throw `Report too short, minimum 10 characters!`
    if (text.length > 1000) throw `Report too long, maximum 1000 characters!`
    
    let reportText = `*${command.toUpperCase()}!*\n\nFrom: *@${m.sender.split`@`[0]}*\n\nMessage: ${text}\n`
    
    conn.reply(global.nomorown + '@s.whatsapp.net', m.quoted ? reportText + m.quoted.text : reportText, null, {
        contextInfo: {
            mentionedJid: [m.sender]
        }
    })
    
    m.reply(`_Message sent to the bot owner. If the ${command.toLowerCase()} is just for fun, it will not be responded to._`)
}

handler.help = ['report', 'request'].map(v => v + ' <text>')
handler.tags = ['info']
handler.command = /^(report|request)$/i

handler.register = true
handler.disable = false

export default handler