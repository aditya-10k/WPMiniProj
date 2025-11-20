import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';

const SignupPage = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    try {
      await login(form, 'signup');
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Unable to sign up');
    }
  };

  return (
    <section className="page narrow">
      <h1>Create account</h1>
      <p className="muted">Just the basics.</p>
      <form className="panel" onSubmit={handleSubmit}>
        {error && <div className="alert alert-danger">{error}</div>}
        <label>
          Name
          <input type="text" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
        </label>
        <label>
          Email
          <input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required />
        </label>
        <label>
          Password
          <input type="password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} required />
        </label>
        <button type="submit">Sign up</button>
      </form>
      <p className="muted center">
        Already have an account? <Link to="/login">Login</Link>
      </p>
    </section>
  );
};

export default SignupPage;

