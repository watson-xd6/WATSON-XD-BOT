let handler = async (m, { conn, usedPrefix, command }) => {
  // Get all users with their limits
  let users = Object.entries(global.db.data.users)
    .map(([jid, data]) => ({ jid, limit: data.limit || 0 })) // default to 0 if no limit
    .sort((a, b) => b.limit - a.limit) // sort descending by limit
    .slice(0, 10) // take top 10

  if (users.length === 0) return m.reply('❌ No limit data available.')

  // Build the text message
  let text = `🏆 *Top Limit Users*\n\n`
  users.forEach((user, i) => {
    let name = (conn.getName ? conn.getName(user.jid) : user.jid) || user.jid
    text += `${i + 1}. *${name}* — ${user.limit} limit\n`
  })

  m.reply(text)
}

handler.help = ['toplimit']
handler.tags = ['info']
handler.command = /^toplimit$/i
handler.limit = false

export default handler
