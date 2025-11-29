import fetch from 'node-fetch';

let handler = m => m;

handler.before = async function (m) {
    const bannedRegions = {
        '212': 'Morocco (+212)',
        '265': 'Malawi (+265)',
        '91': 'India (+91)',
        '90': 'Turkey (+90)',
    };

    const senderNumber = m.sender.split('@')[0];

    // Country code ban
    for (let code in bannedRegions) {
        if (senderNumber.startsWith(code)) {
            global.db.data.users[m.sender].banned = true;
            const blockedList = Object.values(bannedRegions).join('\n');

            await m.reply(
                `❌ Sorry, you cannot use this bot because your country code has been blocked due to spam activity.\n\n` +
                `📛 Blocked Countries:\n${blockedList}\n\n` +
                `📞 If you want to be unbanned, chat with *+263781330745*.`
            );

            await this.sendMessage(
                '+YOUR_OWNER_NUMBER_HERE@s.whatsapp.net',
                { text: `⚠️ User from banned region tried to use the bot:\nNumber: ${senderNumber}\nChat ID: ${m.chat}` }
            );

            return;
        }
    }

    // VPN/Proxy detection (via IP)
    try {
        const ipData = await fetch(`http://ip-api.com/json/${m.sender.split('@')[0]}`);
        const ipInfo = await ipData.json();

        // Basic heuristic: proxy or hosting detected
        if (ipInfo.proxy || ipInfo.hosting) {
            global.db.data.users[m.sender].banned = true;
            await m.reply(
                `❌ Your number seems to be using a VPN or proxy, so you are banned from using this bot.\n` +
                `📞 Contact +263781330745 if this is a mistake.`
            );

            await this.sendMessage(
                '+YOUR_OWNER_NUMBER_HERE@s.whatsapp.net',
                { text: `⚠️ User using VPN/proxy tried to use bot:\nNumber: ${senderNumber}\nChat ID: ${m.chat}\nIP Info: ${JSON.stringify(ipInfo)}` }
            );

            return;
        }
    } catch (e) {
        console.error('VPN detection error:', e);
    }
};

export default handler;