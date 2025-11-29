

import axios from 'axios'
import fetch from 'node-fetch'

let handler = async (m, { conn, args }) => {
    if (!args[0]) throw 'Please provide a Threads URL';
    const sender = m.sender.split('@')[0];
    const url = args[0];

    m.reply(wait);

    try {
        const { data } = await axios.get(`${APIs.ryzumi}/api/downloader/threads?url=${encodeURIComponent(url)}`);

        // Support both new and old API response shapes
        const images = data.image_urls || data.images || [];
        const videos = data.video_urls || data.videos || [];

        if (!images.length && !videos.length) {
            throw 'No media found in that Threads post';
        }

        // Send video first if exists
        if (videos.length > 0) {
            const firstVideo = typeof videos[0] === 'string' ? videos[0] : videos[0].download;
            const videoBuffer = await fetch(firstVideo).then(res => res.buffer());

            await conn.sendMessage(
                m.chat, {
                    video: videoBuffer,
                    mimetype: "video/mp4",
                    fileName: `threads_video.mp4`,
                    caption: `🎬 Video dari @${sender}`,
                    mentions: [m.sender]
                }, {
                    quoted: m
                }
            );
        }

        // Send all images
        for (let i = 0; i < images.length; i++) {
            const imgUrl = typeof images[i] === 'string' ? images[i] : images[i].download;
            const imgBuffer = await fetch(imgUrl).then(res => res.buffer());

            await conn.sendMessage(
                m.chat, {
                    image: imgBuffer,
                    caption: i === 0 ? `🖼️ Gambar dari @${sender}` : '',
                    mentions: [m.sender]
                }, {
                    quoted: m
                }
            );
        }

    } catch (error) {
        console.error('Handler Error:', error);
        conn.reply(m.chat, `❌ Terjadi kesalahan: ${error.message || error}`, m);
    }
}

handler.help = ['threads'].map(v => v + ' <url>');
handler.tags = ['downloader'];
handler.command = /^(threads(dl)?)$/i;

handler.limit = true
handler.register = true

export default handler