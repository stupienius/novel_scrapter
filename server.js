const express = require('express');
const puppeteer = require('puppeteer');
const path = require('path');
const app = express();
const port = 3000;

app.use(express.static(path.join(__dirname, 'public')));

app.get('/href', async (req, res) => {
    const url = req.query.url;
    if (!url) {
        return res.status(400).json({ error: 'URL is required' });
    }

    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url);

    const result = await page.evaluate(() => {
        const links = document.querySelectorAll('.chapter-list li a');
        return Array.from(links).map(link => link.href);
    });

    await browser.close();

    res.json({ content: result });
});

app.get('/content', async (req, res) => {
    const url = req.query.url;
    if (!url) {
        return res.status(400).json({ error: 'URL is required' });
    }

    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url);

    const result = await page.evaluate(() => {
        return document.querySelector(".content").innerHTML;
    });

    await browser.close();

    res.json({ content: result });
});

app.listen(port, () => {
    console.log(`伺服器正在運行在 http://localhost:${port}`);
});
