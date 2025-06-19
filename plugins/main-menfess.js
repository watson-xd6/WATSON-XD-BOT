let handler = async (m, { conn, text, usedPrefix, command }) => {
    if (!conn) throw 'Internal error: koneksi tidak tersedia.'
    if (!conn.menfess) conn.menfess = {}

    if (!text || !text.includes('|')) {
        return m.reply(
            `*Format salah!*\n\n` +
            `*Contoh penggunaan:*\n` +
            `${usedPrefix + command} 6281234567890|Anonymous|Hai, salam kenal ya!\n\n` +
            `*Format:* nomor|nama pengirim|pesan`
        )
    }

    let [jid, name, pesan] = text.split('|');
    if (!jid || !name || !pesan) {
        return m.reply(`*Format tidak lengkap!*\n\nGunakan format:\n${usedPrefix + command} nomor|nama pengirim|pesan`);
    }

    jid = jid.replace(/[^0-9]/g, '') + '@s.whatsapp.net';
    let data = (await conn.onWhatsApp(jid))[0] || {};
    if (!data.exists) return m.reply('Nomor tidak terdaftar di WhatsApp.');
    if (jid === m.sender) return m.reply('Tidak bisa mengirim menfess ke diri sendiri.');

    let aktif = Object.values(conn.menfess).find(mf => mf.status === true && mf.dari === m.sender);
    if (aktif) return m.reply('Kamu masih punya menfess aktif. Tunggu sampai dibalas dulu.');

    let id = +new Date;
    let teks = `Hai kak @${jid.split("@")[0]}, kamu menerima pesan Menfess:\n\nDari: *${name}*\nPesan:\n${pesan}\n\nMau balas pesan ini? Tinggal ketik dan kirim, nanti aku teruskan ke pengirim ya!`;

    let imgr = 'https://files.catbox.moe/3dzgd3.jpg';
    await conn.sendMessage(data.jid, {
        image: { url: imgr },
        caption: teks,
        mentions: [jid]
    });

    m.reply('Pesan berhasil dikirim. Semoga dibalas ya!');

    conn.menfess[id] = {
        id,
        dari: m.sender,
        nama: name,
        penerima: jid,
        pesan: pesan,
        status: false
    };
};

handler.tags = ['main'];
handler.help = ['menfess <nomor|nama pengirim|pesan>'];
handler.command = /^(menfess|menfes|confess)$/i;
handler.private = true;

export default handler;