import moment from 'moment-timezone'

function ucapan() {
  const jam = moment().tz('Asia/Jakarta').hour()
  if (jam >= 4 && jam < 10) return "Selamat pagi"
  if (jam >= 10 && jam < 15) return "Selamat siang"
  if (jam >= 15 && jam < 18) return "Selamat sore"
  return "Selamat malam"
}

let handler = async (m, { text, conn }) => {
  if (!text || !text.includes(',')) {
    return m.reply('❗ Format salah!\nContoh: .proses nokos,5000,dana')
  }

  const [barang, harga, metode] = text.split(',').map(v => v.trim())

  if (!barang || !harga || !metode) {
    return m.reply('❗ Format tidak lengkap!\nContoh: .proses barang,harga,pembayaran')
  }

  const waktu = moment().tz('Asia/Jakarta')
  const tampilTanggal = waktu.format('dddd, DD MMMM YYYY')
  const tampilWaktu = waktu.format('HH:mm:ss')

  const caption = `
*—·· Pesanan Sedang Diproses ··—*

* *Layanan:* ${barang}
* *Harga:* Rp ${Number(harga).toLocaleString('id-ID')}
* *Payment:* ${metode.toUpperCase()}
* *Tanggal:* ${tampilTanggal}
* *Waktu:* ${tampilWaktu} WIB

Mohon tunggu sebentar, pesanan Anda sedang diproses.
`.trim()

  const adReply = {
    contextInfo: {
      forwardingScore: 1,
      isForwarded: true,
      forwardedNewsletterMessageInfo: {
        newsletterJid: "120363410793796223@newsletter",
        serverMessageId: 103,
        newsletterName: "Zenzz Store"
      },
      externalAdReply: {
        showAdAttribution: true,
        title: 'Zenzz Store',
        body: ucapan(),
        previewType: "VIDEO",
        thumbnailUrl: 'https://files.catbox.moe/mh1iw7.jpg',
        sourceUrl: 'Zenzz AI - MD Store'
      }
    }
  }

  await conn.sendMessage(m.chat, {
    text: caption,
    ...adReply
  }, { quoted: m })
}

handler.help = ['proses <barang,harga,pembayaran>']
handler.tags = ['store']
handler.command = /^proses$/i
handler.owner = true

export default handler