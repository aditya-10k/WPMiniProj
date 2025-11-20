import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';

const LoginPage = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    try {
      await login(form, 'login');
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Unable to login');
    }
  };

  return (
    <section className="page narrow">
      <h1>Welcome back</h1>
      <p className="muted">Login to keep booking.</p>
      <form className="panel" onSubmit={handleSubmit}>
        {error && <div className="alert alert-danger">{error}</div>}
        <label>
          Email
          <input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required />
        </label>
        <label>
          Password
          <input type="password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} required />
        </label>
        <button type="submit">Login</button>
      </form>
      <p className="muted center">
        Need an account? <Link to="/signup">Sign up</Link>
      </p>
    </section>
  );
};

export default LoginPage;

