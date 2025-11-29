import fs from 'fs'
import fetch from 'node-fetch'

let handler = async (m, { conn }) => {
    let motivation = pickRandom(global.motivation)
    await conn.reply(m.chat, motivation, 0, {
        contextInfo: {
            mentionedJid: [m.sender],
            externalAdReply: {
                mediaUrl: '',
                mediaType: 2,
                title: 'Motivation',
                body: 'Read this 😉',
                sourceUrl: sgc, // Make sure sgc is defined somewhere
                thumbnail: fs.readFileSync('../media/thumbnail.jpg')
            }
        }
    })
}

handler.help = ['motivation']
handler.tags = ['quotes']
handler.command = /^(motivation)$/i

handler.register = true

export default handler

function pickRandom(list) {
    return list[Math.floor(list.length * Math.random())]
}

global.motivation = [
    "Don't talk, just act. Don't say, just show. Don't promise, just prove it.",
    "Never stop doing your best just because someone doesn't appreciate it.",
    "Work while they sleep. Study while they party. Save while they waste. Live like they dream.",
    "The key to success is focusing your conscious mind on things you desire, not on things you fear.",
    "Don't be afraid of failure. Fear resides where you are now, not in the future.",
    "If we keep doing what we do, we will keep getting what we get.",
    "If you cannot manage stress, you cannot manage success.",
    "Be firm in your goals but flexible in your methods.",
    "Hard work beats talent when talent doesn't work hard.",
    "Remember that the greatest lessons in life are often learned in the worst moments and from the biggest mistakes.",
    "Life isn't about waiting for the storm to pass, it's about learning to dance in the rain.",
    "If your plan doesn't work, change the plan, not the goal.",
    "Don't fear the end of your life; fear never starting it.",
    "Truly great people are those who make everyone around them feel great.",
    "Experience is a hard teacher because she gives the test first, the lesson afterward.",
    "Knowing how much you need to know is the beginning of learning to live.",
    "Success is not final, failure is not fatal. Courage is what counts.",
    "Better to fail in originality than succeed in imitation.",
    "Dare to dream, but more importantly, dare to take action behind your dreams.",
    "Set your goals high and don't stop until you reach them.",
    "Grow success from failure. Despair and failure are two stepping stones to success.",
    "Genius is 1% inspiration and 99% perspiration.",
    "Success is where preparation and opportunity meet.",
    "Persistence: fail 19 times and succeed on the 20th attempt.",
    "The path to success and the path to failure are almost identical.",
    "Success usually comes to those too busy to be looking for it.",
    "Don't postpone your work until tomorrow if you can do it today.",
    "20 years from now you may be more disappointed by what you didn’t do than by what you did.",
    "Don't waste your time hitting a wall hoping it will turn into a door.",
    "Opportunities are like sunrise. If you wait too long, you miss them.",
    "Life consists of 10% what happens to you and 90% how you respond to it.",
    "There are three ways to achieve top success: the first is to behave well, the second is to behave well, the third is to be good.",
    "The number one reason people fail in life is listening to friends, family, and neighbors.",
    "Time is more valuable than money. You can get more money, but not more time.",
    "Goal setting is the secret to an interesting future.",
    "When we try to improve ourselves, everything around us improves as well.",
    "Growth begins when we start accepting our own weaknesses.",
    "Never give up when you still can try. It’s never over until you stop trying.",
    "Determination is the key to success. Successful people work hard no matter what they feel.",
    "The first thing successful people do is view failure as a positive signal for success.",
    "A characteristic of successful people is that they always strive to learn new things.",
    "Success is getting what you want; happiness is wanting what you get.",
    "Pessimists see difficulty in every opportunity. Optimists see opportunity in every difficulty.",
    "Doubt kills more dreams than failure ever will.",
    "Do what you have to do until you can do what you want to do.",
    "Optimism is one of the qualities most related to success and happiness.",
    "The greatest reward for a hard worker is not what they get from their work, but how they grow through it.",
    "The best way to get started is to quit talking and begin doing.",
    "Failure will never overtake you if your determination to succeed is strong enough."
]