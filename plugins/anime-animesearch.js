import fetch from 'node-fetch'

let handler = async (m, { args, conn }) => {
  if (!args[0]) return conn.reply(m.chat, 'Masukkan judul anime yang ingin dicari\nContoh: .animesearch blue lock', m)

  let res = await fetch(`https://flowfalcon.dpdns.org/anime/search?q=${encodeURIComponent(args.join(" "))}`)
  let json = await res.json()

  if (!json.status || !json.result || !json.result.length) return conn.reply(m.chat, 'Anime tidak ditemukan!', m)

  let teks = '*📺 Hasil Pencarian Anime:*\n\n'
  for (let i = 0; i < json.result.length; i++) {
    let a = json.result[i]
    teks += `*${i + 1}. ${a.title}*\n`
    teks += `📺 Type: ${a.type}\n`
    teks += `✅ Status: ${a.status}\n`
    teks += `🔗 Link: ${a.link}\n\n`
  }

  conn.sendFile(m.chat, json.result[0].image, 'anime.jpg', teks, m)
}

handler.help = ['animesearch <judul>']
handler.tags = ['anime']
handler.command = ['animesearch']

export default handler