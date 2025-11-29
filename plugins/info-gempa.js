import fetch from 'node-fetch'

const link = 'https://data.bmkg.go.id/DataMKG/TEWS/'

let handler = async (m, { conn, text, usedPrefix, command }) => {
    try {
        let res = await fetch(link + 'autogempa.json')
        let data = await res.json()
        data = data.Infogempa.gempa

        let txt = `*${data.Wilayah}*\n\n`
        txt += `Date : ${data.Tanggal}\n`
        txt += `Time : ${data.Jam}\n`
        txt += `Potential : *${data.Potensi}*\n\n`
        txt += `Magnitude : ${data.Magnitude}\n`
        txt += `Depth : ${data.Kedalaman}\n`
        txt += `Coordinates : ${data.Coordinates}${data.Dirasakan.length > 3 ? `\nFelt at : ${data.Dirasakan}` : ''}`

        await conn.sendMessage(m.chat, { image: { url: link + data.Shakemap }, caption: txt }, { quoted: m })
    } catch (e) {
        console.log(e)
        m.reply(`[!] Feature Error.`)
    }
}

handler.help = ['earthquake']
handler.tags = ['internet']
handler.command = /^(gempa|earthquake)$/i

handler.premium = false
handler.limit = false

export default handler