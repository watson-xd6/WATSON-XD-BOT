import { promises } from 'fs'
import { join } from 'path'
import { xpRange } from '../lib/levelling.js'
import moment from 'moment-timezone'
import { platform as getPlatform } from 'os'

const defaultMenu = {
  before: `
┌┤ *WATSON-XD-BOT* 〕
│ ✦ *Name:* %name
│ ✦ *Number:* %tag
│ ✦ *Status:* %prems
│ ✦ *Limit:* %limit
│ ✦ *Role:* %role
│ ✦ *Level:* %level
╰───────────────⬣
┌┤ *COMMAND INFO* 〕
│✦ *Ⓟ* = Premium
│✦ *Ⓛ* = Limit
╰───────────────⬣
  %readmore
`.trimStart(),
  header: '┌─⦿『 *%category* 』⦿',
  body: '┃⬡▸ %cmd %isPremium %islimit',
  footer: '╰─────────────────⦿',
  after: global.wm,
}

let handler = async (m, { conn, usedPrefix: _p, __dirname }) => {
  try {
    let tags = {
    main: '🧩 Main',
    ai: '🔮 Ai feature',
    stalk: '🏷 Stalk',
    downloader: '📥 Downloader',
    internet: '🇿🇼 Internet',
    anime: '🌛 Anime',
    sticker: '🌧 Sticker',
    tools: '🌿 Tools',
    group: '👨‍👩‍👧‍👧 Group',
    quotes: '🅿️ Quotes',
    nsfw: '🔞 Nsfw',   
    roleplay: '✌️ Roleplay',
    info: '🍃 Info',
    owner: '🌠 Owner',
    }

    let dash = global.dashmenu
    let m1 = global.dmenut
    let m2 = global.dmenub
    let m3 = global.dmenuf
    let m4 = global.dmenub2
    let cc = global.cmenut
    let c1 = global.cmenuh
    let c2 = global.cmenub
    let c3 = global.cmenuf
    let c4 = global.cmenua
    let lprem = global.lopr
    let llim = global.lolm
    let tag = `@${m.sender.split('@')[0]}`

    let ucpn = `${ucapan()}`
    let d = new Date(new Date + 3600000)
    let locale = 'en'
    let week = d.toLocaleDateString(locale, { weekday: 'long' })
    let date = d.toLocaleDateString(locale, {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    })
    let who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender
    let weton = ['Pahing', 'Pon', 'Wage', 'Kliwon', 'Legi'][Math.floor(d / 84600000) % 5]
    let dateIslamic = Intl.DateTimeFormat('en-TN-u-ca-islamic', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    }).format(d)
    let time = d.toLocaleTimeString(locale, {
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric'
    })
    let _uptime = process.uptime() * 1000
    let _muptime
    if (process.send) {
      process.send('uptime')
      _muptime = await new Promise(resolve => {
        process.once('message', resolve)
        setTimeout(resolve, 1000)
      }) * 1000
    }
    let muptime = clockString(_muptime)
    let uptime = clockString(_uptime)

    let { age, exp, limit, level, role, registered, money } = global.db.data.users[m.sender]
    let { min, xp, max } = xpRange(level, global.multiplier)
    let name = await conn.getName(m.sender)
    let premium = global.db.data.users[m.sender].premiumTime
    let prems = `${premium > 0 ? 'Premium' : 'Free'}`
    let sysPlatform = getPlatform()

    let totalreg = Object.keys(global.db.data.users).length
    let rtotalreg = Object.values(global.db.data.users).filter(user => user.registered == true).length
    let help = Object.values(global.plugins).filter(plugin => !plugin.disabled).map(plugin => {
      return {
        help: Array.isArray(plugin.tags) ? plugin.help : [plugin.help],
        tags: Array.isArray(plugin.tags) ? plugin.tags : [plugin.tags],
        prefix: 'customPrefix' in plugin,
        limit: plugin.limit,
        premium: plugin.premium,
        enabled: !plugin.disabled,
      }
    })

    let groups = {}
    for (let tag in tags) {
      groups[tag] = []
      for (let plugin of help)
        if (plugin.tags && plugin.tags.includes(tag))
          if (plugin.help) groups[tag].push(plugin)
    }

    let before = defaultMenu.before
    let header = defaultMenu.header
    let body = defaultMenu.body
    let footer = defaultMenu.footer
    let after = defaultMenu.after

    let _text = [
      before,
      ...Object.keys(tags).map(tag => {
        return header.replace(/%category/g, tags[tag]) + '\n' + [
          ...help.filter(menu => menu.tags && menu.tags.includes(tag) && menu.help).map(menu => {
            return menu.help.map(help => {
              return body.replace(/%cmd/g, menu.prefix ? help : _p + help)
                .replace(/%islimit/g, menu.limit ? llim : '')
                .replace(/%isPremium/g, menu.premium ? lprem : '')
                .trim()
            }).join('\n')
          }),
          footer
        ].join('\n')
      }),
      after
    ].join('\n')

    let replace = {
      uptime, muptime,
      me: conn.getName(conn.user.jid),
      exp: exp - min,
      maxexp: xp,
      totalexp: exp,
      xp4levelup: max - exp,
      tag, dash, m1, m2, m3, m4, cc, c1, c2, c3, c4, lprem, llim,
      ucpn, platform: sysPlatform, money, age, name, prems, level, limit, weton, week, date, dateIslamic, time, totalreg, rtotalreg, role,
      readmore: readMore
    }

    let text = _text.replace(new RegExp(`%(${Object.keys(replace).sort((a, b) => b.length - a.length).join`|`})`, 'g'), (_, name) => '' + replace[name])

    let pp = await conn.profilePictureUrl(who, 'image').catch(_ => 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png');

    const fkontak = { 
      key: { fromMe: false, participant: `0@s.whatsapp.net`, ...(m.chat ? { remoteJid: `status@broadcast` } : {}) }, 
      message: { 'contactMessage': { displayName: name, vcard: `BEGIN:VCARD\nVERSION:3.0\nN:XL;${name},;;;\nFN:${name},\nitem1.TEL;waid=${who.split('@')[0]}:${who.split('@')[0]}\nitem1.X-ABLabell:Phone\nEND:VCARD`, jpegThumbnail: pp, thumbnail: pp, sendEphemeral: true }}
    };

    // Buttons
    const buttons = [
      { buttonId: '.ping', buttonText: { displayText: '🅿️ Ping' }, type: 1 },
      { buttonId: '.owner', buttonText: { displayText: '❤️‍🔥 Owner' }, type: 1 },
      { buttonId: '.menu', buttonText: { displayText: '🌹 Refresh Menu' }, type: 1 }
    ];

    // Send menu as image with caption + buttons
    await conn.sendMessage(m.chat, {
      image: { url: pp },
      caption: text.trim(),
      footer: global.wm,
      buttons: buttons,
      headerType: 4,
      contextInfo: {
        mentionedJid: [m.sender],
        externalAdReply: {
          showAdAttribution: false,
          title: global.wm,
          body: 'I Am An Automated WhatsApp Bot That Can Assist, Search, And Fetch Data/Information Directly.',
          thumbnailUrl: 'https://whatsapp.com/channel/0029Vb5m3D9A2pL6kvlwSf2S',
          sourceUrl: global.sgc,
          mediaType: 1,
          renderLargerThumbnail: true
        }
      }
    }, { quoted: fkontak });

  } catch (e) {
    conn.reply(m.chat, 'Sorry, the menu is currently unavailable', m)
    throw e
  }
}

handler.help = ['menu']
handler.tags = ['main']
handler.command = /^(menu|menux|\?)$/i
handler.register = false 
handler.exp = 3

export default handler

//----------- FUNCTIONS -------

const more = String.fromCharCode(8206)
const readMore = more.repeat(4001)

function clockString(ms) {
  let h = isNaN(ms) ? '--' : Math.floor(ms / 3600000)
  let m = isNaN(ms) ? '--' : Math.floor(ms / 60000) % 60
  let s = isNaN(ms) ? '--' : Math.floor(ms / 1000) % 60
  return [h, ' H ', m, ' M ', s, ' S '].map(v => v.toString().padStart(2, 0)).join('')
}

function ucapan() {
  const time = moment.tz('Africa/Harare').format('HH')
  let res = "Why aren’t you sleeping yet? 🥱"
if (time >= 4) res = "Good Morning 🌄"
if (time >= 10) res = "Good Afternoon ☀️"
if (time >= 15) res = "Good Evening 🌇"
if (time >= 18) res = "Good Night 🌙"
  return res
}
