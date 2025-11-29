import { createHash } from 'crypto';

let Reg = /\|?(.*)([.|] *?)([0-9]*)$/i;

let handler = async function (m, { text, usedPrefix }) {
  let user = global.db.data.users[m.sender];

  if (user.registered) 
    throw `You are already registered.\nWant to register again? ${usedPrefix}unreg <SERIAL NUMBER>`;

  if (!Reg.test(text)) 
    throw `Invalid format.\nUse: *${usedPrefix}register name.age*`;

  let [_, name, splitter, age] = text.match(Reg);

  if (!name) throw 'Name cannot be empty (Alphanumeric required).';
  if (!age) throw 'Age cannot be empty (Numbers only).';

  age = parseInt(age);
  if (age > 120) throw 'Age too high 😂';
  if (age < 16) throw 'Esempe not allowed under 16 😂';

  user.name = name.trim();
  user.age = age;
  user.regTime = Date.now();
  user.registered = true;

  let sn = createHash('md5').update(m.sender).digest('hex');

  m.reply(`
Registration successful!

╭─「 Info 」
│ Name: ${name}
│ Age: ${age} years
╰────
Serial Number:
${sn}

**Terms of Service (TOS) - WATSON-XD-BOT**
By using WATSON-XD-BOT, you agree to the following:

1. *STRICTLY PROHIBITED TO MODIFY TIMERS/TEMPORARY MESSAGES*
The bot will automatically ban your number. To request unban, contact the owner at (+${global.nomorown}).

2. *PROHIBITED TO SEND NSFW MEDIA*
The bot will automatically detect NSFW media and ban your number. Contact the owner to unban.

3. *PROHIBITED TO SPAM BOT NUMBERS*
The bot will permanently ban if there is any spam detected from your number.

4. *CONTACT OWNER WHEN NECESSARY*
Do not message the bot directly; messages are stored on the server and the owner will not see them.

By registering, you agree to all terms.

*These terms were last updated on May 12, 2024.*
`.trim());
}

handler.help = ['register'].map(v => v + ' <name>.<age>');
handler.command = /^(register|reg|daftar)$/i;

export default handler;