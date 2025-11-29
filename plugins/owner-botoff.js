// owner-botoff.js
let handler = async (m, { conn, isOwner, isAdmin }) => {
  if (!(isOwner || isAdmin)) return dfail('admin', m, conn)

  // Get chat data and initialize it if not found
  let chat = global.db.data.chats[m.chat];

  if (!chat) {
    global.db.data.chats[m.chat] = {};  // Initialize empty chat object
    console.log(`Chat data initialized for: ${m.chat}`);
    chat = global.db.data.chats[m.chat];  // Re-fetch initialized chat data
  }

  // Check if the bot is already deactivated
  if (chat.isBanned) return m.reply('✅ *Bot is already deactivated in this chat.*')

  // Deactivate the bot
  chat.isBanned = true;

  // Send a message notifying the bot has been deactivated
  const msg = `
╭──〔 ⛔ 𝐁𝐎𝐓 𝐃𝐄𝐀𝐂𝐓𝐈𝐕𝐀𝐓𝐄𝐃 🛑 〕──╮
│ ⚡ *All commands are now disabled in this chat.*
│ 🤖 *Bot will ignore messages until reactivated.*
│ 👑 *Controlled by admin/owner.*
╰─────────𒆙─────────╯
`

  await m.reply(msg)

  // Save the updated database
  if (global.db?.save) await global.db.save()
}

handler.help = ['botoff', 'banchat']
handler.tags = ['owner']
handler.command = ['botoff', 'banchat']

export default handler