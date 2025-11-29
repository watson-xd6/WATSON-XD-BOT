// Don't delete this credit!!!
// Script by ShirokamiRyzen

import axios from 'axios'

let handler = async (m, { conn, args }) => {
    if (!args[0]) throw 'Please provide an Instagram media URL';
    const sender = m.sender.split('@')[0];
    const url = args[0];

    m.reply(wait);

    try {
        const { data } = await axios.get(`${APIs.ryzumi}/api/downloader/igdl?url=${encodeURIComponent(url)}`);

        if (!data.status || !Array.isArray(data.data) || data.data.length === 0) {
            throw 'No media found for download';
        }

        const mediaData = data.data;
        let first = true;

        for (const item of mediaData) {
            try {
                const mediaUrl = item.url;
                const type = (item.type || '').toLowerCase();
                const caption = first ? `Here you go @${sender}` : '';
                first = false;

                if (type === 'video') {
                    await conn.sendMessage(
                        m.chat,
                        {
                            video: { url: mediaUrl },
                            mimetype: 'video/mp4',
                            fileName: 'video.mp4',
                            caption,
                            mentions: [m.sender],
                        },
                        { quoted: m }
                    );
                } else if (type === 'image') {
                    await conn.sendMessage(
                        m.chat,
                        {
                            image: { url: mediaUrl },
                            caption,
                            mentions: [m.sender],
                        },
                        { quoted: m }
                    );
                } else {
                    // fallback if type is unknown
                    try {
                        await conn.sendMessage(
                            m.chat,
                            { image: { url: mediaUrl }, caption, mentions: [m.sender] },
                            { quoted: m }
                        );
                    } catch {
                        await conn.sendMessage(
                            m.chat,
                            { video: { url: mediaUrl }, mimetype: 'video/mp4', fileName: 'video.mp4', caption, mentions: [m.sender] },
                            { quoted: m }
                        );
                    }
                }
            } catch (error) {
                console.error('Error sending media:', error);
                await conn.reply(m.chat, `Failed to send media: ${error.message || error}`, m);
            }
        }
    } catch (error) {
        console.error('Handler Error:', error);
        conn.reply(m.chat, `An error occurred: ${error.message || error}`, m);
    }
}

handler.help = ['ig'].map(v => v + ' <url>');
handler.tags = ['downloader'];
handler.command = /^(ig(dl)?)$/i;

handler.limit = true;
handler.register = true;

export default handler;