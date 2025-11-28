import fetch from "node-fetch"
import fs from "fs"
import path from "path"

// URLs
const HANDLER_URL = "https://files.giftedtech.top/file/Gkxhandler.js"
const MAIN_URL = "https://files.giftedtech.top/file/1Wmain.js"

// Local paths
const LOCAL_HANDLER = path.resolve("./handler.js")
const LOCAL_MAIN = path.resolve("./main.js")

// Utility to download and save a file
async function downloadFile(url, localPath, name) {
    try {
        const res = await fetch(url)
        if (!res.ok) throw new Error(`HTTP ${res.status} - ${res.statusText}`)
        const code = await res.text()
        fs.writeFileSync(localPath, code)
        console.log(`✅ ${name} updated successfully.`)
    } catch (e) {
        console.log(`❌ Failed to update ${name}:`, e.message)
    }
}

// Download both files
await downloadFile(HANDLER_URL, LOCAL_HANDLER, "handler.js")
await downloadFile(MAIN_URL, LOCAL_MAIN, "main.js")

// Load main.js to start the bot
import("./main.js")
