import fs from 'fs'

let handler = async (m, { conn }) => {
  let teks = "*Hai kak mau sc Zenzz - AI - MD ? boleh kok yuk bergabung ke Channel whatsapp Zenzz - AI untuk info lebih lanjut :* *https://whatsapp.com/channel/0029VaxvdhJ6buMSjkRBNR2d*";
  conn.sendMessage(m.chat, { text: teks });
}

handler.command = /^(sc|script)$/i;
handler.tags = ['info']
export default handler;