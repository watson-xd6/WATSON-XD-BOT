import fetch from 'node-fetch';

let handler = m => m;

handler.before = async (m) => {
    let chat = global.db.data.chats[m.chat];
    
    // Only process if Simi feature is enabled and chat is not banned
    if (chat.simi && !chat.isBanned) {
        // Ignore if user disabled the feature
        if (/^.*false|disable|(turn)?off|0/i.test(m.text)) return;
        if (!m.text) return;

        let lang = "en"; // English language
        try {
            let res = await fetch('https://api.simsimi.vn/v1/simtalk', {
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                body: `text=${encodeURIComponent(m.text)}&lc=${lang}&key=`
            });

            if (!res.ok) throw new Error("Failed to fetch data from SimSimi API");

            let json = await res.json();
            if (json.status !== '200') return m.reply('Failed to get a response from SimSimi');

            let simiMessage = json.message || 'SimSimi did not respond';
            await m.reply(simiMessage);
        } catch (error) {
            console.error(error);
            m.reply('An error occurred while fetching from SimSimi.');
        }

        return true;
    }

    return true;
};

export default handler;