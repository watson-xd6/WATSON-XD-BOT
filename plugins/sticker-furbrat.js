import { sticker } from '../lib/sticker.js'
import axios from 'axios'

let handler = async (m, { conn, usedPrefix, command, text }) => {
  const query = text || m.quoted?.text || m.quoted?.caption || m.quoted?.description
  if (!query) throw `Masukkan teks, contoh:\n\n${usedPrefix + command} Hi, my name is zenn`
  m.react('🕐')

  try {
    let url = `https://fastrestapis.fasturl.cloud/maker/furbrat?text=${encodeURIComponent(query)}&position=center&mode=image`
    let res = await axios.get(url, {
      responseType: 'arraybuffer',
      timeout: 10000
    })
    let contentType = res.headers['content-type']
    if (!contentType || !contentType.startsWith('image/')) throw 'API tidak mengembalikan gambar.'

    let furbrat = await sticker(res.data, null, global?.info?.packname ?? m.name ?? '', global.info.author)
    await conn.sendFile(m.chat, furbrat, null, { asSticker: true }, m)
    m.react('✅')
  } catch (err) {
    console.error(err)
    m.reply(`❌ Terjadi kesalahan: ${err.message}`)
  }
}

handler.help = ['furbrat <text>']
handler.command = ['furbrat']
handler.tags = ['sticker']
handler.limit = false

export default handler