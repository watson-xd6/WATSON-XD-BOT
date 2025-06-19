let handler = async (m, { conn }) => {
  let user = global.db.data.users

  if (!user[m.sender].pacar) return m.reply("Kamu tidak memiliki pacar, cari dulu sono menggunakan  .tembak @user")

  let pasangan = user[m.sender].pacar
  let date = formatDate(user[m.sender].pacaranTime || Date.now())

  let teks = `Kamu sudah berpacaran dengan @${pasangan.split("@")[0]} sejak *${date}*`

  await conn.sendMessage(m.chat, {
    text: teks,
    mentions: [pasangan],
    contextInfo: {
      externalAdReply: {
        title: "P A C A R A N",
        body: "Cieee langgeng nihh 🤭",
        thumbnailUrl: "https://akcdn.detik.net.id/visual/2016/09/20/34ce7ca9-7652-4631-a37e-459e465d824c_169.jpg?w=400&q=90",
        sourceUrl: "",
        mediaType: 1,
        renderLargerThumbnail: true,
        showAdAttribution: true
      }
    }
  }, { quoted: m })
}

handler.help = ["pacar"]
handler.tags = ["fun"]
handler.command = /^(pacar)$/i

export default handler

function formatDate(timestamp) {
  const date = new Date(timestamp)
  return date.toLocaleDateString('id-ID', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}