import fs from 'fs'

let handler = async (m, { conn, text }) => {
    m.reply('Please wait, fetching the database file')
    let database = await fs.readFileSync('./database.json')
    return await conn.sendMessage(
        m.chat,
        { document: database, mimetype: 'application/json', fileName: 'database.json' },
        { quoted: m }
    )
}

handler.help = ['getdb']
handler.tags = ['owner']
handler.command = /^(getdb)$/i

handler.owner = true

export default handler