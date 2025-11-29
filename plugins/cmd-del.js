let handler = async (m, { conn, usedPrefix, text, command }) => {
    // Determine the hash: either from replied sticker or text input
    let hash = text;
    if (m.quoted && m.quoted.fileSha256) hash = m.quoted.fileSha256.toString('hex');

    if (!hash) throw `No hash provided`;

    let stickerDB = global.db.data.sticker;

    if (stickerDB[hash] && stickerDB[hash].locked) {
        throw 'You do not have permission to delete this sticker command';
    }

    delete stickerDB[hash];
    m.reply('Successfully deleted the sticker command!');
};

handler.help = ['cmd'].map(v => 'del' + v + ' <text>');
handler.tags = ['database', 'premium'];
handler.command = ['delcmd'];

handler.register = true;
handler.premium = true;

export default handler;