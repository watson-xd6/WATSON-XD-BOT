import { areJidsSameUser } from '@adiwajshing/baileys'

let handler = async (m, { conn, args }) => {
    let group = m.chat
    // If a group ID is provided as argument, use it
    if (/^[0-9]{5,16}-?[0-9]+@g\.us$/.test(args[0])) group = args[0]

    if (!/^[0-9]{5,16}-?[0-9]+@g\.us$/.test(group)) 
        throw 'This command can only be used in a group.'

    const groupMetadata = await conn.groupMetadata(group)
    if (!groupMetadata) throw 'Failed to fetch group metadata.'
    if (!('participants' in groupMetadata)) throw 'Group participants not defined.'

    const me = groupMetadata.participants.find(user => areJidsSameUser(user.id, conn.user.id))
    if (!me) throw 'I am not in that group.'
    if (!me.admin) throw 'I am not an admin in that group.'

    const inviteCode = await conn.groupInviteCode(group)
    m.reply(`🔗 Group Invite Link:\nhttps://chat.whatsapp.com/${inviteCode}`)
}

handler.help = ['link']
handler.tags = ['group']
handler.command = /^link(gro?up)?$/i

export default handler