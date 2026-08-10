import { compactHash, displayMetric } from './feed.js';
import { useTazFeed } from './useTazFeed.js';

const formatTime = (value) => {
  if (!value) return '—';
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? String(value) : date.toLocaleString('it-IT');
};

export function TazDashboard() {
  const { state, connection, error, refresh } = useTazFeed();
  return (
    <main className="taz-shell">
      <header className="taz-header">
        <div><p className="kicker">TAZ · Trasformazione Autonoma Zubster</p><h1>Bar robotico.<br />Numeri veri, dal vivo.</h1></div>
        <div className={`live-pill live-${connection}`}><span />{connection}</div>
      </header>

      <section className="hero-grid" aria-label="Metriche live">
        <article><p>Drink serviti</p><strong>{displayMetric(state.drinksServed)}</strong><small>Totale confermato dal backend</small></article>
        <article><p>XMR incassati</p><strong>{displayMetric(state.xmrReceived, ' XMR')}</strong><small>Aggregato dal proxy Monero RPC</small></article>
        <article className="robot-card"><p>Stato robot</p><strong>{state.robot.status}</strong><small>{state.robot.name || 'Robot TAZ'} · ultimo segnale {formatTime(state.robot.lastSeen)}</small></article>
      </section>

      {error && <p className="feed-error" role="alert">{error}</p>}

      <section className="transactions" aria-labelledby="transactions-title">
        <div className="section-title"><div><p className="kicker">Monero</p><h2 id="transactions-title">Transazioni recenti</h2></div><button onClick={refresh}>Aggiorna snapshot</button></div>
        {!state.transactions.length ? <p className="empty">Nessuna transazione pubblicata dal backend.</p> : (
          <div className="table-wrap"><table><thead><tr><th>Hash</th><th>Importo</th><th>Conferme</th><th>Ora</th></tr></thead><tbody>
            {state.transactions.map((transaction, index) => {
              const hash = transaction.txHash || transaction.hash;
              return <tr key={hash || index}><td><code title={hash}>{compactHash(hash)}</code></td><td>{displayMetric(transaction.amountXmr ?? transaction.amount, ' XMR')}</td><td>{displayMetric(transaction.confirmations)}</td><td>{formatTime(transaction.timestamp || transaction.createdAt)}</td></tr>;
            })}
          </tbody></table></div>
        )}
      </section>

      <footer><span>Ultimo dato: {formatTime(state.updatedAt)}</span><span>Nessun valore demo viene mostrato come reale.</span></footer>
    </main>
  );
}
