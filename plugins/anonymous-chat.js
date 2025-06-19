let handler = async function (m, { command }) {
    command = command.toLowerCase();
    this.anonymous = this.anonymous || {};
    const room = Object.values(this.anonymous).find(room => room.check(m.sender));

    switch (command) {
        case 'stop':
        case 'skip':
        case 'next':
            if (!room) {
                await this.sendMessage(m.chat, { text: '❗ Kamu tidak sedang berada di anonymous chat.' }, { quoted: m });
                return;
            }
            const other = room.other(m.sender);
            await this.sendMessage(m.chat, { text: '❌ Kamu telah meninggalkan anonymous chat.' }, { quoted: m });
            if (other) {
                await this.sendMessage(other, { text: '⚠️ Partner telah meninggalkan chat.' }, { quoted: m });
            }
            delete this.anonymous[room.id];
            break;

        case 'start':
        case 'search':
            if (room) {
                await this.sendMessage(m.chat, { text: '⚠️ Kamu masih berada dalam anonymous chat.' }, { quoted: m });
                return;
            }
            const waitingRoom = Object.values(this.anonymous).find(room => room.state === 'WAITING' && !room.check(m.sender));
            if (waitingRoom) {
                waitingRoom.b = m.sender;
                waitingRoom.state = 'CHATTING';
                await this.sendMessage(waitingRoom.a, { text: '✅ Partner ditemukan! Selamat chatting.' }, { quoted: m });
                await this.sendMessage(waitingRoom.b, { text: '✅ Partner ditemukan! Selamat chatting.' }, { quoted: m });
            } else {
                const id = Date.now();
                this.anonymous[id] = {
                    id,
                    a: m.sender,
                    b: '',
                    state: 'WAITING',
                    check(who) {
                        return [this.a, this.b].includes(who);
                    },
                    other(who) {
                        return who === this.a ? this.b : who === this.b ? this.a : '';
                    }
                };
                await this.sendMessage(m.chat, { text: '⌛ Menunggu partner untuk anonymous chat...' }, { quoted: m });
            }
            break;
    }
};

handler.help = ['start', 'skip', 'stop', 'next'];
handler.tags = ['anonymous'];
handler.command = /^(start|search|stop|skip|next)$/i;
handler.private = true;

export default handler;