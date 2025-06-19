import fs from 'fs'

const antiTagSWPath = '/home/container/lib/antitagsw.json'
if (!fs.existsSync(antiTagSWPath)) fs.writeFileSync(antiTagSWPath, '{}', 'utf-8')

const loadAntiTagSW = () => JSON.parse(fs.readFileSync(antiTagSWPath, 'utf-8'))
const saveAntiTagSW = (data) => fs.writeFileSync(antiTagSWPath, JSON.stringify(data, null, 4), 'utf-8')

let antiTagSWGroup = loadAntiTagSW()

let handler = async (m, { conn, args, isAdmin, isOwner }) => {
  if (!m.isGroup) return m.reply("❌ Cuma bisa dipake di grup.")
  if (!(isAdmin || isOwner)) return m.reply("❌ Lu bukan admin grup.")
  if (!args[0]) return m.reply("⚠️ Gunakan: .antitagsw on / off")

  if (args[0] === "on") {
    if (antiTagSWGroup[m.chat]) return m.reply("✅ Sudah aktif sebelumnya.")
    antiTagSWGroup[m.chat] = true
    saveAntiTagSW(antiTagSWGroup)
    return m.reply("✅ Anti Tag SW telah *AKTIF* di grup ini!")
  } else if (args[0] === "off") {
    if (!antiTagSWGroup[m.chat]) return m.reply("❌ Sudah nonaktif sebelumnya.")
    delete antiTagSWGroup[m.chat]
    saveAntiTagSW(antiTagSWGroup)
    return m.reply("❌ Anti Tag SW telah *DINONAKTIFKAN* di grup ini!")
  } else {
    return m.reply("⚠️ Pilih antara *on* atau *off*")
  }
}

handler.before = async (m, { conn, isBotAdmin }) => {
  if (!m.isGroup || !antiTagSWGroup[m.chat]) return

  if (m.mtype === 'groupStatusMentionMessage') {
    let tagger = m.sender
    let participants = (await conn.groupMetadata(m.chat)).participants
    let isAdminSender = participants.some(p => p.id === tagger && (p.admin === 'admin' || p.admin === 'superadmin'))

    if (isAdminSender) {
      await conn.sendMessage(m.chat, {
        text: `Admin mah gpp tag sw, Lu admin lu punya kuasa disini 😹`,
        mentions: [tagger]
      })
      return
    }

    let warning = `🚨 *GRUP DITANDAI DI STATUS!*\n\n@${tagger.split("@")[0]}, jangan ngetag grup di status ya!`

    try {
      if (isBotAdmin) {
        await conn.sendMessage(m.chat, { delete: m.key })
        await conn.groupParticipantsUpdate(m.chat, [tagger], 'remove')
        await conn.sendMessage(m.chat, {
          text: `❌ @${tagger.split("@")[0]} Pergi Lu Jendul Bikin Gw Muak Anj😂🤭`,
          mentions: [tagger]
        })
      } else {
        await conn.sendMessage(m.chat, {
          text: warning,
          mentions: [tagger]
        })
      }
    } catch (e) {
      console.error('Gagal menghapus dan kick:', e)
    }
  }
}

handler.command = ['antitagsw']
handler.group = true
handler.admin = true

export default handler