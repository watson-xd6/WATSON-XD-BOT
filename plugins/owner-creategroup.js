// import { bold } from "chalk"
let handler = async (m, { conn, text }) => {

    if (!text) return m.reply('_Please enter a group name!_')

    try {
        m.reply('Please wait...')
        let group = await conn.groupCreate(text, [m.sender])
        let link = await conn.groupInviteCode(group.gid)
        let url = 'https://chat.whatsapp.com/' + link
        // console.log(chalk.bold.red('Created Group: ' + group.gid + '\nGroup Name: ' + text + '\n\nViolet'))
        m.reply(`_Successfully created group *${text}*_\n\n*Name:* ${text}\n*ID:* ${group.gid}\n*Link:* ${url}`)
    } catch (e) {
        m.reply('Error')
    }
}

handler.help = ['creategroup']
handler.tags = ['owner']
handler.command = /^((create|buat)(gc|grup|group))$/
handler.owner = true
handler.premium = false

export default handler