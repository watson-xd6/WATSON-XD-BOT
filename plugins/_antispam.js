export async function all(m) {
    if (!m.message) return; // Ignore messages with no content

    // Initialize spam tracking object if it doesn't exist
    this.spam = this.spam || {};

    const sender = m.sender;
    const timestamp = m.messageTimestamp.toNumber();

    if (sender in this.spam) {
        this.spam[sender].count++;

        // Reset counter if more than 15 seconds have passed
        if (timestamp - this.spam[sender].lastspam > 15) {
            if (this.spam[sender].count > 15) {
                // Auto-ban user for spamming
                global.db.data.users[sender].banned = true;
                global.db.data.users[sender].banReason = '*Auto-detect:* Spam';
                m.reply("Your number has been banned due to spam.");
            }
            // Reset spam counter and timestamp
            this.spam[sender].count = 0;
            this.spam[sender].lastspam = timestamp;
        }
    } else {
        // First message from user, initialize tracking
        this.spam[sender] = {
            count: 1,
            lastspam: timestamp
        };
    }
}