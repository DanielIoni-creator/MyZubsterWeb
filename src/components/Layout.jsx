import { Link, Outlet } from 'react-router-dom';

const Layout = () => {
  return (
    <div>
      <header>
        <nav style={{ display: 'flex', gap: '1rem', padding: '1rem', background: '#333', color: '#fff' }}>
          <Link to="/orders" style={{ color: '#fff' }}>Orders</Link>
          <Link to="/payments" style={{ color: '#fff' }}>Payments</Link>
          <Link to="/profile" style={{ color: '#fff' }}>Profile</Link>
          <Link to="/webhooks" style={{ color: '#fff' }}>Webhooks</Link>
        </nav>
      </header>
      <main style={{ padding: '2rem' }}>
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
