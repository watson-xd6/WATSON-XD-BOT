import axios from 'axios'

var handler = async (m, { conn, text }) => {
  if (!text) throw `*_Enter the name of the student you want to search for !_*`;

  conn.reply(m.chat, 'Searching for the person... Please wait.', m);

  const url = `${APIs.ryzumi}/api/search/mahasiswa?query=${encodeURIComponent(text)}`;

  try {
    let res = await axios.get(url);

    const data = res.data;

    if (!Array.isArray(data) || data.length === 0) {
      throw 'No data found for that name.';
    }

    let message = `Search results for the name "${text}":\n\n`;

    data.forEach((student, index) => {
      const name = student.nama || 'Unknown';
      const nim = student.nim || 'Unknown';
      const university = student.nama_pt || 'Unknown';
      const program = student.nama_prodi || 'Unknown';

      message += `${index + 1}. Name: ${name}\n   NIM: ${nim}\n   University: ${university}\n   Program: ${program}\n\n`;
    });

    conn.reply(m.chat, message, m);
  } catch (error) {
    console.error(error);
    conn.reply(m.chat, `An error occurred: ${error.message || error}`, m);
  }
};

handler.help = ['student <name>'];
handler.tags = ['internet'];
handler.command = /^(mahasiswa)$/i;

handler.register = true

export default handler