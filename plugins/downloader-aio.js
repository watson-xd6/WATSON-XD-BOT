import axios from "axios"

let handler = async (m, { conn, args, usedPrefix, command }) => {
    if (!args[0]) throw `Usage: ${usedPrefix + command} <url>`;

    const sender = m.sender.split('@')[0];
    const url = args[0];

    m.reply(wait);

    try {
        // Fetch video data from API
        const response = await axios.get(`${APIs.ryzumi}/api/downloader/aiodown?url=${encodeURIComponent(url)}`);
        const data = response.data;

        if (!data.success) throw 'Failed to fetch video data';

        // Prioritize video quality: hd > sd > 720p
        let videoUrl;
        const qualities = ["hd", "sd", "720p"];
        for (const quality of qualities) {
            const video = data.quality.find(v => v.quality.toLowerCase() === quality.toLowerCase());
            if (video) {
                videoUrl = video.url;
                break;
            }
        }

        // If no preferred quality found, use lowest available
        if (!videoUrl) {
            const lowestQuality = data.quality.reduce((prev, curr) => {
                return parseInt(curr.quality) < parseInt(prev.quality) ? curr : prev;
            });
            videoUrl = lowestQuality.url;
        }

        const caption = `Here’s the video, @${sender}`;
        await conn.sendMessage(
            m.chat,
            { video: { url: videoUrl }, caption, mentions: [m.sender] },
            { quoted: m }
        );

    } catch (e) {
        throw `Error: ${e.message || e}`;
    }
}

handler.help = ['aio <url>'];
handler.tags = ['downloader'];
handler.command = /^(aio)$/i;

handler.register = true;
handler.limit = 1;

export default handler;