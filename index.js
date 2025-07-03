const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const { getFormattedMessage } = require('./scraper');
const cron = require('node-cron');
require('dotenv').config();

const client = new Client({
    authStrategy: new LocalAuth(),
    puppeteer: {
        headless: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox'],
    },
});

client.on('qr', qr => qrcode.generate(qr, { small: true }));
client.on('ready', async () => {
    console.log('✅ WhatsApp client is ready.');

    const groupName = process.env.GROUP_NAME;

    cron.schedule(process.env.SEND_TIME, async () => {
        const chats = await client.getChats();
        const group = chats.find(chat => chat.name === groupName);

        if (!group) {
            console.error(`❌ Group "${groupName}" not found.`);
            return;
        }

        const message = await getFormattedMessage();
        await group.sendMessage(message);
        console.log(`✅ Message sent to group: ${groupName}`);
    });
});

client.initialize();