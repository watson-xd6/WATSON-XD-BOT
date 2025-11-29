import cheerio from 'cheerio'
import fetch from 'node-fetch'

let handler = async (m, { conn, args, usedPrefix, text, command }) => {
    if (!text) return m.reply("Enter a query\nExample: .infoloker programmer")
    await m.reply(wait)
    try {
        let res = await infoloker(text);
        res = res.slice(0, 11); // Limit to 11 results
        let textOutput = res.map((item, index) => {
            return `
🔍 *[ RESULT ${index + 1} ]*
📰 *Title:* ${item.job || 'Unknown'}
🏢 *Company:* ${item.perusahaan || 'Unknown'}
📍 *Location:* ${item.daerah || 'Unknown'}
🔗 *Detail Link:* ${item.link_Detail || 'Unknown'}
⬆️ *Posted:* ${item.upload || 'Unknown'}
`;
        }).filter(v => v).join("\n\n________________________\n\n");
        await m.reply(textOutput)
    } catch (e) {
        await m.reply(error)
    }
};

handler.help = ["infoloker"]
handler.tags = ["internet"]
handler.command = /^(infoloker)$/i
handler.register = true

export default handler

/* New Line */
async function infoloker(query) {
    const url = `https://www.jobstreet.co.id/id/job-search/${query}-jobs/`;
    const response = await fetch(url);
    const html = await response.text();

    const $ = cheerio.load(html);
    const format = [];

    $('article').each((a, article) => {
        const job = $(article).find('h1 a div').text();
        const perusahaan = $(article).find('span').eq(0).text();
        const daerah = $(article).find('span span').text();
        const link_Detail = 'https://www.jobstreet.co.id' + $(article).find('h1 a').attr('href');
        const upload = $(article).find('div > time > span').text();

        format.push({ job, perusahaan, daerah, upload, link_Detail });
    });

    return format;
}