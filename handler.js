import { smsg } from './lib/simple.js'
import { format } from 'util'
import { fileURLToPath } from 'url'
import path, { join } from 'path'
import { unwatchFile, watchFile } from 'fs'
import chalk from 'chalk'
import fs from 'fs'
import fetch from 'node-fetch'
import moment from 'moment-timezone'
import knights from 'knights-canvas'
/**
 * @type {import('@adiwajshing/baileys')}
 */
const { 
proto,
getAggregateVotesInPollMessage
 } = (await import('@adiwajshing/baileys')).default
const isNumber = x => typeof x === 'number' && !isNaN(x)
const delay = ms => isNumber(ms) && new Promise(resolve => setTimeout(function () {
    clearTimeout(this)
    resolve()
}, ms))

/**
 * Handle messages upsert
 * @param {import('@adiwajshing/baileys').BaileysEventMap<unknown>['messages.upsert']} groupsUpdate 
 */
 
export async function handler(chatUpdate) {
    this.msgqueque = this.msgqueque || []
    if (!chatUpdate)
        return
    conn.pushMessage(chatUpdate.messages).catch(console.error)
    let m = chatUpdate.messages[chatUpdate.messages.length - 1]
    
    
    if (!m)
        return
    if (global.db.data == null)
        await global.loadDatabase()
    try {
        m = smsg(this, m) || m
        if (!m)
            return

        // console.log(JSON.stringify(m));

        m.exp = 0
        m.limit = false
        try {
            // TODO: use loop to insert data instead of this
            let user = global.db.data.users[m.sender]
            if (typeof user !== 'object')
                global.db.data.users[m.sender] = {}
            if (user) {
            } else
                                global.db.data.users[m.sender] = {}
            if (user) {
                if (!isNumber(user.money))
                    user.money = 0
                if (!isNumber(user.exp))
                    user.exp = 0
                if (!isNumber(user.chat))
                    user.chat = 0
                if (!isNumber(user.chatTotal))
                    user.chatTotal = 0
                if (!isNumber(user.limit))
                    user.limit = 50
                if (!isNumber(user.donasi))
                    user.donasi = 0
                if (!isNumber(user.deposit))
                    user.deposit = 0
                if (!isNumber(user.lastclaim))
                    user.lastclaim = 0
                if (!isNumber(user.skata))
                    user.skata = 0
                if (!isNumber(user.pc))
                    user.pc = 0
                if (!isNumber(user.lastseen))
                    user.lastseen = 0
                if (!isNumber(user.pacaranTime))
                    user.pacaranTime = 0
                if (!('registered' in user))
                    user.registered = false
                if (!('pacar' in user))
                    user.pacar = ""
                if (!('tembak' in user))
                    user.tembak = ""
                if (!('ditembak' in user))
                    user.ditembak = false
                if (!user.registered) {
                    if (!('name' in user))
                        user.name = m.name
                    if (!isNumber(user.age))
                        user.age = -1
                    if (!isNumber(user.regTime))
                        user.regTime = -1
                }
                if (!isNumber(user.afk))
                    user.afk = -1
                if (!isNumber(user.unbanwa))
                    user.unbanwa = 0
                if (!('unreg' in user))
                    user.unreg = false
                if (!('afkReason' in user))
                    user.afkReason = ''
                if (!('banned' in user))
                    user.banned = false
                if (!isNumber(user.bannedTime))
                    user.bannedTime = 0
                if (!'WarnReason' in user)
                    user.WarnReason = ''
                if (!isNumber(user.warning))
                    user.warning = 0
                if (!isNumber(user.level))
                    user.level = 0
                if (!('role' in user))
                    user.role = 'Beginner'
                if (!('skill' in user))
                    user.skill = ''
                if (!('rank' in user))
                    user.rank = 'Bronze'
                if (!isNumber(user.created))
                    user.created = Date.now()

                if (!('email') in user)
                    user.email = ''
                if (!('verif') in user)
                    user.verif = false
                if (!isNumber(user.command))
                    user.command = 0
                if (!isNumber(user.commandTotal))
                    user.commandTotal = 0
                if (!isNumber(user.commandLimit))
                    user.commandLimit = 50
                if (!isNumber(user.cmdLimitMsg))
                    user.cmdLimitMsg = 0

                if (!isNumber(user.chip))
                    user.chip = 0
                if (!isNumber(user.atm))
                    user.atm = 0
                if (!isNumber(user.fullatm))
                    user.fullatm = 0
                if (!isNumber(user.bank))
                    user.bank = 0
                if (!isNumber(user.health))
                    user.health = 100
                if (!isNumber(user.energy))
                    user.energy = 100
                if (!isNumber(user.sleep))
                    user.sleep = 100
                if (!isNumber(user.potion))
                    user.potion = 0
                if (!isNumber(user.trash))
                    user.trash = 0
                if (!isNumber(user.wood))
                    user.wood = 0
                if (!isNumber(user.rock))
                    user.rock = 0
                if (!isNumber(user.string))
                    user.string = 0
                if (!isNumber(user.petfood))
                    user.petfood = 0

                if (!isNumber(user.emerald))
                    user.emerald = 0
                if (!isNumber(user.diamond))
                    user.diamond = 0
                if (!isNumber(user.gold))
                    user.gold = 0
                if (!isNumber(user.botol))
                    user.botol = 0
                if (!isNumber(user.kardus))
                    user.kardus = 0
                if (!isNumber(user.kaleng))
                    user.kaleng = 0
                if (!isNumber(user.gelas))
                    user.gelas = 0
                if (!isNumber(user.plastik))
                    user.plastik = 0
                if (!isNumber(user.iron))
                    user.iron = 0

                if (!isNumber(user.common))
                    user.common = 0
                if (!isNumber(user.uncommon))
                    user.uncommon = 0
                if (!isNumber(user.mythic))
                    user.mythic = 0
                if (!isNumber(user.legendary))
                    user.legendary = 0
                if (!isNumber(user.umpan))
                    user.umpan = 0
                if (!isNumber(user.pet))
                    user.pet = 0

                if (!isNumber(user.paus))
                    user.paus = 0
                if (!isNumber(user.kepiting))
                    user.kepiting = 0
                if (!isNumber(user.gurita))
                    user.gurita = 0
                if (!isNumber(user.cumi))
                    user.cumi = 0
                if (!isNumber(user.buntal))
                    user.buntal = 0
                if (!isNumber(user.dory))
                    user.dory = 0
                if (!isNumber(user.lumba))
                    user.lumba = 0
                if (!isNumber(user.lobster))
                    user.lobster = 0
                if (!isNumber(user.hiu))
                    user.hiu = 0
                if (!isNumber(user.udang))
                    user.udang = 0
                if (!isNumber(user.orca))
                    user.orca = 0

                if (!isNumber(user.banteng))
                    user.banteng = 0
                if (!isNumber(user.gajah))
                    user.gajah = 0
                if (!isNumber(user.harimau))
                    user.harimau = 0
                if (!isNumber(user.kambing))
                    user.kambing = 0
                if (!isNumber(user.panda))
                    user.panda = 0
                if (!isNumber(user.buaya))
                    user.buaya = 0
                if (!isNumber(user.kerbau))
                    user.kerbau = 0
                if (!isNumber(user.sapi))
                    user.sapi = 0
                if (!isNumber(user.monyet))
                    user.monyet = 0
                if (!isNumber(user.babihutan))
                    user.babihutan = 0
                if (!isNumber(user.babi))
                    user.babi = 0
                if (!isNumber(user.ayam))
                    user.ayam = 0

                if (!isNumber(user.steak))
                    user.steak = 0
                if (!isNumber(user.ayam_goreng))
                    user.ayam_goreng = 0
                if (!isNumber(user.ribs))
                    user.ribs = 0
                if (!isNumber(user.roti))
                    user.roti = 0
                if (!isNumber(user.udang_goreng))
                    user.udang_goreng = 0
                if (!isNumber(user.bacon))
                    user.bacon = 0
                if (!isNumber(user.gandum))
                    user.gandum = 0
                if (!isNumber(user.minyak))
                    user.minyak = 0
                if (!isNumber(user.garam))
                    user.garam = 0

                if (!isNumber(user.ojek))
                    user.ojek = 0
                if (!isNumber(user.polisi))
                    user.polisi = 0
                if (!isNumber(user.roket))
                    user.roket = 0
                if (!isNumber(user.taxy))
                    user.taxy = 0

                if (!isNumber(user.lockBankCD))
                    user.lockBankCD = 0
                if (!isNumber(user.lasthackbank))
                    user.lasthackbank = 0
                if (!isNumber(user.lastadventure))
                    user.lastadventure = 0
                if (!isNumber(user.lastkill))
                    user.lastkill = 0
                if (!isNumber(user.lastmisi))
                    user.lastmisi = 0
                if (!isNumber(user.lastdungeon))
                    user.lastdungeon = 0
                if (!isNumber(user.lastwar))
                    user.lastwar = 0
                if (!isNumber(user.lastsda))
                    user.lastsda = 0
                if (!isNumber(user.lastduel))
                    user.lastduel = 0
                if (!isNumber(user.lastmining))
                    user.lastmining = 0
                if (!isNumber(user.lasthunt))
                    user.lasthunt = 0
                if (!isNumber(user.lastgift))
                    user.lastgift = 0
                if (!isNumber(user.lastberkebon))
                    user.lastberkebon = 0
                if (!isNumber(user.lastdagang))
                    user.lastdagang = 0
                if (!isNumber(user.lasthourly))
                    user.lasthourly = 0
                if (!isNumber(user.lastbansos))
                    user.lastbansos = 0
                if (!isNumber(user.lastrampok))
                    user.lastrampok = 0
                if (!isNumber(user.lastclaim))
                    user.lastclaim = 0
                if (!isNumber(user.lastnebang))
                    user.lastnebang = 0
                if (!isNumber(user.lastweekly))
                    user.lastweekly = 0
                if (!isNumber(user.lastmonthly))
                    user.lastmonthly = 0

                if (!isNumber(user.apel))
                    user.apel = 0
                if (!isNumber(user.anggur))
                    user.anggur = 0
                if (!isNumber(user.jeruk))
                    user.jeruk = 0
                if (!isNumber(user.mangga))
                    user.mangga = 0
                if (!isNumber(user.pisang))
                    user.pisang = 0
                if (!isNumber(user.makanan))
                    user.makanan = 0
                if (!isNumber(user.bibitanggur))
                    user.bibitanggur = 0
                if (!isNumber(user.bibitpisang))
                    user.bibitpisang = 0
                if (!isNumber(user.bibitapel))
                    user.bibitapel = 0
                if (!isNumber(user.bibitmangga))
                    user.bibitmangga = 0
                if (!isNumber(user.bibitjeruk))
                    user.bibitjeruk = 0

                if (!isNumber(user.horse))
                    user.horse = 0
                if (!isNumber(user.horseexp))
                    user.horseexp = 0
                if (!isNumber(user.cat))
                    user.cat = 0
                if (!isNumber(user.catexp))
                    user.catexp = 0
                if (!isNumber(user.fox))
                    user.fox = 0
                if (!isNumber(user.foxhexp))
                    user.foxexp = 0
                if (!isNumber(user.dogexp))
                    user.dogexp = 0
                if (!isNumber(user.robo))
                    user.robo = 0
                if (!isNumber(user.roboexp))
                    user.roboexp = 0
                if (!isNumber(user.dragon))
                    user.dragon = 0        
                if (!isNumber(user.dragonexp))
                    user.dragonexp = 0         
                if (!isNumber(user.lion))
                    user.lion = 0 
                if (!isNumber(user.lionexp))
                    user.lionexp = 0   
                if (!isNumber(user.rhinoceros))
                    user.rhinoceros = 0    
                if (!isNumber(user.rhinocerosexp))
                    user.rhinocerosexp = 0        
                if (!isNumber(user.centaur))
                    user.centaur = 0        
                if (!isNumber(user.centaurexp))
                    user.centaurexp = 0
                if (!isNumber(user.kyubi))
                    user.kyubi = 0  
                if (!isNumber(user.kyubiexp))
                    user.kyubexpi = 0 
                if (!isNumber(user.griffin))
                    user.griffin = 0       
                if (!isNumber(user.griffinexp))
                    user.griffinexp = 0          
                if (!isNumber(user.phonix))
                    user.phonix = 0    
                if (!isNumber(user.phonixexp))
                    user.phonixexp = 0
                if (!isNumber(user.wolf))
                    user.wolf = 0   
                if (!isNumber(user.wolfexp))
                    user.wolfexp = 0                                                                                                        
                if (!isNumber(user.horselastfeed))
                    user.horselastfeed = 0
                if (!isNumber(user.catlastfeed))
                    user.catlastfeed = 0
                if (!isNumber(user.robolastfeed))
                    user.robolastfeed = 0
                if (!isNumber(user.foxlastfeed))
                    user.foxlastfeed = 0
                if (!isNumber(user.doglastfeed))
                    user.doglastfeed = 0
                if (!isNumber(user.dragonlastfeed))
                    user.dragonlastfeed = 0
                if (!isNumber(user.lionlastfeed))
                    user.lionlastfeed = 0
                if (!isNumber(user.rhinoceroslastfeed))
                    user.rhinoceroslastfeed = 0    
                if (!isNumber(user.centaurlastfeed))
                    user.centaurlastfeed = 0
                if (!isNumber(user.kyubilastfeed))
                    user.kyubilastfeed = 0
                if (!isNumber(user.griffinlastfeed))
                    user.griffinlastfeed = 0    
                if (!isNumber(user.phonixlastfeed))
                    user.phonixlastfeed = 0
                if (!isNumber(user.wolflastfeed))
                    user.wolflastfeed = 0        

                if (!isNumber(user.robo))
                    user.robo = 0
                if (!isNumber(user.robodurability))
                    user.robodurability = 0
                if (!isNumber(user.armor))
                    user.armor = 0
                if (!isNumber(user.armordurability))
                    user.armordurability = 0
                if (!isNumber(user.sword))
                    user.sword = 0
                if (!isNumber(user.sworddurability))
                    user.sworddurability = 0
                if (!isNumber(user.pickaxe))
                    user.pickaxe = 0
                if (!isNumber(user.pickaxedurability))
                    user.pickaxedurability = 0
                if (!isNumber(user.fishingrod))
                    user.fishingrod = 0
                if (!isNumber(user.fishingroddurability))
                    user.fishingroddurability = 0

                if (!('premium' in user))
                    user.premium = false
                if (!('autolevelup' in user))
                    user.autolevelup = true
                if (!('autodownload' in user))
                    user.autodownload = false
                if (!('sticker' in user))
                    user.sticker = {}
                if (!('invest' in user))
                    user.invest = {}
                if (!('saham' in user))
                    user.saham = {}
                if (!('task' in user))
                    user.task = {}
                if (!('historyTrx' in user))
                    user.historyTrx = []
                if (!('rumah' in user))
                    user.rumah = {}
                if (!isNumber(user.premiumTime))
                    user.premiumTime = 0
            } else global.db.data.users[m.sender] = {
                money: 0,
                exp: 0,
                limit: 50,
                chat: 0,
                chatTotal: 0,
                lastclaim: 0,
                skata: 0,
                donasi: 0,
                deposit: 0,
                registered: false,
                pacar: "",
                tembak: "",
                ditembak: false,
                pacaranTime: 0,
                name: m.name,
                pc: 0,
                lastseen: 0,
                age: -1,
                regTime: -1,
                unreg: false,
                afk: -1,
                unbanwa: 0,
                afkReason: '',
                banned: false,
                bannedTime: 0,
                warning: 0,
                level: 0,
                role: 'Beginner',
                skill: '',
                WarnReason: '',
                rank: "Bronze",
                created: Date.now(),

                chip: 0,
                bank: 0,
                atm: 0,
                fullatm: 0,
                health: 100,
                energy: 100,
                sleep: 100,
                potion: 10,
                trash: 0,
                wood: 0,
                rock: 0,
                string: 0,
                emerald: 0,
                diamond: 0,
                gold: 0,
                iron: 0,
                common: 0,
                uncommon: 0,
                mythic: 0,
                legendary: 0,
                umpan: 0,
                pet: 0,
                horse: 0,
                horseexp: 0,
                horselastfeed: 0,
                cat: 0,
                catexp: 0,
                catlastfeed: 0,
                fox: 0,
                foxexp: 0,
                foxlastfeed: 0,
                robo: 0,
                roboexp: 0,
                robolastfeed: 0,
                dog: 0,
                dogexp: 0,
                doglastfeed: 0,

                email: '',
                verif: false,
                command: 0,
                commandTotal: 0,
                commandLimit: 50,
                cmdLimitMsg: 0,

                paus: 0,
                kepiting: 0,
                gurita: 0,
                cumi: 0,
                buntal: 0,
                dory: 0,
                lumba: 0,
                lobster: 0,
                hiu: 0,
                udang: 0,
                ikan: 0,
                orca: 0,
                banteng: 0,
                harimau: 0,
                gajah: 0,
                kambing: 0,
                buaya: 0,
                kerbau: 0,
                sapi: 0,
                monyet: 0,
                babi: 0,
                ayam: 0,

                ojek: 0,
                polisi: 0,
                roket: 0,
                taxy: 0,

                armor: 0,
                armordurability: 0,
                sword: 0,
                sworddurability: 0,
                pickaxe: 0,
                pickaxedurability: 0,
                fishingrod: 0,
                fishingroddurability: 0,
                robo: 0,
                robodurability: 0,
                apel: 20,
                pisang: 0,
                anggur: 0,
                mangga: 0,
                jeruk: 0,

                steak: 0,
                ayam_goreng: 0,
                ribs: 0,
                roti: 0,
                udang_goreng: 0,
                bacon: 0,
                gandum: 0,
                minyak: 0,
                garam: 0,

                lastadventure: 0,
                lockBankCD: 0,
                lasthackbank: 0,
                lastkill: 0,
                lastmisi: 0,
                lastdungeon: 0,
                lastwar: 0,
                lastsda: 0,
                lastduel: 0,
                lastmining: 0,
                lasthunt: 0,
                lastgift: 0,
                lastberkebon: 0,
                lastdagang: 0,
                lasthourly: 0,
                lastbansos: 0,
                lastrampok: 0,
                lastclaim: 0,
                lastnebang: 0,
                lastweekly: 0,
                lastmonthly: 0,

                premium: false,
                autolevelup: false,
                autodownload: false,
                sticker: {},
                invest: {},
                saham: {},
                task: {},
                historyTrx: [],
                rumah: {},
                premiumTime: 0,
            }
            let chat = global.db.data.chats[m.chat]
            if (typeof chat !== 'object')
                global.db.data.chats[m.chat] = {}
            if (chat) {
                if (!('isBanned' in chat))
                    chat.isBanned = false
                if (!('acc' in chat))
                    chat.acc = false
                if (!('welcome' in chat))
                    chat.welcome = true
                if (!('detect' in chat))
                    chat.detect = false
                if (!('sWelcome' in chat))
                    chat.sWelcome = ''
                if (!('sBye' in chat))
                    chat.sBye = ''
                if (!('sPromote' in chat))
                    chat.sPromote = ''
                if (!('sDemote' in chat))
                    chat.sDemote = ''
                if (!('delete' in chat))
                    chat.delete = false
                if (!('antiLink' in chat))
                    chat.antiLink = false
                if (!('anticall' in chat)) 
                    chat.antiCall = true
                if (!('antiSpam' in chat)) 
                    chat.antiSpaml = true
                if (!('antiFoto' in chat))
                    chat.antiFoto = false
                if (!('antiVideo' in chat))
                    chat.antiVideo = false
                if (!('antiSticker' in chat))
                    chat.antiSticker = false
                if (!('antiAudio' in chat))
                    chat.antiAudio = false
                if (!('viewonce' in chat))
                    chat.viewonce = false
                if (!('antiBadword' in chat)) 
                    chat.antiBadword = false
                if (!('simi' in chat))
                    chat.simi = false
                if (!isNumber(chat.expired))
                    chat.expired = 0
            } else
                global.db.data.chats[m.chat] = {
                    isBanned: false,
                    antiSpam: true,
                    acc: false,
                    welcome: true,
                    detect: false,
                    sWelcome: '',
                    sBye: '',
                    sPromote: '',
                    sDemote: '',
                    delete: false,
                    antiLink: false,
                    antiCall: true,
                    antiFoto: false,
                    antiVideo: false,
                    antiSticker: false,
                    antiAudio: false,
                    viewonce: false,
                    antiBadword: false,
                    simi: false,
                    expired: 0,
                }
            let settings = global.db.data.settings[this.user.jid]
            if (typeof settings !== 'object') global.db.data.settings[this.user.jid] = {}
            if (settings) {
                if (!('self' in settings)) settings.self = false
                if (!('autoread' in settings)) settings.autoread = true
                if (!('restrict' in settings)) settings.restrict = true
                if (!('autorestart' in settings)) settings.autorestart = true
                if (!('anticall' in settings)) settings.antiCall = true
                if (!('image' in settings)) settings.image = true
                if (!('gif' in settings)) settings.gif = false 
                if (!('teks' in settings)) settings.teks = false
                if (!('doc' in settings)) settings.doc = false
                if (!('loc' in settings)) settings.loc = false
            } else global.db.data.settings[this.user.jid] = {
                self: false,
                autoread: true,
                autoBio: false,
                antiCall: true, 
                restrict: true,
                image: true,
                gif: false,
                teks: false,
                doc: false,
                loc: false,
                autorestart: false,
            }
        } catch (e) {
            console.error(e)
        }
        const isROwner = [...global.owner.map(([number]) => number)].map(v => v.replace(/[^0-9]/g, '') + '@s.whatsapp.net').includes(m.sender)
        const isOwner = isROwner || db.data.users[m.sender].owner
        const isPrems = isROwner || db.data.users[m.sender].premium

        if (opts['nyimak'])
            return
        if (!m.fromMe && !isROwner && opts['self'])
            return
        if (opts['pconly'] && m.chat.endsWith('g.us'))
            return
        if (opts['gconly'] && !m.chat.endsWith('g.us'))
            return
        if (opts['swonly'] && m.chat !== 'status@broadcast')
            return
        if (typeof m.text !== 'string')
            m.text = ''

        if (opts['queque'] && m.text && !(isMods || isPrems)) {
            let queque = this.msgqueque, time = 1000 * 5
            const previousID = queque[queque.length - 1]
            queque.push(m.id || m.key.id)
            setInterval(async function () {
                if (queque.indexOf(previousID) === -1) clearInterval(this)
                await delay(time)
            }, time)
        }

        if (m.isBaileys)
            return
            
        m.exp += Math.ceil(Math.random() * 10)

        let usedPrefix
        let _user = global.db.data && global.db.data.users && global.db.data.users[m.sender]

        const groupMetadata = (m.isGroup ? ((conn.chats[m.chat] || {}).metadata || await this.groupMetadata(m.chat).catch(_ => null)) : {}) || {}
        const participants = (m.isGroup ? groupMetadata.participants : []) || []
        const user = (m.isGroup ? participants.find(u => conn.decodeJid(u.id) === m.sender) : {}) || {} // User Data
        const bot = (m.isGroup ? participants.find(u => conn.decodeJid(u.id) == this.user.jid) : {}) || {} // Your Data
        const isRAdmin = user?.admin == 'superadmin' || false
        const isAdmin = isRAdmin || user?.admin == 'admin' || false // Is User Admin?
        const isBotAdmin = bot?.admin || false // Are you Admin?

        const ___dirname = path.join(path.dirname(fileURLToPath(import.meta.url)), './plugins')
        for (let name in global.plugins) {
            let plugin = global.plugins[name]
            if (!plugin)
                continue
            if (plugin.disabled)
                continue
            const __filename = join(___dirname, name)
            if (typeof plugin.all === 'function') {
                try {
                    await plugin.all.call(this, m, {
                        chatUpdate,
                        __dirname: ___dirname,
                        __filename
                    })
                } catch (e) {
                    // if (typeof e === 'string') continue
                    console.error(e)
                    conn.reply('120363374325074499@g.us', `❲ SISTEM ERROR ❳

❲ 𝐅𝐫𝐨𝐦 𝐏𝐥𝐮𝐠𝐢𝐧𝐬 ❳ : ${name}
❲ 𝐅𝐫𝐨𝐦 𝐒𝐞𝐧𝐝𝐞𝐫 ❳ : ${m.sender}
❲ 𝐅𝐫𝐨𝐦 𝐂𝐡𝐚𝐭 ❳ : ${m.chat}
❲ 𝐅𝐫𝐨𝐦 𝐂𝐨𝐦𝐦𝐚𝐧𝐝 ❳ : ${m.text}

\`\`\`${format(e)}\`\`\`

${global.namebot}
`.trim(), m)
                }
            }
            if (!opts['restrict'])
                if (plugin.tags && plugin.tags.includes('admin')) {
                    global.dfail('restrict', m, this)
                    continue
                }
                
            const str2Regex = str => str.replace(/[|\\{}()[\]^$+*?.]/g, '\\$&')
            let _prefix = plugin.customPrefix ? plugin.customPrefix : conn.prefix ? conn.prefix : global.prefix
            let match = (_prefix instanceof RegExp ? // RegExp Mode?
                [[_prefix.exec(m.text), _prefix]] :
                Array.isArray(_prefix) ? // Array?
                    _prefix.map(p => {
                        let re = p instanceof RegExp ? // RegExp in Array?
                            p :
                            new RegExp(str2Regex(p))
                        return [re.exec(m.text), re]
                    }) :
                    typeof _prefix === 'string' ? // String?
                        [[new RegExp(str2Regex(_prefix)).exec(m.text), new RegExp(str2Regex(_prefix))]] :
                        [[[], new RegExp]]
            ).find(p => p[1])
            if (typeof plugin.before === 'function') {
                if (await plugin.before.call(this, m, {
                    match,
                    conn: this,
                    participants,
                    groupMetadata,
                    user,
                    bot,
                    isROwner,
                    isOwner,
                    isRAdmin,
                    isAdmin,
                    isBotAdmin,
                    isPrems,
                    chatUpdate,
                    __dirname: ___dirname,
                    __filename
                }))
                    continue
            }
            if (typeof plugin !== 'function')
                continue
            if ((usedPrefix = (match[0] || '')[0])) {
                let noPrefix = m.text.replace(usedPrefix, '')
                let [command, ...args] = noPrefix.trim().split` `.filter(v => v)
                args = args || []
                let _args = noPrefix.trim().split` `.slice(1)
                let text = _args.join` `
                
                command = (command || '').toLowerCase()
                let fail = plugin.fail || global.dfail // When failed
                let isAccept = plugin.command instanceof RegExp ? // RegExp Mode?
                    plugin.command.test(command) :
                    Array.isArray(plugin.command) ? // Array?
                        plugin.command.some(cmd => cmd instanceof RegExp ? // RegExp in Array?
                            cmd.test(command) :
                            cmd === command
                        ) :
                        typeof plugin.command === 'string' ? // String?
                            plugin.command === command :
                            false

                if (!isAccept)
                    continue
                m.plugin = name
                if (m.chat in global.db.data.chats || m.sender in global.db.data.users) {
                    let chat = global.db.data.chats[m.chat]
                    let user = global.db.data.users[m.sender]
                    if (name != 'own-unbanchat.js' && name != 'own-exec.js' && name != 'own-exec2.js' && name != 'own-delete.js' && chat?.isBanned && !isROwner)
                        return // Except this
                    if (name != 'own-unbanchat.js' && name != 'own-exec.js' && name != 'own-exec2.js' && name != 'own-delete.js' && chat?.isBannedOwn)
                        return // Except this
                    if (name != 'own-unbanuser.js' && user?.banned && !user?.owner)
                        return
                }
                if (plugin.rowner && plugin.owner && !(isROwner || isOwner)) { // Both Owner
                    fail('owner', m, this)
                    continue
                }
                if (plugin.rowner && !isROwner) { // Real Owner
                    fail('rowner', m, this)
                    continue
                }
                if (plugin.owner && !isOwner) { // Number Owner
                    fail('owner', m, this)
                    continue
                }
                if (plugin.premium && !isPrems) { // Premium
                    fail('premium', m, this)
                    continue
                }
                if (plugin.group && !m.isGroup) { // Group Only
                    fail('group', m, this)
                    continue
                } else if (plugin.botAdmin && !isBotAdmin) { // You Admin
                    fail('botAdmin', m, this)
                    continue
                } else if (plugin.admin && !isAdmin) { // User Admin
                    fail('admin', m, this)
                    continue
                }
                if (plugin.private && m.isGroup) { // Private Chat Only
                    fail('private', m, this)
                    continue
                }
                if (plugin.register == true && _user.registered == false) { 
                    fail('unreg', m, this)
                    continue
                }
                m.isCommand = true
                let xp = 'exp' in plugin ? parseInt(plugin.exp) : 23 // mendapatkan exp tiap command 
                if (xp > 200)
                    m.reply('Ngecit')
                else
                    m.exp += xp
                if (!isPrems && plugin.limit && global.db.data.users[m.sender].limit < plugin.limit * 7) {
                    this.reply(m.chat, `Limit telah mencapai batas maksimal.\nSegera berlangganan untuk mendapatkan limit tanpa batas⚡`, m)
                    continue // Limit habis
                }
                if (plugin.level > _user.level) {
                    this.reply(m.chat, `Diperlukan Level ${plugin.level} Untuk Menggunakan Perintah Ini\n*Level Kamu:* ${_user.level}`, m)
                    continue // If the level has not been reached
                }
                let extra = {
                    match,
                    usedPrefix,
                    noPrefix,
                    _args,
                    args,
                    command,
                    text,
                    conn: this,
                    participants,
                    groupMetadata,
                    user,
                    bot,
                    isROwner,
                    isOwner,
                    isRAdmin,
                    isAdmin,
                    isBotAdmin,
                    isPrems,
                    chatUpdate,
                    __dirname: ___dirname,
                    __filename
                }
                try {
                    await plugin.call(this, m, extra)
                    if (!isPrems)
                        m.limit = m.limit || plugin.limit || false
                } catch (e) {
                    // Error occured
                    m.error = e
                    console.error(e)
                    if (e) {
                        let text = format(e)
                        for (let key of Object.values(global.APIKeys))
                            text = text.replace(new RegExp(key, 'g'), '#HIDDEN#')
                        if (e.name)
                            for (let [jid] of global.owner.filter(([number, _, isDeveloper]) => isDeveloper && number)) {
                                let data = (await conn.onWhatsApp(jid))[0] || {}
                                if (data.exists)
                                    m.reply(`❲ REPORT SISTEM ❳
                                    
❲ 𝐅𝐫𝐨𝐦 𝐏𝐥𝐮𝐠𝐢𝐧𝐬 ❳ : ${m.plugin}
❲ 𝐅𝐫𝐨𝐦 𝐒𝐞𝐧𝐝𝐞𝐫 ❳ : ${m.sender}
❲ 𝐅𝐫𝐨𝐦 𝐂𝐡𝐚𝐭 ❳ : ${m.chat}
❲ 𝐅𝐫𝐨𝐦 𝐂𝐨𝐦𝐦𝐚𝐧𝐝 ❳ : ${usedPrefix}${command} ${args.join(' ')}
❲ ERROR LOG ❳ : 

\`\`\`${text}\`\`\`

${global.namebot}
`.trim(), data.jid)
                            }
                        m.reply(text)
                    }
                } finally {
                    // m.reply(util.format(_user))
                    if (typeof plugin.after === 'function') {
                        try {
                            await plugin.after.call(this, m, extra)
                        } catch (e) {
                            console.error(e)
                        }
                    }
                }
                break
            }
        }
    } catch (e) {
        console.error(e)
    } finally {
        if (opts['queque'] && m.text) {
            const quequeIndex = this.msgqueque.indexOf(m.id || m.key.id)
            if (quequeIndex !== -1)
                this.msgqueque.splice(quequeIndex, 1)
        }
        let user, stats = global.db.data.stats
        if (m) {
            if (m.sender && (user = global.db.data.users[m.sender])) {
                user.exp += m.exp
                user.limit -= m.limit * 8
            }

            let stat
            if (m.plugin) {
              let rn = ['recording','composing']
              let jd = rn[Math.floor(Math.random() * rn.length)]
              await this.sendPresenceUpdate(jd,m.chat)
                let now = +new Date
                if (m.plugin in stats) {
                    stat = stats[m.plugin]
                    if (!isNumber(stat.total)) stat.total = 1
                    if (!isNumber(stat.success)) stat.success = m.error != null ? 0 : 1
                    if (!isNumber(stat.last)) stat.last = now
                    if (!isNumber(stat.lastSuccess)) stat.lastSuccess = m.error != null ? 0 : now
                } else stat = stats[m.plugin] = {
                    total: 1,
                    success: m.error != null ? 0 : 1,
                    last: now,
                    lastSuccess: m.error != null ? 0 : now
                }
                stat.total += 1
                
                if (m.isGroup) global.db.data.chats[m.chat].delay = now
                else global.db.data.users[m.sender].delay = now

                stat.last = now
                if (m.error == null) {
                    stat.success += 1
                    stat.lastSuccess = now
                }
            }
        }

        try {
            if (!opts['noprint']) await (await import(`./lib/print.js`)).default(m, this)
        } catch (e) {
            console.log(m, m.quoted, e)
        }
        if (global.db.data.settings[this.user.jid].autoread) await this.readMessages([m.key])
    }
}


