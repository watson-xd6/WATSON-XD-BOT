let handler = async (m, { conn, groupMetadata, usedPrefix, text, command }) => {
    if (!text && !m.quoted) return m.reply("Please provide input text or reply to a message")

    // Get all participants with IDs ending in '.net'
    let recipients = groupMetadata.participants
        .filter(v => v.id.endsWith('.net'))
        .map(v => v.id)

    let totalCount = recipients.length
    let sentCount = 0
    m.reply('Please wait...')

    for (let i = 0; i < recipients.length; i++) {
        setTimeout(function() {
            if (text && !m.quoted) {
                conn.sendMessage(recipients[i], { text: text })
            } else if (m.quoted && !text) {
                conn.copyNForward(recipients[i], m.getQuotedObj(), false)
            } else if (text && m.quoted) {
                conn.sendMessage(recipients[i], { text: text + "\n" + m.quoted.text })
            }

            totalCount--
            sentCount++

            if (totalCount === 0) {
                m.reply(`Successfully pushed contacts:\nMessages sent: *${sentCount}*`)
            }
        }, i * 1000) // delay 1 second per message
    }
}

handler.help = ['pushcontacts']
handler.tags = ['owner']
handler.command = /^(pushkontak)$/i

handler.owner = true
handler.group = true

export default handler