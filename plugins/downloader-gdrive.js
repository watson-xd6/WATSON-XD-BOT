import { GDriveDl } from '../lib/scrape.js'

let handler = async (m, { conn, args }) => {
    if (!(args[0] || '').match(/([\w-]){33}|([\w-]){19}/)) 
        throw '[!] Please provide a valid Google Drive URL';

    const includesAny = (data, id) => {
        return data.some(el => id.includes(el));
    }

    try {
        let res = await GDriveDl(args[0]);

        // Check file size limits
        if (res.fileSize.slice(-2) === "GB") 
            return m.reply(`File too large.\nCannot send a video of ${res.fileSize}`);
        
        if (!includesAny(['kB','KB'], res.fileSize.slice(-2)) && parseInt(res.fileSize) > 500) 
            return m.reply(`File size: ${res.fileSize}\nCannot send, maximum allowed size is 500 MB`);

        // Send file info
        let txt = `*[ Downloading File ]*\n\n`;
        txt += `*Name :* ${res.fileName}\n`;
        txt += `*Size :* ${res.fileSize}\n`;
        txt += `*Type :* ${res.mimetype}`;
        await m.reply(txt);

        if (!res.downloadUrl) throw 'Download URL not found';

        // Send file
        await conn.sendFile(
            m.chat, 
            res.downloadUrl, 
            res.fileName, 
            `File: ${res.fileName}`, 
            m
        );
    } catch (e) {
        console.error(e);
        throw 'Bot does not have access to this Google Drive file';
    }
}

handler.help = ['gdrive'].map(v => v + ' <url>');
handler.tags = ['downloader'];
handler.command = /^(gdrive)$/i;

handler.limit = true;
handler.register = true;

export default handler;