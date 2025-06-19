import { watchFile, unwatchFile } from 'fs'
import fs from 'fs'
import chalk from 'chalk'
import { fileURLToPath } from 'url'
import moment from 'moment-timezone';
// ================= isi aja ========================================
global.info = {
 nomerbot: '263771330745',
 pairingNumber: '263771330745',
 nameown: 'zenz',
 nomerown: '263771330745',
 packname: '╭───═「 Zenzz XD 」═───╮\n│◉ BOT:    s.id/mshbot\n│◉ Zenzx XD\n│◉ By: Zenzz XD BOT⭐\n╰────────═┅═───────╯',
 author: '',
 wm: 'Z E N Z A I - M D',
 stickpack: 'Zenzz AI - MD',
 stickauth: 'Zenzz AI - MD'
}
// ================= Isi aja ========================================
global.owner = [
['263771330745', 'Zenzz XD', true],
['263771330745', 'Cuki MD', true]
]
global.namebot = 'Zenzz AI - MD'
global.versi = '4.0.0'
global.wm = '_`~ Powered by Zenzz XD. ~`_'
global.wmmedia = '© Powered by Zenzz XD.'
global.idch = 'xxxxxx@newsletter',
global.setting = {
 autoclear: false,
 addReply: true // buat with thumbnail
 }
// ================= Cpanel ========================================
global.egg = "15" // gausah di ubah

global.nestid = "5" // gausah diubah

global.loc = "1" // gausah diubah

global.domain = "https.zenzaimd.biz.id" // ini ubah ama domain / web panel lu

global.apikey = "ptla_bokep" // apikey / plta lu

global.capikey = "pltc_bokep" // capikey / pltc lu

// ================= ga penting gausah diisi ==========================
global.url = {
 sig: 'https://instagram.com/tulisan.ku.id',
 sgh:  'https://github.com/Tiooxy',
 sgc: 'https://chat.whatsapp.com/FFSwgyy0d8T71c1Nf7gQN1'
}



