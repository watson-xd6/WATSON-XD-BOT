const { proto, generateWAMessage, areJidsSameUser } = (await import('@adiwajshing/baileys')).default;

export async function all(m, chatUpdate) {
    if (m.isBaileys || !m.message) return;

    // Only handle interactive responses
    if (!(
        m.message.buttonsResponseMessage ||
        m.message.templateButtonReplyMessage ||
        m.message.listResponseMessage ||
        m.message.interactiveResponseMessage
    )) return;

    let id, text;

    if (m.message.buttonsResponseMessage) {
        id = m.message.buttonsResponseMessage.selectedButtonId;
        text = m.message.buttonsResponseMessage.selectedDisplayText;
    } else if (m.message.templateButtonReplyMessage) {
        id = m.message.templateButtonReplyMessage.selectedId;
        text = m.message.templateButtonReplyMessage.selectedDisplayText;
    } else if (m.message.listResponseMessage) {
        id = m.message.listResponseMessage.singleSelectReply?.selectedRowId;
        text = m.message.listResponseMessage.title;
    } else if (m.message.interactiveResponseMessage) {
        const params = JSON.parse(m.message.interactiveResponseMessage.nativeFlowResponseMessage.paramsJson);
        id = params.id;
        text = m.message.interactiveResponseMessage.selectedDisplayText || id;
    }

    let isIdMessage = false;
    let usedPrefix;

    // Loop through all plugins to check if the response matches a command
    for (let name in global.plugins) {
        let plugin = global.plugins[name];
        if (!plugin || plugin.disabled) continue;
        if (!opts['restrict'] && plugin.tags?.includes('admin')) continue;
        if (typeof plugin !== 'function' || !plugin.command) continue;

        const escapeRegex = str => str.replace(/[|\\{}()[\]^$+*?.]/g, '\\$&');
        let _prefix = plugin.customPrefix ?? this.prefix ?? global.prefix;

        let match = (_prefix instanceof RegExp ? [[_prefix.exec(id), _prefix]] :
            Array.isArray(_prefix) ? _prefix.map(p => [p instanceof RegExp ? p : new RegExp(escapeRegex(p)).exec(id), p instanceof RegExp ? p : new RegExp(escapeRegex(p))]) :
            [[new RegExp(escapeRegex(_prefix)).exec(id), new RegExp(escapeRegex(_prefix))]]
        ).find(p => p[1]);

        if (!match) continue;

        usedPrefix = (match[0] || '')[0];
        let commandText = id.replace(usedPrefix, '').trim().split` `[0]?.toLowerCase();
        let isCommandMatch = plugin.command instanceof RegExp
            ? plugin.command.test(commandText)
            : Array.isArray(plugin.command)
                ? plugin.command.some(cmd => cmd instanceof RegExp ? cmd.test(commandText) : cmd === commandText)
                : plugin.command === commandText;

        if (isCommandMatch) isIdMessage = true;
    }

    // Generate a WA message to simulate user sending it
    let messages = await generateWAMessage(
        m.chat,
        { text: isIdMessage ? id : text, mentions: m.mentionedJid },
        { userJid: this.user.id, quoted: m.quoted?.fakeObj }
    );

    messages.key.fromMe = areJidsSameUser(m.sender, this.user.id);
    messages.key.id = m.key.id;
    messages.pushName = m.name;
    if (m.isGroup) messages.key.participant = messages.participant = m.sender;

    // Emit the message update event
    let msg = {
        ...chatUpdate,
        messages: [proto.WebMessageInfo.fromObject(messages)].map(v => (v.conn = this, v)),
        type: 'append'
    };
    this.ev.emit('messages.upsert', msg);
}