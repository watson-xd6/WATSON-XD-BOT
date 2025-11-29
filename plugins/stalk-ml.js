import axios from 'axios'

let handler = async (m, { conn, args }) => {

    const userId = args[0]
    const zoneId = args[1]

    if (!userId) throw 'Please enter a User ID'
    if (!zoneId) throw 'Please enter a Server ID'
    if (!userId && !zoneId) throw 'Please enter both User ID & Server ID'

    let { key } = await conn.sendMessage(m.chat, {
        text: "Checking account data...",
    });

    try {
        let res = await axios.get(`${APIs.ryzumi}/api/stalk/mobile-legends?userId=${userId}&zoneId=${zoneId}`)
        let result = res.data

        if (!result.success) throw 'API did not return valid data'

        let ini_text = `
*RESULT*

> Username: ${result.username}
> Region: ${result.region}
`
        await conn.sendMessage(m.chat, {
            text: ini_text,
            edit: key
        });
    } catch (e) {
        await conn.sendMessage(m.chat, {
            text: `Error from API: ${e}`,
            edit: key
        });
    }
}

handler.help = ['mlstalk']
handler.tags = ['stalk']
handler.command = /^(stalkml|mlstalk)$/i

handler.register = true
handler.limit = true

export default handler