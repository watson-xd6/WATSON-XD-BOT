let handler = async (m) => {
    let users = global.db.data.users;
    let chats = global.db.data.chats;
    let deletedUsers = 0;
  
    // Loop through all users
    for (let user in users) {
        // Delete users who are not registered and not banned
        if (!users[user].registered && !users[user].banned) {
            delete users[user];
            deletedUsers++;
  
            // Also remove chat entries linked to this user
            if (chats[user]) {
                delete chats[user];
            }
        }
    }
  
    // Update database
    global.db.data.users = users;
    global.db.data.chats = chats;
    await global.db.write();
  
    // Count totals
    let totalUsers = Object.keys(users).length;
    let registeredUsers = Object.values(users).filter(user => user.registered).length;
    
    let msg = `*Current database: ${totalUsers} users*\n*Currently registered: ${registeredUsers} users*\n*${deletedUsers} users have been deleted because they were not registered*`;
    m.reply(msg);
};

handler.command = /^(delete-unreg)$/i;
handler.owner = true;

export default handler;