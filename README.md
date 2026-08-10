# MyZubsterWeb
Vedi issue per i bounty attivi.
🔗 https://github.com/DanielIoni-creator/I-ECO-01

## Dashboard pubblica TAZ

La dashboard live e disponibile su `/taz.html` e usa questi contratti backend:

- `GET /api/taz/dashboard` per lo snapshot di drink, robot e metriche;
- `GET /api/taz/xmr/summary` per l'aggregato ottenuto dal Monero RPC lato server;
- `WS /api/taz/live` per eventi `dashboard.snapshot`, `metrics.updated`,
  `robot.status`, `xmr.summary` e `xmr.transaction`.

Configurare `VITE_TAZ_WS_URL` quando il WebSocket non e servito dallo stesso
host. Le credenziali Monero RPC restano sul backend: la pagina pubblica non
contiene indirizzi privati, token o valori demo presentati come reali.