// ================= ga penting gausah diisi ==========================
global.payment = {
 psaweria: '_',
 ptrakterr: '-',
 pdana: '62xxxxx'
}
/// ================= ga usah di ubah apa apa nanti eror ==============
global.msg = {
  menu: (m) => {
    const timee = moment().tz('Asia/Jakarta').format('HH:mm:ss');
    let waktuucapan = 'sᴇʟᴀᴍᴀᴛ ᴍᴀʟᴀᴍ 🌃';

    if (timee < "05:00:00") {
        waktuucapan = 'sᴇʟᴀᴍᴀᴛ sᴜʙᴜʜ 🌉';
    } else if (timee < "10:00:00") {
        waktuucapan = 'sᴇʟᴀᴍᴀᴛ ᴘᴀɢɪ 🌄';
    } else if (timee < "15:00:00") {
        waktuucapan = 'sᴇʟᴀᴍᴀᴛ sɪᴀɴɢ 🏙';
    } else if (timee < "18:00:00") {
        waktuucapan = 'sᴇʟᴀᴍᴀᴛ sᴏʀᴇ 🌅';
    } else if (timee < "19:00:00") {
        waktuucapan = 'sᴇʟᴀᴍᴀᴛ ᴍᴀʟᴀᴍ 🌆';
    }

return `┣━━━━━━━━━━━━━━━━━━━
┃  📖  *ᴀʟʟ ᴄᴀᴛᴇɢᴏʀʏ ᴍᴇɴᴜ*
┣━━━━━━━━━━━━━━━━━━━
┃ • .ᴍᴇɴᴜ ᴀʟʟ
┃ • .ᴍᴇɴᴜ ᴀᴅᴠᴀɴᴄᴇᴅ
┃ • .ᴍᴇɴᴜ ᴀɪ
┃ • .ᴍᴇɴᴜ ᴀɴᴏɴʏᴍᴏᴜꜱ
┃ • .ᴍᴇɴᴜ ᴀᴜᴅɪᴏ
┃ • .ᴍᴇɴᴜ ᴅᴏᴡɴʟᴏᴀᴅᴇʀ
┃ • .ᴍᴇɴᴜ ꜰᴜɴ
┃ • .ᴍᴇɴᴜ ɢᴀᴍᴇ
┃ • .ᴍᴇɴᴜ ɢʀᴏᴜᴘ
┃ • .ᴍᴇɴᴜ ɪɴꜰᴏ
┃ • .ᴍᴇɴᴜ ɪɴᴛᴇʀɴᴇᴛ
┃ • .ᴍᴇɴᴜ ɪꜱʟᴀᴍɪ
┃ • .ᴍᴇɴᴜ ɪꜱʟᴀᴍɪᴄ
┃ • .ᴍᴇɴᴜ ᴋᴇʀᴀɴɢ
┃ • .ᴍᴇɴᴜ ᴍᴀɪɴ
┃ • .ᴍᴇɴᴜ ᴍᴀᴋᴇʀ
┃ • .ᴍᴇɴᴜ ɴꜱꜰᴡ
┃ • .ᴍᴇɴᴜ ᴏᴡɴᴇʀ
┃ • .ᴍᴇɴᴜ ᴘᴀɴᴇʟ
┃ • .ᴍᴇɴᴜ ᴘʀᴇᴍɪᴜᴍ
┃ • .ᴍᴇɴᴜ ᴘʀɪᴍʙᴏɴ
┃ • .ᴍᴇɴᴜ ʀᴘɢ
┃ • .ᴍᴇɴᴜ ꜱᴇᴀʀᴄʜ
┃ • .ᴍᴇɴᴜ ꜱᴏᴜɴᴅ
┃ • .ᴍᴇɴᴜ ꜱᴛᴀʟᴋᴇʀ
┃ • .ᴍᴇɴᴜ ꜱᴛɪᴄᴋᴇʀ
┃ • .ᴍᴇɴᴜ ꜱᴛᴏʀᴇ
┃ • .ᴍᴇɴᴜ ᴛᴏᴏʟꜱ
┃ • .ᴍᴇɴᴜ ᴜꜱᴇʀ
┃ • .ᴍᴇɴᴜ xᴘ
┗━━━━━━━━━━━━━━━━━━━
`;
  },
 wait: '⏱️ *Mohon bersabar*\n\> Sedang menjalankan perintah dari *User*!',
 eror: '🤖 *Information Bot*\n\> Mohon maaf atas ketidaknyamanan dalam menggunakan *Nightmare Bot* . Ada kesalahan dalam sistem saat menjalankan perintah.'
}
// ================ RPG gausah di ubah apa apa nanti eror =============
global.multiplier = 69
global.rpg = {
  emoticon(string) {
    string = string.toLowerCase();
      let emot = {
      agility: '🤸‍♂️',
      arc: '🏹',
      armor: '🥼',
      bank: '🏦',
      bibitanggur: '🍇',
      bibitapel: '🍎',
      bibitjeruk: '🍊',
      bibitmangga: '🥭',
      bibitpisang: '🍌',
      bow: '🏹',
      bull: '🐃',
      cat: '🐈',
      chicken: '🐓',
      common: '📦',
      cow: '🐄',
      crystal: '🔮',
      darkcrystal: '♠️',
      diamond: '💎',
      dog: '🐕',
      dragon: '🐉',
      elephant: '🐘',
      emerald: '💚',
      exp: '✉️',
      fishingrod: '🎣',
      fox: '🦊',
      gems: '🍀',
      giraffe: '🦒',
      gold: '👑',
      health: '❤️',
      horse: '🐎',
      intelligence: '🧠',
      iron: '⛓️',
      keygold: '🔑',
      keyiron: '🗝️',
      knife: '🔪',
      legendary: '🗃️',
      level: '🧬',
      limit: '🌌',
      lion: '🦁',
      magicwand: '⚕️',
      mana: '🪄',
      money: '💵',
      mythic: '🗳️',
      pet: '🎁',
      petFood: '🍖',
      pickaxe: '⛏️',
      pointxp: '📧',
      potion: '🥤',
      rock: '🪨',
      snake: '🐍',
      stamina: '⚡',
      strength: '🦹‍♀️',
      string: '🕸️',
      superior: '💼',
      sword: '⚔️',
      tiger: '🐅',
      trash: '🗑',
      uncommon: '🎁',
      upgrader: '🧰',
      wood: '🪵'
    }
    let results = Object.keys(emot).map(v => [v, new RegExp(v, 'gi')]).filter(v => v[1].test(string));
    if (!results.length) return '';
    else return emot[results[0][0]];
  }
}

let file = fileURLToPath(import.meta.url)
watchFile(file, () => {
  unwatchFile(file)
  console.log(chalk.redBright("Update 'settings.js'"))
  import(`${file}?update=${Date.now()}`)
})