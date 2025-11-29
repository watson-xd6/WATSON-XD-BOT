import axios from 'axios'
import { ryzenCDN } from '../lib/uploadFile.js'

let handler = async (m, { conn }) => {
    m.reply(wait)

    try {
        let q = m.quoted ? m.quoted : m
        let mime = (q.msg || q).mimetype || ''
        if (!mime) throw 'Send/Reply to an image with the command .googlelens'

        let media = await q.download()
        if (!media) throw 'Failed to download the image!'

        let cdnResult = await ryzenCDN(media)
        if (!cdnResult || !cdnResult.url) throw 'Failed to upload to CDN!'

        let url = cdnResult.url
        let res = await axios.get(`${APIs.ryzumi}/api/search/lens`, {
            params: { url },
        })

        if (!res.data?.result?.length) throw 'No results found from Google Lens.'

        let text = `🔎 *Google Lens Results (Full Detail)*\n\n`

        for (let r of res.data.result) {
            text += `📌 *Position:* ${r.position}\n`
            text += `📖 *Title:* ${r.title}\n`
            text += `🔗 *Page Link:* ${r.link}\n`
            text += `🖼️ *Image:* ${r.image?.link || '-'}\n`
            text += `📏 *Image Size:* ${r.image?.width}x${r.image?.height}\n`
            text += `📍 *Source:* ${r.source}\n`
            text += `🖼️ *Thumbnail:* ${r.thumbnail}\n\n`
        }

        await conn.reply(m.chat, text.trim(), m)

    } catch (err) {
        console.error(err)
        m.reply(err.message || 'Internal server error')
    }
}

handler.help = ['lens']
handler.tags = ['internet']
handler.command = /^(googlelens|lens)$/i
handler.register = true
handler.limit = 2

export default handler