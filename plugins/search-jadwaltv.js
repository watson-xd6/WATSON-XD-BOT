import axios from 'axios'
import *as cheerio from 'cheerio'

const handler = async (m, { conn, text, usedPrefix, command }) => {
  if (!text) return m.reply(`Masukkan nama channel!\nContoh: ${usedPrefix + command} rcti`)

  try {
    const channel = text.toLowerCase()
    const url = `https://www.jadwaltv.net/channel/${channel}`
    const res = await axios.get(url)
    const $ = cheerio.load(res.data)

    let hasil = ''
    $('table tbody tr').each((i, el) => {
      const jam = $(el).find('td').eq(0).text().trim()
      const acara = $(el).find('td').eq(1).text().trim()
      if (jam && acara && jam.toLowerCase() !== 'jam' && acara.toLowerCase() !== 'acara') {
        hasil += `🕒 ${jam} - ${acara}\n`
      }
    })

    if (!hasil) return m.reply('❌ Channel tidak ditemukan atau tidak ada jadwalnya.')

    m.reply(`📺 *Jadwal ${channel.toUpperCase()} Hari Ini:*\n\n${hasil}`)
  } catch (err) {
    console.error(err)
    m.reply('❌ Gagal mengambil data atau server error.')
  }
}

handler.help = ['jadwaltv <channel>']
handler.tags = ['search']
handler.command = /^jadwaltv$/i

export default handler