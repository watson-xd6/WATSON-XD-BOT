import fetch from 'node-fetch'

const handler = async (m, { text, usedPrefix, command }) => {
  try {
    if (!text) {
      throw `Usage: *${usedPrefix}${command} hello*\nIf Simi does not respond, try *${usedPrefix}${command}2 hello Simi*`;
    }

    // API endpoint for SimSimi
    const url = 'https://api.simsimi.vn/v1/simtalk';
    const lang = 'id'; // language code (e.g., 'id' for Indonesian)

    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: `text=${encodeURIComponent(text)}&lc=${lang}&key=`,
    });

    if (!response.ok) {
      throw new Error('Failed to fetch data from Simi API.');
    }

    const data = await response.json();
    const simiMessage = data.message || 'Simi did not return a response.';
    
    m.reply(simiMessage);
  } catch (error) {
    console.error('Error:', error);
    m.reply(text ? 'Failed to fetch data.' : error.message || error);
  }
}

handler.command = ['simi']
handler.tags = ['fun']
handler.help = ['simi']

export default handler