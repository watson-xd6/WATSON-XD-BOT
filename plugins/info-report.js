// plugins/report.js
let handler = async (m, { conn, text, usedPrefix, command }) => {
  const owners = ['6287823745178', '573238329287'] // daftar owner

  if (!text) {
    return m.reply(`Kalo kamu nemu pesan error, lapor pake perintah ini\n\nContoh:\n${usedPrefix + command} selamat siang owner, saya menemukan error seperti berikut <copy/tag pesan error-nya>`)
  }

  if (text.length < 10) return m.reply('Pesan terlalu pendek! Minimal 10 karakter.')
  if (text.length > 1000) return m.reply('Pesan terlalu panjang! Maksimal 1000 karakter.')

  let pesan = `*${command.toUpperCase()}!*\n\nDari: *@${m.sender.split('@')[0]}*\n\nPesan:\n${text}`
  if (m.quoted?.text) pesan += `\n\n*Pesan yang dikutip:*\n${m.quoted.text}`

  for (let owner of owners) {
    await conn.sendMessage(owner + '@s.whatsapp.net', {
      text: pesan,
      contextInfo: { mentionedJid: [m.sender] }
    })
  }

  await m.reply('_Pesan terkirim ke pemilik bot. Jika laporan hanya bercanda, akan diabaikan._')
}

handler.command = ['report', 'request']
handler.tags = ['info']
handler.help = ['report <teks>', 'request <teks>']
handler.owner = false
handler.register = false

export default handler