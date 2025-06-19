import similarity from 'similarity'

const threshold = 0.72

export async function before(m) {
    let id = m.chat

    if (m.fromMe) return
    if (!m.quoted || !m.quoted.fromMe || !m.text || !/Ketik.*teman|ᴋᴇᴛɪᴋ.*ᴛᴇᴍᴀɴ/i.test(m.quoted.text) || /.*teman|.*ᴛᴇᴍᴀɴ/i.test(m.text)) {
        return true
    }

    this.tebakmakanan = this.tebakmakanan || {}
    const setting = global.db?.data?.settings?.[m.sender] || {}

    if (setting.composing) {
        await this.sendPresenceUpdate('composing', m.chat)
    }
    if (setting.autoread) {
        await this.readMessages([m.key])
    }

    if (!(id in this.tebakmakanan)) {
        return m.reply('Soal itu telah berakhir')
    }

    if (m.quoted.id && m.quoted.id === this.tebakmakanan[id][0].id) {
        let isSurrender = /^((me)?nyerah|surr?ender)$/i.test(m.text)

        if (isSurrender) {
            clearTimeout(this.tebakmakanan[id][4])
            delete this.tebakmakanan[id]
            return m.reply('*Yah Menyerah :( !*')
        }

        let json = this.tebakmakanan[id][1]
        let jawaban = json.jawaban.toLowerCase().trim()

        if (m.text.toLowerCase() === jawaban) {
            global.db.data.users[m.sender].exp += this.tebakmakanan[id][2]
            m.reply(`*Benar!*\n+${this.tebakmakanan[id][2]} XP`)
            clearTimeout(this.tebakmakanan[id][4])
            delete this.tebakmakanan[id]
        } else if (similarity(m.text.toLowerCase(), jawaban) >= threshold) {
            m.reply(`*Dikit Lagi!*`)
        } else if (--this.tebakmakanan[id][3] === 0) {
            clearTimeout(this.tebakmakanan[id][4])
            delete this.tebakmakanan[id]
            this.reply(m.chat, `*Kesempatan habis!*\nJawaban: *${json.jawaban}*`, m)
        } else {
            m.reply(`*Jawaban Salah!*\nMasih ada ${this.tebakmakanan[id][3]} kesempatan`)
        }
    }

    return true
}

export const exp = 0