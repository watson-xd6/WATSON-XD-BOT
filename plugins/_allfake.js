import fs from 'fs'
import moment from 'moment-timezone'

const thumbPath = fs.readFileSync("./watson.webp")

let handler = m => m
handler.all = async function (m) {
    const pp = await this.profilePictureUrl(m.sender, 'image').catch(e => './src/avatar_contact.png')

    global.doc = pickRandom([
        "application/vnd.ms-excel",
        "application/vnd.openxmlformats-officedocument.presentationml.presentation",
        "application/msword",
        "application/pdf"
    ])

    global.fetch = (await import('node-fetch')).default
    global.fs = fs

    global.greeting = greetingMessage()
    global.ephemeral = ''

    // Standard external ad reply
    global.adReply = {
        contextInfo: {
            forwardingScore: 256,
            isForwarded: false,
            externalAdReply: {
                title: global.greeting,
                body: wm,
                mediaUrl: sgw,
                description: namebot,
                previewType: "PHOTO",
                thumbnail: thumbPath,
                sourceUrl: sgw,
            }
        }
    }

    // Ad reply using sender profile picture
    global.sfb = {
        contextInfo: {
            externalAdReply: {
                title: global.greeting,
                body: wm,
                thumbnailUrl: pp,
                sourceUrl: sfb
            }
        }
    }

    // Order message
    global.ftroli = {
        key: {
            remoteJid: 'status@broadcast',
            participant: '0@s.whatsapp.net'
        },
        message: {
            orderMessage: {
                itemCount: 999999999999999,
                status: 1,
                surface: 1,
                message: wm,
                orderTitle: wm,
                sellerJid: '0@s.whatsapp.net'
            }
        }
    }

    // Contact message
    global.fkontak = {
        key: {
            fromMe: false,
            participant: `0@s.whatsapp.net`,
            ...(m.chat ? { remoteJid: `status@broadcast` } : {})
        },
        message: {
            contactMessage: {
                displayName: wm,
                vcard: `BEGIN:VCARD\nVERSION:3.0\nN:XL;${wm},;;;\nFN:${wm},\nitem1.TEL;waid=${m.sender.split('@')[0]}:${m.sender.split('@')[0]}\nitem1.X-ABLabel:Phone\nEND:VCARD`,
                jpegThumbnail: thumbPath,
                thumbnail: thumbPath,
                sendEphemeral: true
            }
        }
    }

    // Voice note placeholder
    global.fvn = {
        key: {
            fromMe: false,
            participant: `0@s.whatsapp.net`,
            ...(m.chat ? { remoteJid: "263781330745@g.us" } : {})
        },
        message: {
            audioMessage: {
                mimetype: "audio/ogg; codecs=opus",
                seconds: "999999999999",
                ptt: "true"
            }
        }
    }

    // Extended text message
    global.ftextt = {
        key: {
            fromMe: false,
            participant: `0@s.whatsapp.net`,
            ...(m.chat ? { remoteJid: "263781330745@g.us" } : {})
        },
        message: {
            extendedTextMessage: {
                text: wm,
                title: wm,
                jpegThumbnail: thumbPath
            }
        }
    }

    // Live location messages
    global.fliveLoc = {
        key: {
            fromMe: false,
            participant: `0@s.whatsapp.net`,
            ...(m.chat ? { remoteJid: "status@broadcast" } : {})
        },
        message: {
            liveLocationMessage: {
                caption: "by: WATSON MODS DEV",
                h: wm,
                jpegThumbnail: thumbPath
            }
        }
    }

    global.fliveLoc2 = {
        key: {
            fromMe: false,
            participant: `0@s.whatsapp.net`,
            ...(m.chat ? { remoteJid: "status@broadcast" } : {})
        },
        message: {
            liveLocationMessage: {
                title: "WATSON MODS DEV",
                h: wm,
                jpegThumbnail: thumbPath
            }
        }
    }

    // Product message
    global.ftoko = {
        key: {
            fromMe: false,
            participant: `0@s.whatsapp.net`,
            ...(m.chat ? { remoteJid: "263781330745@s.whatsapp.net" } : {})
        },
        message: {
            productMessage: {
                product: {
                    productImage: {
                        mimetype: "image/jpeg",
                        jpegThumbnail: thumbPath
                    },
                    title: wm,
                    description: "Simple Bot Example",
                    currencyCode: "USD",
                    priceAmount1000: "20000000",
                    retailerId: "Ghost",
                    productImageCount: 1
                },
                businessOwnerJid: `0@s.whatsapp.net`
            }
        }
    }

    // Document message
    global.fdocs = {
        key: {
            participant: '0@s.whatsapp.net'
        },
        message: {
            documentMessage: {
                title: wm,
                jpegThumbnail: thumbPath
            }
        }
    }

    // Group invite message
    global.fgclink = {
        key: {
            fromMe: false,
            participant: "0@s.whatsapp.net",
            remoteJid: "0@s.whatsapp.net"
        },
        message: {
            groupInviteMessage: {
                groupJid: "263781330745@g.us",
                inviteCode: "null",
                groupName: "WATSON MODS DEV Friends",
                caption: wm,
                jpegThumbnail: thumbPath
            }
        }
    }

    // GIF message
    global.fgif = {
        key: {
            fromMe: false,
            participant: `0@s.whatsapp.net`,
            ...(m.chat ? { remoteJid: "263781330745@g.us" } : {})
        },
        message: {
            videoMessage: {
                title: wm,
                h: `Hmm`,
                seconds: '999999999',
                gifPlayback: 'true',
                caption: wm,
                jpegThumbnail: thumbPath
            }
        }
    }
}

export default handler

function greetingMessage() {
    const hour = moment.tz('Africa/Harare').format('HH')
    let res = "Good night 🌙"
    if (hour >= 4) res = "Good morning 🌄"
    if (hour > 10) res = "Good afternoon ☀️"
    if (hour >= 15) res = "Good evening 🌅"
    if (hour >= 18) res = "Good night 🌙"
    return res
}

function pickRandom(list) {
    return list[Math.floor(list.length * Math.random())]
}