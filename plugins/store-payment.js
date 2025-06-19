/*
📌 Nama Fitur: Payment Info
🏷️ Type : Plugin ESM
✍️ Convert & Edit By ZenzXD
*/

const handler = async (m, { conn, command }) => {
  const footerText = '© Zenzz XD - Zenzz AI - MD';
  const imageUrl = 'https://files.catbox.moe/h3njeb.jpg';

  if (command === 'pay' || command === 'payment') {
    await conn.sendMessage(m.chat, {
      caption: 'Pilih Format Payment',
      footer: footerText,
      buttons: [
        {
          buttonId: 'action',
          buttonText: { displayText: 'Pilih Payment' },
          type: 4,
          nativeFlowInfo: {
            name: 'single_select',
            paramsJson: JSON.stringify({
              title: 'Silahkan Pilih Payment',
              sections: [
                {
                  title: 'List Payment',
                  rows: [
                    { title: 'DANA', id: `.dana` },
                    { title: 'GOPAY', id: `.gopay` }
                  ]
                }
              ]
            })
          }
        }
      ],
      image: { url: imageUrl },
      headerType: 1
    }, { quoted: m });
    return;
  }

  if (command === 'dana') {
    const teks = `
*PAYMENT DANA : Zenzz XD*

• *Nomor :* 087823745178

*[ ! ] Penting :* Wajib memberikan Bukti Transfer
`;
    await conn.sendMessage(m.chat, {
      caption: teks,
      image: { url: imageUrl }
    }, { quoted: m });
    return;
  }

  if (command === 'gopay') {
    const teks = `
*PAYMENT GOPAY : Zenzz XD*

• *Nomor :* 087823745178

*[ ! ] Penting :* Wajib memberikan Bukti Transfer
`;
    await conn.sendMessage(m.chat, {
      caption: teks,
      image: { url: imageUrl }
    }, { quoted: m });
    return;
  }
};

handler.help = ['pay', 'payment', 'dana', 'gopay'];
handler.tags = ['store'];
handler.command = ['pay', 'payment', 'dana', 'gopay'];

export default handler;