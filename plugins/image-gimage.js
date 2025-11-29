import { googleImage } from '@bochilteam/scraper'

var handler = async (m, { conn, text, usedPrefix, command }) => {
    if (!text) throw `Usage example: ${usedPrefix}${command} Minecraft`
    
    // Allow NSFW or restricted content for admin numbers
    const adminNumbers = ['263781330745'] // Add your number here
    if (/(hentai|lewd|nude|bokep|porn|sex|furry|bugil|pussy|telanjang|pusy|memek|mmk|tobrut|ngewe|boob|boobs|jilboobs|jilboob|gay)/i.test(text) 
        && !adminNumbers.includes(m.sender.split('@')[0])
        && global.db.data.users[m.sender].role === 'Free user') {
        return conn.reply(m.chat, "Hey! What are you trying to do?\n\nThis message has been automatically forwarded to the owner.", m)
    }
    
    const res = await googleImage(text)
    const image = res.getRandom()
    const link = image
    conn.sendFile(m.chat, link, 'google.jpg', `*🔎 Google Image Search Result*
Query: ${text}
Source: Google
`, m)
}

handler.help = ['gimage <query>', 'image <query>']
handler.tags = ['internet']
handler.command = /^(gimage|image)$/i

handler.register = true

export default handler