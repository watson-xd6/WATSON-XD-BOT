let handler = async (m, { conn }) => {  
    if (!m.quoted) throw 'Reply to the channel message first'  
    try {  
        let id = (await m.getQuotedObj()).msg.contextInfo.forwardedNewsletterMessageInfo  
        await m.reply(`Name: ${id.newsletterName}\nID: ${id.newsletterJid}`)  
    } catch (e) {  
        throw 'It must be a message forwarded from a channel'  
    }  
}  
  
handler.help = handler.command = ['ci']  
handler.tags = ['tools']  
  
handler.register = true  
  
export default handler