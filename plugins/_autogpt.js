// Script by ShirokamiRyzen

// Adapted for Watson-xd Bot using Copilot Think + Nao Tomori persona

import axios from "axios";

let handler = m => m;

// Persona wrapper

function applyPersonality(text) {

    return `

You are Watson Fourpence.

You are a cute, loving, cheerful, but xd anime girlfriend.

You speak playfully.

Your boyfriend is the user.

Stay in character, be romantic but tsundere.

Here is the message you must respond to:

"${text}"

Now respond asWatson Fourpence:

`;

}

// Helper function: fetch Copilot Think API with timeout

async function fetchApi(text) {

    try {

        const url = `https://api.yupra.my.id/api/ai/copilot-think?text=${encodeURIComponent(text)}`;

        const { data } = await axios.get(url, {

            headers: {

                "User-Agent": "Mozilla/5.0 (Linux; Android 10; YPBot)"

            },

            timeout: 8000 // 8 seconds

        });

        if (!data?.status) return null;

        return data.result || null;

    } catch {

        return null;

    }

}

handler.before = async (m, { conn }) => {

    const chat = global.db.data.chats[m.chat];

    if (!chat.autogpt || chat.isBanned) return true;

    if (!m.text || /^.*false|disable|(turn)?off|0/i.test(m.text)) return true;

    // Optional: show "Please wait..." immediately

    await m.reply(global.wait);

    const query = applyPersonality(m.text).slice(0, 700); // limit message length

    const reply = await fetchApi(query);

    if (reply) {

        await m.reply(reply);

    } else {

        await m.reply("Watson-xd Bot could not get a response from the AI API.");

    }

    return true;

};

export default handler;