import fetch from 'node-fetch'

let handler = async (m, { conn, text }) => {
  let args = text.trim().split(' ');

  let month = args[0] ? parseInt(args[0]) : new Date().getMonth() + 1;
  let year = args[1] ? parseInt(args[1]) : new Date().getFullYear();

  if (month < 1 || month > 12) {
    return await conn.sendMessage(m.chat, { text: 'Month must be a number between 1 and 12!' }, { quoted: m });
  }

  if (isNaN(year)) {
    return await conn.sendMessage(m.chat, { text: 'Year must be a valid number!' }, { quoted: m });
  }

  try {
    let url = `${APIs.ryzumi}/api/image/calendar?month=${month}&year=${year}`;

    let res = await fetch(url);
    if (!res.ok) throw `Failed to fetch image from API! Status: ${res.status}`;

    let imageBuffer = await res.buffer();
    let message = `Calendar for Month: ${month}, Year: ${year}`;

    await conn.sendMessage(m.chat, { image: imageBuffer, caption: message }, { quoted: m });

  } catch (err) {
    await conn.sendMessage(m.chat, { text: `Error: ${err.message || 'Failed to fetch image.'}` }, { quoted: m });
  }
};

handler.help = ['calendar'];
handler.tags = ['internet'];
handler.command = /^(calendar|kalender)$/i;

handler.register = true

export default handler