import fetch from 'node-fetch';
const { generateWAMessageContent, generateWAMessageFromContent, proto } = (await import('@adiwajshing/baileys')).default;

const handler = async (m, { conn, text, usedPrefix, command }) => {
  if (!text) return m.reply(`Masukkan query!\nContoh: ${usedPrefix + command} elaina baju esempeh`);

  await conn.sendMessage(m.chat, { text: '⏳ Tunggu boss...' }, { quoted: m });

  async function createImage(url) {
    const { imageMessage } = await generateWAMessageContent({ image: { url } }, {
      upload: conn.waUploadToServer
    });
    return imageMessage;
  }

  function shuffle(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
  }

  try {
    const res = await fetch(`https://fastrestapis.fasturl.cloud/search/bingimage?ask=${encodeURIComponent(text)}`);
    const json = await res.json();
    if (json.status !== 200 || !json.result.length) return m.reply('❌ Tidak ditemukan gambar untuk query tersebut.');

    shuffle(json.result);
    const images = json.result.slice(0, Math.min(json.result.length, 5)); 
    const cards = [];

    for (let i = 0; i < images.length; i++) {
      const imageMsg = await createImage(images[i].imageUrl);
      cards.push({
        body: proto.Message.InteractiveMessage.Body.fromObject({
          text: `✔️ Gambar ${i + 1} dari ${images.length}\n*${images[i].title}*`
        }),
        footer: proto.Message.InteractiveMessage.Footer.fromObject({
          text: 'Bing Image Search by ZenzXD'
        }),
        header: proto.Message.InteractiveMessage.Header.fromObject({
          hasMediaAttachment: true,
          imageMessage: imageMsg
        }),
        nativeFlowMessage: proto.Message.InteractiveMessage.NativeFlowMessage.fromObject({
          buttons: [
            {
              name: "cta_url",
              buttonParamsJson: JSON.stringify({
                display_text: "Lihat Halaman",
                url: images[i].pageUrl
              })
            }
          ]
        })
      });
    }

    const carousel = generateWAMessageFromContent(m.chat, {
      viewOnceMessage: {
        message: {
          messageContextInfo: {
            deviceListMetadata: {},
            deviceListMetadataVersion: 2
          },
          interactiveMessage: proto.Message.InteractiveMessage.fromObject({
            body: proto.Message.InteractiveMessage.Body.create({
              text: "*Berikut hasil pencarianmu di Bing:*"
            }),
            footer: proto.Message.InteractiveMessage.Footer.create({ text: '' }),
            header: proto.Message.InteractiveMessage.Header.create({ hasMediaAttachment: false }),
            carouselMessage: proto.Message.InteractiveMessage.CarouselMessage.fromObject({
              cards: cards
            })
          })
        }
      }
    }, {});

    await conn.relayMessage(m.chat, carousel.message, { messageId: carousel.key.id });

  } catch (err) {
    console.error(err);
    m.reply(`❌ Error mengambil data\nLogs error: ${err.message}`);
  }
};

handler.help = ['bingimg <query>'];
handler.tags = ['search'];
handler.command = /^bingimg$/i;
handler.premium = false;
handler.limit = false;

export default handler;