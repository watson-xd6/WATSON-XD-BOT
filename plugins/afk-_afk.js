let handler = m => m;

handler.before = m => {
    let user = global.db.data.users[m.sender];

    // Notify the user if they were AFK
    if (user.afk > -1) {
        m.reply(`
You are no longer AFK${user.afkReason ? ' after ' + user.afkReason : ''}
AFK duration: ${(new Date() - user.afk).toTimeString()}
        `.trim());
        user.afk = -1;
        user.afkReason = '';
    }

    // Notify if mentioned users are AFK
    let jids = [...new Set([...(m.mentionedJid || []), ...(m.quoted ? [m.quoted.sender] : [])])];
    for (let jid of jids) {
        let mentionedUser = global.db.data.users[jid];
        if (!mentionedUser) continue;
        let afkTime = mentionedUser.afk;
        if (!afkTime || afkTime < 0) continue;
        let reason = mentionedUser.afkReason || '';
        m.reply(`
Don't tag them!
They are currently AFK${reason ? ' for reason: ' + reason : ' without a reason'}
AFK duration: ${(new Date() - afkTime).toTimeString()}
        `.trim());
    }

    return true;
};

export default handler;