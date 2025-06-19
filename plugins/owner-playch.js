/*
- fitur: play channel
- desc: kirim lagu ke channel
- type: plugins ESM
- FlowFalcon 😏
- https://whatsapp.com/channel/0029VasjrIh3gvWXKzWncf2P/1837
*/

import axios from "axios";

let handler = async (m, { conn, text, command }) => {
  if (!text) {
    return m.reply(`Contoh:\n${command} https://youtube.com/watch?v=xxx\n${command} mellow vibes`);
  }

  try {
    let url, title, author, audioUrl, thumbnail, videoUrl;

    if (/^https?:\/\/(www\.)?(youtube\.com|youtu\.be)\//i.test(text)) {
      const { data } = await axios.get(`https://cloudkutube.eu/api/yta?url=${encodeURIComponent(text)}`);
      if (data.status !== "success") return m.reply("Gagal ambil audio.");
      ({ title, author, url: audioUrl, thumbnail } = data.result);
      videoUrl = text;
    } else {
      const search = await axios.get(`https://flowfalcon.dpdns.org/search/youtube?q=${encodeURIComponent(text)}`);
      const list = search.data.result;
      if (!list || !list.length) return m.reply("Video tidak ditemukan.");
      const video = list[0];
      const { data } = await axios.get(`https://cloudkutube.eu/api/yta?url=${encodeURIComponent(video.link)}`);
      if (data.status !== "success") return m.reply("Gagal ambil audio.");
      ({ title, author, url: audioUrl, thumbnail } = data.result);
      videoUrl = video.link;
    }

    const channelId = "120363348141345453@newsletter";
    const contextInfo = {
      forwardingScore: 1,
      isForwarded: true,
      forwardedNewsletterMessageInfo: {
        newsletterJid: channelId,
        serverMessageId: Math.floor(Math.random() * 999999),
        newsletterName: "Zenzz - AI - MD"
      },
      externalAdReply: {
        title: title,
        body: `By ${author}`,
        thumbnailUrl: thumbnail,
        mediaType: 1,
        sourceUrl: videoUrl
      }
    };

    const audioRes = await axios.get(audioUrl, { responseType: "arraybuffer" });
    const audioBuffer = Buffer.from(audioRes.data, "binary");

    await conn.sendMessage(channelId, {
      audio: audioBuffer,
      mimetype: "audio/mp4",
      ptt: true,
      contextInfo
    });

    m.reply(`✔ Sukses kirim *${title}* ke channel.`);
  } catch (err) {
    console.error(err);
    m.reply("Gagal kirim audio ke channel.");
  }
};

handler.command = ["playch"];
handler.owner = true;
handler.tags = ["owner"];
handler.help = ["playch <link/judul>"];

export default handler;