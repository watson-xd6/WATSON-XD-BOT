import axios from 'axios'

let handler = async (m, { conn, args }) => {
  if (!args || args.length === 0) {
    return m.reply('Usage: .ytstalk <channel name or ID>')
  }
  const query = encodeURIComponent(args.join(' '))
  const API_KEY = 'LznycxShadow'
  const url = `https://api.lolhuman.xyz/api/ytchannel?apikey=${API_KEY}&query=${query}`
  try {
    const { data } = await axios.get(url)
    // Debug: logging raw response
    console.log('YTStalk response:', data)

    if (data.status != 200) {
      // Tampilkan pesan error API jika ada
      const msg = data.message || 'Gagal mengambil data channel'
      return m.reply(`❌ ${msg}`)
    }
    if (!Array.isArray(data.result) || data.result.length === 0) {
      return m.reply('❌ Channel tidak ditemukan. Pastikan nama atau ID benar.')
    }

    const ch = data.result[0]
    const created = new Date(ch.channel_created).toLocaleDateString('id-ID', {
      year: 'numeric', month: 'long', day: 'numeric'
    })
    const info = `*${ch.channel_name}*
ID: ${ch.channel_id}
Tentang: ${ch.channel_about || '-'}
Dibuat: ${created}
URL: https://www.youtube.com/channel/${ch.channel_id}`

    await conn.sendMessage(m.chat, {
      image: { url: ch.channel_picture.high.url },
      caption: info
    }, { quoted: m })
  } catch (err) {
    console.error('Error ytstalk:', err.response?.data || err.message)
    m.reply('❌ Terjadi kesalahan saat mengambil info YouTube channel. Silakan coba lagi nanti.')
  }
}

handler.help = ['ytstalk <channel>']
handler.tags = ['stalker']
handler.command = /^ytstalk$/i

export default handler