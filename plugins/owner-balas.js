import fs from 'fs'
import fetch from 'node-fetch'
import moment from 'moment-timezone'

let handler = async (m, { conn, text, usedPrefix, command }) => {
    conn.ownreply = conn.ownreply ? conn.ownreply : {}
    if (!text) throw `*Usage:*\n\n${usedPrefix + command} number|message\n\n*Example:* ${usedPrefix + command} ${m.sender.split`@`[0]}|Hello.`;
    
    let [jid, message] = text.split('|');
    if (!jid || !message) throw `*Usage:*\n\n${usedPrefix + command} number|message\n\n*Example:* ${usedPrefix + command} ${m.sender.split`@`[0]}|Hello.`;
    
    jid = jid.replace(/[^0-9]/g, '') + '@s.whatsapp.net';
    let data = (await conn.onWhatsApp(jid))[0] || {};
    if (!data.exists) throw 'The number is not registered on WhatsApp.';
    
    // Uncomment this if you want to prevent sending messages to yourself
    // if (jid === m.sender) throw 'Cannot send a message to yourself.';
    
    let mf = Object.values(conn.ownreply).find(mf => mf.status === true)
    if (mf) return !0

    try {
        let id = + new Date()
        let txt = `Hi @${data.jid.split('@')[0]}, you received a message from: *Owner*\nMessage: \n${message}`.trim();

        conn.relayMessage(data.jid, {
            extendedTextMessage: {
                text: txt, 
                contextInfo: {
                    mentionedJid: [data.jid],
                    externalAdReply: {
                        title: 'SYSTEM',
                        mediaType: 1,
                        previewType: 0,
                        sourceUrl: ''
                    }
                }
            }
        }, {}).then(() => {
            m.reply('Message successfully sent.')
            conn.ownreply[id] = {
                id,
                from: m.sender,
                to: data.jid,
                message: message,
                status: false
            }
            return !0
        })
    } catch (e) {
        console.log(e)
        return m.reply('Error sending message.')
    }
}

handler.help = ['reply'].map(v => v + ' <number|message>')
handler.tags = ['owner']
handler.command = /^(reply|balas)/i
handler.owner = true
handler.fail = null

export default handler