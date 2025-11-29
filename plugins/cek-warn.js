let handler = async (m, { conn, usedPrefix }) => {
    let warningCount = global.db.data.users[m.sender].warning || 0;

    let message = `
*You have ${warningCount} warning(s)*
`.trim();

    conn.reply(m.chat, message, m);
};

handler.help = ['checkwarn'];
handler.tags = ['info'];
handler.command = /^(checkwarn)$/i;

handler.register = true;

export default handler;

const more = String.fromCharCode(8206);
const readMore = more.repeat(4001);