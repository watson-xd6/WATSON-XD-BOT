let linkRegex = /chat.whatsapp.com\/([0-9A-Za-z]{20,24})( [0-9]{1,3})?/i;

let handler = async (m, { conn, text, isOwner }) => {
    let [_, code, expired] = text.match(linkRegex) || [];
    if (!code) throw 'Invalid link';
    
    let res;
    try {
        res = await conn.groupAcceptInvite(code);
    } catch (error) {
        if (error && error.message) {
            if (error.message.includes('not-authorized')) {
                return m.reply(`
Cannot join because you were previously kicked.
Please wait up to 7 days, do not spam!!!

Note: Any reports about this will not be responded to by the owner.
                `);
            } else if (error.message.includes('gone')) {
                return m.reply('Invalid link / link has been reset by admin');
            }
        }
        throw error;
    }

    let user = global.db.data.users[m.sender];
    let now = Date.now();
    let maxTime = Math.floor((user.premiumTime - now) / (1000 * 60 * 60 * 24)); // remaining premium days

    expired = Math.floor(Math.min(maxTime, Math.max(1, isOwner ? (isNumber(expired) ? parseInt(expired) : 0) : 3)));
    if (expired > maxTime) {
        return m.reply(`Max group duration is limited to your premium duration.\nYour maximum days: ${maxTime}`);
    }

    m.reply(`Successfully joined group ${res}${expired ? ` for ${expired} days

If the group requires admin approval, please approve this number` : ''}`);

    let chats = global.db.data.chats[res];
    if (!chats) chats = global.db.data.chats[res] = {};
    if (expired) chats.expired = +new Date() + expired * 1000 * 60 * 60 * 24;
};

handler.help = ['join <chat.whatsapp.com>'];
handler.tags = ['owner'];

handler.command = /^join$/i;
handler.rowner = false;
handler.premium = true;

export default handler;

const isNumber = (x) => (x = parseInt(x), typeof x === 'number' && !isNaN(x));