/**
 * Handle groups participants update
 * @param {import('@adiwajshing/baileys').BaileysEventMap<unknown>['group-participants.update']} groupsUpdate 
 */
export async function participantsUpdate({ id, participants, action }) {
    if (opts['self'])
        return
    if (this.isInit)
        return
    if (global.db.data == null)
        await loadDatabase()
        
    let chat = global.db.data.chats[id] || {}
    let text = ''
    
    switch (action) {
        case 'add':
        case 'remove':
            if (chat.welcome) {
                let groupMetadata = await this.groupMetadata(id) || (conn.chats[id] || {}).metadata
                for (let user of participants) {
                    let nickgc = await conn.getName(id)
                    let pp = 'https://telegra.ph/file/24fa902ead26340f3df2c.png'
                    let ppgc = 'https://telegra.ph/file/24fa902ead26340f3df2c.png'
                    let userName = user.split('@')[0]
                    
                    try {
                        pp = await this.profilePictureUrl(user, 'image')
                        ppgc = await this.profilePictureUrl(id, 'image')
                        const userData = global.db.data.users[user.split('@')[0]]
                        if (userData && userData.name) {
                            userName = userData.name
                        }
                    } catch (e) {
                        // Biarkan kosong, supaya kalau error, pakai default pp
                    } finally {
                        text = (action === 'add'
                            ? (chat.sWelcome || this.welcome || conn.welcome || 'Welcome, @user!')
                                .replace('@subject', await this.getName(id))
                                .replace('@desc', groupMetadata.desc?.toString() || 'unknown')
                            : (chat.sBye || this.bye || conn.bye || 'Bye, @user!')
                        ).replace('@user', '@' + user.split('@')[0])

                        let wel = await new knights.Welcome2()
                            .setAvatar(pp)
                            .setUsername(await this.getName(user))
                            .setBg("https://telegra.ph/file/666ccbfc3201704454ba5.jpg")
                            .setGroupname(groupMetadata.subject)
                            .setMember(groupMetadata.participants.length)
                            .toAttachment()

                        let lea = await new knights.Goodbye()
                            .setUsername(await this.getName(user))
                            .setGuildName(groupMetadata.subject)
                            .setGuildIcon(ppgc)
                            .setMemberCount(groupMetadata.participants.length)
                            .setAvatar(pp)
                            .setBackground("https://telegra.ph/file/0db212539fe8a014017e3.jpg")
                            .toAttachment()

                        await this.sendFile(
                            id,
                            action === 'add' ? wel.toBuffer() : lea.toBuffer(),
                            'pp.jpg',
                            text,
                            null,
                            false,
                            { contextInfo: { mentionedJid: [user] } }
                        )
                    }
                }
            }
            break

        case 'promote':
            text = (chat.sPromote || this.spromote || conn.spromote || '@user ```is now Admin```')
            // sengaja tidak break agar lanjut ke demote

        case 'demote':
            if (!text)
                text = (chat.sDemote || this.sdemote || conn.sdemote || '@user ```is no longer Admin```')
            text = text.replace('@user', '@' + participants[0].split('@')[0])
            if (chat.detect)
                await this.sendMessage(id, { text, mentions: this.parseMention(text) })
            break
    }
}

                        
export async function pollUpdate(message) {
    for (const {
            key,
            update
        }
        of message) {
        if (message.pollUpdates) {
            const pollCreation = await conn.serializeM(conn.loadMessage(key.id))
            if (pollCreation) {
                const pollMessage = await getAggregateVotesInPollMessage({
                    message: pollCreation.message,
                    pollUpdates: pollCreation.pollUpdates,
                })
                message.pollUpdates[0].vote = pollMessage

                await console.log(pollMessage)
                conn.appenTextMessage(message, message.pollUpdates[0].vote || pollMessage.filter((v) => v.voters.length !== 0)[0]?.name, message.message);
            }
        }
    }
}
/**
 * Handle groups update
 * @param {import('@adiwajshing/baileys').BaileysEventMap<unknown>['groups.update']} groupsUpdate 
 */
