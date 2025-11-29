import fetch from 'node-fetch'

let handler = async (m, { conn, command, text }) => {
  try {
    const target = m.mentionedJid?.[0] || (m.quoted && m.quoted.sender) || null
    let actor = m.sender.split('@')[0]
    let targetTag = target ? `@${target.split('@')[0]}` : 'themselves'

    const action = "slap"
    // Try primary API
    let url = `https://api.waifu.pics/sfw/${action}`
    let res = await fetch(url)
    let json = null

    if (!res.ok) {
      // fallback to nekos.life
      try {
        const res2 = await fetch(`https://nekos.life/api/v2/img/${action}`)
        json = await res2.json()
      } catch (e) {
        throw new Error('No available image API for action: ' + action)
      }
    } else {
      json = await res.json()
    }

    const img = json.url || json.results?.[0] || null
    const caption = `*${action.toUpperCase()}*\n\n@${actor} ${action}s ${targetTag}`
    await conn.sendMessage(m.chat, {
      image: { url: img },
      caption,
      mentions: target ? [m.sender, target] : [m.sender]
    }, { quoted: m })
  } catch (err) {
    console.error(err)
    m.reply('❌ Could not fetch image for this action. Try again later.')
  }
}

handler.command = /^slap$/i
handler.tags = ['roleplay']
handler.help = ['slap @user']
handler.limit = true

export default handler
