let handler = async (m, { conn, usedPrefix }) => {
    let user = global.db.data.users[m.sender]

    // Inisialisasi kalau belum ada
    user.banteng = user.banteng || 0
    user.harimau = user.harimau || 0
    user.gajah = user.gajah || 0
    user.kambing = user.kambing || 0
    user.panda = user.panda || 0
    user.buaya = user.buaya || 0
    user.kerbau = user.kerbau || 0
    user.sapi = user.sapi || 0
    user.monyet = user.monyet || 0
    user.ayam = user.ayam || 0
    user.babihutan = user.babihutan || 0
    user.babi = user.babi || 0

    let caption = `📮 Kandang Kamu
${user.banteng ? `🐂 Banteng: ${user.banteng}` : ''} 
${user.harimau ? `🐅 Harimau: ${user.harimau}` : ''} 
${user.gajah ? `🐘 Gajah: ${user.gajah}` : ''} 
${user.kambing ? `🐐 Kambing: ${user.kambing}` : ''} 
${user.panda ? `🐼 Panda: ${user.panda}` : ''} 
${user.buaya ? `🐊 Buaya: ${user.buaya}` : ''} 
${user.kerbau ? `🐃 Kerbau: ${user.kerbau}` : ''} 
${user.sapi ? `🐮 Sapi: ${user.sapi}` : ''} 
${user.monyet ? `🐒 Monyet: ${user.monyet}` : ''} 
${user.ayam ? `🐓 Ayam: ${user.ayam}` : ''} 
${user.babi ? `🐖 Babi: ${user.babi}` : ''} 
${user.babihutan ? `🐗 Babi Hutan: ${user.babihutan}` : ''}`.trim()

    if (
        user.banteng === 0 && user.harimau === 0 && user.gajah === 0 &&
        user.kambing === 0 && user.panda === 0 && user.buaya === 0 &&
        user.kerbau === 0 && user.sapi === 0 && user.monyet === 0 &&
        user.ayam === 0 && user.babi === 0 && user.babihutan === 0
    ) {
        caption = '📮 Kandang kamu masih kosong!'
    }

    m.reply(caption)
}

handler.help = ['kandang']
handler.tags = ['rpg']
handler.command = /^(kandang)$/i
handler.register = true
handler.group = true
handler.rpg = true

export default handler