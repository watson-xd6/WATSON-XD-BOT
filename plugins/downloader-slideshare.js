import fetch from 'node-fetch'

const handler = async (m, { conn, args, command, usedPrefix }) => {
    if (!args[0]) {
        return conn.reply(
            m.chat,
            `> Please provide a SlideShare URL\n\nExample:\n*${usedPrefix + command} LINK_HERE*\n*${usedPrefix + command} https://www.slideshare.net/StevanyStevany/materi-lengkap-tentang-power-point*`,
            m
        )
    }

    const url = args[0].trim()
    const filetypes = ['pdf', 'pptx']

    m.reply(`> ${wait}`)

    try {
        for (const filetype of filetypes) {
            const apiUrl = `https://bioskop-six.vercel.app/slideshare?url=${encodeURIComponent(url)}&filetype=${filetype}`
            const response = await fetch(apiUrl)
            if (!response.ok) throw new Error(`API did not respond properly: ${response.status}`)
            
            const data = await response.json()
            const download_url = data.download_url
            if (!download_url) throw new Error(`Could not find the ${filetype.toUpperCase()} file`)

            const filename = `${url.split('/').pop() || 'slideshare'}.${filetype}`
            await conn.sendFile(
                m.chat,
                download_url,
                filename,
                `> File ${filetype.toUpperCase()} has been successfully downloaded and saved as ${filename}`,
                m
            )
        }
    } catch (error) {
        console.error('Error:', error)
        conn.reply(
            m.chat,
            `> An error occurred: ${error.message}\n\nPlease provide a valid SlideShare URL\nExample:\n*${usedPrefix + command} LINK_HERE*`,
            m
        )
    }
}

handler.command = /^(slideshare|slidedl|slidesharedl|slidedownload)$/i
handler.help = ['slideshare <link>']
handler.tags = ['downloader']
handler.register = true
handler.limit = true

export default handler