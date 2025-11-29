let handler = async (m) => {
    // Count total users in database
    let totalUsers = Object.keys(global.db.data.users).length;
    
    // Count registered users
    let registeredUsers = Object.values(global.db.data.users).filter(user => user.registered === true).length;
    
    // Message to reply
    let msg = `*Current database: ${totalUsers} users*\n*Registered users: ${registeredUsers} users*\n\nTo delete unregistered users, type *.delete-unreg*`;
    
    m.reply(msg);
}

handler.help = ['user'];
handler.tags = ['info'];
handler.command = /^(user)$/i;

// Only the bot owner can run this
handler.owner = true;

export default handler;