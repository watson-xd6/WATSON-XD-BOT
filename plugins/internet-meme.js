import axios from 'axios'

let handler = async (m, { conn }) => {
  try {
    const response = await axios.get('https://api.lolhuman.xyz/api/meme/memeindo?apikey=LznycxShadow', {
      responseType: 'arraybuffer'
    })

    await conn.sendMessage(m.chat, {
      image: Buffer.from(response.data),
      caption: '*Meme Random Kadang Absurd* 😐😹'
    }, { quoted: m })

  } catch (e) {
    console.error('Gagal mengambil meme:', e)
    m.reply('❌ Terjadi kesalahan saat mengambil meme. keknya apikey kena limit nih :v beli apikey sono.')
  }
}

handler.help = ['meme']
handler.tags = ['internet']
handler.command = /^meme$/i

export default handler