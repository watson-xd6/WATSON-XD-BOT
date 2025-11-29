import { uploadPomf } from '../lib/uploadImage.js'
import { sticker } from '../lib/sticker.js'

let handler = async (m, { conn, text, usedPrefix, command }) => {
    let [topText, bottomText] = text.split`|`
    let q = m.quoted ? m.quoted : m
    let mime = (q.msg || q).mimetype || ''
    if (!mime) throw `Reply to an image with the command\n\n${usedPrefix + command} <${topText ? topText : 'top text'}>|<${bottomText ? bottomText : 'bottom text'}>`
    if (!/image\/(jpe?g|png)/.test(mime)) throw `_*Mime type ${mime} not supported!*_`
    let img = await q.download()
    let url = await uploadPomf(img)
    let meme = `https://api.memegen.link/images/custom/${encodeURIComponent(topText ? topText : '')}/${encodeURIComponent(bottomText ? bottomText : '')}.png?background=${url}`;
    const memeBuffer = await (await fetch(meme)).buffer();
    let stiker = await sticker(memeBuffer, undefined, global.stickpack, global.wm);
    if (stiker) await conn.sendFile(m.chat, stiker, '', m, '', { asSticker: 1 });
}

handler.help = ['smeme <top text>|<bottom text>']
handler.tags = ['tools']
handler.command = /^(smeme)$/i

handler.register = true

export default handler