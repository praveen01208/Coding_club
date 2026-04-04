import React, { useState } from 'react';
import API from '../utils/api';

export default function Login({ onLogin }) {
  const [tab, setTab] = useState('student');
  const [form, setForm] = useState({ username: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState('');

  const handle = async () => {
    setMsg('');
    if (!form.username || !form.password) { setMsg('Please fill in all fields.'); return; }
    setLoading(true);
    try {
      const { data } = await API.post('/auth/login', form);
      if (tab === 'admin' && data.user.role !== 'admin') { setMsg('This account does not have admin access.'); return; }
      if (tab === 'student' && data.user.role !== 'student') { setMsg('Please use the Admin tab to login.'); return; }
      onLogin(data.user, data.token);
    } catch (err) {
      setMsg(err.response?.data?.message || 'Login failed. Check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="wrap animate" style={{ maxWidth: 440, margin: '0 auto', paddingTop: '3rem' }}>
      <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '3rem', fontWeight: 400, marginBottom: 6 }}>Welcome back 👋</h1>
      <p style={{ color: 'var(--muted)', fontSize: 14, marginBottom: '1.75rem' }}>Sign in to mark or manage attendance</p>

      <div className="tabs" style={{ marginBottom: '1.25rem' }}>
        <button className={`tab ${tab === 'student' ? 'active' : ''}`} onClick={() => { setTab('student'); setMsg(''); }}>Student</button>
        <button className={`tab ${tab === 'admin' ? 'active' : ''}`} onClick={() => { setTab('admin'); setMsg(''); }}>Admin</button>
      </div>

      <div className="card">
        <div className="field">
          <label>Username</label>
          <input type="text" placeholder={tab === 'admin' ? 'admin' : 'e.g. student1'} value={form.username} onChange={e => setForm({ ...form, username: e.target.value })} onKeyDown={e => e.key === 'Enter' && handle()} />
        </div>
        <div className="field">
          <label>Password</label>
          <input type="password" placeholder="••••••••" value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} onKeyDown={e => e.key === 'Enter' && handle()} />
        </div>
        {msg && <div className="msg msg-err">{msg}</div>}
        <div style={{ marginTop: '1.25rem' }}>
          <button className="btn btn-primary btn-full" onClick={handle} disabled={loading}>
            {loading ? 'Signing in...' : `Sign in as ${tab === 'admin' ? 'Admin' : 'Student'}`}
          </button>
        </div>
      </div>
    </div>
  );
}
