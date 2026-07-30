import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav>
      <div className="nav-container">
        <Link to="/" className="logo">🌱 MyZubster</Link>
        <ul className="nav-links">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/about">About</Link></li>
          <li><Link to="/map">Map</Link></li>
          <li><Link to="/contribute">Contribute</Link></li>
          <li><a href="https://github.com/MyZubster-Ecosystem" target="_blank" rel="noopener">GitHub</a></li>
          <li><a href="https://t.me/myzubster" target="_blank" rel="noopener">Telegram</a></li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
