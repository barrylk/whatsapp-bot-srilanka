# WhatsApp Bot – Sri Lanka Daily Updates 🇱🇰

This bot sends daily TT Buying/Selling exchange rates and fuel prices to a specified WhatsApp group using `whatsapp-web.js`.

## Features

- 💱 TT Buying/Selling Exchange Rates (CBSL)
- ⛽ Daily Fuel Prices (Mocked - replaceable)
- ⏰ Scheduled daily message (via `node-cron`)
- 📤 Sends to a WhatsApp Group (bot must be a member)

## Setup

1. Clone the repo and install dependencies:
   ```bash
   npm install
   cp .env.template .env
   ```

2. Edit `.env` with your group name and send time (cron format).

3. Start the bot:
   ```bash
   node index.js
   ```

Scan the QR on first launch with WhatsApp Mobile (Linked Devices).

---