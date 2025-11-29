import { downloadContentFromMessage } from '@adiwajshing/baileys';
import { format } from 'util';

// Regex to detect links from WhatsApp groups and adult sites
let linkRegex = /(chat.whatsapp.com|whatsapp.com|wa.me|xnxx.com|xvideos.com|pornhub.com)\/([0-9A-Za-z]{1,99999})/i;

let handler = m => m;

// Anti-link protection before sending messages
handler.before = async function (m, { isAdmin, isBotAdmin }) {
    // Ignore messages sent by the bot itself
    if (m.isBaileys && m.fromMe) return true;

    let chat = global.db.data.chats[m.chat];
    let isGroupLink = linkRegex.exec(m.text);

    if (chat.antiLink && isGroupLink && !isAdmin && !m.isBaileys && m.isGroup) {
        let thisGroup = `https://chat.whatsapp.com/${await this.groupInviteCode(m.chat)}`;

        // Don't kick if the link is the group's own link
        if (m.text.includes(thisGroup)) throw false;

        if (!isBotAdmin) {
            m.reply(`*「 ANTILINK 」*\n${isAdmin ? "Admins are exempt :')" : `Group link detected but ${global.namebot} is not admin so cannot kick!`}`);
        }

        if (isBotAdmin) {
            m.reply(`*「 ANTILINK 」*\nGroup link detected! You will be removed!!`);
            await this.delay(500);
            await this.groupParticipantsUpdate(m.chat, [m.sender], "remove");
            await this.sendMessage(m.chat, { delete: { remoteJid: m.chat, id: m.id }}); // Delete the message containing the link
        }
    }

    return true;
};

// Handler to bypass view-once media messages
export async function before(m, { isAdmin, isBotAdmin }) {
    let chat = db.data.chats[m.chat];

    // Ignore commands for reading/viewing once messages
    if (/^[.~#/\$,](read)?viewonce/.test(m.text)) return;
    if (!chat.viewonce || chat.isBanned) return;

    if (m.mtype == 'viewOnceMessageV2') {
        let msg = m.message.viewOnceMessageV2.message;
        let type = Object.keys(msg)[0];

        // Download media from view-once messages
        let media = await downloadContentFromMessage(msg[type], type.includes('image') ? 'image' : 'video');
        let buffer = Buffer.from([]);

        for await (const chunk of media) {
            buffer = Buffer.concat([buffer, chunk]);
        }

        // Send media normally so it can be viewed multiple times
        if (/video/.test(type)) {
            return this.sendFile(m.chat, buffer, 'media.mp4', msg[type].caption || '', m);
        } else if (/image/.test(type)) {
            return this.sendFile(m.chat, buffer, 'media.jpg', msg[type].caption || '', m);
        }
    }
}