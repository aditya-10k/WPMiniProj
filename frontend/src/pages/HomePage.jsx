import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import BookingCard from '../components/BookingCard.jsx';
import { useAuth } from '../context/AuthContext.jsx';
import api from '../services/api';

const HomePage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [items, setItems] = useState([]);
  const [status, setStatus] = useState({ type: '', message: '' });

  useEffect(() => {
    api
      .get('/api/items')
      .then((res) => setItems(res.data.items))
      .catch(() => setStatus({ type: 'error', message: 'Failed to load cars' }));
  }, []);

  const handleSelect = (item) => {
    if (!user) {
      setStatus({ type: 'error', message: 'Please login to book.' });
      return;
    }
    navigate(`/book/${item._id}`);
  };

  return (
    <section className="page">
      <div className="page-heading">
        <div>
          <p className="muted">Handpicked cars</p>
          <h1>Reserve a ride</h1>
          <p>Browse ready-to-drive cars and lock your pickup date.</p>
        </div>
        {!user && (
          <div>
            <Link to="/login">Login</Link>
            <span className="muted"> / </span>
            <Link to="/signup">Sign up</Link>
          </div>
        )}
      </div>

      {status.message && (
        <div className={`alert ${status.type === 'error' ? 'alert-danger' : 'alert-success'}`}>{status.message}</div>
      )}

      <div className="grid">
        {items.map((item) => (
          <BookingCard key={item._id} item={item} onSelect={handleSelect} />
        ))}
        {items.length === 0 && <p>No cars yet. Seed via API.</p>}
      </div>
    </section>
  );
};

export default HomePage;

