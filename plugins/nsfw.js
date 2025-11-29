import fetch from 'node-fetch'

let handler = async (m, { conn, usedPrefix, command, text, args }) => {
  // Check if it's a group chat and NSFW is enabled
  if (m.isGroup && !global.db.data.chats[m.chat].nsfw) {
    throw `🚫 NSFW is not enabled in this group.\n\nType \n*${usedPrefix}enable* nsfw to enable this feature.`;
  }

  // Check user age
  let userAge = global.db.data.users[m.sender].age;
  if (userAge < 17) throw m.reply(`*It seems your age is under 18!*`);

  if (!args[0]) throw `Please select a tag:\nblowjob\nneko\ntrap\nwaifu`;

  let res = await fetch(`https://api.waifu.pics/nsfw/${text}`);
  if (!res.ok) throw await res.text();

  let json = await res.json();
  if (!json.url) throw 'Error fetching the image!';

  conn.sendFile(m.chat, json.url, '', global.wm, m);
};

handler.command = /^(nsfw)$/i

handler.register = true
handler.premium = true
handler.limit = false

export default handler