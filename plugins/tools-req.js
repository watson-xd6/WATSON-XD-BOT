let handler = async (m, { args, conn }) => {
  if (!args[0]) return m.reply('Contoh: .req Anu Ini Min')
  let text = args.join(' ')
  let url = 'https://flowfalcon.dpdns.org/imagecreator/ngl?title=Request+Feature&text=' + encodeURIComponent(text)
  let caption = 'Request Fitur: ' + text + '\nDari: ' + m.sender.split('@')[0]

  // Kirim ke owner saja
  await conn.sendMessage('6287823745178@s.whatsapp.net', {
    image: { url },
    caption
  })

  m.reply('Req mu sudah dikirim, semoga dibikinin ya!')
}

handler.help = ['req <teks>']
handler.command = ['req']
handler.tags = ['tools']

export default handler