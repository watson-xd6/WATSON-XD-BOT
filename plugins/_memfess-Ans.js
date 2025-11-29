export async function before(m) {
    // Only handle private chats
    if (!m.chat.endsWith('@s.whatsapp.net')) return true;

    this.menfess = this.menfess || {};
    let mf = Object.values(this.menfess).find(v => v.status === false && v.receiver === m.sender);

    if (!mf) return true;

    console.log(m);

    // Handle user reply button
    if (m.text === 'Reply' && m.quoted?.mtype === 'buttonsMessage') {
        return m.reply("Please send your reply message.");
    }

    let txt = `Hi @${mf.from.split('@')[0]}, you received a reply!\n\nReply message:\n${m.text}`.trim();

    await this.reply(mf.from, txt, null).then(() => {
        m.reply('Menfess reply has been sent.');
        this.delay(1000);
        delete this.menfess[mf.id];
        return true;
    });
}