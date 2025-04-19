# Puppeteer TradingView Screenshot Service

Este proyecto usa Puppeteer para capturar gráficos reales de TradingView con el símbolo y timeframe indicados.

## Uso
- POST /api/captura con body JSON:
  {
    "symbol": "ETHUSDT",
    "timeframe": "1h"
  }

## Nota
Este servicio está diseñado para correr en Railway o Render, no en Vercel.