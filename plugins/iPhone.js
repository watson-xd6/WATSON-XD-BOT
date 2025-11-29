let handler = async (m, { conn, text, usedPrefix, command }) => {
    try {
        // React with hourglass while processing
        await conn.sendMessage(m.chat, { react: { text: '⏳', key: m.key } });

        if (!text) 
            return m.reply(`*🧩 Please enter text!*\n*Example: ${usedPrefix + command} Hello|06:00|WATSON-XD*`);

        // Split input by '|'
        let parts = text.split('|');
        if (parts.length < 3) 
            return m.reply(`*❗ Wrong format!*\n*🍀 Example: ${usedPrefix + command} Text|ChatTime|StatusBar*`);

        // Destructure input
        let [chatMessage, chatTime, statusBarTime] = parts;

        // Limit message length
        if (chatMessage.length > 80) 
            return m.reply('*🍂 Text is too long! Maximum 80 characters.*');

        // Prepare API URL
        let url = `https://api.zenzxz.my.id/maker/fakechatiphone?text=${encodeURIComponent(chatMessage)}&chatime=${encodeURIComponent(chatTime)}&statusbartime=${encodeURIComponent(statusBarTime)}`;

        // Fetch image from API
        const response = await fetch(url);
        if (!response.ok) throw new Error('Failed to fetch image from API');

        const buffer = await response.arrayBuffer();
        const imageBuffer = Buffer.from(buffer);

        // Send the generated fake iPhone chat
        await conn.sendFile(
            m.chat, 
            imageBuffer, 
            'fakechat.jpg', 
            `*✨ Fake iPhone Chat Created Successfully!*\n\n*💬 Message: ${chatMessage}*\n*⏰ Chat Time: ${chatTime}*\n*📱 Status Bar: ${statusBarTime}*`, 
            m
        );

    } catch (err) {
        console.error(err);
        await m.reply('*🍂 Failed to create image. Please try again later.*');
    } finally {
        // Remove reaction
        await conn.sendMessage(m.chat, { react: { text: '', key: m.key } });
    }
};

// Command metadata
handler.help = ['fakeiphonechat'];
handler.tags = ['maker'];
handler.command = /^(fakeiphonechat|iqc)$/i;
handler.limit = true;
handler.register = true;

export default handler;