const axios = require('axios');
const cheerio = require('cheerio');

async function getFormattedMessage() {
    const exchangeRates = await getExchangeRates();
    const fuelPrices = await getFuelPrices();

    const message = `📊 *Daily Update – Sri Lanka 🇱🇰*\n
🪙 *Exchange Rates (CBSL)*
${exchangeRates}

⛽ *Fuel Prices*
${fuelPrices}

📅 Date: ${new Date().toLocaleDateString('en-GB')}`;

    return message;
}

async function getExchangeRates() {
    const url = 'https://www.cbsl.gov.lk/en/exchange-rates';
    const res = await axios.get(url);
    const $ = cheerio.load(res.data);

    let table = $('table').first();
    let rows = table.find('tbody tr');
    let output = '';

    rows.each((i, row) => {
        const tds = $(row).find('td');
        const currency = $(tds[0]).text().trim();
        const ttBuying = $(tds[1]).text().trim();
        const ttSelling = $(tds[2]).text().trim();

        if (['USD', 'EUR', 'GBP'].includes(currency)) {
            output += `${currency}: TT Buying – Rs. ${ttBuying} | TT Selling – Rs. ${ttSelling}\n`;
        }
    });

    return output.trim();
}

async function getFuelPrices() {
    return `Petrol 92: Rs. 365/L
Petrol 95: Rs. 420/L
Diesel: Rs. 345/L
Super Diesel: Rs. 395/L`;
}

module.exports = { getFormattedMessage };