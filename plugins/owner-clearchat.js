let handler = async (m, { conn, args }) => {
    try {
        if (!args[0]) throw 'Please provide the JID of the person or group'
        const jid = args[0]

        await conn.chatModify({
            delete: true,
            lastMessages: [{
                key: m.key,
                messageTimestamp: m.messageTimestamp
            }]
        }, jid);

        conn.reply(m.chat, `Successfully deleted chat for ${jid}`, m);
    } catch (error) {
        console.error(error);
        conn.reply(m.chat, 'An error occurred while deleting the chat. Please check the JID.', m);
    }
}

handler.help = ['clearchat']
handler.tags = ['owner']
handler.owner = true
handler.command = /^(clearchat)$/i

export default handler