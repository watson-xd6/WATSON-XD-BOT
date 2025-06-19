const handler = async (m, { conn, text, args, command }) => {
  const url = args[0];
  if (!url || !/^https?:\/\/(x|twitter)\.com\/.+/i.test(url)) {
    return m.reply(`Contoh penggunaan:\n.${command} https://x.com/...`);
  }

  try {
    const res = await fetch(`https://www.velyn.biz.id/api/downloader/twitter?url=${encodeURIComponent(url)}`);
    const json = await res.json();

    if (!json.status || !json.data?.media?.length) {
      return m.reply('Gagal mengambil data. Pastikan URL valid dan media ditemukan.');
    }

    const { authorName, authorUsername, likes, retweets, replies, date, media } = json.data;
    const mediaUrl = media[0]?.url;

    const caption = `
Twitter Downloader
Author: ${authorName} (@${authorUsername})
Likes: ${likes}
Retweets: ${retweets}
Replies: ${replies}
Date: ${date}
`.trim();

    await conn.sendFile(m.chat, mediaUrl, 'twitter.mp4', caption, m);
  } catch (e) {
    console.error(e);
    m.reply('Terjadi kesalahan saat menghubungi API atau memproses media.');
  }
};

handler.command = ['twitter', 'twitdl'];
handler.help = ['twitter <url>', 'twitdl <url>'];
handler.tags = ['downloader'];

export default handler;