import axios from 'axios'
import moment from 'moment-timezone'

const handler = async (m, { conn, text }) => {
  if (!text) return m.reply('📌 Masukkan URL TikTok!\nContoh: .tiktok https://vt.tiktok.com/xxxxxx')

  global.db = global.db || {}
  global.db.data = global.db.data || {}
  global.db.data.temp = global.db.data.temp || {}
  if (global.db.data.temp[m.id]) return
  global.db.data.temp[m.id] = true

  const proses = await m.reply('⏳ Mengambil data dari TikTok...')

  try {
    const { data } = await axios.get(`https://flowfalcon.dpdns.org/download/tiktok?url=${encodeURIComponent(text)}`)

    if (!data?.status || !data.result?.data) return m.reply('❌ Gagal mengambil data TikTok.')

    const res = data.result.data
    const {
      title,
      region,
      duration,
      play,
      music,
      create_time,
      play_count,
      digg_count,
      comment_count,
      share_count,
      download_count,
      author,
      music_info,
      images
    } = res

    const time = moment.unix(create_time).tz('Asia/Jakarta').format('dddd, MMMM D, [at] h:mm:ss A')

    const caption = `*Video Info:*
* Region:* ${region}
* Duration:* ${duration} Seconds
* Taken:* ${time}

*Statistik Info:*
* *Views:* ${play_count.toLocaleString()}
* *Likes:* ${digg_count.toLocaleString()}
* *Comment:* ${comment_count.toLocaleString()}
* *Share:* ${share_count.toLocaleString()}
* *Download:* ${download_count.toLocaleString()}

*Author Info:*
* *Fullname:* ${author?.unique_id}
* *Nickname:* ${author?.nickname}

*Music Info:*
* *Title:* ${music_info?.title}
* *Author:* ${music_info?.author}
* *Album:* ${music_info?.album || 'N/A'}

*Caption:*
${title || 'Tanpa caption'}
`

    if (Array.isArray(images) && images.length > 0) {
      await m.reply(`📸 Terdeteksi slide TikTok (${images.length} gambar). Mengirim...`)
      for (let i = 0; i < images.length; i++) {
        await conn.sendMessage(m.chat, {
          image: { url: images[i] },
          caption: `Slide ${i + 1}/${images.length}`
        }, { quoted: m });
      }
    } else if (play) {
      await conn.sendMessage(m.chat, {
        video: { url: play },
        caption
      }, { quoted: m });
    }

    if (music) {
      await conn.sendMessage(m.chat, {
        audio: { url: music },
        mimetype: 'audio/mpeg',
        fileName: `${title || 'tiktok_audio'}.mp3`
      }, { quoted: m });
    }

  } catch (e) {
    console.error('[TIKTOK ERROR]', e)
    m.reply(`❌ Gagal mendownload TikTok.\n\nLog: ${e.message}`)
  } finally {
    if (proses?.key) await conn.sendMessage(m.chat, { delete: proses.key });
  }
}

handler.command = /^(tiktok|tt|ttdl)$/i
handler.help = ['tiktok <url>']
handler.tags = ['downloader']

export default handler