import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext.jsx';
import api from '../services/api';

const ProfilePage = () => {
  const { user } = useAuth();
  const [bookings, setBookings] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    api
      .get('/api/bookings/me')
      .then((res) => setBookings(res.data.bookings))
      .catch(() => setError('Could not load bookings'));
  }, []);

  return (
    <section className="page">
      <div className="panel">
        <h1>{user?.name}</h1>
        <p className="muted">{user?.email}</p>
      </div>

      <div className="panel">
        <h2>Your bookings</h2>
        {error && <div className="alert alert-danger">{error}</div>}
        {bookings.length === 0 && <p className="muted">Nothing booked yet.</p>}
        <ul className="list">
          {bookings.map((booking) => (
            <li key={booking._id}>
              <div>
                <strong>{booking.item?.title}</strong>
                <p className="muted">{new Date(booking.date).toLocaleDateString()}</p>
              </div>
              <div>₹{booking.amount}</div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default ProfilePage;

