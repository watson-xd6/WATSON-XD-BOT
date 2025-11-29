import axios from 'axios'

let handler = async (m, { conn, args, usedPrefix, command }) => {
  if (!args[0]) 
    throw `[❗] Example: ${usedPrefix + command} https://www.tiktok.com/@username/video/1234567890\n\nor\n\n${usedPrefix + command} https://v.douyin.com/xxxxxx/`

  conn.reply(m.chat, wait, m)

  try {
    const isDouyin = args[0].includes("douyin")
    const API = isDouyin
      ? `${APIs.ryzumi}/api/downloader/v2/ttdl?url=${args[0]}`
      : `${APIs.ryzumi}/api/downloader/ttdl?url=${args[0]}`

    const { data: response } = await axios.get(API)
    let videoData, videoURL, videoURLWatermark, hdURL, info

    if (isDouyin) {
      if (!response.success || !response.data) throw "Failed to download Douyin video!"

      videoData = response.data
      const videoInfo = videoData.video_data
      hdURL = videoInfo.nwm_video_url_HQ
      videoURL = args[1] === "hd" && hdURL ? hdURL : videoInfo.nwm_video_url
      videoURLWatermark = videoInfo.wm_video_url

      const uploadTime = new Date(videoData.create_time * 1000).toLocaleString()
      const author = videoData.author || {}
      const authorId = author.unique_id || author.short_id || "unknown"

      info = `Title: ${videoData.desc}
Upload: ${uploadTime}

Uploader: ${author.nickname || "unknown"}
(${authorId} - https://www.douyin.com/user/${authorId})
Sound: ${videoData.music.author || "unknown"}`
    } else {
      videoData = response.data?.data
      if (!videoData) throw "Failed to download TikTok video!"

      hdURL = videoData.hdplay
      videoURL = args[1] === "hd" && hdURL ? hdURL : videoData.play
      videoURLWatermark = videoData.wmplay

      const author = videoData.author || {}

      info = `Title: ${videoData.title}
Upload: ${videoData.create_time}

Stats:
Like = ${videoData.digg_count}
Comments = ${videoData.comment_count}
Shares = ${videoData.share_count}
Views = ${videoData.play_count}
Downloads = ${videoData.download_count}

Uploader: ${author.nickname || "unknown"}
(${author.unique_id || "unknown"} - https://www.tiktok.com/@${author.unique_id || "unknown"})
Sound: ${videoData.music || "unknown"}`
    }

    if (
      videoURL && videoURL.endsWith('.mp3') &&
      videoURLWatermark && videoURLWatermark.endsWith('.mp3') &&
      (!hdURL || hdURL.endsWith('.mp3'))
    ) {
      if (videoData.images?.length) {
        for (let i = 0; i < videoData.images.length; i++) {
          const caption = i === 0 ? `Image ${i + 1}\n\n${info}` : `Image ${i + 1}`
          await conn.sendFile(m.chat, videoData.images[i], `image${i + 1}.jpg`, caption, m)
        }
      } else throw "No images available."
    } else {
      if (videoURL || videoURLWatermark)
        await conn.sendFile(m.chat, videoURL, isDouyin ? "douyin.mp4" : "tiktok.mp4", `Here’s your video:\n\n${info}`, m)
      else throw "No video URL available."
    }
  } catch (error) {
    conn.reply(m.chat, `Error: ${error}`, m)
  }
}

handler.help = ['tiktok']
handler.tags = ['downloader']
handler.command = /^(tt|ttdl|douyin|tiktok(dl)?)$/i

handler.disable = false
handler.register = true
handler.limit = true

export default handler