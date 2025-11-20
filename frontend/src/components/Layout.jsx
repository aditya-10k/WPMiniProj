import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';

const Layout = ({ children }) => {
  const { user, logout } = useAuth();

  return (
    <div className="app-shell">
      <header className="app-header">
        <Link to="/" className="brand" aria-label="AUTOSWAP home">
          <span className="logo-mark">AS</span>
          <span className="logo-text">AUTOSWAP</span>
        </Link>
        <nav>
          <Link to="/">Home</Link>
          {user && <Link to="/profile">Profile</Link>}
          {!user && <Link to="/login">Login</Link>}
          {!user && <Link to="/signup">Sign Up</Link>}
          {user && (
            <button className="ghost-button" onClick={logout}>
              Logout
            </button>
          )}
        </nav>
      </header>
      <main className="app-main">{children}</main>
    </div>
  );
};

export default Layout;

