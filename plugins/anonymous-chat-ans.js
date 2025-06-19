export default {
  async before(m) {
    // Hanya proses chat pribadi
    if (!m.chat.endsWith('@s.whatsapp.net')) return true;

    this.anonymous = this.anonymous || {};
    let room = Object.values(this.anonymous).find(room =>
      [room.a, room.b].includes(m.sender) && room.state === 'CHATTING'
    );

    if (room) {
      // Filter command agar tidak diteruskan
      if (/^(next|leave|start|stop|skip|search)/i.test(m.text)) return;

      let other = [room.a, room.b].find(user => user !== m.sender);
      if (!other) return;

      try {
        await this.delay(1000);

        await this.copyNForward(other, m, true, m.quoted ? {
          contextInfo: {
            ...(m.msg?.contextInfo || {}),
            forwardingScore: 1,
            isForwarded: true,
            participant: other
          }
        } : {});
      } catch (e) {
        console.error('❌ Gagal meneruskan pesan:', e);
      }
    }

    return true;
  }
};