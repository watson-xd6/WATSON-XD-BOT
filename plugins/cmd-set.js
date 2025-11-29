let handler = async (m, { conn, text, usedPrefix, command }) => {
    db.data.sticker = db.data.sticker || {};

    if (!m.quoted) throw `Reply to a sticker with the command *${usedPrefix + command}*`;
    if (!m.quoted.fileSha256) throw 'SHA256 Hash Missing';
    if (!text) throw `Usage:\n${usedPrefix + command} <text>\n\nExample:\n${usedPrefix + command} test`;

    let stickerDB = db.data.sticker;
    let hash = m.quoted.fileSha256.toString('base64');

    if (stickerDB[hash] && stickerDB[hash].locked) {
        throw 'You do not have permission to modify this sticker command';
    }

    stickerDB[hash] = {
        text,
        mentionedJid: m.mentionedJid,
        creator: m.sender,
        at: Date.now(),
        locked: false,
    };

    m.reply('Successfully set the sticker command!');
};

handler.help = ['cmd'].map(v => 'set' + v + ' <text>');
handler.tags = ['database', 'premium'];
handler.command = ['setcmd'];
handler.premium = true;

export default handler;