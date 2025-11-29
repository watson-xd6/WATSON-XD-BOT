let handler = async (m, { conn, args }) => {
  // Get all users with premium time
  let users = Object.entries(global.db.data.users)
    .filter(([jid, user]) => user.premiumTime && user.premiumTime > Date.now())
    .map(([jid, user]) => ({ ...user, jid }));

  // Current user's premium info
  let userData = global.db.data.users[m.sender];
  let premTime = userData.premiumTime || 0;
  let prem = userData.premium || false;

  // Pagination
  let page = args[0] && /^\d+$/.test(args[0]) ? parseInt(args[0]) : 1;
  let perPage = 10;
  let totalPages = Math.ceil(users.length / perPage);
  let startIndex = (page - 1) * perPage;
  let endIndex = startIndex + perPage;
  
  // Sort users by remaining premium time descending
  users.sort((a, b) => (b.premiumTime || 0) - (a.premiumTime || 0));
  let usersToShow = users.slice(startIndex, endIndex);

  // Create contact message
  let fkon = {
    key: {
      fromMe: false,
      participant: `${m.sender.split('@')[0]}@s.whatsapp.net`,
      ...(m.chat ? { remoteJid: m.chat } : {})
    },
    message: {
      contactMessage: {
        displayName: 'Premium',
        vcard: `BEGIN:VCARD\nVERSION:3.0\nN:;Premium;;;\nFN:Premium\nitem1.TEL;waid=${m.sender.split('@')[0]}:${m.sender.split('@')[0]}\nitem1.X-ABLabel:Ponsel\nEND:VCARD`,
        verified: true
      }
    }
  };

  // Reply message
  await conn.reply(m.chat, `
┌✦ *My Premium Time:*
┊• *Name:* ${conn.getName(m.sender)}
┊• *Time:* ${prem ? clockString(premTime - Date.now()) : 'Expired'}
┗━═┅═━––––––๑

•·–––––––––––––––––––––·•
${usersToShow.map(u => `┌✦ ${u.registered ? u.name : conn.getName(u.jid)}
┊• wa.me/${u.jid.split('@')[0]}
┊• Premium Time: ${u.premiumTime > 0 ? clockString(u.premiumTime - Date.now()) : 'Expired'}`).join('\n┗━═┅═━––––––๑\n')}
┗━═┅═━––––––๑

*Page ${page} of ${totalPages}*
`.trim(), fkon);
};

handler.help = ['premlist'];
handler.tags = ['info'];
handler.command = /^(listprem|premlist)$/i;

export default handler;

// Helpers
function clockString(ms) {
  if (isNaN(ms) || ms <= 0) return 'Expired';
  let d = Math.floor(ms / 86400000);
  let h = Math.floor(ms / 3600000) % 24;
  let m = Math.floor(ms / 60000) % 60;
  let s = Math.floor(ms / 1000) % 60;
  return `${d}d ${h}h ${m}m ${s}s`;
}