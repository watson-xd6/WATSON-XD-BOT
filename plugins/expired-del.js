let handler = async (m, { conn, args, usedPrefix, command }) => {
    
    let target;
    if (m.isGroup) target = args[1] ? args[1] : m.chat;
    else target = args[1];

    // Remove expiration
    global.db.data.chats[target].expired = false;

    conn.reply(m.chat, `Successfully removed the expiration for this group.`, m);
}

handler.help = ['delexpired'];
handler.tags = ['owner'];
handler.command = /^(delexpired|delsewa)$/i;
handler.rowner = true;
handler.group = true;
handler.premium = false;

export default handler;

// Optional helper (not used here but kept for reference)
function msToDate(ms) {
    let days = Math.floor(ms / (24 * 60 * 60 * 1000));
    let daysMs = ms % (24 * 60 * 60 * 1000);
    let hours = Math.floor(daysMs / (60 * 60 * 1000));
    let hoursMs = ms % (60 * 60 * 1000);
    let minutes = Math.floor(hoursMs / (60 * 1000));
    return `${days} days ${hours} hours ${minutes} minutes`;
}