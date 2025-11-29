let handler = async (m, { conn, args, usedPrefix, command }) => {
    if (!args[0] || isNaN(args[0])) throw `Please enter a number representing the number of days!\n*Example: ${usedPrefix + command} 30*`;

    let target;
    if (m.isGroup) target = args[1] ? args[1] : m.chat;
    else target = args[1];

    let daysInMs = 86400000 * args[0]; // 1 day = 86400000 ms
    let now = Date.now();

    if (now < global.db.data.chats[target].expired) {
        global.db.data.chats[target].expired = daysInMs;
    } else {
        global.db.data.chats[target].expired = now + daysInMs;
    }

    conn.reply(m.chat, `Successfully set the expiration period for this group to ${args[0]} days.\n\nCountdown: ${msToDate(global.db.data.chats[target].expired - now)}`, m);
}

handler.help = ['setexpired <days>'];
handler.tags = ['owner'];
handler.command = /^(setexpired|addsewa)$/i;
handler.rowner = true;
handler.group = true;

export default handler;

// Convert milliseconds to a readable "X days Y hours Z minutes" format
function msToDate(ms) {
    let days = Math.floor(ms / (24 * 60 * 60 * 1000));
    let daysMs = ms % (24 * 60 * 60 * 1000);
    let hours = Math.floor(daysMs / (60 * 60 * 1000));
    let hoursMs = ms % (60 * 60 * 1000);
    let minutes = Math.floor(hoursMs / (60 * 1000));
    return `${days} days ${hours} hours ${minutes} minutes`;
}