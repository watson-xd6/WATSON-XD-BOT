import fs from 'fs';
import mime from 'mime-types';
import moment from 'moment-timezone';

const handler = async (m, { conn }) => {
  try {
    const d = new Date(new Date + 3600000)
    const locale = 'id'
    const weton = ['Pahing', 'Pon', 'Wage', 'Kliwon', 'Legi'][Math.floor(d / 84600000) % 5]
    const week = d.toLocaleDateString(locale, { weekday: 'long' })
    const date = d.toLocaleDateString(locale, { day: 'numeric', month: 'long', year: 'numeric' })

    const wibh = moment.tz('Asia/Jakarta').format('HH')
    const wibm = moment.tz('Asia/Jakarta').format('mm')
    const wibs = moment.tz('Asia/Jakarta').format('ss')
    const wktuwib = `${wibh} H ${wibm} M ${wibs} S`

    const who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender
    const user = global.db.data.users[who]

    const ownerList = global.owner ? global.owner : []
    const isMods = [conn.decodeJid(global.conn.user.id), ...ownerList.filter(([number, _, isDeveloper]) => number && isDeveloper).map(([number]) => number)].map(v => v.replace(/[^0-9]/g, '') + '@s.whatsapp.net').includes(who)
    const isOwner = m.fromMe || isMods || [conn.decodeJid(global.conn.user.id), ...ownerList.filter(([number, _, isDeveloper]) => number && !isDeveloper).map(([number]) => number)].map(v => v.replace(/[^0-9]/g, '') + '@s.whatsapp.net').includes(who)
    const isPrems = isOwner || new Date() - user.premiumTime < 0

    if (typeof user == 'undefined') return m.reply('Pengguna tidak ada didalam data base')

    let pp;
    try {
      pp = await conn.profilePictureUrl(who, 'image');
    } catch (err) {
      console.warn("Gagal mengambil foto profil, menggunakan gambar default");
      pp = './src/avatar_contact.png'; // Gambar fallback
    }

    const bio = await conn.fetchStatus(who).catch(_ => 'Tidak Ada Bio')
    const { role, premium, money, level, limit, exp, lastclaim, registered, regTime, age } = user

    const name = user.registered ? user.name : conn.getName(who)
    const datePacaran = await dateTime(user.pacaranTime)
    const caption = `
– User Info

┌ • Username : ${name}
│ • Umur : ${user.registered ? age : ''}
│ • Status : ${isMods ? 'Developer' : isOwner ? 'Owner' : isPrems ? 'Premium User' : user.level > 999 ? 'Elite User' : 'Free User'}
│ • Verified : ${user?.verif ? "✅" : "❌"}
│ • Bio : ${bio.status ? bio.status : bio}
│ • Hubungan : ${user.pacar != "" ? `Berpacaran dengan @${user.pacar.split("@")[0]} sejak ${datePacaran}` : "Tidak ada"}
└ • Link : https://wa.me/${who.split`@`[0]}

– RPG Info

┌ • Level : ${toRupiah(user.level)}
│ • Exp : ${toRupiah(user.exp)}
│ • Money : ${toRupiah(user.money)}
└ • Bank : ${toRupiah(user.bank)}

🌟 Premium : ${isPrems ? "✅" : "❌"}
📑 Registered : ${user.registered ? '✅ ( ' + await dateTime(regTime) + ' )' : '❌'}
`.trim()

    await conn.sendFile(m.chat, pp, 'profile.jpeg', caption, m, false, { contextInfo: { mentionedJid: [who, user.pacar] } })
  } catch (e) {
    throw e
  }
}

handler.help = ['profile']
handler.tags = ['xp']
handler.command = /^(profile|profil)$/i
export default handler

function dateTime(timestamp) {
  if (!timestamp) return 'Tidak diketahui'
  const dateReg = new Date(timestamp)
  const options = { year: 'numeric', month: 'long', day: 'numeric' }
  return dateReg.toLocaleDateString('id-ID', options)
}

const toRupiah = number => parseInt(number).toLocaleString().replace(/,/g, ".")