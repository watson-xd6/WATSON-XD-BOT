/*
📌 Nama Fitur: Brat 
🏷️ Type : Plugin ESM
🔗 Sumber : https://whatsapp.com/channel/0029Vb91Rbi2phHGLOfyPd3N
🔗 Api : https://flowfalcon.dpdns.org
✍️ Convert By ZenzXD
*/

import { sticker } from '../lib/sticker.js'
import axios from 'axios'

let handler = async (m, { conn, usedPrefix, command, text }) => {
  const query = text || m.quoted?.text || m.quoted?.caption || m.quoted?.description
  if (!query) throw `Masukkan teks, contoh:\n\n${usedPrefix + command} zenzz XD`
  m.react('🕐')

  try {
    let url = `https://flowfalcon.dpdns.org/imagecreator/brat?text=${encodeURIComponent(query)}`
    let res = await axios.get(url, { responseType: 'arraybuffer', timeout: 15000 })

    let brat = await sticker(res.data, false, global?.info?.packname ?? m.name ?? '', global.info.author)
    await conn.sendFile(m.chat, brat, null, { asSticker: true }, m)
    m.react('✅')
  } catch (err) {
    console.error(err)
    m.reply(`❌ Terjadi kesalahan saat membuat stiker.`)
  }
}

handler.help = ['brat <text>']
handler.command = ['brat']
handler.tags = ['sticker']
handler.limit = false

export default handler