import { Sticker } from 'wa-sticker-formatter';

// Fungsi handler utama
let handler = async (m, { conn, args, usedPrefix, command }) => {
    let stiker = false;
    try {
        let q = m.quoted ? m.quoted : m;
        let mime = (q.msg || q).mimetype || '';
        let senderName = m.sender ? conn.getName(m.sender) : 'User';

        if (/image|video/.test(mime)) {
            let img = await q.download();
            if (!img) throw 'Reply stiker nya!';

            // Buat stiker menggunakan wa-sticker-formatter
            let sticker = new Sticker(img, {
                pack: senderName + ' ✅',
                author: 'Zenzz AI - MD',
                keepScale: true
            });
            stiker = await sticker.toBuffer();
        } else if (args[0]) {
            let url = args[0];
            if (!url.startsWith('http://') && !url.startsWith('https://')) {
                // Auto tambahkan https:// jika user lupa
                url = 'https://' + url;
            }

            // Buat stiker dari URL menggunakan wa-sticker-formatter
            let sticker = new Sticker(url, {
                pack: senderName + ' ✅',
                author: 'Zenzz AI - MD',
                keepScale: true
            });
            stiker = await sticker.toBuffer();
        } else {
            throw `Reply stiker nya atau gambarnya atau ketik 'colong [link/url]'\n\n==============================\n${usedPrefix + command} <Reply gambar>\n${usedPrefix + command} <Reply sticker>\n${usedPrefix + command} https://api.duniagames.co.id/api/content/upload/file/7081780811647600895.png\n${usedPrefix + command} api.duniagames.co.id/api/content/upload/file/7081780811647600895.png\n==============================`;
        }
    } catch (e) {
        console.error('Error in handler:', e);
        m.reply('An error occurred.');
    } finally {
        if (stiker) conn.sendFile(m.chat, stiker, 'sticker.webp', '', m);
    }
}

// Ubah help, tags, dan command sesuai dengan nama baru
handler.help = ['colong <reply sticker>', 'colong <reply gambar>', 'colong <URL/LINK>'];
handler.tags = ['sticker'];
handler.command = /^(colong|maling|colongsticker|colongstiker|malingsticker|malingstiker)$/i;

export default handler;