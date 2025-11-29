const { getBinaryNodeChild, getBinaryNodeChildren } = (await import('@adiwajshing/baileys')).default
import fetch from 'node-fetch'

let handler = async (m, { conn, text, participants, usedPrefix, command }) => {
    if (!text) throw `_Please provide a number!_\nExample:\n\n${usedPrefix + command} ${global.owner[0]}`
    
    m.reply('_Processing..._')

    let _participants = participants.map(user => user.id)
    
    let users = (await Promise.all(
        text.split(',')
            .map(v => v.replace(/[^0-9]/g, ''))
            .filter(v => v.length > 4 && v.length < 20 && !_participants.includes(v + '@s.whatsapp.net'))
            .map(async v => [
                v,
                await conn.onWhatsApp(v + '@s.whatsapp.net')
            ])
    )).filter(v => v[1][0]?.exists)
      .map(v => v[0] + '@c.us')

    const response = await conn.query({
        tag: 'iq',
        attrs: {
            type: 'set',
            xmlns: 'w:g2',
            to: m.chat,
        },
        content: users.map(jid => ({
            tag: 'add',
            attrs: {},
            content: [{ tag: 'participant', attrs: { jid } }]
        }))
    })

    const pp = await conn.profilePictureUrl(m.chat, 'image').catch(() => './src/avatar_contact.png')
    const jpegThumbnail = pp ? await (await fetch(pp)).buffer() : Buffer.alloc(0)

    const addNode = getBinaryNodeChild(response, 'add')
    const participantsNode = getBinaryNodeChildren(response, 'add')

    let failedAdd = participantsNode[0].content.filter(v => v)
    
    if (failedAdd[0].attrs.error == 408) {
        conn.reply(m.chat, `Cannot add @${failedAdd[0].attrs.jid.split('@')[0]}!\nMaybe they recently left the group or were kicked.`, m)
    }

    for (const user of participantsNode[0].content.filter(item => item.attrs.error == 403)) {
        const jid = user.attrs.jid
        const content = getBinaryNodeChild(user, 'add_request')
        const invite_code = content.attrs.code
        const invite_code_exp = content.attrs.expiration
        const txt = `Inviting @${jid.split('@')[0]} via invite link...`
        
        await m.reply(txt, null, {
            mentions: await conn.parseMention(txt)
        })
        
        await conn.sendGroupV4Invite(
            m.chat, 
            jid, 
            invite_code, 
            invite_code_exp, 
            await conn.getName(m.chat), 
            'Invitation to join my WhatsApp group', 
            jpegThumbnail
        )
    }
}

handler.help = ['add', '+'].map(v => v + ' @user')
handler.tags = ['group']
handler.command = /^(add|\+)$/i

handler.admin = true
handler.group = true
handler.botAdmin = true
handler.fail = null

export default handler