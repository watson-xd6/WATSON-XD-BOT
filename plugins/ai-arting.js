import fetch from 'node-fetch'
import { fileTypeFromBuffer } from 'file-type'

let handler = async (m, { conn, text, command }) => {
  if (!text) return m.reply(`Contoh: .${command} cewek`)

  let loading = await m.reply('Bentar yaa...')

  try {
    const res = await fetch(`https://velyn.biz.id/api/ai/arting?prompt=${encodeURIComponent(text)}&apikey=velyn`)
    const buffer = await res.buffer()

    const type = await fileTypeFromBuffer(buffer)
    if (!type || !type.mime.startsWith('image/')) {
      return m.reply('Gagal: respon bukan gambar.')
    }

    await conn.sendMessage(m.chat, {
      image: buffer,
      caption: `Prompt: ${text}`,
    }, { quoted: m })

    if (conn.deleteMessage) await conn.deleteMessage(m.chat, loading.key)

  } catch (err) {
    console.error('FETCH ERROR:', err)
    m.reply('Terjadi kesalahan saat ambil gambar.')
  }
}

handler.command = ['arting']
handler.tags = ['ai']
handler.help = ['.arting <prompt>']

export default handler