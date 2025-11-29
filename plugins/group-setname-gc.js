let handler = async (m, { conn, args, usedPrefix, command }) => {
    if (!args.length) throw `Please provide a new group name!\n\nExample: ${usedPrefix + command} My New Group Name`;

    // Update the group subject (name)
    await conn.groupUpdateSubject(m.chat, `${args.join(" ")}`);
    m.reply('✅ Successfully changed the group name!');
}

handler.help = ['setnamegc <text>']
handler.tags = ['group']
handler.command = /^setnamegc$/i

// Group-only and admin restrictions
handler.group = true
handler.admin = true
handler.botAdmin = true

// Other flags
handler.owner = false
handler.mods = false
handler.premium = false
handler.private = false
handler.register = false

export default handler