// owner-boton.js
let handler = async (m, { conn, isOwner, isAdmin }) => {
  if (!(isOwner || isAdmin)) return dfail('admin', m, conn)

  // Get chat data and initialize it if not found
  let chat = global.db.data.chats[m.chat];

  // Initialize chat data if it doesn't exist
  if (!chat) {
    global.db.data.chats[m.chat] = {};  // Initialize an empty object for the chat data
    console.log(`Chat data initialized for: ${m.chat}`);
    chat = global.db.data.chats[m.chat];  // Re-fetch the initialized chat data
  }

  // Check if the bot is already active
  if (!chat.isBanned) return m.reply('✅ *Bot is already active in this chat.*')

  // Reactivate the bot
  chat.isBanned = false;

  // Send a message notifying the bot has been activated
  const msg = `
╭──〔 ✅ 𝐁𝐎𝐓 𝐀𝐂𝐓𝐈𝐕𝐀𝐓𝐄𝐃 🚀 〕──╮
│ ⚡ *All commands are now active again!*
│ 🤖 *Bot is re-enabled and ready to use.*
│ 👑 *Thank you, admin/owner.*
╰─────────𒆙─────────╯
`

  await m.reply(msg)

  // Save the updated database
  if (global.db?.save) await global.db.save()
}

handler.help = ['boton']
handler.tags = ['owner']
handler.command = ['boton']

export default handler