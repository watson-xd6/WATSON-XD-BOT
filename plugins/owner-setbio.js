let handler = async (m, { conn, text }) => {
  if (!text) throw `Please provide text for the new bot bio`
  
  try {
    await conn.updateProfileStatus(text).catch(_ => _)
    conn.reply(m.chat, 'Successfully changed the bot bio', m)
  } catch {
    throw 'Oops, there was an error.. :D'
  }
}

handler.help = ['setbio']
handler.tags = ['owner']
handler.command = /^(setbio)$/i
handler.owner = true

export default handler