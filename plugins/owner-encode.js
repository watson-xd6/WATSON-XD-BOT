import axios from "axios"
import FormData from "form-data"
import * as cheerio from "cheerio"

async function encode(text) {
  let d = new FormData()
  d.append("input", text)
  d.append("charset", "UTF-8")
  d.append("separator", "lf")
  d.append("newlines", "on")
  let { data } = await axios.post("https://www.base64encode.org/", d, {
    headers: d.getHeaders()
  })
  let $ = cheerio.load(data)
  return $("#output").text().trim()
}

async function decode(text) {
  let d = new FormData()
  d.append("input", text)
  d.append("charset", "UTF-8")
  let { data } = await axios.post("https://www.base64decode.org/", d, {
    headers: d.getHeaders()
  })
  let $ = cheerio.load(data)
  return $("#output").text().trim()
}

let handler = async (m, { text, args, command }) => {
  if (!args[0]) return m.reply(`Masukkan teks untuk ${command} ya.`)
  m.react('⏳')
  try {
    let hasil = command == 'encode'
      ? await encode(args.join(' '))
      : await decode(args.join(' '))
    m.reply(hasil)
    m.react('✅')
  } catch (e) {
    console.error(e)
    m.reply('❌ Terjadi kesalahan. Coba lagi ya!')
  }
}

handler.help = ['encode', 'decode']
handler.tags = ['tools']
handler.command = ['encode', 'decode']
handler.limit = false

export default handler