export async function groupsUpdate(groupsUpdate) {
    if (opts['self'])
        return
    for (const groupUpdate of groupsUpdate) {
        const id = groupUpdate.id
        if (!id) continue
        let chats = global.db.data.chats[id], text = ''
        if (!chats?.detect) continue
        if (groupUpdate.desc) text = (chats.sDesc || this.sDesc || conn.sDesc || '```Description has been changed to```\n@desc').replace('@desc', groupUpdate.desc)
        if (groupUpdate.subject) text = (chats.sSubject || this.sSubject || conn.sSubject || '```Subject has been changed to```\n@subject').replace('@subject', groupUpdate.subject)
        if (groupUpdate.icon) text = (chats.sIcon || this.sIcon || conn.sIcon || '```Icon has been changed to```').replace('@icon', groupUpdate.icon)
        if (groupUpdate.revoke) text = (chats.sRevoke || this.sRevoke || conn.sRevoke || '```Group link has been changed to```\n@revoke').replace('@revoke', groupUpdate.revoke)
        if (!text) continue
        await conn.sendMessage(id, { text: text })
    }
}

export async function deleteUpdate(message) {
    try {
        const { fromMe, id, participant } = message
        if (fromMe)
            return
        let msg = conn.serializeM(conn.loadMessage(id))
        if (!msg)
            return
        let chat = global.db.data.chats[id] || {}
    
        if (chat.delete) return
        
        await conn.reply(msg.chat, `
Terdeteksi @${participant.split`@`[0]} telah menghapus pesan barusan
Untuk mematikan fitur ini, ketik
*.disable antidelete*
`.trim(), msg, {
            mentions: [participant]
        })
        conn.copyNForward(msg.chat, msg).catch(e => console.log(e, msg))
    } catch (e) {
        console.error(e)
    }
}

