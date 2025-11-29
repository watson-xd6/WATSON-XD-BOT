
import { googleImage } from '@bochilteam/scraper';

let handler = async (m, { conn, text, usedPrefix, command }) => {
  if (!text) {
    throw `*Example:* ${usedPrefix + command} Nature | 6`;
  }

  // Block NSFW/adult keywords
  const forbidden = ['fuck', 'porn', 'pussy', 'hentai', 'pornhub', 'xnxx', 'xvideos', 'vagina', 'horny', 'ass', 'nude', 'nsfw', 'sex', 'blowjob', 'anal', '+18', 'hot', 'xxx'];
  if (forbidden.some(word => text.toLowerCase().includes(word))) {
    const warnings = [
      "*⚠️ Sorry! This bot does not support adult content.*",
      "⚠️ *Please keep it clean!*",
      "*🙅 Stay respectful. NSFW content is blocked!*"
    ];
    return m.reply(warnings[Math.floor(Math.random() * warnings.length)]);
  }

  // Parse number of images (default 3)
  const match = text.match(/\|\s*(\d+)$/);
  const count = match ? parseInt(match[1]) : 3;
  const query = match ? text.replace(/\|\s*\d+$/, '').trim() : text;

  if (count > 10) throw "*⚠️ Maximum limit is 10 images to prevent spam.*";

  // Send images
  for (let i = 0; i < count; i++) {
    try {
      const results = await googleImage(query);
      const imageUrl = results.getRandom();

      const caption = `✨ *WATSON-XD Image Search* ✨\n\n💞 *Result:* ${query}\n📌 *Image ${i+1} of ${count}*\n\n🌍 Powered by WATSON-XD 🇿🇼`;

      await conn.sendMessage(m.chat, {
        image: { url: imageUrl },
        caption: caption,
        contextInfo: {
          externalAdReply: {
            title: "🎗️ WATSON-XD BOT 🎗️",
            body: "watsonfourpence everywhere 🔎",
            thumbnailUrl: "https://files.catbox.moe/w16nhp.jpg", // replace with your bot logo
            mediaType: 1,
            renderLargerThumbnail: true
          }
        }
      }, { quoted: m });

    } catch (e) {
      console.error(e);
      return m.reply("*⚠️ Could not fetch images. Please try again later.*");
    }
  }
};

handler.help = ["image <query> | <number>"];
handler.tags = ["internet", "Downloader"];
handler.command = /^(img|image|gimage|pic|photo)$/i;

export default handler;
