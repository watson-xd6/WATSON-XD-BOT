import fs from 'fs'
import fetch from 'node-fetch'
import moment from 'moment-timezone'
import { uploadPomf } from '../lib/uploadImage.js'

let handler = async (m, { conn, text, usedPrefix, command }) => {
    conn.ownreply = conn.ownreply ? conn.ownreply : {}
    if (!text) throw `*Usage:*\n\n${usedPrefix + command} number|message\n\n*Example:* ${usedPrefix + command} ${m.sender.split`@`[0]}|Hello.`;
    
    let [jid, message] = text.split('|');
    if ((!jid || !message)) throw `*Usage:*\n\n${usedPrefix + command} number|message\n\n*Example:* ${usedPrefix + command} ${m.sender.split`@`[0]}|Hello.`;
    
    jid = jid.replace(/[^0-9]/g, '') + '@s.whatsapp.net';
    let data = (await conn.onWhatsApp(jid))[0] || {};
    if (!data.exists) throw 'The number is not registered on WhatsApp.';

    // if (jid == m.sender) throw 'Cannot send a message to yourself.'

    let mf = Object.values(conn.ownreply).find(mf => mf.status === true)
    if (mf) return !0

    try {
        let q = m.quoted ? m.quoted : m
        let media = await q.download()
        let gambar = await uploadPomf(media)
        let id = + new Date
        let imagePath = `${gambar}`;
        let txt = `Hi @${data.jid.split('@')[0]}, you received a message from: *Owner*\nMessage: \n${message}`.trim();
        await conn.sendFile(data.jid, imagePath, 'image.jpg', txt, m);
        conn.ownreply[id] = {
            id,
            from: m.sender,
            to: data.jid,
            message: message,
            status: false
        }
        await m.reply('Successfully sent the message with media.')
        return !0;
    } catch (e) {
        console.log(e)
        return m.reply('Where is the image?');
    }
}

handler.help = ['balas-img'].map(v => v + ' <number|message>')
handler.tags = ['owner']
handler.command = /^(balas-img|reply-img)/i
handler.owner = true
handler.fail = null

export default handler