import axios from 'axios'

let handler = async (m, { conn, args, usedPrefix, command }) => {
    if (!args[0])
        throw `Usage example: ${usedPrefix}${command} https://krakenfiles.com/view/abYn6V0okV/file.html`;

    const apiURL = `${APIs.ryzumi}/api/downloader/kfiles?url=${encodeURIComponent(args[0])}`;

    m.reply(wait);

    try {
        const res = await axios.get(apiURL);
        const data = res.data;

        if (!data || !data.metadata || !data.metadata.download) {
            throw 'Failed to fetch download link. Please try again later.';
        }

        const { filename, file_size, type, upload_date, last_download_date, download } = data.metadata;
        const apiHeaders = data.headers;

        const caption = `
*💌 Name:* ${filename}
*📊 Size:* ${file_size}
*🗂️ Extension:* ${type}
*📨 Uploaded:* ${upload_date}
*⌛ Last Download:* ${last_download_date}
        `.trim();

        const fileRes = await axios.get(download, {
            headers: apiHeaders,
            responseType: 'arraybuffer'
        });

        m.reply(caption);
        await conn.sendFile(
            m.chat,
            Buffer.from(fileRes.data),
            filename,
            '',
            m,
            null,
            { mimetype: type, asDocument: true }
        );

    } catch (e) {
        throw 'An error occurred: ' + (e?.message || e);
    }
};

handler.help = ['krakenfiles'].map(v => v + ' <url>');
handler.tags = ['downloader'];
handler.command = /^(kfiles|kf|krakenfiles)$/i;

handler.limit = true;
handler.register = true;

export default handler;