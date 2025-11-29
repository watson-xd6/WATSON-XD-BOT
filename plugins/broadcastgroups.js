import { randomBytes } from 'crypto';

let handler = async (m, { conn, text }) => {
    // Get all groups the bot is part of that are not read-only or announcement-only
    let groups = Object.entries(conn.chats)
        .filter(([jid, chat]) => 
            jid.endsWith('@g.us') &&
            chat.isChats &&
            !chat.metadata?.read_only &&
            !chat.metadata?.announce
        )
        .map(v => v[0]);

    // Get the message to broadcast
    let cc = text ? m : m.quoted ? await m.getQuotedObj() : m;
    let messageText = text ? text : cc.text;

    conn.reply(m.chat, `_Sending broadcast message to ${groups.length} groups_`, m);

    for (let id of groups) {
        await conn.copyNForward(
            id,
            conn.cMod(
                m.chat,
                cc,
                /bc|broadcast/i.test(messageText)
                    ? `${htki} *BROADCAST* ${htka}\n${messageText}`
                    : `${htki} *BROADCAST* ${htka}\n${messageText}\n${readMore}\n\n${botdate}`
            ),
            true
        ).catch(_ => _);
    }

    m.reply('Broadcast to all groups completed :)');
};

handler.help = ['bcgc'].map(v => v + ' <text>');
handler.tags = ['owner'];
handler.command = /^(bcgc)$/i;

handler.owner = true;

const more = String.fromCharCode(8206);
const readMore = more.repeat(4001);

const randomID = length => randomBytes(Math.ceil(length * 0.5)).toString('hex').slice(0, length);