import axios from "axios";
import *as cheerio from "cheerio";

var handler = async (m, {
    conn
}) => {
    try {
        let url = "https://rumahmisteri.com/";
        let {
            data
        } = await axios.get(url);
        let $ = cheerio.load(data);
        let articles = [];

        $(".archive-grid-post-wrapper article").each((i, el) => {
            let title = $(el).find("h2.entry-title a").text().trim();
            let link = $(el).find("h2.entry-title a").attr("href");
            let image = $(el).find(".post-thumbnail img").attr("src");
            let category = $(el).find(".post-cats-list a").text().trim();
            let date = $(el).find(".posted-on time").attr("datetime");

            if (title && link) {
                articles.push({
                    title,
                    link,
                    image,
                    category,
                    date
                });
            }
        });

        if (articles.length === 0) {
            return conn.sendMessage(m.chat, {
                text: "Tidak ada artikel yang ditemukan."
            }, {
                quoted: m
            });
        }

        let randomArticle = articles[Math.floor(Math.random() * articles.length)];
        let articleData = await axios.get(randomArticle.link);
        let $$ = cheerio.load(articleData.data);

        let content = $$(".entry-content").find("p, h2").map((i, el) => $$(el).text().trim()).get().join("\n\n");

        let message = `🎃 *Judul:* ${randomArticle.title}\n`;
        message += `📅 *Tanggal:* ${randomArticle.date}\n`;
        message += `📂 *Kategori:* ${randomArticle.category}\n`;
        message += `🔗 *Link:* ${randomArticle.link}\n\n`;
        message += `📖 *Konten:*\n${content}`;

        await conn.sendMessage(m.chat, {
            image: {
                url: randomArticle.image
            },
            caption: message
        }, {
            quoted: m
        });
    } catch (error) {
        conn.sendMessage(m.chat, {
            text: `${error.message}`
        }, {
            quoted: m
        });
    }
};

handler.command = ["misteri"]
handler.help = ["misteri"];
handler.tags = ["fun"];
handler.limit = true;

export default handler;