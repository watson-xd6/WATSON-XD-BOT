/*

# Fitur : Sewa Bot Group
# Type : Plugins ESM
# Created by : https://whatsapp.com/channel/0029Vb2qri6JkK72MIrI8F1Z
# Api : Lokal DB

   ⚠️ _Note_ ⚠️
jangan hapus wm ini banggg

*/

import { generateWAMessageFromContent } from '@adiwajshing/baileys'

let handler = async (m, { conn, args, usedPrefix, command }) => {
    if (!args[0]) return m.reply(`Masukkan durasi sewa!\n\nContoh:\n- *${usedPrefix + command} 1d2h30m* (dalam grup)\n- *${usedPrefix + command} https://chat.whatsapp.com/xxxxx 1d* (chat pribadi)`)

    let isFromGroupLink = args[0].includes('https://chat.whatsapp.com')
    let durationStr = isFromGroupLink ? args[1] : args[0]
    if (!durationStr) return m.reply(`Masukkan durasi waktu setelah link grup.`)

    let msDuration = parseDuration(durationStr)
    if (!msDuration) return m.reply(`❌ Format durasi tidak valid!\nGunakan format seperti *1d2h30m*`)

    let groupId, groupName = ''
    if (isFromGroupLink) {
        let inviteCode = args[0].split('https://chat.whatsapp.com/')[1]
        if (!inviteCode) return m.reply(`❌ Link grup tidak valid!`)
        try {
            groupId = await conn.groupAcceptInvite(inviteCode)
            let metadata = await conn.groupMetadata(groupId)
            groupName = metadata.subject
        } catch (e) {
            return m.reply(`❌ Tidak bisa join grup!\n\nLogs error : ${e}`)
        }
    } else {
        if (!m.isGroup) return m.reply(`Command ini hanya bisa di grup atau gunakan link grup dari chat pribadi!`)
        groupId = m.chat
        let metadata = await conn.groupMetadata(groupId)
        groupName = metadata.subject
    }

    if (!global.db.data.chats[groupId]) global.db.data.chats[groupId] = {}

    let now = Date.now()
    let data = global.db.data.chats[groupId]

    if (data.expired && data.expired > now) {
        data.expired += msDuration
    } else {
        data.expired = now + msDuration
    }

    let waktuSisa = msToDate(data.expired - now)

    let teksInfo = `
*「 SEWA BOT BERHASIL 」*

*Informasi Grup:*
• Nama: ${groupName}
• ID: ${groupId}
• Durasi: ${durationStr.toUpperCase()}
• Sisa Waktu: ${waktuSisa}

*Fasilitas Sewa:*
• Akses premium ke 400+ fitur
• Anti-banned proteksi
• Fast respon bot 24/7
• Sistem prioritas server

Terima kasih telah menggunakan layanan kami.
`.trim()

    if (isFromGroupLink) {
        let msg = generateWAMessageFromContent(groupId, {
            interactiveMessage: {
                body: { text: teksInfo },
                footer: { text: 'Bot ini aktif karena sewa grup.' },
                nativeFlowMessage: {
                    buttons: [
                        {
                            name: 'quick_reply',
                            buttonParamsJson: JSON.stringify({
                                display_text: '👋 Hallo, selamat datang bot',
                                id: '.'
                            })
                        },
                        {
                            name: 'quick_reply',
                            buttonParamsJson: JSON.stringify({
                                display_text: '👋 Haiiii',
                                id: '.'
                            })
                        }
                    ]
                }
            }
        }, {})

        await conn.relayMessage(groupId, msg.message, { messageId: msg.key.id })
    } else {
        conn.reply(groupId, teksInfo, null)
    }

    if (m.chat !== groupId) {
        conn.reply(m.chat, `✅ Sewa berhasil ditambahkan untuk grup *${groupName}*\nSisa Waktu: ${waktuSisa}`, m)
    }

    setTimeout(async () => {
        let msg = generateWAMessageFromContent(groupId, {
            interactiveMessage: {
                body: {
                    text: `⏰ *Waktu sewa telah habis!*\nBot akan keluar dari grup. Terima kasih telah menggunakan layanan kami.`
                },
                footer: { text: 'Silakan hubungi owner untuk sewa ulang' },
                nativeFlowMessage: {
                    buttons: [
                        {
                            name: 'quick_reply',
                            buttonParamsJson: JSON.stringify({
                                display_text: '👋 Sayonara bot',
                                id: '.'
                            })
                        },
                        {
                            name: 'quick_reply',
                            buttonParamsJson: JSON.stringify({
                                display_text: '👋 Selamat tinggal bot',
                                id: '.'
                            })
                        }
                    ]
                }
            }
        }, {})

        await conn.relayMessage(groupId, msg.message, { messageId: msg.key.id })
        await conn.groupLeave(groupId)
        delete global.db.data.chats[groupId]
    }, data.expired - now)
}

handler.help = ['addsewa']
handler.tags = ['owner']
handler.command = /^(addsewa|setsewa|addexpired|setexpired)$/i
handler.owner = true

export default handler

function parseDuration(str) {
    let total = 0
    let match
    let regex = /(\d+)([dhm])/g
    while ((match = regex.exec(str)) !== null) {
        let [, num, unit] = match
        num = parseInt(num)
        switch (unit) {
            case 'd': total += num * 86400000; break
            case 'h': total += num * 3600000; break
            case 'm': total += num * 60000; break
        }
    }
    return total
}

function msToDate(ms) {
    let d = Math.floor(ms / 86400000)
    let h = Math.floor((ms % 86400000) / 3600000)
    let m = Math.floor((ms % 3600000) / 60000)
    return `${d} Hari, ${h} Jam, ${m} Menit`
}