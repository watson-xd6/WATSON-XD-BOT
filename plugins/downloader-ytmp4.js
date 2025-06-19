import axios from 'axios';

const handler = async (m, { conn, text }) => {
  if (!text) {
    await conn.reply(m.chat, "Masukkan link video YouTube yang ingin Anda unduh sebagai MP4.\n\n*Contoh:* .ytmp4 https://www.youtube.com/watch?v=E7XkLEEYZnE", m);
    return;
  }
  try {
    const encodedQuery = encodeURIComponent(text);
    const apiUrl = `https://zennz-api.vercel.app/api/downloader/ytmp4?url=${encodedQuery}`;
    const response = await axios.get(apiUrl);
    const data = response.data;

    if (!data.status || !data.data?.status || !data.data?.url) {
      throw new Error("Gagal mendapatkan link download.");
    }

    const videoData = data.data;
    const ytUrl = text;
    const videoIdMatch = ytUrl.match(/(?:v=|\/)([0-9A-Za-z_-]{11})/);
    const videoId = videoIdMatch ? videoIdMatch[1] : null;
    const thumbnailUrl = videoId ? `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg` : null;

    await conn.sendMessage(
      m.chat,
      {
        video: { url: videoData.url },
        mimetype: 'video/mp4',
        fileName: `${videoData.title}.mp4`,
        contextInfo: {
          externalAdReply: {
            title: videoData.title,
            body: `YouTube MP4 Downloader By Zenzz - AI - MD`,
            thumbnailUrl,
            sourceUrl: ytUrl,
            mediaType: 1,
            renderLargerThumbnail: true,
            showAdAttribution: true
          }
        }
      },
      { quoted: m }
    );

    await conn.sendMessage(m.chat, { react: { text: '✅', key: m.key } });
  } catch (error) {
    console.error(error);
    await conn.reply(m.chat, `❌ Error\nLogs error: ${error.message}`, m);

    await conn.sendMessage(m.chat, { react: { text: '❌', key: m.key } });
  }
};

handler.help = ['ytmp4 <link>'];
handler.tags = ['downloader'];
handler.command = ['ytmp4'];

export default handler;