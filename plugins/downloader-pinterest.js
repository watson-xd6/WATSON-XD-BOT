// Don't delete this credit!!!
// Script by ShirokamiRyzen

import axios from 'axios'
import fetch from 'node-fetch'

let handler = async (m, { conn, args }) => {
    if (!args[0]) throw 'Please provide a Pinterest URL';
    const sender = m.sender.split('@')[0];
    const url = args[0];

    m.reply(wait);

    try {
        const { data } = await axios.get(`${APIs.ryzumi}/api/downloader/pinterest?url=${encodeURIComponent(url)}`);

        if (!data.success || !data.media || data.media.length === 0) {
            throw 'No available media found';
        }

        const mediaData = data.media;

        // Separate videos and images
        const videos = mediaData
            .filter(item => item.extension === 'mp4')
            .sort((a, b) => (b.size || 0) - (a.size || 0));

        const images = mediaData
            .filter(item => item.extension === 'jpg')
            .sort((a, b) => {
                if (a.quality === 'original') return -1;
                if (b.quality === 'original') return 1;
                const ax = parseInt(a.quality) || 0;
                const bx = parseInt(b.quality) || 0;
                return bx - ax;
            });

        // Fetch best image
        let imageBuffer = null;
        for (const img of images) {
            try {
                const res = await fetch(img.url);
                if (res.ok) {
                    imageBuffer = await res.buffer();
                    break;
                }
            } catch (e) {
                console.warn('Failed to fetch image, trying next:', img.url);
            }
        }

        // Send image if available
        if (imageBuffer) {
            await conn.sendMessage(
                m.chat,
                {
                    image: imageBuffer,
                    caption: `Here is the image, @${sender}`,
                    mentions: [m.sender],
                },
                { quoted: m }
            );
        }

        // Send video if available
        if (videos.length > 0) {
            try {
                const videoUrl = videos[0].url;
                const videoBuffer = await fetch(videoUrl).then(res => res.buffer());

                await conn.sendMessage(
                    m.chat,
                    {
                        video: videoBuffer,
                        mimetype: "video/mp4",
                        fileName: `video.mp4`,
                        caption: `And here is the video, @${sender}`,
                        mentions: [m.sender],
                    },
                    { quoted: m }
                );
            } catch (error) {
                console.error('Error sending video:', error);
                await conn.reply(m.chat, `Failed to send video: ${error.message}`, m);
            }
        }

        if (!imageBuffer && videos.length === 0) {
            throw 'No images or videos could be downloaded';
        }

    } catch (error) {
        console.error('Handler Error:', error);
        conn.reply(m.chat, `An error occurred: ${error}`, m);
    }
}

handler.help = ['pinterest'].map(v => v + ' <url>');
handler.tags = ['downloader'];
handler.command = /^(pinterestdl|pindl)$/i;

handler.limit = 2
handler.register = true

export default handler