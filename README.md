# MyZubsterWeb
Vedi issue per i bounty attivi.
🔗 https://github.com/DanielIoni-creator/I-ECO-01

## Dashboard amministrativa

La dashboard e disponibile su `/admin.html`. Legge esclusivamente dati reali dalle API e aggiorna le quattro sezioni ogni 15 secondi:

- `GET /api/admin/stats`
- `GET /api/admin/users`
- `PATCH /api/admin/users/:id/permissions`
- `GET /api/admin/transactions/xmr`
- `GET /api/admin/audit-logs`

Impostare `VITE_API_URL` quando il backend non e disponibile su `http://localhost:4000/api`.
