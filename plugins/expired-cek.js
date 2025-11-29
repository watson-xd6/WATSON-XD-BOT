let handler = async (m, { conn, args, usedPrefix, command }) => {
    let target = m.isGroup ? (args[0] ? args[0] : m.chat) : args[0];

    if (!global.db.data.chats[target]?.expired || global.db.data.chats[target].expired < 1) {
        throw `This group does not have an expiration set!`;
    }

    const now = Date.now();
    const remaining = global.db.data.chats[target].expired - now;

    conn.reply(m.chat, `*⌛️ EXPIRATION TIMER ⌛️*\n\nTime left: ${msToDate(remaining)}`, m);
}

handler.help = ['checkexpired'];
handler.tags = ['group'];
handler.command = /^(cekexpired|cekkadaluarsa|checkexpired|checkkadaluarsa)$/i;
handler.group = true;

export default handler;

function msToDate(ms) {
    const days = Math.floor(ms / (24 * 60 * 60 * 1000));
    const daysMs = ms % (24 * 60 * 60 * 1000);
    const hours = Math.floor(daysMs / (60 * 60 * 1000));
    const hoursMs = ms % (60 * 60 * 1000);
    const minutes = Math.floor(hoursMs / (60 * 1000));
    return `${days} days ${hours} hours ${minutes} minutes`;
}