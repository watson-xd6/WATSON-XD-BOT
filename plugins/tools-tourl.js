import fetch from 'node-fetch';
import FormData from 'form-data';
import { fileTypeFromBuffer } from 'file-type';
const { proto, prepareWAMessageMedia } = (await import('@adiwajshing/baileys')).default;

let handler = async (m, { conn }) => {
    try {
        if (m._tourl_done) return; 
        m._tourl_done = true;

        let q = m.quoted ? m.quoted : m;
        let mime = (q.msg || q).mimetype || q.mediaType || '';
        if (!mime || mime === 'conversation') return m.reply('Apa yang mau di-upload?');

        let media = await q.download();
        let cloudkuLink = await cloudkuUpload(media).catch(() => null);
        let catboxLink = await catboxUpload(media).catch(() => null);

        if (!cloudkuLink && !catboxLink) throw new Error('Semua layanan gagal mengunggah file.');

        let caption = `╭─ 「 UPLOAD SUCCESS 」
📂 Size: ${media.length} Byte
${cloudkuLink ? `🌥 Cloudku: ${cloudkuLink}` : ''}
${catboxLink ? `🐱 Catbox: ${catboxLink}` : ''}
╰───────────────`;

        let thumbnail = await prepareWAMessageMedia(
            { image: { url: cloudkuLink || catboxLink } },
            { upload: conn.waUploadToServer }
        );

        let buttons = [];
        if (cloudkuLink) {
            buttons.push({
                name: "cta_copy",
                buttonParamsJson: JSON.stringify({
                    display_text: "Copy Cloudku",
                    copy_code: cloudkuLink
                })
            });
        }
        if (catboxLink) {
            buttons.push({
                name: "cta_copy",
                buttonParamsJson: JSON.stringify({
                    display_text: "Copy Catbox",
                    copy_code: catboxLink
                })
            });
        }

        let msg = {
            interactiveMessage: proto.Message.InteractiveMessage.create({
                header: proto.Message.InteractiveMessage.Header.create({
                    hasMediaAttachment: true,
                    ...thumbnail
                }),
                body: proto.Message.InteractiveMessage.Body.create({ text: caption }),
                footer: proto.Message.InteractiveMessage.Footer.create({
                    text: "Tekan tombol di bawah untuk menyalin tautan."
                }),
                nativeFlowMessage: proto.Message.InteractiveMessage.NativeFlowMessage.create({
                    buttons
                })
            })
        };

        await conn.relayMessage(m.chat, msg, { messageId: m.key.id });
    } catch (error) {
        conn.reply(m.chat, `Error: ${error.message || error}`, m);
    }
};

handler.help = ['tourl'];
handler.tags = ['tools'];
handler.command = /^(tourl|upload)$/i;
handler.owner = false;

export default handler;

async function cloudkuUpload(buffer) {
    const { ext, mime } = await fileTypeFromBuffer(buffer) || { ext: 'bin', mime: 'application/octet-stream' };
    const form = new FormData();
    form.append('file', buffer, { filename: `file.${ext}`, contentType: mime });

    const res = await fetch('https://cloudkuimages.guru/upload.php', { method: 'POST', body: form });
    if (!res.ok) throw new Error('Gagal menghubungi Cloudku Images.');
    const json = await res.json();
    if (json.status !== 'success' || !json.result?.url) throw new Error('Gagal upload ke Cloudku Images.');
    return json.result.url;
}

async function catboxUpload(buffer) {
    const { ext, mime } = await fileTypeFromBuffer(buffer) || { ext: 'bin', mime: 'application/octet-stream' };
    const form = new FormData();
    form.append('reqtype', 'fileupload');
    form.append('fileToUpload', buffer, { filename: `file.${ext}`, contentType: mime });

    const res = await fetch('https://catbox.moe/user/api.php', { method: 'POST', body: form });
    if (!res.ok) throw new Error('Gagal menghubungi Catbox.');
    return await res.text();
}