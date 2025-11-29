let handler = async (m, { conn }) => {

  let txt;
  if (m.sender.startsWith('263') || m.sender.startsWith('+263')) {
    txt = `
(English)
**Terms of Service (TOS) - watson-xd-bot**
By using watson-xd-bot, you agree to the following terms:

1. *STRICTLY PROHIBITED TO MODIFY TIMERS/TEMPORARY MESSAGES*
The bot will automatically ban your number if you attempt to modify timers/temporary messages. To request an unban, contact the owner at (+${global.nomorown}).

2. *PROHIBITED TO SEND NSFW MEDIA*
The bot will automatically detect NSFW media and ban your number. To request an unban, contact the owner at (+${global.nomorown}).

3. *PROHIBITED TO SPAM BOT NUMBERS*
The bot will issue a permanent ban if spam is detected from your number.

4. *CONTACT OWNER WHEN NECESSARY*
Messages to the bot number will not be seen by the owner, as they are stored on the server.

By using watson-xd-bot, you agree to all applicable terms.

*Last updated: May 12, 2024.*
`;
  }

  let name = global.author;
  let fkon = {
    key: {
      fromMe: false,
      participant: `${m.sender.split`@`[0]}@s.whatsapp.net`,
      ...(m.chat ? { remoteJid: '263781330745@s.whatsapp.net' } : {})
    },
    message: {
      contactMessage: {
        displayName: `${name}`,
        vcard: `BEGIN:VCARD\nVERSION:3.0\nN:;a,;;;\nFN:${name}\nitem1.TEL;waid=${m.sender.split('@')[0]}:${m.sender.split('@')[0]}\nitem1.X-ABLabel:Ponsel\nEND:VCARD`,
        verified: true
      }
    }
  };

  conn.relayMessage(m.chat, {
    extendedTextMessage: {
      text: txt,
      contextInfo: {
        mentionedJid: [m.sender],
        externalAdReply: {
          title: wm,
          mediaType: 1,
          previewType: 0,
          renderLargerThumbnail: true,
          thumbnailUrl: 'https://telegra.ph/file/14a7745f434cd21e900d6.jpg',
          sourceUrl: 'https://www.instagram.com/watson-xd3',
        }
      },
      mentions: [m.sender]
    }
  }, { quoted: fkon });
}

handler.help = ['rules'];
handler.tags = ['info'];
handler.command = /^(rules|tos|peraturan)$/i;

export default handler;