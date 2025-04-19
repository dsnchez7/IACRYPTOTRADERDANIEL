const express = require('express');
const puppeteer = require('puppeteer');

const app = express();
app.use(express.json());

app.post('/api/captura', async (req, res) => {
  const { symbol = 'ETHUSDT', timeframe = '1h' } = req.body;

  try {
    const browser = await puppeteer.launch({
      headless: 'new',
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    const page = await browser.newPage();

    // URL de gráfico de TradingView para captura simple
    const tvURL = `https://www.tradingview.com/chart/?symbol=BINANCE:${symbol}`;
    await page.goto(tvURL, { waitUntil: 'networkidle2' });
    await page.waitForTimeout(8000); // tiempo para cargar indicadores manualmente

    const screenshotPath = `/tmp/${symbol}_${timeframe}.png`;
    await page.screenshot({ path: screenshotPath });

    await browser.close();
    res.sendFile(screenshotPath);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error generando captura.');
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor capturador corriendo en puerto ${PORT}`));