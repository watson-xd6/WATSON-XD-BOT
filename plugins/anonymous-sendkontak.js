import PhoneNumber from 'awesome-phonenumber';

let handler = async function (m, { command, conn, text }) {
    this.anonymous = this.anonymous || {};
    const who = m.sender;
    const room = Object.values(this.anonymous).find(room => room.check(who));

    if (!room) {
        await conn.sendMessage(m.chat, { text: '❌ Kamu tidak berada di dalam anonymous chat.' }, { quoted: m });
        return;
    }

    const other = room.other(who);
    const name = text ? text : await conn.getName(who);
    const number = who.split('@')[0];

    const vcard = `
BEGIN:VCARD
VERSION:3.0
FN:${name.replace(/\n/g, '\\n')}
TEL;type=CELL;type=VOICE;waid=${number}:${PhoneNumber('+' + number).getNumber('international')}
END:VCARD`.trim();

    await conn.sendMessage(m.chat, { text: '✅ Kontak berhasil dikirim ke partner anonymous kamu.' }, { quoted: m });
    if (other) {
        await conn.sendMessage(other, { text: '📞 Partner mengirimkan kontak kepada kamu.' }, { quoted: m });
        await conn.sendMessage(other, {
            contacts: {
                displayName: name,
                contacts: [{ vcard }]
            }
        }, { quoted: m });
    }
};

handler.help = ['sendkontak'];
handler.tags = ['anonymous'];
handler.command = /^sendkontak$/i;
handler.private = true;

export default handler;