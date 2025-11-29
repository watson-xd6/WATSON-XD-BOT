import fetch from 'node-fetch'

let handler = async (m, { text, usedPrefix, command }) => {
    if (!text) {
        throw `Usage:\n${usedPrefix + command} <location>\n\nExample:\n${usedPrefix + command} Jakarta`;
    }

    await m.reply(`${global.wait}`);
    let encodedText = encodeURIComponent(text);

    let res = await fetch(API('https://api.openweathermap.org', '/data/2.5/weather', {
        q: text,
        units: 'metric',
        appid: '060a6bcfa19809c2cd4d97a212b19273'
    }));

    if (!res.ok) {
        throw 'Location not found';
    }

    let json = await res.json();

    if (json.cod != 200) {
        throw json;
    }

    let gustKmph = json.wind.gust * 3.6;

    let sunriseTime = json.sys.sunrise ? new Date(json.sys.sunrise * 1000).toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
        timeZone: 'Asia/Jakarta'
    }) : 'Unavailable';
    let sunsetTime = json.sys.sunset ? new Date(json.sys.sunset * 1000).toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
        timeZone: 'Asia/Jakarta'
    }) : 'Unavailable';
    let predictionTime = new Date(json.dt * 1000 + json.timezone * 1000).toLocaleString('en-US', {
        timeZone: 'Asia/Jakarta'
    });

    let groundLevelPressure = json.main.grnd_level !== undefined ? json.main.grnd_level + ' hPa' : 'Unavailable';
    let seaLevelPressure = json.main.sea_level !== undefined ? json.main.sea_level + ' hPa' : 'Unavailable';

    m.reply(`
🤩 Coordinates: ${json.coord.lat}, ${json.coord.lon} https://www.google.com/maps/place/${encodedText}/@${json.coord.lat},${json.coord.lon}
🌍 Location: ${json.name}, ${json.sys.country}
🌦️ Weather: ${json.weather[0].description}, main: ${json.weather[0].main}
🌡️ Current Temperature: ${json.main.temp} °C
🔥 Max Temperature: ${json.main.temp_max} °C
❄️ Min Temperature: ${json.main.temp_min} °C
😊 Feels Like: ${json.main.feels_like} °C
💧 Humidity: ${json.main.humidity} %
💨 Wind: ${json.wind.speed} km/h, ${json.wind.deg}°, gusts ${gustKmph.toFixed(2)} km/h
☔ Rain (1 Hour): ${json.rain ? json.rain['1h'] || 0 : 0} mm
☁ Cloudiness: ${json.clouds ? json.clouds.all || 0 : 0} %
🌬️ Air Pressure: ${json.main.pressure} hPa
⛳ Ground Level Pressure: ${groundLevelPressure}
🌊 Sea Level Pressure: ${seaLevelPressure}
👀 Visibility: ${json.visibility ? `${(json.visibility / 1000).toFixed(2)} km` : 'Unavailable'}
🔮 Forecast Time: ${predictionTime} WIB
🌄 Sunrise: ${sunriseTime} WIB
🌅 Sunset: ${sunsetTime} WIB
    `.trim());
};

handler.help = ['weather']
handler.tags = ['internet']
handler.command = /^(weather|cuaca)$/i

handler.register = true

export default handler