import { watchFile, unwatchFile } from 'fs'
import chalk from 'chalk'
import { fileURLToPath } from 'url'
import moment from 'moment-timezone'

/*============= TIME SETTINGS =============*/
let wibh = moment.tz('Africa/Harare').format('HH')
let wibm = moment.tz('Africa/Harare').format('mm')
let wibs = moment.tz('Africa/Harare').format('ss')
let wktuwib = `${wibh} H ${wibm} M ${wibs} S`
let wktugeneral = `${wibh}:${wibm}:${wibs}`

let d = new Date(new Date() + 3600000)
let locale = 'en' // English
let weton = ['Pahing', 'Pon', 'Wage', 'Kliwon', 'Legi'][Math.floor(d / 84600000) % 5]
let week = d.toLocaleDateString(locale, { weekday: 'long' })
let date = d.toLocaleDateString(locale, { day: 'numeric', month: 'long', year: 'numeric' })
const more = String.fromCharCode(8206)
const readMore = more.repeat(4001)

/*============= MAIN INFO =============*/
global.pairing = '263781330745'
global.owner = [['263781330745', 'WATSON-XD', true]]
global.mods = []
global.prems = []
global.botNumber = '263781330745'
global.ownerNumber = '263781330745'

/*============= WATERMARK / BOT INFO =============*/
global.readMore = readMore
global.author = 'watsonfourpence'
global.namebot = 'WATSON-XD-BOT'
global.wm = '*© WATSON-XD-BOT*'
global.watermark = global.wm
global.botdate = `⫹⫺ DATE: ${week} ${date}\n⫹⫺ TIME: ${wktuwib}`
global.bottime = `TIME: ${wktuwib}`
global.stickpack = 'watsonfourpence'
global.stickauth = '© watsonfourpence'
global.week = `${week} ${date}`
global.wibb = `${wktuwib}`

/*============= SOCIAL LINKS =============*/
global.instagram = 'https://www.instagram.com/wataonxf'
global.github = 'https://github.com/watson-xd6'
global.website = ''
global.whatsappChannel = 'https://whatsapp.com/channel/0029Vb7JI6VJf05VKkWSsR2N'
global.discord = '-'
global.facebook = 'https://www.facebook.com/watsonfourpence'
global.whatsappChannel2 = 'https://whatsapp.com/channel/0029Vb7JI6VJf05VKkWSsR2N'

/*============= DONATION LINKS =============*/
global.qris = 'https://api.ryzumi.vip/images/qris.png'
global.saweria = 'https://saweria.co/shirokamiryzen'

/*============= MENU STYLING =============*/
global.dmenut = 'ଓ═┅═━–〈' // top
global.dmenub = '┊↬' // body
global.dmenub2 = '┊' // body for info cmd on Default menu
global.dmenuf = '┗––––––––––✦' // footer
global.dashmenu = '┅═┅═❏ *DASHBOARD* ❏═┅═┅'
global.cmenut = '❏––––––『' // top
global.cmenuh = '』––––––' // header
global.cmenub = '┊✦ ' // body
global.cmenuf = '┗━═┅═━––––––๑\n' // footer
global.cmenua = '\n⌕ ❙❘❙❙❘❙❚❙❘❙❙❚❙❘❙❘❙❚❙❘❙❙❚❙❘❙❙❘❙❚❙❘ ⌕\n     '
global.pmenus = '✦'
global.htki = '––––––『' // title decoration (left)
global.htka = '』––––––' // title decoration (right)
global.lopr = 'Ⓟ' // PREMIUM logo in menu.js
global.lolm = 'Ⓛ' // LIMIT/FREE logo in menu.js
global.htjava = '⫹⫺' // decoration only
global.hsquere = ['⛶', '❏', '⫹⫺']

/*============= RESPONSES =============*/
global.wait = '🕣 _Watson loading..._*\n*▰▰▰▱▱▱▱▱*'
global.error = '*❌ Oops! Something went wrong!*'
global.rwait = '🔜'
global.dmoji = '⚡'

/*============= BOT FEATURES =============*/

global.autotyping = false 

global.autorecording = true

/*============= API =============*/
/*============= API CONFIG =============*/
global.APIs = {
    ryzumi: 'https://api.ryzumi.vip',
}

global.APIKeys = {
    // 'https://website': 'apikey'
}

/*============= FILE TYPES =============*/
global.dpptx = 'application/vnd.openxmlformats-officedocument.presentationml.presentation'
global.ddocx = 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
global.dxlsx = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
global.dpdf = 'application/pdf'
global.drtf = 'text/rtf'

/*============= LEVEL UP THUMBNAILS =============*/
global.thumblvlup = [
    'https://i.pinimg.com/originals/a0/34/8a/a0348ae908d8ac4ced76df289eb41e1a.jpg',
    'https://i.pinimg.com/originals/be/3b/47/be3b477371cc249e49fd0bb3284de7d7.jpg',
    'https://i.pinimg.com/originals/63/c3/37/63c337596b3391df0e72a9729ceca7b6.jpg',
    'https://i.pinimg.com/originals/db/ed/5a/dbed5afac55d266602d0ca0c67622bb9.jpg'
]

/*============= WATCH CONFIG FILE =============*/
let file = fileURLToPath(import.meta.url)
watchFile(file, () => {
    unwatchFile(file)
    console.log(chalk.redBright("Update 'config.js'"))
    import(`${file}?update=${Date.now()}`)
})