global.dfail = (type, m, conn) => {
let tag = `@${m.sender.replace(/@.+/, '')}`
let mentionedJid = [m.sender]
let name = conn.getName(m.sender)

let msg = {
    premium: '*[❗]* ᴄᴏᴍᴍᴀɴᴅ ɪɴɪ ʜᴀɴʏᴀ ʙɪsᴀ ᴅɪɢᴜɴᴀᴋᴀɴ ᴜɴᴛᴜᴋ ᴜsᴇʀ ᴘʀᴇᴍɪᴜᴍ!',
    group: '*[❗]* ᴄᴏᴍᴍᴀɴᴅ ɪɴɪ ʜᴀɴʏᴀ ʙɪsᴀ ᴅɪɢᴜɴᴀᴋᴀɴ ᴅɪ ᴄʜᴀᴛ ɢʀᴏᴜᴘ',       
    private: '*[❗]* ᴄᴏᴍᴍᴀɴᴅ ɪɴɪ ʜᴀɴʏᴀ ʙɪsᴀ ᴅɪɢᴜɴᴀᴋᴀɴ ᴅɪ ᴄʜᴀᴛ ᴘʀɪʙᴀᴅɪ!',       
    botAdmin: '*[❗]* ᴊᴀᴅɪᴋᴀɴ ᴢᴇɴᴢ - ᴀɪ - ᴍᴅ ᴍᴇɴᴊᴀᴅɪ ᴀᴅᴍɪɴ ᴜɴᴛᴜᴋ ᴍᴇɴɢɢᴜɴᴀᴋᴀɴ ғɪᴛᴜʀ ɪɴɪ!',
    admin: '*[❗]* ᴍᴀᴀғ ᴄᴏᴍᴍᴀɴᴅ ɪɴɪ ᴜɴᴛᴜᴋ ᴀᴅᴍɪɴ ᴅɪ ɢʀᴏᴜᴘ',
    restrict: 'Restrict Not Turned On For This Chat',
    game: 'Feature *Game* Not Turned On For This Chat',
    rowner: '*[❗]* ᴍᴀᴀғ ᴄᴏᴍᴍᴀɴᴅ ɪɴɪ ʜᴀɴʏᴀ ʙɪsᴀ ᴅɪɢᴜɴᴀᴋᴀɴ ᴏʟᴇʜ ᴏᴡɴᴇʀ ᴢᴇɴᴢ ᴀɪ - ᴍᴅ',
    owner: '*[❗]* ᴍᴀᴀғ ᴄᴏᴍᴍᴀɴᴅ ɪɴɪ ʜᴀɴʏᴀ ʙɪsᴀ ᴅɪɢᴜɴᴀᴋᴀɴ ᴏʟᴇʜ ᴏᴡɴᴇʀ ᴢᴇɴᴢ ᴀɪ - ᴍᴅ',
    unreg: `ᴋᴇᴛɪᴋ .ᴅᴀғᴛᴀʀ <ɴᴀᴍᴀ ᴋᴀᴍᴜ>,<ᴜᴍᴜʀ ᴋᴀᴍᴜ> ᴜɴᴛᴜᴋ ᴍᴇɴᴅᴀꜰᴛᴀʀ ᴅɪ ᴢᴇɴᴢ - ᴀɪ -ᴍᴅ ᴅᴇɴɢᴀɴ ᴍᴇɴᴅᴀꜰᴛᴀʀ, ᴋᴀᴍᴜ ʙɪꜱᴀ ᴍᴇɴɪᴋᴍᴀᴛɪ ꜰɪᴛᴜʀ-ꜰɪᴛᴜʀ ᴜɴɪᴋ, ʀᴇꜱᴘᴏɴ ᴄᴇᴘᴀᴛ, ᴅᴀɴ ᴋᴇᴍᴜᴅᴀʜᴀɴ ᴅᴀʟᴀᴍ ʙᴇʀɪɴᴛᴇʀᴀᴋꜱɪ. ʏᴜᴋ, ᴊᴀɴɢᴀɴ ꜱᴀᴍᴘᴀɪ ᴋᴇᴛɪɴɢɢᴀʟᴀɴ!`
        }[type]
        
  if (msg) return conn.sendMessage(m.chat, {
  text: msg,
  contextInfo: {
    externalAdReply: {
      title: 'Ａ Ｋ Ｓ Ｅ Ｓ   Ｄ Ｉ Ｔ Ｏ Ｌ Ａ Ｋ',
      body: 'ᴢᴇɴᴢ - ᴍᴜʟᴛɪᴅᴇᴠɪᴄᴇ',
      sourceUrl: url.sgc,
      mediaType: 1,
      renderLargerThumbnail: false,
      thumbnail: fs.readFileSync('./media/accessdenied.jpg')
    }
  }
}, { quoted: m });
             
        }

function ucapan() {
  const time = moment.tz('Asia/Jakarta').format('HH')
  let res = "Udah pagi ni kak masih belum tidur?"
  if (time >= 4) {
    res = "Pagi Kak 🌄"
  }
  if (time >= 10) {
    res = "Selamat Siang Kak ☀️"
  }
  if (time >= 15) {
    res = "Selamat Sore Kak 🌇"
  }
  if (time >= 18) {
    res = "Malam Kak 🌙"
  }
  return res
}

function pickRandom(list) {
     return list[Math.floor(Math.random() * list.length)]
     }

let file = global.__filename(import.meta.url, true)
watchFile(file, async () => {
    unwatchFile(file)
    console.log(chalk.redBright("Update 'handler.js'"))
    if (global.reloadHandler) console.log(await global.reloadHandler())
})
