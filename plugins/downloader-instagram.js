import axios from 'axios'

let handler = async (m, { conn, text, usedPrefix, command }) => {
  const prefix = usedPrefix || '.'
  const cmd = command || 'ig'

  if (!text) return m.reply(`📌 Masukkan URL Instagram!\nContoh: ${prefix + cmd} https://www.instagram.com/p/xxxxxx/`)

  if (m._igHandled) return
  m._igHandled = true

  try {
    const { data } = await axios.get(`https://flowfalcon.dpdns.org/download/instagram?url=${encodeURIComponent(text)}`)
    if (!data?.status || !data.result?.downloadUrls?.length) throw '❌ Gagal mengambil data dari Instagram!'

    const { title, downloadUrls } = data.result

    if (downloadUrls.length > 1) {
      await m.reply(`📤 Postingan ini memiliki ${downloadUrls.length} media. Mengirim ke private chat kamu...`)

      for (const url of downloadUrls) {
        await conn.sendFile(m.sender, url, null, `📥 *Instagram Media*\n\n*Judul:* ${title || 'Tanpa judul'}`)
      }
    } else {
      await conn.sendFile(m.chat, downloadUrls[0], null, `📥 *Instagram Downloader*\n\n*Judul:* ${title || 'Tanpa judul'}`, m)
    }

  } catch (e) {
    console.error('[IG ERROR]', e)
    throw '❌ Terjadi kesalahan saat mencoba mendownload media dari Instagram.'
  }
}

handler.help = ['ig <url>']
handler.tags = ['downloader']
handler.command = /^(ig|instagram|igdl)$/i
handler.limit = false

export default handler