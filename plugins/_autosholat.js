export async function before(m) {
    this.autosholat = this.autosholat ? this.autosholat : {};
    let id = m.chat;

    if (id in this.autosholat) {
        return false; // Jika sudah ada pengingat sebelumnya, tidak perlu diproses lagi
    }

    let jadwalSholat = {
        Shubuh: "04:16",
        Dhuha: "05:34",
        Dzuhur: "11:37",
        Ashar: "14:49",
        Maghrib: "17:41",
        Isyak: "18:50",
        Tahajud: "01:55"
    };

    const date = new Date((new Date).toLocaleString("en-US", { timeZone: "Asia/Jakarta" }));
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const timeNow = `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}`;

    for (const [sholat, waktu] of Object.entries(jadwalSholat)) {
        if (timeNow === waktu) {
            try {
                await this.sendMessage(m.chat, {
                    audio: { url: 'https://cloudkuimages.guru/uploads/audios/681b216fc07b1.mp3' },
                    mimetype: 'audio/mpeg',
                    ptt: true,
                    contextInfo: {
                        externalAdReply: {
                            title: `Waktu Sholat ${sholat}`,
                            body: `Pengingat sholat untuk wilayah Surabaya dan sekitarnya...`,
                            thumbnailUrl: 'https://cloudkuimages.guru/uploads/images/681b20bed2edf.jpg',
                            mediaType: 1,
                            renderLargerThumbnail: true,
                            sourceUrl: 'Zenzz AI - MD'
                        }
                    }
                });

                this.autosholat[id] = setTimeout(() => {
                    delete this.autosholat[id];
                }, 57000);
            } catch (e) {
                console.error('Error sending message:', e);
            }
        }
    }
}

export const disabled = false;