/*

# Fitur : Leaderboard
# Type : Plugins ESM
# Created by : https://whatsapp.com/channel/0029Vb2qri6JkK72MIrI8F1Z
# Api : lokal / database.json

   ⚠️ _Note_ ⚠️
jangan hapus wm ini banggg

*/

import { areJidsSameUser } from '@adiwajshing/baileys';
import fs from 'fs';

const leaderboards = [
    'atm','level','exp','money','iron','gold','diamond','emerald','trash','potion',
    'wood','rock','string','umpan','petfood','common','uncommon','mythic','legendary','pet',
    'bank','chip','skata','donasi','deposit','garam','minyak','gandum','steak','ayam_goreng',
    'ribs','roti','udang_goreng','bacon'
];

leaderboards.sort((a, b) => a.localeCompare(b));

let handler = async (m, { conn, data, args, participants, usedPrefix, command }) => {
    let users = Object.entries(global.db.data.users).map(([key, value]) => ({
        ...value, jid: key
    }));

    let leaderboard = leaderboards.filter(v => v && users.filter(user => user && user[v]).length);
    let type = (args[0] || '').toLowerCase();

    let wrong = `🔖 type list :
${leaderboard.map(v => `⮕ ${global.rpg.emoticon(v)} - ${v}`).join('\n')}
––––––––––––––––––––––––
💁🏻‍♂ tip :
⮕ to view different leaderboard:
${usedPrefix}${command} [type]
★ Example:
${usedPrefix}${command} legendary`;

    const website = global.config?.website || '';

    if (!leaderboard.includes(type)) {
        await conn.sendMessage(m.chat, {
            text: '*––––『 𝙻𝙴𝙰𝙳𝙴𝚁𝙱𝙾𝙰𝚁𝙳 』––––*\n' + wrong,
            contextInfo: {
                externalAdReply: {
                    title: 'L E A D E R B O A R D',
                    body: website,
                    thumbnailUrl: flaImg.getRandom() + 'LEADERBOARD',
                    sourceUrl: website,
                    mediaType: 1,
                    renderLargerThumbnail: true,
                    showAdAttribution: true
                }
            }
        }, { quoted: m });
        return;
    }

    let sortedItem = users.map(toNumber(type)).sort(sort(type));
    let userItem = sortedItem.map(enumGetKey);

    let text = `
🏆 rank: ${toRupiah(userItem.indexOf(m.sender) + 1)} out of ${toRupiah(userItem.length)}

                *• ${global.rpg.emoticon(type)} ${type} •*

${sortedItem.slice(0, 10).map((user, i) => `${i + 1}.*﹙${toRupiah(user[type])}﹚*- ${participants.some(p => areJidsSameUser(user.jid, p.id)) ? `${user.registered ? user.name : conn.getName(user.jid)} \nwa.me/` : 'from other group\n @'}${user.jid.split`@`[0]}`).join`\n\n`}
`.trim();

    await conn.sendFile(
        m.chat,
        'https://files.catbox.moe/2urjf3.jpeg',
        'leaderboard.jpg',
        text,
        m,
        false,
        { contextInfo: { mentionedJid: conn.parseMention(text) } }
    );
};

handler.help = ['leaderboard'];
handler.tags = ['xp'];
handler.command = /^(leaderboard|lb)$/i;
handler.register = true;
handler.group = true;
handler.rpg = true;
export default handler;

function sort(property, ascending = true) {
    if (property) return (...args) => args[ascending & 1][property] - args[!ascending & 1][property];
    else return (...args) => args[ascending & 1] - args[!ascending & 1];
}

function toNumber(property, _default = 0) {
    return (a, i, b) => ({ ...b[i], [property]: a[property] === undefined ? _default : a[property] });
}

function enumGetKey(a) {
    return a.jid;
}

const flaImg = [
    'https://flamingtext.com/net-fu/proxy_form.cgi?&imageoutput=true&script=water-logo&script=water-logo&fontsize=90&doScale=true&scaleWidth=800&scaleHeight=500&fontsize=100&fillTextColor=%23000&shadowGlowColor=%23000&backgroundColor=%23000&text=',
    'https://flamingtext.com/net-fu/proxy_form.cgi?&imageoutput=true&script=crafts-logo&fontsize=90&doScale=true&scaleWidth=800&scaleHeight=500&text=',
    'https://flamingtext.com/net-fu/proxy_form.cgi?&imageoutput=true&script=amped-logo&doScale=true&scaleWidth=800&scaleHeight=500&text='
];

const toRupiah = number => parseInt(number).toLocaleString().replace(/,/g, '.');