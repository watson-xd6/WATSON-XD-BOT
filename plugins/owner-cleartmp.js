import { tmpdir } from 'os'
import { readdirSync, statSync, unlinkSync, existsSync } from 'fs'
import { join } from 'path'

let handler = async (m, { conn, usedPrefix: _p, __dirname, args }) => {

    const tmpDirs = [tmpdir(), join(__dirname, '../tmp')];
    const filenames = [];

    tmpDirs.forEach(dirname => {
        if (!existsSync(dirname)) return;
        readdirSync(dirname).forEach(file => {
            filenames.push(join(dirname, file));
        });
    });

    const deletedFiles = [];

    filenames.forEach(file => {
        const stats = statSync(file);
        if (stats.isDirectory()) {
            // Skipping directories
        } else {
            unlinkSync(file);
            deletedFiles.push(file);
        }
    });

    conn.reply(m.chat, 'Success!', m);

    if (deletedFiles.length > 0) {
        conn.reply(m.chat, `Deleted files:\n${deletedFiles.join('\n')}`, m)
    } else {
        conn.reply(m.chat, 'No files left in tmp directory', m);
    }
}

handler.help = ['cleartmp']
handler.tags = ['owner']
handler.command = /^(cleartmp|clear|tmpclear|cleantmp)$/i
handler.rowner = true

export default handler