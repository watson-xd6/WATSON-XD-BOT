import { join } from 'path'
import { readdirSync, statSync, unlinkSync } from 'fs'

let handler = async (m, { conn, usedPrefix: _p, __dirname, args }) => {

    const sessionsDir = join(__dirname, '../sessions')
    const filenames = []

    readdirSync(sessionsDir).forEach(file => {
        if (file !== 'creds.json') { // Keep the main creds.json file
            filenames.push(join(sessionsDir, file))
        }
    })

    const deletedFiles = []

    filenames.forEach(file => {
        const stats = statSync(file)
        if (stats.isDirectory()) {
            // Skipping directories
        } else {
            unlinkSync(file)
            deletedFiles.push(file)
        }
    })

    conn.reply(m.chat, 'Success!', m)

    if (deletedFiles.length > 0) {
        conn.reply(m.chat, `Files deleted`, m)
    } else {
        conn.reply(m.chat, 'No files left in sessions directory', m)
    }
}

handler.help = ['clearsession']
handler.tags = ['owner']
handler.command = /^(clearsession|clear)$/i
handler.rowner = true

export default handler