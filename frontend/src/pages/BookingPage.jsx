import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../services/api';

const BookingPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [item, setItem] = useState(null);
  const [form, setForm] = useState({ date: '', notes: '' });
  const [status, setStatus] = useState({ type: '', message: '' });

  useEffect(() => {
    api
      .get(`/api/items/${id}`)
      .then((res) => setItem(res.data.item))
      .catch(() => setStatus({ type: 'error', message: 'Ride not found' }));
  }, [id]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await api.post('/api/bookings', { itemId: id, date: form.date, notes: form.notes });
      setStatus({ type: 'success', message: 'Booking confirmed!' });
      setTimeout(() => navigate('/profile'), 1200);
    } catch (error) {
      const message = error.response?.data?.message || 'Could not create booking';
      setStatus({ type: 'error', message });
    }
  };

  if (!item) {
    return <div className="center-message">Loading ride...</div>;
  }

  return (
    <section className="page narrow">
      <div className="panel highlight">
        {item.imageUrl && <img className="hero-image" src={item.imageUrl} alt={item.title} loading="lazy" />}
        <p className="muted">{item.location}</p>
        <h1>{item.title}</h1>
        <p>{item.description}</p>
        <strong>₹{item.price}/day · {item.slotsAvailable} available</strong>
      </div>

      <form className="panel" onSubmit={handleSubmit}>
        <h2>Pick your date</h2>
        {status.message && (
          <div className={`alert ${status.type === 'error' ? 'alert-danger' : 'alert-success'}`}>{status.message}</div>
        )}
        <label>
          Pickup date
          <input type="date" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} required />
        </label>
        <label>
          Notes
          <textarea value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} placeholder="Anything the host should know?" />
        </label>
        <button type="submit">Confirm booking</button>
      </form>
    </section>
  );
};

export default BookingPage;

